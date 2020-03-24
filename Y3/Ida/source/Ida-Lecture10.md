# Lecture 10: Gaussian Mixture Models

Used in a wide range of applications.

## An Aside: Statistics Revision

### Discrete random variables 

Suppose $Y$ is a random variable which can take any value in the discrete set $X = \left\{ x_1,x_2,\ldots,x_M\right\}$. With this, suppose $y_1,y_2,\ldots,y_N$ are samples from the variable $Y$.

If $c_m$ is the number of times that $y_n = x_m$ then an estimate of the probability that $y_n$ takes the value $y_n$ is given by: 

$$
P(x_m) = P(y_n = x_m) \approx \frac{c_m}{N}
$$

### Continuous Random variables

Generally, out data is not restricted to a finite set of values, they instead, can take any value $\in \R^N$ 

With a sample space such as this, simply counting occurrences of each value is no longer viable. Instead, we use a probability density function or PDF on $N$-dimensional space, $V$. A PDF is defined as $p: V\rightarrow \R$ such that:

$$
p(v) \geq 0, \forall v \in V, \int_v p(v)\delta v = 1 
$$

A random variable $X$ defined on $V$ is determined by a probability density function $p$ if for any $U \sube V$ 

$$
prob(X\in U) - \int_U p(v)\delta v =1 
$$

#### Gaussian PDFs

For example, a normal or Gaussian distribution is defined as: 

$$
p(x) = \frac{1}{\sqrt{2\pi \sigma}}\exp\left( -\frac{(x-\mu)^2}{2\sigma} \right)
$$

A scalar or univariate Gaussian PDF is defined by two parameters, its mean $\mu$ and its variance $\sigma$. For a **multivariate** Gaussian PDF defined on a vector space, $\mu$ is the mean **vector** and $\sigma$ is the covariance **matrix**.


<iframe src="https://www.desmos.com/calculator/nc6ykxhcet?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

### Standard Deviation

Standard deviation is the square root of the variance.

In a standard Gaussian PDF:

- 68% of the area under the curve lies within one standard deviation of the mean $P(\mu -s \leq x \leq \mu +s) =0.68$
- 95% of the are under the curve lies within 2 sds of the mean $P(\mu - 2s \leq x \leq \mu + 2s) = 0.95$
- 99% of the area under the curve lies within 3 sds of the mean $P(\mu -3s \leq x \leq \mu + 3s) = 0.99$

### Multivariate Gaussian PDFs

In the multivariate case, the random variable takes $N$-dimensional vector values and the PDF is given by:

$$
p(x) = \frac{1}{\sqrt{(2\pi)^N|\Sigma|}}\exp \left( \frac{-1}{2}(m-x)^T\Sigma^{-1}(m-x) \right)
$$

Where $m$ is the $N$-dimensional vector mean and $\Sigma$ is the $N\times N$ covariance matrix

## Fitting a Gaussian PDF to Data

Suppose we have a sample $Y$ which is a set of $N$ measurements $\left\{ y_1,\ldots, y_n, \ldots, y_N\right\} $

We can define a Gaussian PDF $p$ with a mean $\mu$ and a variance $\sigma$ as:

$$
p(y | \mu , \sigma) = \prod_{n=1}^{N}p(y_n | \mu , \sigma)
$$

We call $p(y| x)$ a likelihood as it is how likely $y$ is given $x$. From this we attempt to maximise the likelihood through a process called *maximum likelihood estimation*

### Bayes Theorem ( : 

$$
p(m,v | Y) = \frac{p(Y | m,v)p(m,v)}{p(Y)}
$$

Where our left hand side value is known as the *posterior probability*

This is a possible alternative to maximum likelihood estimation. 


### Maximum Likelihood Estimation

For a Gaussian distribution, we will want to maximise $p(y| \mu, \sigma)$ 

Intuitively, the maximum likelihood estimation for $\mu$ should be the average value of $y_1,\ldots,y_N$, i.e. the sample mean. Similarly, the maximum likelihood estimate for $\sigma$ should be the variance of $y_1,\ldots,y_N$, i.e. the sample variance 

We can therefore solve this by setting the following:

$$
\mu = \frac{1}{N}\sum_{n=1}^{N}y_n, \sigma = \frac{1}{N}\sum_{n=1}^{N}(y_n-\mu)^2
$$

### Gaussian Mixture PDFs

In practice, most datasets are not normally distributed.

Gaussian Mixture PDFs or Gaussian Mixture Models are used to model multi-modal and other non-Gaussian distributions

A GMM is a weighted average of several Gaussian PDFs, referred to as component PDFs

For example, if $p_1$ and $p_2$ are Gaussian PDFs, then:

$$
p(y) = w_1p_1(y) + w_2p_2(y)
$$

Generally, an $M$ component Gaussian Mixture PDF is defined by:

$$
p(y) = \sum_{m=1}^{M}w_mp_m(y)
$$

where each $p_m$ is a Gaussian PDF and :

$$
0 \leq w_m \leq 1, \sum_{m=1}^{M}w_m =1 
$$

This process is similar to clustering in that both methods rely on centroids/ means to model data. In clustering, there is no parameter specifying the 'spread' of a cluster whereas, in a GMM component PDF this is done using the covariance matrix

In clustering, we assign a sample to the closest centroid. In a GMM a sample is assigned to all components with varying probability.

#### Estimating the parameters of a Gaussian Mixture Model

A Gaussian Mixture Model with $M$ components has:

- $M$ means: $\mu_1,\ldots,\mu_M$ 
- $M$ variances: $\sigma_1,\ldots,\sigma_M$
- $M$ mixture weights: $w_1,\ldots,w_M$ 

Given $y = y_1,\ldots,y_M$ how do we estimate these parameters? I.e. how do we find MLEs for $\mu, sigma$ and $w$ 

