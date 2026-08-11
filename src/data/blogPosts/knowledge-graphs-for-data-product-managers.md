---
id: "10"
slug: "knowledge-graphs-for-data-product-managers"
title: "What a Knowledge Graph Actually Is (and What It Isn't)"
description: "Notes from trying to get this straight, written for data product managers. One question separates every product in this space \u2014 does it hold data, or only rules? Worked through one concrete problem: ad-level attribution reporting across Meta and Google."
publishedDate: "2026-08-11"
tags: ["Knowledge Graphs", "Semantic Layer", "Data Platform", "Product Management"]
featured: true
---

I set out to understand knowledge graphs properly and spent most of that time confused, not because the ideas are hard but because almost every explanation assumes you already know which box does what. The vendor material makes it worse: three products described in nearly identical language turn out to do completely different jobs.

What follows is what eventually made it click, worked through one problem I suspect a lot of teams have: **reporting on paid media at the ad level, across Facebook and Google Ads, joined to what those users actually did afterwards.**

This is an explanation, not a recommendation. I have no view on what you should buy, and where I've formed an opinion I've tried to mark it as one.

---

## Part 0: The problem we'll keep coming back to

Four questions marketing wants answered:

1. Which ads generated the highest attributed revenue?
2. Which ads drove the most attributed users?
3. Compare watch time and revenue across ad sets within a campaign.
4. Identify top-performing ads by watch time, by marketing source, over a selected time period.

They look like straightforward reporting questions. Two things make them harder than they read.

**The two platforms don't share a vocabulary.** Google Ads organizes as campaign, then **ad group**, then ad. Meta organizes as campaign, then **ad set**, then ad. Same conceptual level, different name, different export schema, different ID space. Question 3 asks about "ad sets," which in Google's world doesn't exist by that name.

**"Attributed" is a definition, not a column.** Attributed to what window? Last touch or first touch? Does a user who saw both a Facebook ad and a Google ad count once or twice? There is no table where that decision lives. It lives in a document, a dbt model, and three people's heads, and it is usually implemented slightly differently in each.

Both of those turn out to be exactly the kind of problem this technology exists for. Hold onto them.

---

## Part 1: Start with the format, not the technology

A knowledge graph stores facts as three-part sentences. That's the whole data model.

You already know this row:

| ad_id | ad_name | ad_set_id | platform |
|---|---|---|---|
| 4471 | summer_teaser_15s | 88 | meta |

Written as sentences, it becomes:

```
ad/4471  →  hasName        →  "summer_teaser_15s"
ad/4471  →  belongsToAdSet →  adset/88
ad/4471  →  fromSource     →  source/meta
```

Each sentence is called a **triple**: subject, predicate, object. One row became three triples.

Why prefer this? For a single table, you wouldn't. The format pays off in two places.

**First, sentences chain.** The object of one becomes the subject of the next:

```
ad/4471       →  belongsToAdSet     →  adset/88
adset/88      →  belongsToCampaign  →  campaign/12
campaign/12   →  marketingSource    →  source/meta
conversion/9  →  fromAd             →  ad/4471
conversion/9  →  convertedUser      →  customer/8891
customer/8891 →  hadSession         →  session/551
```

Six sentences and you can walk from an ad to a viewing session. In a normalized schema that's six tables and five joins you must know about in advance. Here the path is just there, and you can traverse it without knowing beforehand how many hops it takes. That matters for question 4, which is a three-hop walk from an ad up to its marketing source.

**Second, you don't have to declare the columns first.** A table forces you to decide its shape before you have data. Sentences don't. When TikTok Ads gets added next quarter, you add sentences. No migration, nothing downstream breaks.

That flexibility comes with a cost I'll come back to in Part 6, because it's the thing most likely to bite you.

---

## Part 2: The misconception I'd most want to clear up

Here's the map version, which I think does more harm than good.

If a knowledge graph is a nicer way to store data, the obvious conclusion is: *copy the ad exports and the viewing events into a graph, and now the questions get easier.* Some vendors are happy for you to reach that conclusion.

But triples are a much less efficient way to store a billion impressions than a columnar table. Your warehouse has had decades of engineering poured into exactly that job. Copying into a graph means paying twice: once for the copy, and again in query performance.

