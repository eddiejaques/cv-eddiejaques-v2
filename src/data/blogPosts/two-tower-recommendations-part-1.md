---
id: "7"
slug: "two-tower-recommendations-part-1"
title: "Two-Tower Recommendation Models: A Guide for Product Managers (Part 1)"
description: "A plain-English breakdown of collaborative and content-based filtering, why classic user-item matrices hit a wall at scale, and where data and backend PMs can spot recommendation opportunities."
publishedDate: "2026-07-03"
tags: ["AI", "Recommendations", "Product Management"]
featured: true
---

As a product manager, you don't need to write PyTorch training loops, but you do need a clear mental model of how recommendation systems work under the hood. Even if you manage backend data pipelines, checkout flows, or core platform services rather than a homepage discovery squad, understanding how recommenders consume signals lets you spot high-value product gaps.

Before getting into the **Two-Tower** architecture in Part 2, let's walk through the fundamentals from first principles: collaborative filtering, why it hits a scaling wall, and content-based filtering.

## 1. Collaborative filtering in plain terms

Imagine you run a small store. Instead of trying to analyze every attribute of every product on the shelf, you watch what customers buy together. When two customers share similar buying histories, you recommend the items one bought to the other.

In code, this starts as a user-item interaction grid (a matrix) where rows represent items, columns represent users, and cells record whether an interaction happened (`1` for watched, liked, or bought; blank for no history).

### Streaming example

Suppose Gaurav, Sarah, and Vini share a household account:

| Movie | Gaurav | Sarah | Vini |
| --- | --- | --- | --- |
| Kuch Kuch Hota Hai | 1 | 1 | 1 |
| K3G | | 1 | 1 |
| Baadshah | 1 | 1 | |

- **Observation 1:** Sarah and Vini both watched *Kuch Kuch Hota Hai* and *K3G*. Since Gaurav also watched *Kuch Kuch Hota Hai*, *K3G* is a strong next candidate for him.
- **Observation 2:** Vini hasn't watched *Baadshah* yet, but two people with overlapping watch histories (Gaurav and Sarah) both liked it.

### E-commerce example

The exact same matrix applies to an online grocery checkout flow:

| Product | Gaurav | Sarah | Vini |
| --- | --- | --- | --- |
| Espresso Pods | 1 | | |
| Oat Milk | | 1 | 1 |
| Croissants | 1 | 1 | |

- **Observation 1:** Sarah and Vini both buy oat milk. Because Sarah also buys croissants, showing croissants to Vini on the cart page is a high-probability cross-sell.
- **Observation 2:** Gaurav and Sarah both buy croissants. Since Gaurav also buys espresso pods, espresso pods are a sensible candidate for Sarah's weekly restock email.

### How the model scores similarity

To measure how close two users or two items are in that grid, systems compute **cosine similarity**, which treats each user's row of 1s and 0s as a vector and measures the angle between them. A small angle means two users behave very similarly.

## 2. Why classic collaborative filtering hits a wall at scale

A raw user-item matrix is easy to reason about on a whiteboard, but it runs into two hard problems in production:

- **Sparsity:** Most of the grid is empty. A shopper might buy 5 items out of a catalog of 5 million. Comparing billions of mostly empty cells in real time wastes compute and produces noisy matches.
- **Matrix size:** On a streaming platform with 15 million monthly active users and 4,000 shows, the interaction matrix has 60 billion cells. Engineers use **matrix factorization** to compress that giant table into smaller lower-dimensional factors, but recomputing it continuously as users click around in real time is still slow and rigid.

## 3. Where a data or backend PM adds value here

Even if you don't own the recommendation UI, you likely own the events, attributes, or surfaces where recommendations could run:

- **Audit similar user cohorts:** Look at your product analytics for user segments that behave similarly (for example, users on the same subscription tier, payment method, or purchase cadence) and check whether they actually see tailored cross-sells or default bestsellers.
- **Size the uncaptured revenue or engagement:** If your checkout flow, onboarding screen, or email digest still serves static lists, pull the historical overlap data to show how much incremental order value or watch time is sitting untouched in those cohorts.

## 4. Content-based filtering (the cold-start problem)

What happens the day a new show or product lands in the catalog? Because nobody has watched or bought it yet, its row in the interaction matrix is completely blank, and pure collaborative filtering cannot recommend it to anyone.

**Content-based filtering** fills that gap by matching item metadata rather than user overlap. If a user frequently watches action thrillers, the system can recommend a newly added movie tagged *Action / Thriller* on day one. If a grocery shopper consistently buys organic snacks, a new snack tagged *Organic* gets matched immediately.

In [Part 2](/blog/two-tower-recommendations-part-2), we look at how the **Two-Tower Recommendation Model** combines collaborative interaction signals and content metadata into a single architecture that scales to millions of users in milliseconds.
