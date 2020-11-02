# Lecture 7: Simply Typed $\lambda$-Calculus

This is an example of one of the most elementary type systems.
Types are used to give _meaning_ to terms. For example, if we can assign the type $\N$ to an expression, we know that it computes to a number without any evaluation steps.

**note: this does not hold for all languages with different type systems, for instance a function returning `int` in Haskell could diverge and not return anything**

They are also used to document code directly.

Type Checking: this is the process of checking that some given expression has some given type with respect to given typing rules. We can therefore view type checking as a form of lightweight verification.

## History

- Developed by Church and Curry in 1934
- It is a variant of the untyped $\lambda$-Calculus
    - Build on top of a collection of _ground types_
    - We will consider a single _ground type_: **Booleans ($\mathbb{B}$)**
    - The only other type is the type of functions, such as: $\mathbb{B} \rarr \mathbb{B}$

## Syntax of the simply typed $\lambda$-Calculus

### Syntax of simple types

$$
T ::= \mathbb{B} | T \rarr T 
$$

### Syntax of terms

$$
M ::= x | \lambda x: T.M | M M | \texttt{true} | \texttt{false} | \texttt{if } M \texttt{ then } M \texttt{ else } M 
$$

**Note: true and false are no longer defined as terms in the language** 

**Note: a $\lambda$-abstraction $\lambda x :T.M$ mentions the type $T$ of its argument- this is called explicit typing and is in the Church-style**

By convention, we say that $\rarr$ is right associative, i.e. $T_1 \rarr T_2 \rarr T_3 \equiv T_1 \rarr (T_2 \rarr T_3)$

## Small-Step call-by-value operational semantics

Values: 

$$
V ::= \lambda x:T.M | \texttt{true} | \texttt{false}
$$

call-by-value evaluation contexts

$$
C ::= \bullet | C M | V C | \texttt{if } C \texttt{ then } M \texttt{ else } M
$$

Rules:

$$
\overline{(\lambda x:T.M)V \rarr_v M[x\backslash V]}^\beta
$$

$$
\overline{\texttt{if true then } M \texttt{ else } N \rarr_v M }^\texttt{IteT}
$$

$$
\overline{\texttt{if false then } M \texttt{ else } N \rarr_v N }^\texttt{IteF}
$$

$$
\frac{M \rarr_v N}{C[M] \rarr_v C[N]}\texttt{CTX}_C
$$

### Typing 

The simply typed $\lambda$-Calculus includes typing rules that associate types with expressions:

Derive type judgments of the form $\Gamma \vdash M: T$ where a type environment $\Gamma$ is a partial map from variables to types
- the types of $M$'s free variables
- of the form $x_1: T_1,\ldots,x_n:T_n$
- maps each $x_i$ to $T_i$, i.e. $\Gamma(x_i) = T_i$
- we write $\cdot$ for the empty map
- $\texttt{dom}(\Gamma) = \{x_1,\ldots,x_n\}$
- Let $\Gamma,x:T$ to be the context that
    - maps $x$ to $T$
    - and each $y \in \texttt{dom}(\Gamma)$ such that $y \neq x$ to $\Gamma(y)$

### Syntax Directed Typing Rules

$$
\overline{\Gamma, x:T \vdash x:T}^\texttt{VAR}
$$
$$
\frac{\Gamma,x:T \vdash M:U}{\Gamma \vdash \lambda x:T.M:T \rarr U}\texttt{ABS}
$$
$$
    \frac{\Gamma \vdash M:T \rarr U \;\; \Gamma \vdash N:T}{\Gamma \vdash M N : U}\texttt{APP}
$$
$$
\overline{\Gamma \vdash \texttt{true} : \mathbb{B}}^\texttt{T}
$$
$$
\overline{\Gamma \vdash \texttt{false}: \mathbb{B}}^\texttt{F}
$$
$$
\frac{\Gamma \vdash M: \mathbb{B} \;\; \Gamma \vdash N:T \;\; \Gamma \vdash P:T}{\Gamma \vdash \texttt{if } M \texttt{ then } N \texttt{ else }P : T }\texttt{ITE}
$$


## Expressive Power


Can we find expression that do not have types and get stuck? 

Yes, for example:

- $\texttt{true true}$ does not have a type
- $\texttt{if } (\lambda x : \mathbb{B} . x) \texttt{ then true else false}$

Can we find expression that do not have types and do not get stuck? 

In our type system we are guaranteed that typed expressions do not get stuck.
It also prevents us from typing expressions that do not get stuck, therefore the typed $\lambda$-Calculus is not turing complete as we cannot assign types to all computable functions.

## Properties

### Uniqueness

In a given context $\Gamma$, a term $M$ (with all free variables in $\texttt{dom}(\Gamma)$) has at most one type, and one derivation that is has this type.

### Canonical Forms:

A value of type $\mathbb{B}$ is either $\texttt{true}$ or $\texttt{false}$, and a value of type $T \rarr U$ is of the form $\lambda x: T.M$

### Progress

A closed well-typed term $M$ either is a value or it can be reduced further, i.e. $\exists N, M \rarr_v N$ 
 
### Substitution 

If $\Gamma, x:U \vdash M:T$ and $\Gamma \vdash N:U$ then $\Gamma \vdash M[x\backslash N]:T$

### Preservation

If $\Gamma \vdash M:T$ and $M \rarr_V N$ then $\Gamma \vdash N:T$


### Safety = Progress + Preservation 

Well typed terms do not get stuck.

## Church-style vs. Curry-style

### Church-Style

$\lambda$-abstraction explicitly indicates the type of arguments they expect

$\lambda x: T.M$ 

### Curry-Style

In the Curry-style we instead try to deduce the type of a $\lambda$-abstraction from the uses of $x$ in $M$. This results in another version of the Simply Typed $\lambda$-Calculus

#### Grammar of the Curry-Style Simply Typed $\lambda$-Calculus

$$
T ::= \mathbb{B} | T \rarr T \\
M ::= x | \lambda x.M | M M | \texttt{true} | \texttt{false} | \texttt{if } M \texttt{ then } M \texttt{ else } M 
$$

This change has important consequences including the fact that Uniqueness is no longer satisfied. 

The only rule that differs between the two styles is the $\lambda$-abstraction rule,

We now use $\Gamma \vdash_i M :T$ 

Curry-style simply typed $\lambda$-Calculus' $\lambda$-abstraction rule:

$$
\frac{\Gamma, x:T \vdash_i M :U}{\Gamma \vdash_i \lambda x.M : T \rarr U}\texttt{ABS}
$$

The two calculi are related through the `erasure` function


$$  
\texttt{erase}(x) = x \\
\texttt{erase}(\lambda x :T .M ) = \lambda x. \texttt{erase(M)} \\
\texttt{erase}(M N) = \texttt{erase}(M)\texttt{erase}(N) \\
\texttt{erase(true)} = true\\
\texttt{erase(false)} = false\\
\texttt{erase}(\texttt{if }M \texttt{ then } N \texttt{ else } P) = \texttt{if erase}(M) \texttt{ then erase}(N) \texttt{ else erase}(N)
$$

With the **erasure property** being: If $\Gamma \vdash M:T$ then $\Gamma \vdash_i \texttt{erase}(M):T$