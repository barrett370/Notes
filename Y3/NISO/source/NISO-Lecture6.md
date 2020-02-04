# Lecture 6: Selection and Reproduction

## Selection

Selection is not a search operation but influences the search performance of our algorithms significantly.

Selection is usually performed before variation operations, allowing for the breeding of the fittest individuals 

The process of selection emphasises exploiting better solutions in a population by selecting one or more copies of good solutions and inferior solutions with a much lower probability (but not 0)

We continue to allow for selection of inferior solutions to prevent our solution from getting *'stuck'* in a local minima/ maxima

There are multiple selection schemes: 

- Fitness proportional selection 
- Ranking Selection
- Truncate selection 
- Tournament selection 
- $(\mu + \lambda)$ and $(\mu,\lambda)$ selection 

We can group these schemes based on

- Relative fitness: fitness proportional selection 
- Ranking: ranking, tournament, truncation, $(\mu + \lambda) $ and $(\mu,\lambda)$ 

### Fitness Proportional Selection 

Fitness Proportional Selection can be represented using a roulette wheel

Selecting an individual $i$ has a probability:
$$
p_i = \frac{f_i}{\sum_{j=1}^M f_j}
$$

where $f_i$ is the fitness value of individual, $i$, $M$ is the number of individuals 

This does not allow for negative fitness values. Individuals with higher fitness values will be more likely to be selected, but there is still a chance that they might be eliminated.

Individuals with a low fitness may still survive selection, allowing some weak individuals who may help escape local optima 

#### Scaling 

We notice that in early generations there might emerge a sub-population of *"super individual"* with very high fitness values 
Conversely, in later generations, we may find no such sub-population.

These *"super individuals"* can result in premature convergence to a local optimum
A lack of separation in our population, seen in later generations can lead to slow convergence

How can we maintain the same selection pressure throughout training ? 

We can achieve this by replacing raw fitness values with scaled fitness values $f_i'$

Linear scaling takes the form: 

$$
f_i' = a + b \cdot f_i 
$$

where $a$ and $b$ are constants, usually $a = \max(\textbf{f})$ and $b = \min(\textbf{f})/M < 1$ where $\textbf{f} = f_1,f_2,\ldots,f_M$

Fitness Proportional Selection is not widely used now, instead people opt for other schemes such as :

### Ranking Selection 

In ranking selection we sort our population of size $M$ from best to worst by their fitness values

$$
x_{(M-1)}',x_{(M-2)}',\ldots,x_{(0)}'
$$

From this select the top $\gamma$-ranked individual $x_\gamma'$ with a probability $p(\gamma)$ where $\gamma$ is the rank and $p(\gamma)$ is the ranking function such as:

- Linear Ranking 
- Exponential ranking
- Power Ranking 
- Geometric Ranking 

#### Linear Ranking Function: 

$$
p(\gamma) = \frac{ \alpha + (\beta - \alpha) \cdot \frac{\gamma}{M-1} }{M}
$$

Where $\sum_{\gamma = 0}^{M-1} p(\gamma) =1 $ implies $\alpha + \beta =2 $ and $1 \leq \beta \leq 2$ 

This gives us the expectation that:

- The best individual (where $\gamma = M -1 $) reproduces $\beta$ times as $p(M-1) = \frac{\beta}{M}$ 
- The worst individual (where $\gamma = 0$) reproduces $\alpha$ times as $p(0) = \frac{\alpha}{M}$ 

#### Other Ranking Functions

##### Power Ranking Function 

$$
p(\gamma) = \frac{\alpha + (\beta - \alpha)\cdot (\frac{\gamma}{M-1})^k}{C}
$$

##### Geometric ranking function

$$
p(\gamma) = \frac{\alpha \cdot (1-\alpha)^{M-1-\gamma}}{C}
$$

##### Exponential ranking function

$$
p(\gamma) = \frac{1-e^{-\gamma}}{C}
$$


Where C is a normalising factor and $0 < \alpha < \beta$

### Truncated Selection

In this scheme first rank individuals by fitness value then select some proportion, k of the top ranked individuals. Usually $k=0.5$ or $k=0.3$ 

### Tournament Selection 

In tournament selection you set a tournament size, $k$ before: 

1. Randomly sampling a subset $P'$ of $k$ individuals from a population $P$ 
2. Select the individual in $P'$ with the highest fitness
3. Repeat 1 and 2 until enough offspring are selected

This is one of the most popular selection methods in genetic algorithms, with binary tournament selection ($k=2$) being the most popular flavour

### $(\mu + \lambda)$ and $(\mu,\lambda)$ Selection 

#### $(\mu + \lambda)$ selection 

- Parent population size of $\mu$ 
- Generate $\lambda$ offspirng from randomly chosen parents
- Select $\mu$ best individuals among **parents and** offspring

#### $(\mu,\lambda)$ selection , where $\lambda > \mu$ 

- Parent population size of $\mu$ 
- Generate $\lambda$ offspring from randomly chosen parents
- Select $\mu$ best individuals **from offspring**


### Selection Pressure 

Selection pressure is the degree to which selection promotes fitter individuals 

#### Selection Pressure on exploration vs exploitation

A higher selection pressure leads to more exploitation and faster, premature convergence to a local optimum

A low selection pressure promotes exploration and a slow convergence

#### Measuring Selection Pressure

We measure the selection pressure of a scheme with a value called *"take-over time"*, $\tau*$ 

Assuming we have a population of size $M$ and initial population with one unique fittest individual $x*$ we apply selection repeatedly with no other operations. $\tau*$ is the number of generations until the population consists entirely of $x*$ 

Higher values of take-over time mean lower selection pressure 

| Selection Function | $\tau* \simeq$                                 | Note                                                |
| ------------------ | ---------------------------------------------- | --------------------------------------------------- |
| Fitness Prop       | $\frac{M\ln{ M}}{c}$                           | Assuming a power law objective function $f(x) = x^c |
| Linear Ranking     | $\frac{2\ln (M-1)}{\beta -1}$                  | $1\leq \beta \leq 2$                                |
| Truncation         | $\ln M$                                        |                                                     |
| Tournament         | $\frac{\ln M}{\ln k}$                          | tournament size $k$                                 |
| $(\mu + \lambda)$  | $\frac{\ln \lambda}{\ln{\frac{\lambda}{\mu}}}$ |                                                     |

## Reproduction 

Reproduction is the control of how a genetic algorithm creates the next generation.

Generational vs steady state

- Generational EAs, aka Standard EAs, use all new individuals after variations to replace the worst individuals in the old population to create the new population
- Statdy state EAs: only use a few individuals to replace the old population at any one time

$n$-elitisms, this is the process by which we always copy the $n$ best individuals to the next generation 

Generational gap: the overlap between old and new generations. I.e. the individuals who do not go through any variation operators between generations


