# Talk 1

## Intro to Quantum Mechanics

- Theory describing the smallest structures in the universe

### Useful Quantum Properties for CS

- Superposition: If a system can be in a state $A$ or state $B$, it can also be in a *mixture* of the two
- Measurements, if we measure a system that is in a superposition of states $A$ and $B$, we see either A or B probabilistically. Repeated measurements without resetting will give the same result as the first measurement.
- Uncertainty: pairs of measurements where greater certainty in one measurement causes lower certainty in another
- Entanglement. There exist states of multipartite systems which cannot be described in terms of states of the constituent systems.

- At first these do not seem to be useful properties however, we will see that in certain situations they can be.

#### Superposition and measurement: Schrodinger's cat

- No one has managed to actually carry out the experiment
- If a particle decaying was linked to a poison being released in a box with a cat then by extension of the particle being both decayed and not decayed (superposition) we can say that the cat is both dead and not dead.

#### Qubit

- These are the basic building-block of a quantum computer
- A quantum system with 2 distinct states is a *qubit*
  - People haven't decided on which quantum system is best for the application of computers
- One such system is that of a photon, these have a property called polarisation which can be vertical or horizontal
- Qubits are to quantum computers as Bits are to conventional computers

#### Entanglement

- If we had a pair of entangled qubits we cannot describe the state of either particle independently. But we can describe the joint state of the two particles
- Particles can be entangled over vast distances.  
  - allows us to have information about particles very far away by examining particles entangled to them.
  - We can use this property for communication protocols
- Entanglement can be between more than 2 particles/ qubits

## Quantum Simulation

- No (known) efficient general-purpose method to simulate quantum physics on a conventional computer
- Richard Feynaman first wondered if a quantum computer could be created to solve this.

### Shor's Algorithm for Factoring

- Peter Shor shows that quantum computer can factorise large integers efficiently
  
- Given an integer $N = p \times q$ for prime numbers $p$ and $q$, Shor's algorithm outputs $p$ and $q$
- No efficient classical algorithm
- THe quantum part of the algorithm uses period finding, given a function $f: \Z \rightarrow \Z$ and the promise that there exists a number $a$ st. $f(x+a) = f(x) \forall x$, find $a$

- This algorithm would break the RSA public key crypto-system on which internet security is based.


### Grover's algorithm for Unstructured Search

- Imagine we have $n$ boxes, each containing 0 or 1, We can look inside a box at the cost of 1 query
- We want to find a box containing a 1. on a classical computer this would take $n$ queries in the worst case
- Lov Grover created a quantum algorithm which can solve this is around $\sqrt{n}$ queries
- Could be the basis of quantum machine learning


### The HLL algorithm for solving systems of linear equations

- Given a $N\times N$ matrix $\textbf{A}$ and a unit vector $\vec{b}$, find the vector $\vec{x}$ satisfying $\textbf{A}\vec{x} = \vec{b}$
  - We dont get $\vec{x}$ tself
  - The matrix $\textbf{A}$ needs to be *sparse*
  - Running time is $O(\log(N)\kappa^2)$ vs $O(N\kappa)$ on a standard computer
    - $\kappa$ is the condition number of $\textbf{A}$ which is roughly the ratio of the largest and smallest eigenvalue
  - Applications include machine learning and big data


### Secure Quantum Computing in the cloud

- The *blind quantum computing* protocol
  - Allows the secure delegation of quantum computations to a quantum server. Client does not need any quantum compute capability
  - The server learns nothing about the data or type of computation

## Programming a Quantum Computer

***Could not replicate diagrams, will try and link slide deck***

- Quantum measurements are probabilistic and irreversible. Making measurements often lose quantum effects
- Unitary operations are deterministic, reversible and maintain *quantumness*
  - These tend to make up the bulk of quantum computation.
  - They are written using *quantum circuits*


- Horizontal wires represent qubits
- gates represent operations on one or more qubits

A Qubit state is described by a unit vector $\begin{pmatrix} a \\ b\end{pmatrix}$ where $a$ and $b$ are complex numbers satisfying:

$$|a|^2 + |b|^2 - 1$$
Given a single qubit we can't learn the blaues of $a$ and $b$ a measurement will give the outcome $0$ with probabiliy $|a|^2$ and the outcome $1$ with a probability $|b|^2$

So the vector $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ 

The state of 2 qubits is descibed by a vector of length 4 whose components determine the prob. of each combination of individual states


A state of $n$ cubits is described by a vector of length $2^n$ whose components deterine the probabilities for all the different $n$-bit strings

### Reversible logic gates as unitary operations

The NOT gate corresponds to the matrix $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$








## Building Quantum Computers

As mentioned earlier, there are different approaches using different quantum systems

- Light: Photons are hard to interact with which makes them less suseptable to noise but also harder to run programs with
- Ion Trap
- Superconducting chipsets 

All approaches require very low temperatures to remove a lot background noise

### Quantum Error Correction

Building large scale quantum computers is very difficult due to *decoherence*
If a quantum computer interacts with the outside world is can lose its *quantumness* and behave like a classical computer

- Quantum error correcting codes can be used to fight decoherence
- But they are far from perfect & decoherence is still a major issue 

### Noisy Intermediate Scale Quantum Computing

Often abbreviated to NISQ

- Noisy : do not use error correction
- Intermediate-Scale: 50-100 qubits

Computations should be kept short to avoid errors accumulating. However, they are still expected to outperform standard computers on certain tasks.

> too many diagrams from here, cannot keep up