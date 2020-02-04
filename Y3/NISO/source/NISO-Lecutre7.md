# Lecture 7: Real-valued Coded Evolutionary Algorithms

## Arguments for Binary Coding 

> "THe binary alphabet maximises the level of **implicit parallelism**"

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

