---
id: "5"
slug: "evaluating-data-agents-part-2"
title: "Evaluating Data Agents, Part 2: A Metrics Framework"
description: "Five dimensions for measuring a data agent before it goes to production — accuracy, robustness, trajectory, safety, and the LLM-as-judge layer that ties them together."
publishedDate: "2026-06-16"
tags: ["AI", "Data Platforms", "Evaluation"]
featured: false
---

> This post continues from [Evaluating Data Agents, Part 1](https://www.linkedin.com/pulse/evaluating-data-agents-part-1-gaurav-kumar-dani-5fgwf). If you haven't read that one, it's worth starting there.

## Why metrics matter

You're probably already in a situation where you need to evaluate an agent or a fine-tuned LLM.

Just last week I was in a meeting where someone said, "This agent seems to be answering correctly 99% of the time." I asked how they arrived at that number. The answer was, "That's what I've observed."

For small or low-risk use cases, that kind of human judgment might be fine. But once the system becomes business-critical or starts handling large volumes of data, observation isn't enough. You need an empirical way to measure performance.

Metrics do a few things for you. They let you express confidence in the agent's output and build trust over time that it responds within acceptable error bounds. They surface the blind spots — especially gaps in the Semantic Layer for data agents. And they give you a path from proof of concept to something mature enough for production.

What follows is the framework I use: five dimensions, each with a metric you can actually compute.

## 1. Accuracy

Accuracy is the easiest metric to understand and usually the first one people reach for. The question is simple: is my agent accurate, and does it deliver value? In most cases, value is tied directly to correctness.

To measure it, you run the agent against a set of test queries with known answers, compare its output to the expected results, and calculate the error rate. Subtract that from one and you have the task completion rate.

```
Accuracy = (Total correct answers) / (Total answers)
```

For a data agent that generates SQL, accuracy is the percentage of queries that return correct results when executed. This is essentially the QA and regression work many of us have done for years — the task completion rate feels very similar. Time saved in man-hours at a high completion rate is a solid rationale for moving an agent toward production. For data agents, answers are often deterministic early on, which makes this clean to measure.

For large-scale LLM systems serving hundreds of thousands of users — where responses are stochastic — it can make sense to think in Voice-of-Customer terms like NPS. Plenty of LLM products already ship a simple "Did you like the answer?" prompt to gauge value. Personally, I'd want to review conversations to see whether the user got the right answer on the first attempt or had to prompt several times.

## 2. Robustness

This is where things start to feel overwhelming, so I'll keep it simple. Robustness runs the same accuracy checks, but asks the questions differently.

If the expected answers are deterministic — funnel completion rates, growth rates, trend metrics — you're in good shape and can reuse the same accuracy numbers. Robustness exposes gaps in the Semantic Layer when questions are asked in a natural, messy, "urban-dictionary" way instead of strict literal language:

- "What was the sAI rate last month?"
- "How many ad impressions did we sell last month?"
- "How many video views happened last month where at least one ad was played?"

Sometimes the question changes shape entirely and the expected output becomes stochastic — for example: "What do you think the growth rate will be on a unique-user table if everything else stays constant? Walk me through your analysis and why you arrived at that conclusion." There's no single correct number here; the output is an analysis, which needs a slightly more involved measurement.

**Cosine similarity** is the common tool for semantic correctness. It measures how aligned two vectors are, which makes it useful for comparing text embeddings, preferences, or recommendation signals. It ranges from −1 to 1, and higher scores indicate stronger alignment.

It's also possible the model simply hallucinates — generating SQL with columns that don't exist. Tracking those cases as a custom metric is extremely useful for improving model quality.

## 3. Trajectory

I don't want my data agent getting lost in loops or taking unnecessary steps. One practical way to gauge that is the cost of computation end to end — how long it takes from the moment a user asks a question to the moment results come back.

At scale, the metric worth tracking is **Latency P95**: 95% of queries finish within a given time threshold. Establish a baseline. As a rule of thumb, agent cost shouldn't exceed the 80th percentile of overall cost per query — the 50th if you want to be stricter.

## 4. Safety

Safety came up as an important dimension in Part 1. Metric-wise, it ends up looking a lot like task completion rate.

As an evaluator, I deliberately write queries designed to push the agent past the safety boundaries set in its prompt. The more often safety is breached, the more work is needed to plug the gaps.

The metric here is the **Safety Intercept Rate**: the percentage of unsafe queries correctly blocked before execution. Ideally the agent is strongly typed so problems are caught upfront — in the best case, stopped during the initial reasoning phase, before it executes anything.

## Closing thought: AI evaluating AI

Doing all of this by hand would take a very long time. That's why it helps to build an evaluation ecosystem where agents are tested and scored automatically.

This is where LLM-based evaluation earns its place. Using an LLM as a judge can simulate human evaluation behavior, especially when you want to generate large volumes of synthetic queries for testing. In other words, you end up using AI to evaluate AI — and at scale, that may be the only practical way to do it.
