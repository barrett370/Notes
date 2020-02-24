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
- Iteratively searches for a better solution from the current solution's immediate neighbour solutions
- Imediate neighbour solutions are the most similar solutions to the current solution 

There are two types of Hill Climbing 

- Simple Hill Climbing: chooses the first better solution
- Steepest ascent/ descent hill climbing: compares all neighbour solutions and chooses the best solution. This is also known as greedy search 

```basic
x_0 := generate initial solution
terminationFlag := flase 
x := x_0 
while (terminatingFlag != true) {
    Modify the current solution to an immediate neighbour one v in A 
    if f(v) < f(x) then x:=v 
    if a terminition criterion is met: terminatingFlag := true 
}
return x
``` 

The major issue with Hill Climbing for TSP is how to generate the immediate neighbour solutions of the current solution.

For 2-3 cities there is only one solution 
For 4 cities there are 3 solutions 

For 4 cities we notice that the difference in the routes between a solution and a immediate neighbour is 2 edges.

## 2-Opt Algorithm

Given a route such as $A \rightarrow C \rightarrow B \rightarrow D \rightarrow A$ . How do we choose 2 edges to swap? This was a problem posed in 1958 by *Croes*

### Steps:

1) Removal of two edges from the current route, which results in 2 parts of the route 
2) Reconnect by two other edges to obtain a new solution 

### Algorithm: 

```basic
route := initial TSP solution
i,j := two cities for swapping
Step 1: take route[1] to route[i-1] and add them in order to newRoute 
Step 2: take route[i] to route[j] and add them in reverse to newRoute
Step 3: take route[j+1] to end and add them in order to newRoute
return newRoute
```

We get closer to the optimal solution with this approach, however, we often get stuck at a *local optimum* by the nature of the algorithm refusing to accept a worse solution once the local optimum has been found 

@import "../resources/l3.lo.png"

## Randomised search vs Local search 

Randomised search: 

- Good at exploration of a large search space
- Not good at exploitation, i.e. to search a small region around the current solution 
- Not good for problems where good solutions are just a small portion of all possible solutions

Local Search: 

- Good at exploitation 
- Not good at exploration 

**Can we combine these?**

## Stochastic local search

The main idea of SLS is to escape or avoid local optima

We achieve this by injecting randomness into local search

Strategies:

- Random restart
  - useful when either the number of local optima is small or the cost of restarting is cheap

- Perform a random non-improving step: randomly move to a less fit neighbour - **Simmulated annealing**

### Hill Climbing with Random Restart 

```basic 

for k := 0 to k_max {
    x_0 := randomly generated initial solution
    terminationFlag := false 
    x_i := x_0 
    while (terminationFlag != true){
        modify the current solution to an immediate neighbour 
        if f(v) < f(x_i) then x_i := v 
        if a termination criterion is met {
            terminationFlag := true
        }
    }
    store x_i
}
return x_best = min(x_i, i=1 to k_max)
``` 

## Simulated Annealing 

This is a generic heuristic algorithm for optimisation problems proposed by Kirkpatrick in 1983

This algorithm is inspired by annealing in metallurgy

> Heat treatment that alters a material to increases  its ductility and to make it more workable

We want to find a state of lower thermodynamic free energy for metal. Meaning,, we want to find a solution with the minimum value for the objective function.

``` python
x := x_0; e:=f(x) //Initial solution, objective function value (energy) 
x_best := x ; //Initial best solution
k := 0  // count evaluation number
while (k<k_max) {
    T := temperature(t_0)  //temperature calculation
    x_new := neighbour(x)  // pick a neighbour 
    e_new := f(x_new)   // compute it's objective function value  
    if P(e,e_new,T) > R(0,1) { // should we move to it? 
        x:= x_new ; e:= e_new // yes, change state
    } if e_new < e_best{  // is it a new best ?
        x_best := x_new;  e_best := e_new // save as best 
    } 
    k ++ // increase evaluation
}
return x_best
```
Where: 

$$
P = \begin{cases}
1 & \text{if } e_{new} < e \\ 
\exp \left( \frac{e-e_{new}}{T}  \right) & \text{otherwise}
\end{cases}
$$

Without the analogue from matallurgy, the simmulated annealing algorithm is essentially a **stochastic local search**

The main idea is to escape from local optima by taking a random non-improving step: 
