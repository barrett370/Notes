# Lecture 10 

## Model Capacity

Informally, the *Model Capacity* is a model's capacity to fit a wide range of functions.
In statistical learning theory, *model capacity* is quantified by ***VC-Dimension**: Largest training set for which the model cna classify the labels arbitrarily into two classes
By the universal approximation theorem, neural networks can have a very high capacity [see previous lecture](../out/Neural-Comp-Lecture9.html)



## Underfitting & Overfitting

Underfitting: Too high a training error
Overfitting: Too large a gap between training error and test error

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

### Early Stopping

Here we split the data into training, validation and test data 

- Training model on the training set, evaluate with fixed intervals on the validation set
- Stop training when validation error has increased
- Return model parameters when validation loss was at the lowest, rather than the last parameters 


### Parameter Norm Penalties

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

Assuming parameters are weights and biases,i.e. $\Theta= (w,b)$
Then we can define:

$$
\Omega(\Theta) := \frac{1}{2}\|w\|_2^2
$$

We must penalise large weights


### Ensemble Methods

Combining different models often reduces generalisation error.

<u>Idea</u>

Train $k$ Neural Networks on $k$ subsets of the training data. Output the average (or modal) value of the networks

<u>Disadvantages</u>

- Usually requires more training data
- $k$ tiems increase in training time (if sequentially training)
- Only feasible for small values of $k$

<u> Idea 2: Dropout</u> 


In each *mini-batch*, *deactivate* some randomly selected activation units (not in the output layer)

Each selection of units corrsponds to a subnetwork. 
With $n$ inputs and hidden layer activation units, there are $2^n$ subnetworks.

The subnetworks share the weights.

No dropout during testing, i.e. implicit average output from all sub-networks

#### Implementing Dropout

Replace each activation unit $a_j^l = \phi(z_j^l)$ in a *hidden layer* with a dropout activation unit.

$$
\widetilde{a}_j^l = \frac{1}{1-p}\cdot d_j^l \cdot \phi(z_j^l)
$$

Where:

- $d_j^l \sim \text{Bernoulli}(1-p)$
  - Is 0 with Probability $p$ and 1 otherwise.

The expected value of the random variable $\widetilde{a}_j^l$ is: 

$$
\mathcal{E}[\widetilde{a}_j^l] = p\cdot \frac{1}{1-p}\cdot 0 \cdot \phi(z_j^l) + \\
(1-p) \cdot \frac{1}{1-p} \cdot 1 \cdot \phi(z_j^l) \\
= \phi(z_j^l) = a_j^l
$$

Hence, choosing the factor $\frac{1}{1-p}$ makes the expected activation identaical to the atication without dropout