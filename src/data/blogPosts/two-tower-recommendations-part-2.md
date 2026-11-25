---
id: "8"
slug: "two-tower-recommendations-part-2"
title: "Two-Tower Recommendation Models: A Guide for Product Managers (Part 2)"
description: "How the Two-Tower architecture solves cold-start and latency limits by splitting user context and catalog metadata into separate embedding pipelines, plus the KPIs data PMs should track."
publishedDate: "2026-07-04"
tags: ["AI", "Recommendations", "Product Management"]
featured: true
---

In [Part 1](/blog/two-tower-recommendations-part-1), we looked at why classic collaborative filtering and content-based filtering struggle on their own: raw interaction matrices become too sparse and expensive at multi-million-user scale, and pure collaborative models cannot handle cold-start items.

Modern streaming and e-commerce platforms solve both problems with a **Two-Tower Recommendation Model**.

Despite the name, the architecture is straightforward. Below is how the two towers work, how they handle streaming and retail catalogs, and what a data or backend PM needs to feed and measure them.

## How the Two Towers work

Instead of cramming every user and every item into one giant interaction grid, the model splits the problem into two separate neural networks (the "towers") that learn a shared coordinate space:

- **The User Tower (who and in what context):** Ingests everything you know about the user right now, including past watch or purchase history, device type, location, subscription tier, and time of day.
- **The Item Tower (what is in the catalog):** Ingests everything you know about the item, including category, genre, price, brand, duration, tags, and historical popularity.

```
 [ User Data ] --->  |   USER TOWER    |
                     | (Deep Learning) | ---> [ User Vector ]  \
                                                                ==> ( Nearest-Neighbor Match ) ==> Recommendations
 [ Item Data ] --->  |   ITEM TOWER    |                       /
                     | (Deep Learning) | ---> [ Item Vector ]
```

Each tower compresses its messy mix of features into a fixed-length list of numbers called an **embedding (or vector)**.

You can think of that vector Space as a map. The User Tower places the user at a specific coordinate based on their history and current session context. The Item Tower places every show or product in the catalog on that same map. At request time, the system simply looks up the items sitting closest to the user's current coordinate.

### Why this architecture scales in production

The big operational advantage of the Two-Tower setup is that the two sides **don't have to run at the same time**.

Because catalog attributes change relatively slowly, the Item Tower can compute embeddings for millions of products offline in batch jobs and index them in a vector database. When a user opens the app, the system only runs the User Tower once for that single user and performs a fast nearest-neighbor lookup against the precomputed item vectors. That keeps serving latency down in the tens of milliseconds even across huge catalogs.

## Examples across two business models

### 1. Video streaming

- **User Tower inputs:** Watching at 9 PM on a Saturday, high completion rate on sitcoms, consistently drops horror titles within 10 minutes.
- **Item Tower inputs:** Newly added comedy series, release year 2026, average episode length 22 minutes.
- **Match:** Even if the show just launched and has minimal view history, its item vector lands right next to the user's Saturday-evening vector.

### 2. E-commerce

- **User Tower inputs:** Browsing on iOS, frequently buys sustainable and organic products, shipping address in a cold climate, shops most often around payday.
- **Item Tower inputs:** Merino wool socks, tagged *Sustainable / Organic*, healthy stock depth.
- **Match:** Even if the shopper has never browsed the hosiery category before, their preference and context vector aligns with the product's attributes.

## What data and backend PMs own in a Two-Tower setup

A recommendation model is only as good as the features and event streams feeding the two towers. If you own the data platform, tracking taxonomy, or catalog pipelines, your work directly determines how well the model performs.

### 1. Audit feature coverage across user cohorts

Check whether your tracking pipeline actually captures the context signals the User Tower needs.

- **Action:** Compare users who buy or watch on identical schedules or devices. If two cohorts behave similarly in Mixpanel or Snowflake but receive generic recommendations, inspect whether key session signals (device type, time-of-day, or recent searches) are missing or delayed in the feature store.

### 2. Build the business case with cohort gaps

If a surface in your product still relies on manual curation or static top-10 lists, you can size the opportunity using existing analytics before writing any ML code.

- **Action:** Pull conversion or watch-time rates for a well-defined user segment and show the gap between users who find relevant secondary items on their own versus those who bounce. Tying a pipeline upgrade to incremental AOV or retention is the cleanest way to secure engineering headcount.

### 3. Track guardrail KPIs, not just click-through rate

Optimizing solely for immediate clicks will push the model to recommend the same five blockbusters to everyone. Keep three health metrics on your dashboard:

- **Exploration vs. exploitation share:** What share of impressions goes to safe, familiar preferences versus adjacent genres or categories that help the system learn new interests?
- **Catalog coverage:** What percentage of your active catalog gets recommended at least once a week? If 95% of impressions go to 1% of your titles or SKUs, the long tail of your catalog is going to waste.
- **Cold-start freshness:** How long does it take from the moment a new user signs up—or a new item lands in the CMS—until the pipeline generates a live vector for it?

In [Part 3](/blog/two-tower-recommendations-part-3), we cover the three practical ways you can deploy these user and item vectors once the pipeline is running.
