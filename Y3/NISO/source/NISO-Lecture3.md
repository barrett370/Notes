# Lecture 3: Optimisation Problems and Local Search Algorithms

## The Travelling Salesman Problem

- $\texttt{Given}$ a list of cities and distances between each pair of them,
- $\texttt{Wanted}$ the shortest route that visits each city exactly once and returns to the origin city.

These problems, at a small scale are fairly trivial. However, they get exponentially harder as yous scale it up.

@import "../resources/l3tsp1.png"
Clearly here the solution is $A \rightarrow D \rightarrow B \rightarrow C \rightarrow A $

@import "../resources/l3tsp2.png"

However, here the solution required the use of a powerful supercomputer 

These problems were first mentioned in a *travelling salesman* handbook in 1832
It is one of the most prominent combinatorial optimisation problems in computer science

### Formal Definitions


#### Optimisation

- To find the best or optimal solution to a problem 

- $\texttt{Given}$ a function $f(x) : \mathcal{A)} \rightarrow \R$ from a set $\mathcal{A}$ to the real numbers
- $\texttt{Wanted}$ an element $x^* \in \mathcal{A}$ s.t. $f(x^*) \leq f(x)$ *minimisation* or $f(x^*) \geq f(x)$ *maximisation* $\forall x \in \mathcal{A}$

- Function $f(x)$ is called the *objective function* or *cost function* for minimisation problems or *fitness function* for maximisation problems such as those in evolutionary computation 
- $\mathcal{A}$ is called the *feasible set*, which is some subset of the euclidean space specified by a set of constriants
- The domain $\mathcal{A}$ of $f(x)$ is called the *search space*, while the elements of $\mathcal{A}$ are called the *candidate solutions* or *feasible solutions*

##### Categories of optimisation problems

The category is dependent on the nature of the objective function

- Linear vs non-linear
  - Linear: 
    - Additivity: $f(x+y) = f(x) + f(y)$
    - Homogeneity: $f( \alpha x) = \alpha f(x) \;\;\;\; \forall \alpha $
  - Non-Linear:
    - Convex vs non-convex 
- Multi-objective vs single objective
- Constrained vs non-constrained

It is also dependent on the nature of the solutions

- Continuous vs discrete

## Optimisation Algorithms

- Mathematical programming algorithms such as linear programming

- Search and enumeration algorithms
  - Brute force algorithms: enumerating all possible candidate solutions and checking their correctness
  - Improved brute force algorithms such as branch and bound algorithms 
  - Heuristic algorithms
    - Randomised algorithms
    - Local search such as hill climbing or greedy search

To solve the TSP problem we generally use Heuristic algorithms.

- To use brute force algorithms to solve TSP the complexity is $O(n!)$
- Improved brute force algorithms still have a complexity of $O(1.9999^n)$
  - Took 3 months on 44 CPUs to solve the usa13509 problem seen above (map of the usa)
- Linear programming: essentially an integer linear programming problem which itself is a *NP-Hard* problem 

### Randomised algorithms

We have 2 categories of randomised algorithms

1. Las Vegas Algorithm
2. Monte Carlo algorithm

We **must** use Monte Carlo for TSP as we do not know the optimal solution, the exit criteria for Las Vegas

However, we find that naive approaches to solving TSP with randomised algorithms do not yield good results. This is because the probability of finding the optimal solution is very low.

We can improve our results by using local search algorithms

### Local Search 

Local Search is a heuristic algorithm for solving hard optimisation problems 

- Idea: Starting with an initial *guess* solution, incrementally improve your solution until it is (or is close to) the optimal 
- Incremental improvement: local changes e.g. algorithm iteratively movees to a *neighbour solution* 
- Neighbour solution: Depends on the definition of a neighbourhood relation on the seach space, but generally defined using a distance/ similarity measure.


```basic 

x_0 := generate initial solution
terminationFlag := false 
x := x_0 
while (terminationFlag != true) {
    Modify the current solution to a neighbourhood one (v in A)
    if f(v) < f(x) then x:=v 
    if a termination criterion is met{
        terminationFlag := true
    }
    return x
}

```

### Hill Climbing algorithm

This is one of the simplest local search algorithms 
Described as *climbing Everest in thick fog with amnesia*

It is an iterative algorithm:

- Start with an arbitrary solution to a problem 