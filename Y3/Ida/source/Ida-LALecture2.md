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

## Properties of Bases

Any basis $E = \{\vec{e_1},\vec{e_2},\ldots,\vec{e_N}\}$ for $\R^N$ is linearly independent. 

To see this property, first assume a set is linearly independent. If this is the case then $\exists[ \lambda_1,\lambda_2,\ldots,\lambda_N]$ s.t. 

$$
\lambda_1\vec{e_1} + \lambda_2\vec{e_2} + \ldots + \lambda_N\vec{e_N} = 0
$$

where not all $\lambda_n$s are 0. Assume $\lambda_1 \neq 0$ as therefore: 

$$
\vec{e_1} = \phi_2\vec{e_2}+\phi_3 \vec{e_3} + \ldots + \phi_N \vec{e_N}, \left( \phi_n = \frac{\lambda_n}{\lambda_1} \right)
$$

and from that we can show:

$$
0 = \vec{e_n}\cdot \vec{e_1} = \phi_2 \vec{e_n}\cdot \vec{e_2} + \ldots + \phi_N \vec{e_n} \cdot \vec{e_N} = \phi_n
$$

Therefore, $0 = \phi_n$ and so $\lambda_n = 0$. Since this can be repeated $\forall [n \neq 1, \lambda_n =0]$  it must be the case that $\lambda_1 =  0$

---

For any basis for $\R^N$ Then any vector $\vec{v} \in \R^N$ can be written **uniquely** as a linear sum of basis vectors

$$
\vec{v} = (\vec{v}\cdot \vec{e_1})\vec{e_1} + (\vec{v_2}\cdot\vec{e_2})\vec{e_2} + \ldots + (\vec{v} \cdot \vec{e_N})\vec{e_N}
$$

**Uniqueness** means that if: 

$$
\vec{v} = \lambda_1\vec{e_1} + \lambda_2\vec{e_2} + \ldots + \lambda_N\vec{e_N}
$$

and 

$$
\vec{v} = \phi_1\vec{e_1} + \phi_2\vec{e_2} + \ldots + \phi_N\vec{e_N}
$$

then

$$
\lambda_n = \phi_n = (\vec{v}\cdot \vec{e_n}), \forall n \in \{1,\ldots,N\}
$$