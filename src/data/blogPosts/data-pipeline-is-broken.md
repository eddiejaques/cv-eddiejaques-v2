---
id: "2"
slug: "why-your-data-pipeline-is-broken"
title: "Why Your Data Pipeline Is Broken (Hint: It's Not the Tooling)"
description: "Most broken dashboards and billing spikes start weeks earlier when someone changes an event payload without telling downstream teams."
publishedDate: "2025-11-03"
tags: ["Data Platforms", "Engineering"]
featured: true
---

Almost every broken data pipeline I've walked into had the same underlying problem: nobody agreed on what an event meant before it went to production.

Teams usually blame the tooling because the tool is where the pain shows up. A Mixpanel dashboard flatlines, a dbt job fails at 3 a.m., or a monthly CDP invoice comes in $30,000 over budget. When you trace the incident back, though, the failure almost always started weeks earlier when an app team renamed a property during a refactor or a marketer changed a campaign parameter without telling analytics.

When we rebuilt the event pipeline at Joyn, people outside the team called it a CDP migration. Internally, it was a governance project supported by a few pieces of software. Moving compute to Cloud Run and routing events through Segment helped, but what actually stopped the outages was compiling the event spec into our client tracking library so a malformed payload failed the build before it ever reached production.

Before kicking off any data pipeline project now, I ask three questions:

1. **Who can change an event schema, and what breaks at build time if they get it wrong?** If the answer is "anyone can push any JSON payload and we catch it in dbt," you don't have a contract yet.
2. **What happens to invalid events automatically?** Do they fail the build, get routed to a dead-letter queue, or pass straight into the warehouse and quietly corrupt a revenue report two hops later?
3. **If event volume doubles overnight after an app release, who sees the alert and who pays the overage bill?**

Until a team has straight answers to those three questions, swapping out one data stack for another just moves the mess to a new invoice.
