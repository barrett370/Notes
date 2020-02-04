# Lecture 7: Real-valued Coded Evolutionary Algorithms

## Arguments for Binary Coding 

> "The binary alphabet maximises the level of **implicit parallelism**"

A **Schema** is a template that identifies a subset of strings with similarities at certain string positions

|              |     |     |     |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
| Chromosome 1 | 1   | 0   | 1   | 1   | 0   | 1   | 1   | 0   |
| Chromosome 2 | 0   | 0   | 1   | 0   | 0   | 1   | 0   | 0   |
| Schema 1     | *   | 0   | *   | *   | 0   | 1   | *   | 0   |
| Schema 2     | *   | *   | *   | *   | 0   | 1   | *   | *   |

Where * is a wildcard representing 0 or 1 

## Implicit Parallelism

If a chromosome is of length $L$ then it contains $3^L$ schemata as for each position there are 3 possible values $\{0,1,*\}$. Therefore, for a population of $M$ individuals we will have to evaluate **up to** $M\cdot 3^L$ schemata.

For example, the decimal number 4 is represented as 100 in binary encoding, which contains the following schemata: $*00, 1*0, 1**, **0, *0* \text{ and } 10*$

Some schemata are *fitter* than others, by our selection process we can produce a population of entirely fitter schemata

We derive **implicit parallelism** from the fact that we are not only evolving $M$ individuals but also manipulating $M\cdot 3^L$ schemata. This fact means that with binary coding we require fewer strings to construct more schemata to sample larger search spaces 

## Drawbacks of Binary Coding

One drawback of binary coding is known as the Hamming cliff problem:

- 1-bit mutation can make a large (or small) jump; a multi-bit mutation can make a small (or large)  jump.

### Solution to the Hamming cliff problem

The solution is called *Gray encoding*. This is the process by which encoding of numbers is done such that adjacent numbers have a single digit differing by 1

For $a \in \{0,1\}^L$ and $b\in \{0,1\}^L$ where $a$ us the standard binary encoded string and $b$ is Gray encoded, then:

$$
b_i = \begin{cases}
    a_i & \text{if } i =1 \\ 
    a_{i-1} \otimes  a_i & \text{if } i > 1
\end{cases}
$$

where $\otimes$ means *exclusive or* 

## Further issues with Binary Encoding 

We also have issues with binary encoding with discrete search spaces:

- The redundancy problem: when the variables belong to a finite discrete set with a cardinal different from a power of 2, some binary strings are redundant, which correspond to infeasible solutions.

I.e. when we have a search space of a size not equal to a power of 2 then we require a binary representation that is **more powerful** than the space requires

And in continuous spaces:

- The precision problem
  - Decoding function:
    - Divide $\vec{a} \in \{0,1\}^L$ into $n$ segments of equal length: $\vec{s_i} \in \{0,1\}^{\frac{L}{n}}, i=1 ,\ldots, n$
    - Decode each segment into an integer $K_i,  i =1 , \ldots, n$ where $K_i = \sum_{j=0}^{\frac{L}{n}}s_{i_j} \cdot 2^j$
    - Applying the decoding function $h(K_i)$ which is essentially mapping the integer linearly onto the interval bound $x_i \in [u_i,v_i]$:

$$
h(K_i) = u_i + K_i \cdot \frac{v_i-ui}{2^{\frac{L}{n}}-1}
$$


Here clearly the precision depends on $L$, meaning that this process might produce difficulties if the search space has a high dimensionality ($n$ is large) and requires greater numerical precision. The smaller the interval bound, the more precise the process is but also the more computationally expensive it is

## Real valued vector representation

In continuous optimisation problems, real-valued vector representations are a natural way to represent solutions.

With this method of representation, there are no differences between genotypes and phenotypes. They are both real-valued vectors representing chromosomes e.g. $\vec{x} = [x_1,x_2,\ldots,x_n] \in \R^n$ 
Each gene in the chromosome represents a variable in the problem. The precision is not restricted by the decoding/ encoding functions

Evolution Strategies, Evolutionary Programming and Differential Evolution are all based on real-valued vector representation

Advantages include:

- Being simple, natural and fast as there is no need ot encode or decode
- Better precision and better handling large dimension problems

### Real valued mutation

