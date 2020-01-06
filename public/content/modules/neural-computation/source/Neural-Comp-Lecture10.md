# Lecture 10 

## Model Capacity

Informally, the *Model Capacity* is a model's capacity to fit a wide range of functions.
In statistical learning theory, *model capacity* is quantified by ***VC-Dimension**: Largest training set for which the model cna classify the labels arbitrarily into two classes
By the universal approximation theorem, neural networks can have a very high capacity [see previous lecture](../out/Neural-Comp-Lecture9.html)



## Underfitting & Overfitting

Underfitting: Too high a training error
Overfitting: Too large a gap between training error and test error

## Model Capacity vs Error

Training and test error behave differently

- Training error often decreases with capacity
- Test error can increase beyond a certain capacity

The capacity of a model is optimum when the model matches data generation process


## Regularisation

There are 3 model *regimes*

1. Model family excludes data-generating process (*underfitting*)
2. Model family matches data-generating process
3. Model family matches data-generating process, and possibly many other models (*possible overfitting*)

Regularisation attempts to move a model from 2 $\rightarrow$ 3 


### Data augmentation

Many datasets can be augmented via transformations
Examples include:

- Mirroring
- Translation
- Scaling
- Rotation
- Noise

### Regularisation Methods

#### Early Stopping

Here we split the data into training, validation and test data 

- Training model on the training set, evaluate with fixed intervals on the validation set
- Stop training when validation error has increased
- Return model parameters when validation loss was at the lowest, rather than the last parameters 


#### Parameter Norm Penalties

Replace cost function with:

$$
\widetilde{C}(\Theta; X,y) = C(\Theta;X,y) + \alpha\Omega (\Theta)
$$

Where:

- $C$ is the original cost function
- $\Theta$ is the model's parameters
- $X,y$ is the training data
- $\Omega$ is a regular-iser i.e. a function which penalises complex models
- $\alpha$ is a hyperparameter controlling the degree of regularisation



#### $L^2$ Parameter Regularisation

Assuming parameters are weights and biases, i.e. $\Theta= (w,b)$
Then we can define:

$$
\Omega(\Theta) := \frac{1}{2}\|w\|_2^2
$$

This allows us to penalise large weights


#### Ensemble Methods

Combining different models often reduces generalisation error.

##### Idea

Train $k$ Neural Networks on $k$ subsets of the training data. Output the average (or modal) value of the networks

##### Disadvantages

- Usually requires more training data
- $k$ times increase in training time (if sequentially training)
- Only feasible for small values of $k$

##### Idea 2: Dropout

In each *mini-batch*, *deactivate* some randomly selected activation units (not in the output layer)

Each selection of units corresponds to a sub-network.
With $n$ inputs and hidden layer activation units, there are $2^n$ sub-networks.

The sub-networks share the weights.

No dropout during testing, i.e. implicit average output from all sub-networks

@import "../resources/l10-dropout.png"

###### Implementing Dropout

Replace each activation unit $a_j^l = \phi(z_j^l)$ in a *hidden layer* with a dropout activation unit.

$$
\widetilde{a}_j^l = \frac{1}{1-p}\cdot d_j^l \cdot \phi(z_j^l)
$$

Where:

- $d_j^l \sim \text{Bernoulli}(1-p)$
  - Is 0 with Probability $p$ and 1 otherwise.

@import "../resources/l10-dropoutimp.png"

The expected value of the random variable $\widetilde{a}_j^l$ is: 

$$
\mathcal{\mathbb{E}}[\widetilde{a}_j^l] = p\cdot \frac{1}{1-p}\cdot 0 \cdot \phi(z_j^l) + \\
(1-p) \cdot \frac{1}{1-p} \cdot 1 \cdot \phi(z_j^l) \\
= \phi(z_j^l) = a_j^l
$$

Therefore, choosing the factor $\frac{1}{1-p}$ makes the expected activation identical to the activation without dropout

###### Backpropogation with Dropout

@import "../resources/l10-backpropdropout.png"

Given the local gradient $\delta_j^l$, partial derivatives are:

$$
\frac{\delta C}{\delta w_{jk}^k} = \frac{\delta C}{\delta z_j^l} \cdot \frac{\delta z_j^l}{\delta w_{jk}^l } \\ = \delta_j^l \cdot \widetilde{a}_k^{l-1}
$$

$$
\frac{\delta C}{\delta b_j^l} = \frac{\delta C}{\delta z_j^l} \cdot \frac{\delta z_j^l}{\delta b_j^l} \\ = \delta_j^l
$$

###### Local Gradient for Hidden Layers

@import "../resources/l10-lghl.png"

$$
\widetilde{a}_j^l = \frac{1}{1-p}\cdot d_j^l \cdot \phi(z_j^l)
$$

Derivation:

$$
\delta_j^l = \frac{\delta C}{\delta z_j^l}   \;\;\;\;\;\;\; \texttt{By definition}\\ 
= \frac{\delta C}{\delta \widetilde{a}_j^l} \cdot \frac{\delta \widetilde{a}_j^l}{\delta z_j^l} \;\;\;\;\;\;\; \texttt{Chain Rule}\\
= \left( \sum_{k=1}^{m}\frac{\delta C}{\delta z_k^{l+1}\cdot\frac{\delta z_j^{l+1}}{\delta \widetilde{a}_j^l }} \right) \cdot \left(  \frac{1}{1-p}\right) \cdot d_j^l \cdot \phi '(z_j^l) \;\;\;\;\;\;\; \texttt{Chain Rule} \\
= \left( \sum_{k=1}^{m}\delta_k^{l+1}\cdot w_{kj}^{l+1} \right) \cdot \left( \frac{1}{1-p} \right) \cdot d_j^l \cdot \phi '(z_j^l) \;\;\;\;\;\;\; \texttt{By definition of $\delta_j^{l+1}$}
$$

--- 

Or in Matrix Form: 

$$
\delta^l = \left( \frac{1}{1-p} \right)\left( (w^{l+1})^T \delta^{l+1} \right) \odot d^l \odot \phi ' (z^l)
$$


###### Backpropogation Algorithm with Dropouts

$$
\texttt{
    \underline{input}: A training example $(x,y) \in \R^m \times \R^{m'}$
}
$$

1. Set the activation in the input layer:

$$
d_j^1 \sim \text{Bernoulli}(p), \text{for } j=1,\ldots,m \\ 
\widetilde{a}^1 = \frac{1}{1-p}\cdot d^1\odot x
$$

2. For each $l=2,\ldots (L-1)$  feed forward

$$
d_k^l \sim \text{Bernoulli}(p), \text{for } j=1,\ldots, m \\ 
z^l = w^l\widetilde{a}^{l-1}+b^l \\
\widetilde{a}^l = \frac{1}{1-p}d^l\odot \phi(z^l)
$$

3. Set activations in output layer, **no dropout**

$$
z^L = w^L\widetilde{a}^{l-1} + b^l \\
a^L = \phi(z^L)
$$

4. Compute local gradient for output layer:

$$
\delta^L := \nabla_a C\odot \phi '(z^L)
$$

5. Backpropogate the local gradients for hidden layers, i.e. for e ach $l=L-1 \ldots 2$ :

$$
\delta^l := \frac{1}{1-p}\left( (w^(l+1)^T\delta^{l+1}) \right)\odot d^l \odot \phi ' (z^l)
$$

6. return the partial derivatives

$$
\frac{\delta C}{\delta w_{jk}^l} = \delta_j^l\widetilde{a}_k^{l-1} \\ 
\frac{\delta C}{\delta b_j^l} = \delta_j^l
$$





