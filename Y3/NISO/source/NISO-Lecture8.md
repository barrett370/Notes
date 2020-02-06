# Lecture 8: Constraint Handling in Evolutionary Algorithms

## Motivation

### Spring Design

$\texttt{Aims:}$ to minimise the weight of a tension/ compression spring. All design variables are continuous.

$\texttt{Constraints:}$ 

1. Minimum deflection
2. Shear stress
3. Surge frequency
4. Diameters

Let the wire diameter $d=x_1$, the mean coil diameter $D=x_2$ and the number of active coils $N=x_3$. The following are the constraints on these variables:

$$
0.05 \leq x_1 \leq 2, \;\; 0.25 \leq x_2 \leq 1.3 , \;\; 2 \leq x_3 \leq 15
$$

We can write this as a function to minimise:

$$
f(X) = (x_3 +2)\cdot x_2 \cdot x_1^2
$$

which is subject to the following: 

$$
g_1(X) = 1 - \frac{x_2^3x_3}{71785x_1^4} \leq 0
$$

$$
g_2(X) = \frac{4x_2^2 - x_1x_2}{12566(x_2x_1^3 -  x_1^4)} + \frac{1}{5108x_1^2} - 1 \leq 0
$$

$$
g_3(X) = 1- \frac{140.45x_1}{x_2^2x_3} \leq 0
$$

$$
g_4(X) = \frac{x_2 + x_1}{1.5} -1 \leq 0 
$$

#### Engineering Optimisation

Also known as *Design Optimisation*, this is the process to find the combination of design variables that optimises the design objective and satisfies the constraints.

A design variable is under the control of the designer and could have an impact on the solution of the optimisation problem. They can be:

- Continuous
- Integers
- Sets of variables, often taken from a list of recommended values from design standards

Design objectives represent the desires of the designers such as to maximise profit or minimise cost

Constraints are desires the designers cannot optimise infinitely due to:

- Limited resources such as budget or materials
- User requirements or regulations

A design constraint is usually *rigid* or *hard* as they often need to be strictly adhered to. 

Engineering optimisation problems fall under **constrained optimisation problems**

## Constrained Optimisation Problems

In general a constrained optimisation problem can be represented as: 

$$
\min_{\vec{x}} \{f(\vec{x})\}
$$

subject to:

$$
g_i(\vec{x}) \leq 0, \forall i \in \{1,\ldots,m\}
$$
$$
h_j(\vec{x}) = 0, \forall j \in \{1,\ldots,p\}
$$

where $x$ is the $n$ dimensional vector $\vec{x} = (x_1,x_2,\ldots, x_n)$, $f(\vec{x})$ is the objective function, $g_i(\vec{x})$ is the inequality constraint and $h_j(\vec{x})$ is the equality constraint

We denote the search space as $\mathcal{S}$ and the feasible space as $\mathcal{F} \in \mathcal{S}$. The global optimum of $\mathcal{F}$ might not be the same as that of $\mathcal{S}$ 

### Types of Constraints

There are two main types of constraints we will look at:

1. Linear Constraints: relatively easy to deal with 
2. Non-linear Constraints: can be much harder to deal with. 

### Constraint Handling in Evolutionary Algorithms

- The purist approach: rejects all infeasible solutions in search
- The separatist approach: considers the objective function and constraints separately
- The penalty function approach: converts a constrained problem into an unconstrained one by introducing a penalty function into the objective function.
- The repair approach: maps *(repairs)* an infeasible solution into a feasible one
- The hybrid approach: mixes two or more above approaches

#### Penalty Function Approach

There are 3 sub approaches under the penalty function method: 

##### Static Penalties

The penalty function is pre-defined and fixed during evolution

The general form of static penalty function is:

$$
f'(\vec{x}) = f(\vec{x}) + \sum_{i=1}^{m}r_i(G_i(\vec{x}))^2
$$

where $r_i$ are fixed, predefined values 

Equality constraints can be converted into inequality contraints:

$$
h_j(\vec{x}) \rightarrow h_j(\vec{x}) - \epsilon \leq 0{}
$$

Where $\epsilon > 0$ but is small

This approach is simple to implement but requires rich domain specific knowledge to accurately set $r_i$ 

$r_i \forall i \in (1,\ldots, m+p)$ can be divided into a number of different levels. When to use each level is determined by a set of heuristics, such as the more important the constraint, the larger the value of $r_i$ 

##### Dynamic Penalty Functions 

Dynamic Penalty Functions take the general form: 

$$
f'(\vec{x}) = f(\vec{x}) + r(t) \cdot \sum_{i=1}^{m}G_i^2(\vec{x}) + c(t) \cdot \sum_{j=1}^{p}H_j^2(\vec{x})
$$

Where $r(t)$ and $c(t)$ are two penalty coefficients 

The general principal of DPFs is that larger the generation number $t$, the larger the penalty coefficients $r(t)$ and $c(t)$ 

###### Common Dynamic Penalty Functions

Common Dynamic Penalty Functions include: 

- Polynomials: $r(t)= \sum_{k=1}^{N}a_{k-1}t^{k-1}, \;\;\; c(t) = \sum_{k=1}^{N}b_{k-1  }t^{k-1}$ 
  - Where $a_k$ and $b_k$ are user-defined parameters
- Exponentials: $r(t) = e^{at}, \;\;\; c(t) = e^{bt}$ 
  - Where $a$ and $b$ are user-defined parameters
- Hybrid: $r(t) = e^{ \sum_{k=1}^{N}k_{k-1}t^{t-1} }, \;\;\; c(t) = e^{\sum_{k=1}^{N}b_{k-1}t^{k-1}}$ 

### Application

Given a static penalty function $\Phi(\vec{x}) = f(\vec{x}) + rG(\vec{x})$ where $G(\vec{x}) = \sum_{i=1}^{m}G_i(\vec{x})$ and $G_i(\vec{x}) = \max\{0,g_i(\vec{x})\}$

*How does $r$ affect our training?* 

For a minimisation problem using $\Phi(\vec{x})$ for two individuals $\vec{x_1}$ and $\vec{x_2}$, their fitness values are not determined by $\Phi(\vec{x}) \implies$ changing fitness values

Fitness proportional selection: As we now have changing fitness values we, by extension, have changing selection probabilities.

Ranking Selection: $\Phi(\vec{x_1}) < \Phi(\vec{x_2}) \implies f(\vec{x_1}) + rG(\vec{x_1}) \leq f(\vec{x_2}) + rG(\vec{x_2})$

- $(f(\vec{x_1}) < f(\vec{x_2}) )\cap (G(\vec{x_1}) > G(\vec{x_2})) \implies$ increasing $r$ will eventually change the comparison 
-  $(f(\vec{x_1}) > f(\vec{x_2}) )\cap (G(\vec{x_1})  < G(\vec{x_2})) \implies$  Decreasing $r$ will eventually change the comparison. 

From this we can see that different $r$ values lead to different ranking of individuals in the population.

The use of different penalty functions lead to different objective functions and therefore different explorations of the search space, finding different optima.


Essentially, penalty function transform fitness and change the ranking system leading to different candidates being selected. 

