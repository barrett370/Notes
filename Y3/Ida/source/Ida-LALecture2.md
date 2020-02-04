# Linear Algebra Lecture 2 

## Linear Dependence 

Let $\vec{v_1},\vec{v_2}\ldots,\vec{v_M}\in \R^N$

Let the set $\left\{  \\vec{v_1},\vec{v_2},\ldots, \vec{v_M}\right\}$ is **linearly dependent** if there are scalars $\lambda_1,\lambda_2,\ldots,\lambda_M$ not all of which are zero such that:
$$
\lambda_1\vec{v_1} + \lambda_2\vec{v_2} + \ldots \lambda_M\vec{v_M} = 0
$$

The set $\left\{  \vec{v_1},\vec{v_2},\ldots, \vec{v_M}\right\}$ is linearly independent if it is not linearly dependent

However for a basis set of vectors we want more than them to just be linearly independent, we want all vectors in the set to be **orthogonal** to each other.

### Demonstrating linear dependence/ independence

Given a set of linear simultaneous equations you can show their linear dependence/ independence via the process of Gaussian Elimination.

For a matrix $\bf V$ with columns $\vec{v_1},\ldots,\vec{v_M}$, if $\bf V$ can be reduced to a diagonal matrix with non-zero elements then the set of equations are linearly independent, otherwise they are linearly dependent.


### Interpretation

The set $ \left\{ \vec{v_1},\vec{v_2},\ldots,\vec{v_M}\right\} $ is linearly dependent if at least one member of the set can be written as a linear combination of the others

## Vector Set Bases

A **basis** for a vector space is a coordinate system. In $\R^3$ we in general use the $x,y,z$ coordinate system, Any vector:

$$
\vec{v} = 
\begin{bmatrix}
v_x \\ v_y \\ v_z
\end{bmatrix} \in \R^3
$$

can be written: 

$$
\vec{v} = v_x \times \vec{u_x} + v_y \times \vec{u_y} + v_z \times \vec{u_z}
$$

where $\vec{u_x},\vec{u_y}$ and $\vec{u_z}$ are **unit vectors**

$$
\vec{u_x} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix} , \vec{u_y} = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix} , \vec{u_z} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}
$$

Here $\vec{u_x},\vec{u_y}$ and $\vec{u_z}$  are unit vectors as:

$$
\|\vec{u_x}\| = \|\vec{u_v}\| = \|\vec{u_z}\|   = 1
$$

and are **orthogonal** as: 

$$
\vec{u_x} \cdot \vec{u_y} = \vec{u_x} \cdot \vec{u_z} = \vec{u_y} \cdot \vec{u_z} = 0 
$$

Any set of 3 orthogonal unit vector can be used as a coordinate system in $\R^3$, such as set is called a **basis** for $\R^3$ or more strictly an **orthonormal basis**

## Definition of a basis of $\R^N$ 

A **basis** for the vector space $\R^N$ is the set of vectors $\vec u_1, \vec u_2, \ldots, \vec u_N$ s.t. they are all unit vectors and mutually orthogonal.