**The more useful framing I landed on: a knowledge graph is good at holding things your warehouse cannot express.**

In the paid-media problem, that's four things:

- **Meaning.** That `google:AdGroup` and `fb:AdSet` are the same concept. That a `VideoAd` is a kind of `Ad`. There's no column for this. It lives in a naming convention or a person.
- **Identity.** That the Google click ID and the Meta click ID resolved to the same customer, by rule X, at confidence 0.95, on 3 August. A fact you *created*, not one you extracted.
- **Definitions.** What "attributed revenue" means, precisely, in a form a machine can apply.
- **Lineage.** Which raw export fed which model fed the number in the board deck.

None of those came out of a source system. There's no table they naturally belong to. They're small (a few million triples against a warehouse holding billions of rows), densely interconnected, and constantly amended.

So the shape that seems to hold up: **the warehouse keeps the records; the graph keeps the meaning.**

---

## Part 3: Four things that get confused for each other

This is where I lost the most time. Four components, similar marketing language, genuinely different jobs. One question separates them.

![Three families of semantic tooling](/images/blog/knowledge-graphs/fig1-three-families.svg)

**1. A graph database** holds triples. You copy data in, it answers queries directly. Examples: Stardog, Graphwise GraphDB, and, with an important caveat below, Neo4j.

**2. A mapping engine** holds no data at all. It holds a translation table: "the concept `Ad` means the table `META_ADS.DIM_AD` union `GOOGLE_ADS.DIM_AD`; the concept `belongsToAdSet` means this join." It accepts a query in business terms and rewrites it as SQL. The formal name for this pattern is Ontology-Based Data Access (OBDA). Ontop is the open-source reference implementation.

The mappings are literally text files: a few hundred lines, kept in Git next to your dbt models. If you delete the mapping engine you've lost a config file, not data.

**3. A dimensional semantic layer** also holds no data, and also generates SQL, but it's organized around metrics, dimensions, and hierarchies rather than around an ontology. AtScale, dbt's Semantic Layer, Cube, and Snowflake's Semantic Views all live here.

**4. The LLM**, in any of these architectures, does exactly two things: turn your question into a query at the front, and turn rows into a sentence at the back. It never touches the data in between.

Two clarifications that would have saved me days.

**Neo4j is not in the same family as the others.** It's a graph database, but a *property graph* one: its query language is Cypher, not SPARQL, and it has no ontology or inference layer. When people say "knowledge graph" they often mean the RDF/SPARQL family, and Neo4j content will confuse you if you're reading it expecting that. Both are legitimate; they're optimized for different problems. Neo4j is strong where you're computing over a graph you already agree on (fraud rings, path-finding, recommendations). RDF tools are strong where the hard part is *agreeing what things mean* across systems, which is precisely the ad-group-versus-ad-set problem.

**Some products are in two rows at once.** Stardog stores triples *and* does mapping-engine rewriting, in one process. That's not a contradiction; it's two features in one box. But it explains why reading Stardog's site while trying to learn the categories is disorienting.

---

## Part 4: Where Snowflake's Semantic Views actually sits

I had assumed Semantic Views was Snowflake's answer to knowledge graphs. Having read the documentation, I don't think that's right, and the confusion is worth naming because teams are making purchasing decisions on it.

