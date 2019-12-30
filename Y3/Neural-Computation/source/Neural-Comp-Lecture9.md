---
html:
  embed_local_images: false
  embed_svg: true
  offline: false
  toc: undefined
  path: ../out/

export_on_save:
  html: true
---


# Lecture 9

Previously, we looked at different optimisation algorithms.

## Generalisation in Neural Networks

Hypothesis:

> Neural Networks generalise from the training data, i.e. by learning the inherent structure in the data.
 
Test of Hypothesis: removing structure should reduce network performance

Zhang et al. (ICLR 2017) trained a network over the CIFAR10 dataset with the following settings:

- True labels, original training set **(ground)**
- Random labels: all labels are replaced with random ones
- Shuffle pixels: a random permutation of the pixels for each image
- Gaussian: A gaussian distribution is used to generate random pixels for each image

![Results](../resources/Zhang-et-al.png)

- Deep neural networks easily fit random labels 
- The effective capacity of neural networks is sufficient for memorising the entire dataset
- Training time increases only by a small constant factor


## Perceptrons 

These were a very early form of artificial networks and are comparatively very weak to current approaches

$$
f(x) = \text{sign}(w^Tx - b) \\
\text{where, }\\
\text{sign}(x) = \begin{cases} 1 & \text{if} x > 0 \\ -1 & \text{otherwise}\end{cases}
$$

### Linear decision Boundary 

The boundary between positive adnnegative output of a single layer perceptron , can be described by a linear hyper-plane

For example, in 2D we get: 
$$
f(x_1,x_2) = \text{sign}(w_1x_1 + w_2x_2 - b)
$$
$$
w_1x_1 + w_2x_2 - b < 0 \implies x_2 > \frac{b-w_1x_1}{w_2}
$$


### Minsky & Papet (1969)

> **A single layer perceptron cannot learn the XOR function**

- Caused controversy and led to the *"AI Winter"*
  $\implies$ Reduced research funding to Neural Network research
  $\implies$ Reduced interest among researchers

### Discriminatory Functions

<u>Definition:</u>

$\sigma : \R \rightarrow \R$ is called discriminatory iff 

$$
\int \sigma (y^{T}x+\Theta)\delta \mu(x) = 0 \\
\forall y \in \R^N \text{ and } \Theta \in \R \implies \mu =0
$$

<u>Lemma</u>

Any function $ \sigma: \R \rightarrow \R$ where:

$$
\sigma (x) = \begin{cases}
    1 & \text{for} x\rightarrow \infin \\
    0 & \text{for} x \rightarrow -\infin
\end{cases}
$$

is discriminatory 

<u>Theorem</u>

Let $\sigma$ be any continuous descriminatory function, then for any function $f \in C(I_N)$ i.e continuous function on $I_N = [0,1]^N$ then there exists a finite sum of the form:

$$
G(x) = \sum_{j=1}^{M}\alpha_j\sigma(w_j^Tx + \Theta_j)
$$

s.t.

$$
|G(x) - f(x)| < \epsilon, \forall x \in I_m
$$


- This proof shows us that we can approximate **any** continuous function with a single layer. However, it does not tell us how many neurons are in this single hidden layer or how hard the resulting network is to train.



