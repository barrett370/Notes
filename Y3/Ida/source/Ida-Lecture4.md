# Lecture 4: Vector Representation of Documents

## Vector Notation for Documents

Given we have a set of documents $D = \{ d_1, d_2, \ldots, d_N \}$. We can think of this as the corpus for IR 

Suppose that the number of different words in the corpus is $V$, our vocabulary size

Now suppose a document $d\in D$ contains $M$ different terms: $\{ t_{i(1)},t_{i(2)},\ldots ,t_{i(M)} \}$ 

Finally assume term $t_{i(m)}$ occurs $f_{i(m)}$ times

The vector representation $vec(d)$ of $d$ is the $V$ dimensional vector: 

$$
vec(d) = \vec{d} = \begin{pmatrix} w_{t_0,d} \\ \vdots \\ w_{t_m,d} \\ \vdots \\ w_{t_V,d} \end{pmatrix}
$$

<!-- See panopto for above vector -->


## Uniqueness 

Is the mapping between documents and vectors 1-to-1 ? 

- **NO!** 

If two vectors are equal it means that they contian the same words, not that they are in the same order 

If $\lambda$ is a scalar and $vec(d_1)=\lambda vec(d_2)$ then $d_1$ and $d_2$ are comprised of the same words but $d_1$ has $\lambda$ occurrences of each word in $d_2$

## Document Length

Recall that the length (norm) of a vector, $\vec{x} = (x_1,\ldots,x_N)$ is given by:

$$
\|\vec{x}\| = \sqrt{x_1^2 + x_2^2 + \ldots + x_N^2}
$$

Therefore, in the case of a document vector

$$
vec(d) = (0,\ldots,0,w_{i(1)d},0,\ldots,0,w_{i(2)d},0,\ldots\ldots,w_{i(M)d},0,\ldots,0)
$$
$$
\|vec(d)\| = \sqrt{w_{i(1)d}^2 + w_{i(2)d^2 + \ldots w_{i(M)d}^2}} = \|d\| 
$$

Where $\|d\|$ is the length of the document $d$

## Document Similarity 

Suppose $d$ is a document and $q$ si a query

- if $d$ contains the same words in the same proportions, then $vec(d)$ and $vec(q)$ will point in the same direction
- If $d$ and $q$ contain different words then $vec(d)$ and $vec(q)$ will point in different directions
- Intuitively, the greater the angle between $vec(d)$ and $vec(q)$, the less similar $d$ and $q$ are. 

### Cosine Similarity

We define the **Cosine Similarity** between $d$ and $q$ by:

$$
CSim(q,d) = cos\theta
$$

where $ \theta $ is the angle between $vec(q)$ and $vec(d)$ 

Similarly, the Cosine Similarity between documents $d_1$ and $d_2$ can be defined: 

$$
CSim(d_1,d_2) = cos\theta
$$

Where $\theta$ is the angle between $vec(d_1)$ and $vec(d_2)$


$$
\cos(\theta) = \frac{x_1x_2 + y_1y_2}{\|u\|\|v\|} = \frac{u\cdot v}{\|u\|\|v\|}
$$

Therefore, if $q$ is a query, $d$ is a document and $\theta$ is th angle between $vec(q)$ and $vec(d)$ then: 

$$
CSim(q,d) = \cos(\theta) = \frac{\vec{q}\cdot \vec{d}}{\|q\|\|d\|} = \frac{\sum_{t\in q\cap d}w_{tq}\cdot w_{td}}{\|q\|\|d\|} = Sim(q,d)
$$


