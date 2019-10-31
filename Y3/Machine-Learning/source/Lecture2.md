# Lecture 2: Model Bias & Variance

## Noisy Data & Overfitting

Data can introduce challenges into our model fitting algorithms. Given a model that is *too expressive* ,i.e. too high dimensionality, our model may overfit and instead of just capturing the underlying pattern/ equation, it may also fit the noise.

To show this we will use the equation

###### (1)

$$y(x) = \sin(2\pi x)$$

Clearly if we were to set our basis functions to $\phi = \{sin(2\pi x)\}$ we could easily fit with one dimension $w_0 = 1$ resulting in $f(\textbf{w},x)= w_0\sin(2\pi x)$ However, we will look at a more generalised approach as in most practical applications we would not have, $a)$ such an obvious underlying function or $b)$ the underlying function known to us.

Instead we seek to find a good approximation using the polynomial basis set. Formally we wish to *solve* the following

###### (2) 

$$\sin(2\pi x) = \sum_{i=0}^{M-1} w_ix^i$$

We know that such an approximation is possible via the *Maclaurin series*, $\sin(ax) = ax - \frac{a^3x^3}{3!} + \frac{a^5x^5}{5!} + \frac{a^7x^7}{7!}+ \cdots$ where, in our case with $a = 2\pi$, $\textbf{w} \approx ( 0, 6.28, − 41.34, 0, 81.61, 0, − 76.7, 0, 42.1, \cdots)$



<sub>**These notes were heavily influenced by those of Dr. Iain Styles, University of Birmingham, School of Computer Science*</sub>


