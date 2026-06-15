---
id: "2"
slug: "why-your-data-pipeline-is-broken"
title: "Why Your Data Pipeline Is Broken (And It's Not the Tooling)"
description: "Most pipeline incidents I've debugged trace back to a missing contract, not a missing feature."
publishedDate: "2025-11-03"
tags: ["Data Platforms", "Engineering"]
featured: true
---

<!-- TODO: expand -->

Every data pipeline I've inherited has had the same root problem: nobody agreed on what an event meant before it shipped.

Tooling gets blamed because it's visible — a dashboard goes blank, a job times out, a bill spikes. But the actual failure happened weeks earlier, when an engineer added a new property to an event without telling anyone downstream, or a marketer renamed a campaign parameter mid-flight.

At Joyn, rebuilding the event pipeline wasn't primarily a migration project. It was a governance project that happened to require migrating some infrastructure. The technical work — schema validation, contracts, monitoring — only mattered because it gave the governance teeth.

Three questions I now ask before any pipeline work starts:

1. Who is allowed to change this schema, and how do downstream consumers find out?
2. What happens automatically when an event doesn't match its contract — does it get dropped, quarantined, or does it silently pass through and corrupt a report three hops later?
3. If this pipeline doubled in volume overnight, who gets the bill, and do they know that?

If those three questions don't have confident answers, no amount of new tooling will make the pipeline reliable.
