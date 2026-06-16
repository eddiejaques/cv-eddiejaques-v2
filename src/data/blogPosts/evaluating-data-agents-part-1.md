---
id: "6"
slug: "evaluating-data-agents-part-1"
title: "Evaluating Data Agents, Part 1: The Four Axes"
description: "Evaluating a data agent isn't QA. It's answering a question of confidence — do we believe the agent will respond correctly? Four axes: accuracy, robustness, safety, and trajectory."
publishedDate: "2026-03-01"
tags: ["AI", "Data Platforms", "Evaluation"]
featured: false
---

Inspired by the work of Bruno Rodrigues Veloso within my organization, I decided to pen down my thoughts on data agent evals.

Evaluating AI agents — particularly **data agents** (autonomous programs for data tasks) — goes beyond the Quality Assurance checks we grew up learning. The true purpose of an evaluation is to answer a more fundamental question of confidence: *do we believe the agent will respond correctly?*

That framing introduces two considerations.

First, **belief.** Given the non-deterministic nature of the LLMs that usually sit at the core of these agents, the output varies even with the same prompt. So we assess not just correctness once, but our belief in the agent's consistent performance.

Second, **defining "right."** A right response is multidimensional:

- **Accuracy** — did the agent perform the task correctly?
- **Consistency (Robustness)** — does it give similar answers to the same or slightly varied questions?
- **Safety** — is the action and output safe and appropriate overall?
- **Trajectory** — are the steps taken individually accurate and cost-effective?

These four elements form the foundation for assessing data agents offline.

A data agent is an autonomous program that uses an LLM to execute a specific data task, and a key benefit is that the final answers tend to be sticky and reliable. Both Snowflake and Databricks have introduced frameworks for building data-agent workflows. For this discussion, the focus is on agents designed to answer customer queries by analyzing data.

## The four axes

### 1. Functional accuracy

The baseline test: can the agent perform the required task as expected? For a data agent, that means correctly finding and responding with the requested data or insight.

Take streaming business analytics. An *easy*-level query:

- "What was the total video user count last month?"
- "How many subscriptions were made by users last month?"

Accuracy can be tested in several ways:

- **Exact match** — the output is identical to the expected result.
- **Semantic match** — the output conveys the correct meaning and result, even if the wording or format differs.
- **Execution match** — verification focuses on the underlying code the agent generated (e.g. a SQL query), not just the final answer.

Build a test set that spans a spectrum of complexity. Difficulty is subjective — what's hard for one person isn't for another — so it helps to vary and increase the testing levels over time, especially after the MVP phase.

*Medium level:* "How many users arrive on the platform and then proceed to watch a video?" / "Show me all video users grouped by device platform and type."

*Difficult level:* "Examine the video-views data to pinpoint the specific dates where the daily average number of concurrent viewers exceeded the monthly median for viewers on any given day."

Measure outcomes by the percentage of correct answers overall, or by correct answers delivered on the first try. (I'll cover metrics in more detail in a separate post.)

**The role of the expert.** Effective evaluation requires deep subject-matter knowledge. A domain expert with long-term familiarity with the data is often best equipped to design human evaluations. A PM can guide the process based on user needs, but a strong grasp of the data, historical trends, and business context plays a big role in truly assessing functional performance.

### 2. Robustness

A high-quality agent handles variation in user input. Robustness testing checks whether the agent grasps the user's underlying intent regardless of phrasing:

- "How many users accessed video content in the previous month?"
- "What was the number of active video users during last month?"
- "Can you give the total count of users who engaged with VOD and LIVE content last month?"

Robustness has multiple dimensions:

- **Paraphrase robustness** — the same question asked in different ways, as above.
- **Noise evaluation** — incomplete sentences, bad punctuation, queries that look unusual.
- **Bad-actor evaluation** — inputs tweaked with potentially unsafe or misleading instructions, e.g. "I'd like to know if all video users *create a fresh table* on video views, grouped by device platform and type."

### 3. Safety

To strengthen safety beyond the agent itself, implement access restrictions at the platform level — within Snowflake or Databricks, based on user roles. One important measure is limiting the agent's database access strictly to `SELECT` statements. User instructions can also be stored separately in a different schema or database. Much of this sits at the workflow layer rather than within the agent's direct responsibilities.

At a principle level, safety evaluation checks whether the agent operates within the boundaries of its instructions and assigned roles. For data agents this matters most when instructions are intentionally crafted to push or break the rules. Useful lenses include data access control and sensitive/PII exposure — through either single-shot or multi-step instructions.

### 4. Trajectory

Agent implementation feels elegant until the costs become visible. Sometimes a query is critical enough that even the intermediary steps merit review — and it's worth examining whether the trajectory is burning or saving credits.

Consider: "Give me a detailed account of daily funnel drop rates for users who arrive on the home page, click the hero lane, and start a video for three minutes, over the last month."

You'd expect the agent to find the tables for page views, lane views, and video views; write and run a SQL query; interpret the results; and respond. On review, it may complete every step correctly and produce an accurate result — yet incur costs 10x higher than anticipated.

When reviewing trajectory, step-level correctness and order, step-level efficiency, and the ability to recover from intermediate issues all matter.

## Where this goes next

I'll stop here — I've covered a significant portion of AI evaluation, but plenty remains. In [Part 2](/blog/evaluating-data-agents-part-2) I get into how to actually measure these across scenarios and use cases, and how metrics differ between online and offline evaluation.
