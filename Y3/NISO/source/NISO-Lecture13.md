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


# Lecture 14: MOO Continued



## NSGA-II

### Algorithm

In one generation of NSGA-II :

We require a parent population, $P_t$ of $N$ individuals
We also require an offspring population, $Q_t$ of $N$ individuals.

This algorithm works in both a continuous and a discrete space.

1. Sort $R_t := P_t \cup Q_t$ into non-dominated fronts $\mathcal{F}_1,...$
2. Set $i:=1$ and $P_{t+1} := \empty$ 
3. While $|P_{t+1} + |\mathcal{F_i}| < N$:
   1. Set $P_{t+1} := P_{t+1} \cup \mathcal{F_i}$
   2. Set $i:=i+1$
4. Perform *crowding sort* on the individuals from $\mathcal{F_i}$ 
5. Add $N-|P_{t+1}|$ most widely spread solutions from $\mathcal{F_i}$ to $P_{t+1}$
6. Create $Q_{t+1}$ from $P_{t+1}$ using crowded tournament selection, crossover and mutation operators

### Algorithm: Non-Dominated Sorting

Requires a population of individuals $P$

1. For each individual, $i \in P$:
   1. Set $S_i := \empty$ and $n_i := 0$ 
2. for all pairs $i,j \in P, i\neq j$ 
   1. if $j$ dominates $i$ 
      1. $S_j := S_j \cup \{i\}$ 
   2. else if $i$ dominates $j$ 
      1. $n_j := n_j + 1$ 
3. for each $i \in P$ 
   1. if $n_i =0$ keep $i$ in the first non-dominant front $P_1$
4. Set $k=1$ 
5. while $P_k \neq \empty$ 
   1. for each $i\in P_k$ and $j\in S_i$ 
      1. Set $n_j := n_j -1 $ 
      2. If $n_j =0$   
         1. Update $Q := Q \cup \{j\}$ 
   2. Set $k=k+1$ and $P_k = Q$ and update $Q := \empty$ 

### Crowding Distance Algorithm

Requires a set $\mathcal F = \{(f_1^i,\ldots,f_n^i)\}_{i\in[\mathcal{l}]}$ of objective vectors.

1. For each $i \in [\mathcal{l}]$ 
   1. sort the set $\mathcal F$ according to objective $f_m$ s.t.
   $$f_m^{(l_1^m)} \leq f_m^{(l_2^m)} \leq \cdots \leq f_m^{(l_{\mathcal{l}}^m)}$$
   2. Set $d_{l_1^m} := \infin$ and $d_{l_{\mathcal{l}}^m}:= \infin$ so that boundary points are selected
   3. For $j\in\{2,\ldots,\mathcal{k}-1\}$
      1. $d_{l_j} := d_{l_j} + \frac{f_m^{\left(l_{j+1}^m\right)}- f_m^{\left(l_{j-1}^m\right)}}{f_m^{\max} - f_m^{\min}}$ for all other points
2. return *crowding distances* $(d_1,\ldots,d_{\mathcal{l}})$