Per Snowflake's own docs, a semantic view is a schema-level object encoding logical tables, relationships, facts, dimensions, and metrics over physical tables. Cortex Analyst reads that definition and [generates SQL against the physical tables directly](https://docs.snowflake.com/en/user-guide/views-semantic/overview). Snowflake's engineering blog describes it as [a native database object replacing the older Cortex Analyst YAML file stored on a stage](https://www.snowflake.com/en/blog/engineering/native-semantic-views-ai-bi/), motivated by customers wanting conversational analytics without ungoverned data access.

On the "does it hold data?" test, that's clearly a translator. No triples, no SPARQL, no inference. It defines *how to calculate* a metric and *who may see it*.

So: **is it a knowledge graph? No. Is it a mapping engine? Also not quite.** An OBDA mapping engine accepts SPARQL and can span heterogeneous sources; Semantic Views is scoped to Snowflake tables. It's the third category: a dimensional semantic layer, native to one platform.

**Which means comparing it against a knowledge graph is a category error.** Run our four questions through both and you can see the split:

| | Dimensional semantic layer | Knowledge graph |
|---|---|---|
| Handles well | "What is attributed revenue, exactly, and is it the same number in Excel and in the agent?" | "Is Google's ad group the same thing as Meta's ad set, and can I prove these two click IDs are one person?" |
| Our Q1 and Q2 | Strong, once both platforms are conformed into one table | Strong, and it does the conforming |
| Our Q3 and Q4 | Strong, if the hierarchy is already unified upstream | Strong, and the hierarchy is the model |
| The unification itself | Not its job. Someone must have already built the union in dbt | This is its job |
| Fails at | Anything relationship-shaped or cross-source | Wide aggregations over billions of rows |

Notice that both columns can answer all four questions. The difference is **who does the reconciliation and where it's recorded.** In the dimensional layer, someone conforms Google and Meta into one table upstream, in SQL, and the reasoning behind it lives in a pull request. In the graph, the reconciliation is two lines of declared meaning that a machine applies and a human can query.

**My reading, and this is opinion rather than fact, is that most large organizations end up needing both, and the interesting question isn't which to choose but where the boundary sits.** One workable division: metric definitions in the dimensional layer, entity meaning and identity in the graph, with each metric linked to the ontology class it measures. That's a design question, not a product question.

Worth watching: [Apache Ossie](https://ossie.apache.org/), formerly the Open Semantic Interchange, entered the Apache Incubator in July 2026 as a vendor-neutral format for exchanging semantic definitions, with 50+ organizations including both Snowflake and Databricks participating. If it succeeds, the cost of picking one semantic layer now drops considerably. It's at v0.1 and incubating, so "align and experiment" seems more sensible than "migrate."

---

## Part 5: Workflow one, reading

Assume for this walkthrough the graph holds **no data**, only schema. This is the cleanest case and, I'd argue, an underrated starting configuration.

![Read workflow for an ad-level attribution question](/images/blog/knowledge-graphs/fig2-read-workflow.svg)

**Step 1. The question arrives.** Take question 1: *"Which ads generated the highest attributed revenue?"* Note the ambiguity. "Attributed" is undefined, "highest" is undefined over what period, and "ads" spans two platforms with different schemas. That ambiguity is the whole reason step 2 exists.

**Step 2. The graph database is read for schema.** It returns the relevant slice of the ontology as text:

```
Class:    Ad, AdSet, Campaign, MarketingSource, AttributedConversion
          google:AdGroup is a kind of AdSet
          fb:AdSet       is a kind of AdSet

Property: belongsToAdSet     (Ad → AdSet)
Property: belongsToCampaign  (AdSet → Campaign)
Property: marketingSource    (Campaign → MarketingSource)
Property: fromAd             (AttributedConversion → Ad)
Property: convertedUser      (AttributedConversion → Customer)
Property: revenueEur         (AttributedConversion → decimal)

Definition: "attributed revenue"
            = SUM(revenueEur) over AttributedConversion,
              last non-direct touch, 7-day click / 1-day view window
Definition: "attributed users"
            = COUNT(DISTINCT convertedUser)
```

Those two definition lines aren't derivable from any table. Someone wrote them down and someone approved them. And the two "is a kind of" lines are what makes a single query span both platforms.

![Reconciling the Facebook and Google hierarchies](/images/blog/knowledge-graphs/fig3-vocabulary-reconciliation.svg)

**This is the graph's entire contribution to this query.** It's consulted once, up front, as a dictionary. It never sees the query that follows.

**Step 3. The LLM writes SPARQL,** using only the names it was just given:

```sparql
SELECT ?adName (SUM(?revenue) AS ?attributedRevenue)
WHERE {
  ?conv a ex:AttributedConversion ;
        ex:fromAd      ?ad ;
        ex:revenueEur  ?revenue ;
        ex:occurredAt  ?ts .
  ?ad rdfs:label ?adName .
  FILTER (?ts >= "2026-07-01"^^xsd:date && ?ts < "2026-08-01"^^xsd:date)
}
GROUP BY ?adName
ORDER BY DESC(?attributedRevenue)
LIMIT 20
```

Question 4 is the more interesting one, because it walks the hierarchy:

```sparql
SELECT ?source ?adName (SUM(?secs) AS ?watchSeconds)
WHERE {
  ?ad a ex:Ad ;
      rdfs:label ?adName ;
      ex:belongsToAdSet/ex:belongsToCampaign/ex:marketingSource ?source .

  ?conv ex:fromAd        ?ad ;
        ex:convertedUser ?user ;
        ex:occurredAt    ?convTs .

  ?session ex:viewer       ?user ;
           ex:watchSeconds ?secs .

  FILTER (?convTs >= "2026-07-01"^^xsd:date && ?convTs < "2026-08-01"^^xsd:date)
}
GROUP BY ?source ?adName
ORDER BY ?source DESC(?watchSeconds)
```

The line worth staring at is `ex:belongsToAdSet/ex:belongsToCampaign/ex:marketingSource`. Three hops in one expression, and it works identically whether the middle level came from Google or Meta, because both were declared as kinds of `AdSet`. Question 3, comparing watch time and revenue across ad sets within a campaign, is the same walk stopped one level earlier.

The LLM's job is now done until step 6.

**Step 4. The mapping engine rewrites.** Pure lookup against its rules file. No model, no guessing. This is where the two subclass declarations turn into actual SQL:

```sql
SELECT a.AD_NAME, SUM(c.REVENUE_EUR) AS attributed_revenue
FROM   ANALYTICS.FACT_ATTRIBUTED_CONVERSION c
JOIN (
    SELECT AD_ID, AD_NAME, AD_GROUP_ID AS AD_SET_ID, 'google' AS SRC
    FROM   GOOGLE_ADS.DIM_AD
    UNION ALL
    SELECT AD_ID, AD_NAME, ADSET_ID    AS AD_SET_ID, 'meta'   AS SRC
    FROM   META_ADS.DIM_AD
) a ON a.AD_ID = c.AD_ID
WHERE  c.CONVERTED_AT >= DATE '2026-07-01'
  AND  c.CONVERTED_AT <  DATE '2026-08-01'
GROUP BY a.AD_NAME
ORDER BY attributed_revenue DESC
LIMIT 20
```

That `UNION ALL` is what the two lines of ontology bought. Nobody wrote it by hand, and when TikTok is added, nobody rewrites it.

**Step 5. The warehouse runs it.** Ordinary SQL, ordinary optimizer, ordinary partition pruning on `CONVERTED_AT`. It has no idea a graph was involved.

**Step 6. The LLM turns rows into a sentence.**

Three properties of this trace seem worth dwelling on.

**The LLM appears twice, at the edges.** Between steps 3 and 6 the pipeline is fully deterministic. Same question tomorrow, same SPARQL, same SQL, same rows. If a number is wrong, it's wrong at step 3 (bad query) or step 2 (bad definition), and both are inspectable text you can print and review. That auditability is, I suspect, the real reason this architecture appeals to regulated organizations, more than any accuracy claim.

**A change request lands in one place.** Suppose the attribution window moves from 7-day click to 28-day. That's one line in the definition at step 2. Steps 3 through 6 regenerate. No SQL is edited, no dbt model is republished, no dashboard is rebuilt, and critically, the change is visible as a diff on a definition rather than buried in a `WHERE` clause.

**A new channel is an addition, not a rewrite.** TikTok joins by adding `tiktok:AdGroup is a kind of AdSet` plus a mapping to its table. All four questions keep working. In the dimensional-layer version of this, someone edits the union in dbt and re-tests everything downstream. Neither is wrong; they're different places to put the same decision.

**On the accuracy claim.** The most-cited evidence is [Sequeda, Allemang and Jacob (2024)](https://arxiv.org/abs/2405.11706), who benchmarked GPT-4 on enterprise questions. Against a raw SQL schema, accuracy was 16.7%. Given a knowledge graph instead, it rose to 54.2%. Adding an ontology-based query check and a repair step took it to 72.55%. Read the paper before quoting the numbers: it's one benchmark on one enterprise schema, not a law of nature, and the authors are practitioners in this field. But the direction is intuitive. Hand a model `GOOGLE_ADS.DIM_AD` and `META_ADS.DIM_AD` with no context and it will guess whether `AD_GROUP_ID` and `ADSET_ID` mean the same thing. Sometimes it will guess right.

For the property-graph equivalent, Neo4j's [Text2Cypher guide](https://medium.com/neo4j/text2cypher-guide-cc161518a509) covers the same pattern in Cypher, and [graphrag.com's reference page](https://graphrag.com/reference/graphrag/text2cypher/) is refreshingly blunt, calling the pattern the most flexible and also the most unreliable, and listing the mitigations that help.

---

## Part 6: Workflow two, building the thing

Everything above assumed the graph already exists. That assumption does a lot of quiet work, and I think it's where most of the real cost hides.

The build workflow looks nothing like the read workflow. It's slower, more political, and mostly not technical.

![Build workflow](/images/blog/knowledge-graphs/fig4-build-workflow.svg)

**A. Pick a domain narrow enough to finish.** Not "the enterprise." Paid media attribution, two platforms, four questions. The commonly cited failure mode is a program that models everything and ships nothing.

**B. Interview people, not schemas.** This is the step most likely to get skipped and most likely to determine the outcome. If you build the ontology by reading the Google Ads export schema, you get a redrawn ERD with different syntax: the vocabulary will be `AD_GROUP_ID`, and you'll have bought graph syntax without buying meaning.

The value comes from writing down what people currently disagree about. In this domain that's a short and uncomfortable list: is the window 7 days or 28? Is a view-through a touch? When both platforms claim the same conversion, who gets it? Does organic count as a source? Every one of those is a business decision that is currently implemented three times, slightly differently.

**C. Write the ontology.** A few hundred lines, in Turtle or via a tool like Protégé:

```turtle
ex:AdSet            a owl:Class .
google:AdGroup      rdfs:subClassOf ex:AdSet .
fb:AdSet            rdfs:subClassOf ex:AdSet .

ex:Ad               a owl:Class .
ex:VideoAd          rdfs:subClassOf ex:Ad .

ex:belongsToAdSet   a owl:ObjectProperty ;
    rdfs:domain ex:Ad ; rdfs:range ex:AdSet .

ex:belongsToCampaign a owl:ObjectProperty ;
    rdfs:domain ex:AdSet ; rdfs:range ex:Campaign .
```

A property worth knowing: **the ontology is itself written as triples.** Your schema and your data are the same shape, which means you can query the schema exactly like you query the data. "List every kind of AdSet we recognize" is a query, not a documentation lookup, and it stays correct when someone adds TikTok next quarter.

**D. Write the mappings.** R2RML files connecting each ontology term to physical tables and columns. Mechanical, but the place where bad SQL originates: a sloppy mapping produces the join that scans the whole impressions table when a filtered one would do.

**E. Write shapes, and run them in CI.** This is the part I'd flag hardest, because it addresses the cost mentioned in Part 1. Schema-on-read moves enforcement out of the database and into governance. In a relational system, an unmodelled fact causes a loud early failure, the migration itself. In a graph, it causes a silent late one: the ads team mints `ex:adName` while the analytics team mints `ex:adLabel`, both load fine, nothing errors, and eighteen months later question 1 returns half the ads.

[SHACL](https://www.w3.org/TR/shacl/) is the W3C standard for expressing "valid data looks like this," and running it on every ingest is the mitigation. A shape here would say: every `Ad` has exactly one label, exactly one `belongsToAdSet`, and its `AdSet` resolves to a known `MarketingSource`. My read: if your organization's governance discipline is weaker than its DBA discipline, a knowledge graph will degrade faster than the warehouse it was meant to improve. That's not an argument against building one; it's an argument for budgeting the stewardship, and for naming an owner before writing a line of Turtle.

**F. Decide what actually gets loaded.** In the read workflow above, the answer was "nothing": schema only. That's a legitimate and low-risk starting point, and for these four questions it may be sufficient. If you do load facts, the candidates are the categories from Part 2: the cross-platform identity resolutions, the definitions, the lineage. Not a copy of your ad exports.

**G. Treat the ontology as a versioned product.** Version IRIs, a change process, a named owner, a review path. Note the dashed loop in the diagram: when the attribution window changes, you're back at step B, and that is the normal state rather than a failure. The programs I've read about that stalled seem to stall here rather than on technology.

**One observation on sequencing,** offered as a hypothesis rather than advice. Starting with something like paid-media reconciliation, where the pain is concrete and the scope is two source systems, seems more survivable than starting with Customer 360. The flagship project is also the one with the most stakeholders. Whether that generalizes, I genuinely don't know.

---

## Part 7: What I'd want a data product manager to walk away with

Five things, none of them a recommendation.

**One question separates every product in this space:** does it hold data, or only rules? Ask it before reading any vendor page and the categories stop blurring.

**"Knowledge graph" and "semantic layer" are not synonyms**, and where a product markets itself as both, it's worth asking which of the two jobs it actually does well.

**A graph is not a better warehouse.** It's a place for the things a warehouse can't express: that an ad group and an ad set are the same idea, that these two click IDs are one person, that "attributed" means this and not that. The moment a proposal involves copying your fact tables into a graph, that's worth a hard question.

**The LLM is the smallest and least interesting component.** It writes one query and reads one result. Almost all the value, and all the auditability, sits in the definitions it was handed.

**The hard part is not technical.** Getting the performance marketing lead, the finance analyst and the data team to agree what "attributed revenue" means is the project. The graph is just where the agreement gets written down in a form a machine can use.

If there's a single thing I'd test before committing to anything: take your own version of question 1, write down the attribution definition properly, and see how far that alone gets you. If it solves the problem, you may not need any of this. If it doesn't, if the argument is really about *which ads and which users count* rather than *how to sum the number*, that's the signal worth paying attention to.

---

## Part 8: If you happen to be the person trying to move this forward

Most organizations reading this already have a warehouse or lakehouse that works. That changes the question from "should we adopt a graph" to something narrower and more awkward: what, if anything, does a product manager actually do here, when the platform team is competent and the data is already centralized?

The most useful framing I've found is that **the job is not sponsoring a graph platform. It's turning semantic decisions that are currently implicit into explicit, versioned, owned artifacts.** The technology, if it arrives, arrives as a consequence. And if it never arrives, that work still improved things, which is what makes it a defensible position to take.

A few observations on how that seems to play out.

**Leading with a question travels further than leading with a technology.** "We should build a knowledge graph" is a hard sentence to fund and a slightly suspicious one to hear. "We cannot currently answer which ads drove attributed watch time across Meta and Google without three weeks of manual reconciliation, and the reason is structural rather than a backlog problem" is a different conversation. The paid-media case in this piece happens to have the right properties for a first wedge: two source systems, a genuine vocabulary conflict, a metric definition nobody agrees on, and a business owner who feels the pain every month.

**The definitions can be owned before any infrastructure is.** Getting "attributed revenue" written down once, with a named owner, a change process and a version, is valuable in dbt, in a semantic layer, in Apache Ossie, or in an ontology. It doesn't commit you to a stack. It is also, in my reading, the specific work that tends to go undone: architects build, analysts consume, engineering optimizes, and convening the argument between performance marketing and finance about what actually counts belongs to nobody in particular. That gap looks product-manager-shaped.

**Starting on metadata and lineage rather than customer data seems to go better.** Two reasons, one political and one technical. Politically, nobody owns lineage, so nobody contests it, whereas customer identity typically has three claimants before the first meeting is booked. Technically, lineage is intrinsically a graph: impact analysis and root-cause analysis are the same traversal run in opposite directions. The warehouse's weakness becomes visible rather than debatable. Real users in a quarter, and only then the standing to touch identity.

**Virtual-first keeps the footprint small enough to be uncontroversial.** With a mature lakehouse, a graph earns nothing by duplicating it, and a duplication proposal will be correctly rejected by whoever owns the storage bill. "The warehouse keeps the records, the graph keeps the meaning" is not just a conceptual framing; it's what keeps the thing cheap enough that it may not need a business case at all. Programs that require board approval tend to attract board scrutiny.

**Naming the ontology owner before anyone writes a line of Turtle is worth insisting on.** These efforts appear to fail on stewardship rather than on technology. A PM can usually create and staff that role; an architect often can't. And if the role can't be funded, that is itself information, learned in month one rather than month nine.

**On measurement**, triple counts and coverage percentages are easy to report and don't mean much. The number that seems to matter is time-to-answer for a genuinely *new* cross-silo question, one nobody anticipated when the model was built. If that hasn't moved after ninety days, something is wrong regardless of how good the ontology looks.

### The version of this where you're wrong

Worth stating plainly, because someone in the room will think it even if they don't say it.

With a solid warehouse already in place, a disciplined semantic layer plus well-governed dbt models probably delivers most of this value, with staff you can actually hire, and without introducing a technology your team can't maintain when the one person who knows SPARQL leaves. That is not a strawman. It is the base rate.

What seems to survive that argument is narrower than the vendor pitch. A graph appears to earn its place when at least two of these hold:

- identity is genuinely contested across systems, and the merge logic needs to be auditable and reversible
- new entity *types* keep arriving, not just new columns
- explainability of a derived number is a regulated requirement rather than a nice-to-have
- a material share of the value is in relationships rather than aggregates

The paid-media case clears the first and arguably the fourth. Plenty of cases clear none.

My tentative conclusion, offered as one: a product manager who says that out loud about the cases that don't clear the bar will be believed on the ones that do. That credibility may be the more durable asset here, more than any particular piece of the architecture.

---

## References

Everything above traces to these. Where I've stated an opinion, it's flagged; where I've stated a fact, it should be checkable here.

**Standards (W3C)**
- [RDF 1.2 Concepts and Abstract Data Model](https://www.w3.org/TR/rdf12-concepts/). The triple data model. Candidate Recommendation as of April 2026; check the page for current status.
- [RDF Schema](https://www.w3.org/TR/rdf-schema/) and [OWL 2 Primer](https://www.w3.org/TR/owl2-primer/). How ontologies express class hierarchy and inference, including the `subClassOf` mechanism used above.
- [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/). The query language, including the property paths used in question 4.
- [SHACL](https://www.w3.org/TR/shacl/). Data validation.
- [R2RML: RDB to RDF Mapping Language](https://www.w3.org/TR/r2rml/). The mapping standard used by mapping engines.

**Evidence on LLM accuracy**
- Sequeda, Allemang & Jacob, [*Increasing the LLM Accuracy for Question Answering: Ontologies to the Rescue!*](https://arxiv.org/abs/2405.11706) (2024). Source of the 16.7% / 54.2% / 72.55% figures.
- Neo4j, [*Text2Cypher Guide*](https://medium.com/neo4j/text2cypher-guide-cc161518a509) (2026) and [graphrag.com's Text2Cypher reference](https://graphrag.com/reference/graphrag/text2cypher/). The property-graph equivalent, including failure modes.

**Snowflake Semantic Views**
- [Overview of semantic views](https://docs.snowflake.com/en/user-guide/views-semantic/overview) and [Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst). Snowflake documentation.
- [Snowflake's Native Semantic Views: AI-Powered BI for the Enterprise](https://www.snowflake.com/en/blog/engineering/native-semantic-views-ai-bi/). The engineering blog explaining the design intent.
- phData, [*Snowflake Semantic Views: Real-World Insights and Best Practices*](https://www.phdata.io/blog/snowflake-semantic-views-real-world-insights-best-practices-and-phdatas-approach/). A practitioner view, including current limitations.

**Interoperability**
- [Apache Ossie (incubating)](https://ossie.apache.org/). The vendor-neutral semantic interchange specification, formerly Open Semantic Interchange.

**Tools referenced**
- [Ontop](https://ontop-vkg.org/). Open-source OBDA mapping engine, useful for understanding what the standards give you for free.
- [Stardog](https://docs.stardog.com/), [Graphwise / GraphDB](https://graphwise.ai/), [AtScale](https://www.atscale.com/), [Neo4j](https://neo4j.com/). The commercial landscape.
- [Apache Jena](https://jena.apache.org/) and [Protégé](https://protege.stanford.edu/). Free tooling for a first hands-on attempt.

**Background reading**
- Allemang & Hendler, *Semantic Web for the Working Ontologist*, 3rd ed. Written for people who already model data.
- Hogan et al., [*Knowledge Graphs*](https://arxiv.org/abs/2003.02320) (2021). A free, vendor-neutral survey covering RDF and property graphs evenhandedly.
- [LDBC](https://ldbcouncil.org/). Vendor-neutral graph benchmarks, if you reach the evaluation stage.

*This is a learner's synthesis, not an expert's verdict. If something here is wrong, it's the kind of wrong that comes from reading rather than operating, and I'd want to know.*
