# Lecture 11: Deep Learning

## Linear Regression - Revisit

In linear regression problems we have the following: 

- Our data, $(x_1,y_1),\ldots, (x_n,y_n)$
- Our model, $y = \textbf{w}x + \textbf{b}$
- A loss function, often the mean squared error:

$$
L(x,\theta) = \sum_{i=1}^{n}|(\textbf{w}x_i + \bf{b}) - y_i|^2
$$

Where, $\theta = \{ \textbf{w},\textbf{b}\}$

- An optimiser with underlying optimisation function, often gradient descent:

$$
\boldsymbol{\theta}^{j+1} = \boldsymbol{\theta}^j - \nabla_\theta L(x,\boldsymbol{\theta}^j)
$$

- Our final step is *inference*, once we have the optimal parameters, we can simply plug in these values to allow us to accurately infer the correct result of unseen values.

## Mulilayer Perceptrons

Networks are made up of a series of banks of artificial neurons. Each bank feeds into the following layer until the final *output* layer.
In our neurons we need to define a function which determines how and when the neuron *fires*. These are known as activation functions. 

### Activation Functions

#### Sigmoid

$$
f(x) = \frac{1}{(1+e^{-x})}
$$

> True shape
<iframe src="https://www.desmos.com/calculator/fdapg26pwh?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

> Illustration
@import "../resources/sigmoidfunc.png"

- The sigmoid function normalises numbers to the range [0,1]
- As x varies from 0 the gradient of the function tends towards 0, this is a major drawback as it makes it much more difficult/ slower for your network to *learn*
- Another downside of the sigmoid function is due to its nature as an *exponential* function, it is quite computationally expensive.

#### $\tanh$

$$
f(x) = \tanh(x)
$$
> True shape
<iframe src="https://www.desmos.com/calculator/o4unj6p4sv?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

> Illustration
@import "../resources/tanhfunc.png"

- This function normalises values to [-1,1]
- This suffers from the same issue as the sigmoid due to the fact that its gradient also tends to 0 meaning in some cases learning can come to a halt.

#### ReLU - Rectified Linear Unit

$$
f(x) = \max(0,x)
$$

>True shape
<iframe src="https://www.desmos.com/calculator/ickbylfkrq?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

- Solves the issue of saturation leading to slowed or halted learning, but **only** in the positive region. 
  - You must guarantee that your result is positive for this to work
  - If you do not then you get a *dead ReLU* which has no gradient so therefore, no learning
- Converges much faster than sigmoid and tanh ~ 6x


#### Leaky ReLU 

$$
f(x) = \max(0.01x,x)
$$
> true shape
<iframe src="https://www.desmos.com/calculator/xrjuxeujmo?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

> Illustration
@import "../resources/leakyrelufunc.png"

- Avoids saturation in both positive and negative regions, i.e. will not produce a 0 gradient in any scenario
- Similar speed to that of standard ReLU


### Tips in Practice

- ReLU is most common
- Try Leaky ReLU in certain circumstances
- Only try tanh or sigmoid as last layer

### Design

A multilayer perceptron is comprised of layers or banks of neurons that feed into each other and eventually into an output layer of 1 neuron or a softmax function for probabilistic networks.

The first layer can the thought of as the input data, the following $n-2$ layers are the *hidden layers* which learn the optimal parameters. The final layer is the output layer producing the probability or label for a given sample

## Convolutional Neural Networks

### Dot Product and Convolution

The dot product of $\vec{a} = \lang a_1,\ldots,a_n \rang$ and $\vec{b} = \lang b_1,\ldots, b_n\rang$ is defined as:

$$
\vec{a}\cdot\vec{b} = \sum_{i=1}^{n}a_ib_i = a_1b_1 + a_2b_2 + \cdots + a_nb_n
$$

The convolution between an image $x$ and a kernel $\textbf{w}$ is given as:

$$
G = \textbf{w} * x\;\;\;\;\;\;\;  G[i,j] = \sum_{u=-k}^{k}\sum_{v=-k}^{k}\textbf{w}[u,v]x[i-u,j-v]
$$

> Convolution is also sometimes denoted as $\circledast$

Where $u$ and $v$ are indices in the kernel grid and $i$ and $j$ are indices in the image grid. $k$ denotes the radius of the kernel

Convolutional Neural Networks employ this convolution function to extract and learn features from input image data.

Kernels exist for edge detection, sharpening and blur. Networks often learn kernels that are a combination of many of these in order to extract complex features from the images.

## Data Pre-processing

The idea behind pre-possessing our input data is to make our loss function and resulting loss less sensitive to changes in the model parameters as this makes it hard to optimise our model.

We will look at 2 different normalisation methods:

### Min-Max

$$
\text{Min-Max} = \frac{\text{value}-\text{min}}{\text{max}-\text{min}}
$$

@import "../resources/min-max-norm.png"

This method of normalisation guarantees all features will have the exact same scale but does not handle outliers well.

### Z-Score

$$
\text{Z-Score} = \frac{\text{value}-\text{mean}}{\text{std}}
$$

$$
\text{Z-Score} = \frac{x-\bar{x}}{\sigma}
$$

@import "../resources/z-score-norm.png"

This method handles outliers well burt does not produce normalised data with the exact same scale.

### PCA - Principal Component Analysis

1. By performing principal component analysis on the original data we centre the data at 0 and rotate into the eigenbasis of the data's covariance matrix. In so doing, we de-correlate the data
2. Each dimension is additionally scaled by eigenvalues, transforming the data's covariance matrix into the identity matrix. Geometrically, this essentially corresponds to stretching and squeezing the data into an isotropic gaussian *blob*

@import "../resources/pca.png"