Randomly select parents with a probability $p_m \in [0,1]$ for mutation and randomly select a gene $c_i$ and apply the mutation operator

Real number mutation operators include:

- Uniform mutation 
- Non-uniform mutation 
- Gaussian mutation 

#### Uniform/ Gaussian Real valued mutation

##### Uniform Mutation 

Replace $c_i$ with a uniformly random number $c_i'$ generated from the interval bound of the variable $x_i \in [u_i,v_i]$ 

##### Gaussian Mutation

Replace $c_i$ with $c_i'$ which is calculated from:

$$
c_i' \min(\max(N(c_i,\sigma_i),u_i),v_i)
$$

where $N(c_i,\sigma_i)$ is a gaussian (normal) distribution with a mean $c_i$ and standard deviation $\sigma_i$ which ma depend on the length $l_i = v_i - u_i$ of the interval bound and typically $\sigma_i = \frac{1}{10}l_i$ 

#### Non-Uniform Mutation 

In non-uniform mutation the replacement $c_i'$ for $c_i$ is calculated from:

$$
c_i' = \begin{cases}
    c_i + \Delta (t, v_i - c_i) & \text{if } \tau \geq 0.5 \\ 
    c_i - \Delta (t,c_i - u_i) & \text{if } \tau < 0.5
\end{cases}
$$

where $t$ is the number of current generation solutions and $\tau$ is a random number in the range $[0,1]$ and :

$$
\Delta (t,y) = y(1-r^{1-\frac{t}{g_m}})^b
$$

where $r$ is a random number in the range $[0,1]$, $g_m$ is the maximum number of generations and $b$ is a constant.

## Real Valued Crossover

Randomly select two parents $\vec{x_2} = \{x_i^{[2]},x_2^{[2]},\ldots, x_n^{[2]}\}$  and $\vec{x_2} = \{x_i^{[2]},x_2^{[2]},\ldots, x_n^{[2]}\}$ , then apply a crossover operators

Crossover operators include:

### Flat crossover

One offspring $\vec{h} = \{h_1,h_2,,\ldots,h_n\}$ is generated where $h_i$ is a uniformly randomly generated value in the interval $[x_i^{[1]},x_i^{[2]}]$. If $x_i^{[1]}<x_i^{[2]}$ or $[x_i^{[2]},x_i^{[1]}]$ if $x_i^{[2]} < x_i^{[1]}$ 

### Simple Crossover 

A crossover point $i \in \{1,\ldots,n\}$ is randomly chosen and the variables beyond this point are swapped to create to new offspring:

$$
\vec{h_1} = \{ x_1^{[1]},x_2^{[1]},\ldots,x_i^{[1]},x_{i+1}^{[2]},\ldots,x_n^{[2]}\} 
$$
$$
\vec{h_1} = \{ x_1^{[1]},x_1^{[1]},\ldots,x_i^{[1]},x_{i+1}^{[1]},\ldots,x_n^{[1]}\} 
$$

### Whole arithmetic crossover

Two offspring $\vec{h_k} - \{h_i^k, h_2^k, \ldots, h_n^k\}$, $k = 1,2$ are generated, where $h_i^{[1]} = \alpha x_i^{[1]} + (1-\alpha)x_i^{[2]}$ and $h_i^{[2]} = \alpha x_i^{[2]} + (1-\alpha)x_i^{[i]}$ and parameter $\alpha$ is a random number in the range of $[0,1]$ 

### Local arithmetic crossover

The same as whole arithmetic crossover, except $\alpha \in \R^n$ is a vector of which each element is random number in the range $[0,1]$ 

### Single arithmetic crossover 

Choose gene and then replace it with the arithmetic average of genes at the position of two parents, other genes are copied from the parents.

### BLX-$\alpha$ crossover 

An offspring s generated: $\vec{h} = \{h_1,h_2,\ldots,h_n\}$ where $h_i$ is a uniformly randomly generated number over the interval $[h_{\min} - I \cdot \alpha, h_{\max} + I \cdot \alpha]$,
$h_{\max} = \max(x_i^{[1]},x_i^{[2]})$ , $h_{\min} = \min(x_i^{[1]},x_i^{[2]})$ and $I = h_{\max} - h_{\min}$ 






