---
id: "5"
slug: "evaluating-data-agents-part-2"
title: "Evaluating Data Agents, Part 2: A Metrics Framework"
description: "How to put concrete numbers on a data agent before shipping to production: task accuracy, semantic robustness, P95 latency, safety intercept rate, and automated LLM-as-judge scoring."
publishedDate: "2026-06-16"
tags: ["AI", "Data Platforms", "Evaluation"]
featured: false
---

> This post picks up from [Evaluating Data Agents, Part 1](/blog/evaluating-data-agents-part-1) (also published on [LinkedIn](https://www.linkedin.com/pulse/evaluating-data-agents-part-1-gaurav-kumar-dani-5fgwf)). Start there if you want the background on the four evaluation axes.

## Why you need numbers before going live

Last week I sat in a review where someone remarked, "This agent is answering accurately about 99% of the time." When I asked how they measured that, the answer was, "That's what I've seen from trying it out."

Spot-checking ten prompts by hand is fine when you are hacking together a prototype. Once executives or operational teams rely on an agent to pull numbers from your warehouse, gut feel won't hold up. You need an empirical baseline you can run on every prompt, schema, or model change.

A proper metrics suite does three jobs:
1. It tells you how often the agent actually gets the numbers right within an acceptable error bound.
2. It exposes gaps in your semantic layer where business jargon fails to map to your physical tables.
3. It gives you a clear pass/fail bar for moving an agent from a sandbox demo into production.

Here are the four core metrics I track, plus the automated judging layer that makes running them practical.

## 1. Accuracy

Accuracy is the first number everyone asks for: when a user asks a question with a known answer, how often does the agent return the right result?

To measure it, you assemble a golden test set of questions paired with verified answers (and verified SQL), run the agent across the batch, and compute the pass rate:

```
Accuracy = (Total correct answers) / (Total answers)
```

For a SQL-generating data agent, an answer counts as accurate when the generated query executes cleanly and returns the expected result set. This looks very similar to classic regression testing. If an agent hits a high first-try completion rate and saves analysts hours of routine data pulling, the business case is straightforward.

When you move from deterministic SQL lookups to open-ended analytical summaries for thousands of users, binary pass/fail gets harder to grade offline. In production, many teams add a lightweight thumbs-up/thumbs-down prompt to track user satisfaction alongside offline accuracy. Even then, I still inspect conversation logs to see whether users got their answer on the first prompt or had to rephrase three times to get a usable query.

## 2. Robustness

Robustness runs the exact same accuracy test, except you rewrite the questions the way colleagues actually talk in Slack.

When the target answer is a single number (funnel conversion, month-over-month growth, active users), you can score robustness with the same pass-rate formula as accuracy. What you are really testing here is your semantic layer. If users ask questions using internal shorthand or loose phrasing instead of strict table definitions, does the agent still map the terms properly?

For example:
- "What was the sAI rate last month?"
- "How many ad impressions did we sell last month?"
- "How many video views happened last month where at least one ad played?"

When the question asks for an open-ended explanation rather than a single number—say, *"What happens to our unique-user growth rate if retention holds flat next quarter? Walk me through your assumptions"*—there is no single scalar value to compare.

For text-heavy outputs, **cosine similarity** between the embedding of the agent's response and a reference answer is a standard automated check. Scores range from -1 to 1, where higher values mean the response stayed semantically close to the reference analysis.

Alongside similarity, I track a separate counter for **schema hallucinations**: how often the agent invents column or table names that don't exist in the warehouse catalog. Watching that error rate drop is one of the fastest ways to tell if improvements to your semantic layer descriptions are working.

## 3. Trajectory

An agent that loops through four broken queries and takes 90 seconds to answer a simple question will frustrate users and run up your warehouse bill.

In production, the cleanest proxy for trajectory health is end-to-end **P95 Latency** (the time threshold within which 95% of user questions finish) paired with **compute cost per query**. As a practical guardrail, an agent's per-query warehouse cost should stay below the 80th percentile of your normal BI dashboard queries, or the 50th percentile if you run a tight FinOps budget.

## 4. Safety

In Part 1, I noted that database permissions should do the heavy lifting on safety. At the evaluation layer, you still want to measure how reliably the agent catches and refuses unsafe requests before touching the warehouse.

To test this, we maintain a bank of red-team prompts designed to trick the agent into bypassing its instructions, querying restricted schemas, or dumping user-level PII.

The metric to track is the **Safety Intercept Rate**: the percentage of unsafe test queries blocked before execution. In a well-structured agent, the guardrail or reasoning step catches and rejects the request before any SQL is sent to the database.

## Automating the loop with an LLM judge

Grading a few hundred test runs by hand works once, and then nobody on the team wants to do it again next sprint.

To make evaluation part of CI, you need an automated harness that generates synthetic variations of your core business questions, runs the agent against them, and uses a separate evaluator LLM (with strict grading rubrics and reference SQL) to score the results. Using an LLM to grade another LLM has its own failure modes, so you still have to audit a sample of the judge's scores by hand, but it is the only practical way to run hundreds of regression checks on every pull request.
