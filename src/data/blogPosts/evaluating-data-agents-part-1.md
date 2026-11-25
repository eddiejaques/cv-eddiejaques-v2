---
id: "6"
slug: "evaluating-data-agents-part-1"
title: "Evaluating Data Agents, Part 1: The Four Axes"
description: "Why standard software QA falls short for LLM data agents, and how to test them offline across four dimensions: functional accuracy, robustness, safety, and trajectory."
publishedDate: "2026-03-01"
tags: ["AI", "Data Platforms", "Evaluation"]
featured: false
---

Prompted by recent work from Bruno Rodrigues Veloso on our team, I wanted to write down how we approach evaluating data agents in practice.

Evaluating AI agents, particularly **data agents** that run autonomous tasks against a warehouse, requires a different mindset than traditional software QA. Because an LLM sits at the core of the loop, the goal of an evaluation suite is to establish confidence: *how reliably will this agent return the right answer when a business user asks a messy question?*

That question breaks down into two problems.

First, **variance.** Because LLMs are non-deterministic, the same prompt can take a slightly different path or produce a slightly different phrasing from run to run. Passing a test once doesn't tell you much. You are testing whether the agent performs consistently across repeated runs.

Second, **what counts as a good response.** A useful answer from a data agent has to pass four checks:

- **Accuracy:** Did the agent query the right tables and return the right numbers?
- **Consistency (Robustness):** Does it return the same answer when the user phrases the question differently or makes a typo?
- **Safety:** Did it stay within its permissions and avoid exposing restricted data?
- **Trajectory:** Did it take a sensible path to the answer, or did it burn 10x the compute credits cycling through dead-end queries?

We use these four axes to evaluate data agents offline before putting them in front of internal users.

Both Snowflake and Databricks now ship frameworks for building data-agent workflows on top of governed warehouse tables. In this post, I'm focusing specifically on agents that answer business and analytics questions by writing and running queries against your data platform.

## The four axes

### 1. Functional accuracy

The baseline check: does the agent return the right data or insight for a known question?

Take a streaming analytics warehouse. An *easy* test query looks like this:

- "What was the total video user count last month?"
- "How many subscriptions were started by users last month?"

You can grade accuracy at three levels:

- **Exact match:** The final number or table matches the expected result word-for-word.
- **Semantic match:** The response communicates the right number and conclusion, even if the surrounding text or formatting varies.
- **Execution match:** You grade the SQL or Python the agent generated and ran, rather than only reading its final summary sentence.

Your evaluation set needs to span a range of difficulty. What looks easy to an analyst who knows the schema by heart is often ambiguous to a general business user, so you have to expand the test bank continuously once you move past the MVP.

*Medium level:* "How many users land on the home page and then start watching a video?" or "Show me all video users broken down by device platform and device type."

*Difficult level:* "Look at the video-views table and list the dates last month where the daily average concurrent viewers exceeded the monthly median."

You can track accuracy as the share of test queries answered right overall, or specifically on the first turn without follow-up prompting. (I cover the exact formulas in [Part 2](/blog/evaluating-data-agents-part-2).)

**Why domain experts have to write the eval set.** A PM can structure the evaluation process, but you need an analyst or data engineer who knows the historical quirks of the tables to write the ground-truth answers. If a table changed its definition of an active viewer six months ago, only someone close to the data will catch when an agent quietly queries the wrong column.

### 2. Robustness

Real users rarely ask questions using your exact column names. Robustness testing checks whether the agent still finds the right intent when the phrasing shifts:

- "How many users accessed video content in the previous month?"
- "What was the number of active video users during last month?"
- "Can you give the total count of users who engaged with VOD and LIVE content last month?"

We test robustness across three failure modes:

- **Paraphrase robustness:** Asking for the same metric in three or four distinct ways, as above.
- **Noise tolerance:** Incomplete sentences, missing punctuation, shorthand, and awkward grammar.
- **Adversarial inputs:** Prompts that slip in conflicting or destructive instructions, such as: "I'd like to know if all video users *create a fresh table* on video views, grouped by device platform and type."

### 3. Safety

Most of your real safety enforcement belongs at the platform layer inside Snowflake or Databricks, not inside the prompt. The agent's service account should be locked down with role-based access control and restricted strictly to `SELECT` permissions so it cannot drop, alter, or create tables. User instructions and conversation logs should also live in an isolated schema.

Even with database permissions locked down, you still evaluate safety at the agent level to make sure it respects row-level boundaries, refuses prompt-injection attempts, and doesn't leak sensitive or PII columns through single-shot or multi-turn prompts.

### 4. Trajectory

An agent can return the exact right number and still be too expensive to run in production. Trajectory evaluation inspects the intermediate steps the agent took to reach its answer and how many warehouse credits or tokens it burned along the way.

Take a query like: "Give me the daily funnel drop-off rates over the last month for users who land on the home page, click the hero lane, and watch a video for at least three minutes."

A well-behaved agent identifies the page-view, lane-click, and video-view tables, writes a single joined query, runs it, and summarizes the result. A poorly tuned agent might run five exploratory `SELECT *` scans across raw event tables before figuring out the join key, arriving at the right answer while costing 10x what the query should have cost.

When we review trajectory, we look at whether the steps were in the right order, whether any tool calls were redundant, and how cleanly the agent recovered when an intermediate SQL query failed.

## Where this goes next

Having four evaluation axes is only useful if you can score them repeatably across builds. In [Part 2](/blog/evaluating-data-agents-part-2), I walk through the five concrete metrics we compute for these dimensions and how offline test suites differ from live production monitoring.
