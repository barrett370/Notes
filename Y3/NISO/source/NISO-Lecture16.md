# Lecture 16: Co-Evolution 

Co-evolution is where the fitness of an individual is dependant on other individuals in the population. This causes the fitness  of one individual to directly impact the fitness landscape for others.Additionally, fitness of identical individuals can vary between runs based on the population as a whole.

## Types of Co-Evolution

1. Evaluation Based 
   - Defined as either competitive or cooperative
2. Population-Organisation Based
   - Either using inter or intra population metrics

## Example: Sorting Algorithm

The goal of any sorting algorithm is, given a set of $n$ items, return a data structure containing the same $n$ items but in some order be it alphabetical or numerical.

The efficiency of a sorting algorithm can be expressed in terms of the minimum number of comparisons needed. One sorting algorithm developed by *Green* required 60 comparisons.

To produce a genetic sorting algorithm we need a way of encoding the *sorting net*. One way of doing this is as a order list of pairs for comparison, these will be our **phenotypes**. We will consider nets of 60-120 comparisons. Our **Genotype** is made up of diploid chromosomes where 1 individual has 15 pairs of 32 bit chromosomes each encoding 4 comparisons

We will also require a fitness measure. One candidate is the percentage of cases sorted correctly. The issue being, *how do we compute this?* To test all possible inputs is too slow and testing a fixed set of inputs raises the further question as to which to test.

Initial implementations following this pattern performed the following: 

- Placed individuals on a 2D grid to promote speciation
- The fitness was computed from a random subsample to attempt to solve the problems outlined above.
- The lower half of the population by fitness is deleted and replaced with a copy of a surviving neighbour
- Pairing performed in the local neighbourhoods.
- A special crossover operator designed for diploid genotypes is used followed by a mutation with a mutation rate of 0.001
- Population sizes used ranged from 512-1Million over 5000 generations. 

Sadly, these implementations only yielded networks of 65 comparison, worse than the human developed algorithms. 

Why was this the case? One reason may be that after the early generations as the test cases were randomly generated, the difficult of the test remained roughly constant, causing development to stagnate. 

Co-Evolution was a proposed solution to this problem. In Co-Evolution both the algorithms and the test cases were evolved simultaneously. Essentially, the algorithms aim to sort whilst the test cases aim to *trip up* the algorithms, same principal as Generative Adversarial Networks from Neural Computation. 

This approach is inspired by the predator-prey or host-parasite relationships seen in nature. It led to the algorithms getting better and the test cases getting harder. 

Algorithms produced using this approach required 61 comparisons very close to the best that had been created manually.

## Example: Game Playing

After the success of Co-Evolution in creating sorting algorithms people began experimenting with Intra-population competitive co-evolution. An early example was the attempt to evolve an artificial backgammon player. 

Co-Evolution solves the issue in the development of artificial game players, who or what to test the individuals against. Candidates can be evaluated against other evolved programs.

In intra-population co-evolution all genotypes are of the same type as they are all from the same population. 

The pseudocode for a simple backgammon learner is as follows: 

1. Initial Neural Network (NN) is $NN(k); k=0$
2. Generate a mutant *challenger* of $NN(k)$ 
   $$w'(i,j) = w(i,j) + \mathcal{N}(0,\sigma)$$
3. If $NN'(k)$ is beaten by $NN(k)$ 
   1. $NN(k+1) = NN(k)$
4. Else 
   1. $NN(k+1) = 0.95 \cdot NN(k) + 0.05 \cdot NN'(k)$ 
5. $k=k+1$; GOTO 2 unless finished

An implementation of the above algorithm used a 197-20-1 fully connect feed-forward neural network with initial weights of 0. There was no direct training for the Neural Networks as the learning was done on a population level. The population size of the EA was 1 and used a simple mutation operator whereby Gaussian noise was added to the weights. No recombination operator was used. This approach was quite performant.

40% of players after 100,000 generations were able to beat a *'strong expert-trained program (PUBEVAL)* 

