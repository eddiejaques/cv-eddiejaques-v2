---
id: "7"
slug: "two-tower-recommendations-part-1"
title: "Two Tower Recommendation Models: A Guide for Product Managers (Part 1)"
description: "You don't need to write the ML code, but you absolutely need its mental framework. Part 1 breaks down collaborative filtering, its scaling limits, and where any PM — not just a Discovery PM — can find recommendation gaps."
publishedDate: "2026-07-05"
tags: ["AI", "Recommendations", "Product Management"]
featured: true
---

As a Product Manager, you don't need to know how to write the code for a machine learning model, but you absolutely need to understand its mental framework. If you handle backend data platforms, core checkout pipelines, or traditional business features, you might think recommendation systems are purely the domain of a specialized "Discovery PM."

They aren't. Every PM, regardless of their domain, can identify recommendation gaps and unlock massive user value.

Before we look at the advanced "Two Tower" approach, let's use the Feynman technique to break the foundational concepts down into plain, simple terms.

## Part 1: What is Collaborative Filtering?

Imagine you run a shop. Instead of guessing what a customer wants based on the item itself, you look at how different people interact with different items. You find people who behave similarly, and swap their preferences.

Mathematically, we map this out using a simple grid (a matrix) where rows are items, columns are users, and the cells show interactions. Let's normalize interactions simply as `1` (liked / watched / bought) and blank (no interaction).

### The "Family" Example (Streaming)

Let's assume Gaurav, Sarah, and Vini are part of one family.

| Movie | Gaurav | Sarah | Vini |
| --- | --- | --- | --- |
| Kuch Kuch Hota Hai | 1 | 1 | 1 |
| K3G | | 1 | 1 |
| Baadshah | 1 | 1 | |

**Insight 1:** If Sarah and Vini both like K3G, and Gaurav belongs to the same family, Gaurav might also like K3G.

**Insight 2:** Vini might like Baadshah because Sarah and Gaurav — who already share tastes with Vini on other things — have both liked it.

### The "Shopping Cart" Example (E-Commerce)

Let's apply the exact same logic to an e-commerce backend platform handling grocery sales:

| Product | Gaurav | Sarah | Vini |
| --- | --- | --- | --- |
| Espresso Pods | 1 | | |
| Oat Milk | | 1 | 1 |
| Croissants | 1 | 1 | |

**Insight 1:** Sarah and Vini both buy Oat Milk. Since Sarah also buys Croissants, Vini is highly likely to buy Croissants too if prompted at checkout.

**Insight 2:** Gaurav and Sarah share a love for Croissants. Gaurav buys Espresso Pods, so maybe Sarah wants Espresso Pods recommended in her weekly email digest.

### How does the computer know they are similar?

It uses a concept called **Cosine Similarity**. Think of it as a mathematical compass that measures the "angle" between two users' behaviors. If the angle is tiny, their tastes are closely aligned.

## Part 2: The Core Drawbacks of This Approach

While collaborative filtering is intuitive, it breaks down quickly in the real world due to scale:

- **The Sparsity Problem:** At scale, most cells are completely empty. Gaurav might buy 5 things out of a store containing 5 million items. Computing recommendations in real-time across billions of empty cells takes massive compute effort.
- **The Size Problem:** Matrices become giant monstrosities. Imagine a streaming service with 15 million MAUs and 4,000 titles. To solve these large matrix problems efficiently without crashing the servers, engineers use a mathematical shortcut called **Matrix Factorization** — breaking one giant matrix into smaller, bite-sized ones.

## Part 3: What Can an Entry-Level PM Actually Do Here?

If you are a backend data PM, an infrastructure PM, or a non-discovery PM, here is how you can directly contribute to these initiatives:

- **Audit for Patterns:** Look at user segments that your product analytics show are qualitatively similar (e.g. users on the same payment methods, or users with similar checkout frequencies). Check if they are actually being offered the same relevant products as recommendations.
- **Build the Business Case:** If your specific business sphere lacks recommendations entirely, you can spot the gaps. Show the data: *"Why aren't we maximizing value within this highly similar user segment by cross-recommending these exact products?"*

## Part 4: Content-Based Filtering (The Next Step)

What happens when a brand-new item is added to the catalog, and nobody has interacted with it yet? Collaborative filtering fails because there are no 1s to compare.

To solve this, we use **Content-Based Filtering**, where we recommend items based on the attributes of the item itself — matching a user who likes "Action movies" with a new movie tagged "Action", or matching a shopper who buys "Organic" with a new "Organic" snack.

In our next post, we'll explore how combining both Collaborative and Content filtering gives birth to the powerful **Two Tower Recommendation Model** — and how you can design the data pipelines to fuel it.
