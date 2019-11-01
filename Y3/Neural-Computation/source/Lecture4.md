# Lecture 4

- So far we have only looked at models with 1 parameter\

###### (1)

$$ J(\Theta) = \mathbb{E}_{\mathcal{X,Y}\sim \mathcal{D}}-\log_{Pmodel}(\mathcal{Y | X; \Theta)}$$

- We will nw look at models with many variables

## Functions of multiple variables

### Vectors

- Vectors are "arrays" of numbers e.g.

###### (2)

$$\vec{v} = \langle v_1, \cdots, v_n \rangle \in \R^n$$

- We can consider a vector as a point i a $n$ dimensional space where each point $v_i$ gives the coordinate along the $i^{th}$ axis.

#### Properties of vectors

- Norms: assigns *"length"* to vectors
- The $L^{\R}$-norm of a vector $\vec{v}\in \R^n$ is

###### (3)

$$\|\vec{v}\|_p = (\sum_{i=1}^{n}|v_i|^p)^{\frac{j}{p}}$$

- THe special case where $p=2$, $L^2$-norm is the *euclidean distance*

#### Operations on vectors

$$\forall a \in \R, \\ \vec{u} \in \langle u_1, \cdots , u_m \rangle \in \R^m \\
                 \vec{v} \in  \langle v_1, \cdots, v_m \rangle \in \R^m $$

- $a \cdot \vec{u} = \langle au_1, \cdots, au_m \rangle \leftarrow$ *Scalar Multiplication*
- $\vec{v} + \vec{u} = \langle v_1 + u_1, \cdots , v_n+u_n \rangle \leftarrow$ *Vector addition*
- $\vec{v}\cdot\vec{u} = \sum_{i=1}^{m} v_iu_i \leftarrow$ *Dot product*

### Theorem: Geometric interpretation of dot-product

- Given the 2 vectors $\vec{u}, \vec{v}$, defined above, if the angle between them is $\theta$:

###### (4)

$$\vec{u}\cdot\vec{v} = \|\vec{u}\| \cdot \|\vec{v}\|\cdot\cos\theta$$


### Partial Differentiation 

- THe partial derivative of the function $f(x_1,\cdots,x_n)$ in the derivation of the variable $x_i$ at the point $\vec{u} = \langle u_1, \cdots, u_n \rangle $is

###### (5)

$$\frac{\delta f}{\delta x_i}(u_1,\cdots,u_n) = \lim_{u\rightarrow 0} \frac{f(u_1,\cdots,u_i+h,\cdots,u_n)-f(u_1,\cdots, u_n)}{h}$$


### Gradient 

- The gradient of function $f(x_1,\cdots, x_n)$ is

###### (6) 

$$\nabla f := (\frac{\delta f}{\delta x_1},\cdots, \frac{\delta f}{\delta x_n})$$

- And iff $f: \R^n \rightarrow \R$, then $\nabla f : \R^n \rightarrow \R^n$
  - i.e. the gradient is a vector-valued function
