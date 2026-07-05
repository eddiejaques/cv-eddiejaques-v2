---
id: "8"
slug: "two-tower-recommendations-part-2"
title: "Two Tower Recommendation Models: A Guide for Product Managers (Part 2)"
description: "The Two Tower model solves the scale and cold-start problems collaborative filtering can't. Part 2 demystifies the two towers, shows them working across streaming and e-commerce, and gives backend/data PMs a concrete playbook and KPI set to drive it."
publishedDate: "2026-07-05"
tags: ["AI", "Recommendations", "Product Management"]
featured: true
---

In our [last post](/blog/two-tower-recommendations-part-1), we looked at how collaborative filtering and content-based filtering work, alongside their major drawbacks: they don't scale well to millions of users, and they struggle when new items or users are introduced.

To solve this, modern platforms use the **Two Tower Recommendation Model**.

Don't let the name intimidate you. It sounds like something out of a fantasy novel, but the concept is incredibly elegant. Let's break down how it works, how it applies to different business models, and exactly how an entry-level backend or data PM can drive its success using product analytics.

## What Exactly Are the "Two Towers"?

Imagine you are running a giant matchmaking service. Instead of looking at a massive, messy spreadsheet of everyone who ever liked each other, you hire two separate specialist teams (the "Towers"):

- **The User Tower (The "Who"):** This tower focuses entirely on the user. It looks at everything we know about them — their past history, demographics, location, and even the time of day they are browsing.
- **The Item Tower (The "What"):** This tower focuses entirely on the product or content. It looks at everything we know about the item — its category, tags, price, brand, or video genre.

```
 [ User Data ] --->  |   USER TOWER    |
                     | (Deep Learning) | ---> [ User Vector ]  \
                                                                ==> ( Mathematical Match ) ==> Recommendations
 [ Item Data ] --->  |   ITEM TOWER    |                       /
                     | (Deep Learning) | ---> [ Item Vector ]
```

Both towers take these messy, real-world traits and compress them into a long string of numbers called an **embedding (or vector)**.

Think of an embedding as a highly specific map coordinate in a giant room. The User Tower calculates exactly where the *user* is standing in the room based on their current context. The Item Tower calculates exactly where every *item* belongs in that same room. If a user's coordinate is incredibly close to an item's coordinate, the system recommends that item.

### Why Is This a Game Changer for Scale?

The brilliant part of the Two Tower model is that the towers can do their heavy lifting **separately and in advance (offline)**. The Item Tower can calculate coordinates for all 5 million products in a catalog overnight. When a user opens the app, the system only has to calculate that single user's coordinate in real-time and find the nearest items. This completely solves the compute and latency problems of traditional matrices.

## Let's Look at This in Action Across Businesses

How do these two towers talk to each other across different business models?

### 1. The Streaming & Content Example

- **The User Tower** looks at a user profile: *watches at 9 PM on a weekend, prefers comedy, frequently abandons horror movies after 10 minutes.*
- **The Item Tower** looks at a new show: *Genre: Sitcom, Release Year: 2026, average watch time: 22 minutes.*
- **The Result:** The model mathematically pairs them up instantly because the user's weekend habit maps perfectly to the show's relaxed, short-form nature.

### 2. The E-Commerce Example

- **The User Tower** looks at a shopper: *browses via iOS app, usually purchases organic items, lives in a cold climate, buys items frequently on paydays.*
- **The Item Tower** looks at a product: *Category: Premium Wool Socks, Sub-tag: Sustainable/Organic, Inventory: High.*
- **The Result:** Even if this user has *never* bought socks on the platform before, the model recognizes that the shopper's profile attributes map beautifully to the product's attributes.

## The PM Playbook: How to Contribute (Even if You're Purely Backend)

If you aren't designing the user interface, your contribution to a Two Tower model is actually *more* critical. A machine learning model is only as good as the data feeding it, and you control the fuel. Here is how you use product analytics to drive these initiatives:

### 1. Run a Behavioral Segment Audit

Look at your product analytics to identify cohorts of users who look qualitatively similar in their behavior.

- **Action:** Group users who buy at the exact same frequency or watch content at the same time of day. Test if these highly similar segments are actually being offered the same relevant products as recommendations. If they aren't, you've just uncovered a major optimization gap.

### 2. Quantify the "Leaking Value" (Building the Case)

If your business vertical doesn't have a recommendation engine yet, you can build an airtight business case by showing exactly where value is being left on the table.

- **Action:** Pull the data for an unserved user segment and show: *"Why aren't we maximizing average order value (AOV) or watch-time within this specific cohort by cross-recommending products they are mathematically likely to want?"* Presenting the raw, unmapped potential of similar user behaviors is how you get engineering resources allocated to backend data initiatives.

### 3. Establish Quality Guardrail KPIs

A great backend PM ensures the team isn't just optimizing for a single, short-sighted metric. You need a balanced dashboard of KPIs to keep the model healthy:

- **Exploration vs. Exploitation Rate:** Are we only recommending things we *know* the user likes (exploitation), or are we sprinkling in new categories to discover new interests (exploration)?
- **Catalog Coverage:** What percentage of our total item catalog is actually being recommended across the platform? If the model only recommends the top 1% of popular items, your long-tail inventory is rotting.
- **Cold-Start Latency:** From a technical backend perspective, how quickly can your data pipelines generate an accurate embedding for a brand-new user or a newly onboarded product?

By understanding how the towers separate the "user" from the "item," and by fiercely tracking how well your data serves similar user segments, you can ensure your engineering teams are capturing and structuring the exact data points needed to make the entire business smarter.
