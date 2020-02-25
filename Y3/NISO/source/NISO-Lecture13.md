# Lecture 13: Multi-Objective Optimisation

Often we encounter problems that have multiple objectives which we would like to maximise/ minimise. For example, buying a car, we may have many things that we are looking to maximise whilst also minimising the price such as number of seats or comfort.

## How do we determine which solutions are optimal?

### Domination

$ x^{(1)} $ dominates $ x^{(2)} $ if it satisfies both:

1. $ x^{(1)} $ is no worse than $ x^{(2)} $ in all objectives
2. $ x^{(1)} $ is strictly better than $ x^{(2)} $ in at least on objective. 

You can often find 2  solutions where neither satisfy the above conditions, in this case we say these solutions are **independent**

#### Pareto-Optimal Solutions 

Non-dominated solutions: The set $P' \in P$  can be defined as the set of **non-dominated** solutions in $P$ where $\forall p \in P'$ p is not dominated by any member of the set $P$. An $O(MN^2)$ algorithm exists to find this set.

Pareto-Optimal Solutions: When $P=\mathcal{S}$, the resulting $P'$ is the Pareto optimal set. Where $\mathcal{S}$ is the set of **all** possible solutions in the search space. 

![fronts](../resources/paretofront.png)

## Preference-Based Approach


<!-- wait for slides to upload, panopto is too blurry -->
