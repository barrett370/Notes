# Lecture 5: Big-Step Operational Semantics

## Operational Semantics

The goal of operational semantics is, given a programming language, to be able to describe how to use it to compute.

There are several approaches:
- Denotational semantics
    - The meaning of a term is an abstract mathematical object
    - An advantage is that there are often many known mathematical properties of the object (term). We can use these rules to derive properties of the language we are deriving semantics for.
- Axiomatic semantics
    - The meanings of programs are provided by laws (axioms)
    - This approach focuses on the process of reasoning about programs
- Operational semantics (Covered in this lecture)
    - Specifies the behavior of programs by describing how they execute on abstract machines that perform the steps of computation
    - This approach helps with the development of a language interpreter 

### Structural Operational Semantics

Rules are specified in a syntax directed way

Multiple kinds:

- Small-step operational semantics
    - Specifies how programs execute 1 step at a time.
    - Easier to model and reason about complex features (like concurrency (where intermediate steps are critical))

- Big-Step operational semantics
    - Specifies how programs execute in 1 step from the initial configuration to the final value. 
    - Also known as **natural semantics**
    - Closely models a recursive interpreter
    - Typically have less rules -> smaller proofs

#### Transition System

The operational semantics of a language is given by a **transition system** that is made up of:

- A set of states
- A binary relation "next state" *transition relation* between states

For example, in the $\lambda$-Calculus states can just be $ \lambda$-terms

In languages with references, states can be pairs of a program and a store. Where the store contains the values currently held in the memory 

The transition relation can be defined as a **proof system** consisting of derivation rules in a natural deduction style.

We say: There is a transition from $M$ to $N$ if there is a derivation that $M$ and $N$ are related.

##### The Transition System of the $\lambda$-Calculus

In the $\lambda$-Calculus:

- States are $ \lambda$-terms
- Transitions are provided by 2 inference rules

1st Rule:

$$
\overline{ \lambda x.M \implies_v \lambda x.M}^\texttt{VAL}
$$

2nd Rule:
$$
{\frac{M \implies_v \lambda x.P \;\;\; N \implies_v Q \;\;\; P[x \backslash Q] \implies_v V}{M N \implies_v V}}\texttt{APP}
$$


### Evaluation Strategies

The examples seen in slide 11 require evaluating the argument before doing a $\beta$-reduction.

Here we say that these semantics employ a strategy known as call-by-value, strict or *eager*, where the arguments to functions are always evaluated whether or not they are used in the body of the function.

Often $ \lambda$-terms have several redexes. An evaluation strategy *fixes* the order in which redexes must be reduced.

The semantics seen so far is called **call-by-value big step operational semantics** This is why we have used the $v$ notation on $\implies_v$ 

We will go on to see the *call-by-name* (**lazy**) evaluation strategy.

### Call-by-Name big-step semantics of the untyped $\lambda$-Calculus

This also has 2 rules:

1) 

$$ 
\overline{ \lambda x.M \implies_n \lambda x.M}^\texttt{VAL}
$$

2)

$$
\frac{M \implies_n \lambda x.P \;\;\; P[x \backslash N] \implies_n V}{M N \implies_n V}\texttt{APP}
$$

### Properties


Values:

- If $M \implies_v N$ then $N$ is a $ \lambda$-abstraction
- If $M \implies_n N$ then $N$ is a $ \lambda$-abstraction 

Deterministic
- If $M$ \implies_v N$ and $M \implies_v P$ then $N = P$ 
- If $M \implies_n N$ and $M \implies_n P$ then $N=P$

$ \beta$-equality

- If $M \implies_v N$ then $M =_\beta N$
- If $M \implies_n N$ then $M =_\beta N$

## Implementation of an interpreter in Haskell

