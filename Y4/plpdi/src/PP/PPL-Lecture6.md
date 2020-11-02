# Lecture 6: Small Step Operational Semantics


Small step operational semantics specifies how programs execute 1 step at a time.

SSOS makes it easier to reason about complex features are we have a much more detailed picture of the execution.

Big Step Operational Semantics hides non-termination, SSOS does not. 

Once again with the $\lambda$-Calculus our states are $ \lambda$-terms and transitions are provided by inference rules. Our values are $ \lambda$ abstractions of the form $ \lambda x.M)$ and are denoted as $V$.

## Rules:

### $\beta$ rule:

$$
\overline{( \lambda x.M)V \rarr_v M[x \backslash V]}^\beta
$$

Essentially applies a $\beta$ reduction.

Note the difference in arrow with $\implies$ used for big step operational semantics and $\rarr$ used for SSOS

### Context Rules:

$$
\frac{M \rarr_v P}{M N \rarr_v P N} \texttt{APP}_1
$$

$$
\frac{M \rarr_v P}{V M \rarr_v V P}\texttt{APP}_2
$$

We use $\rarr^*_v$ as the reflexive and transitive closure of $\rarr_v$

## Evaluation Strategy

As in Big step operational semantics, we can employ different evaluation strategies. Above, we have used _call by value_ or eager evaluation. Below are the rules for _call by name_ or lazy evaluation.

### The $\beta$ Rule:

$$
\overline{(\lambda x.M)N \rarr_n M[x \backslash N]}^\beta
$$

### Context Rule:

$$
\frac{M \rarr_n P}{M N \rarr_n P N}\texttt{APP}
$$

Again, we define $\rarr^*_n$ as the reflexive and transitive closure of $\rarr_n$ 
$ M \rarr^*_n N \iff (M = N \cup \exists P. M \rarr_n P \cap P \rarr^*_n N)$

## Properties

### Values:

If $M \rarr^*_v V$ and $V$ is a value then $M \implies_v V$
If $M \rarr^*_n V$ and $V$ is a value then $M \implies_n V$

### Deterministic:

If $M \rarr_v N$ and $M \rarr_v P$ then $N = P$
If $M \rarr_n N$ and $M \rarr_n P$ then $N = P$

### $\beta$-equality

If $M \rarr_v N$ then $M =_\beta N$
If $M \rarr_n N$ then $M =_\beta N$


## Evaluation Contexts

The untyped pure $\lambda$-Calculus Small step semantics has only:

- 2 context rules in the call-by-value version
- 1 context rule in the call-by-name version

However, other languages can, and do, have many more.

Evaluation context provides a way to **compactly** express context rules.

An evaluation context is a term with a special variable $\bullet$ called a **hole**

If C is an evaluation context, then $C[M]$ represents $C$ with $M$ substituted for $\bullet$. For example:

$$
((\lambda x.x)\bullet)[M] = (\lambda x.x)M
$$

Every evaluation context $C$ represents a context rule.

$$
\frac{M \rarr_v N}{C[M] \rarr_v C[N]}
$$

expressing that $M$ can be reduced to $N$ in the context $C$ where $C$ is defined in the form:

$$
C ::= \_ | \_ | \_ | \ldots
$$


### Evaluation Contexts for the $\lambda$-Calculus

Values ($\lambda$ abtractions of the form $\lambda x.M$) are denoted by $V$

#### Call-by-value evaluation contexts:

$$
C ::= \bullet | C M | V C
$$

#### Call-by-name evaluation contexts:

$$
C ::= \bullet | C M
$$

Using these evaluation contexts, we can redefine the small-step semantics of the untyped pure $\lambda$-Calculus as:

#### Call-by-value

$$
\overline{(\lambda x.M)V \rarr_v M[x\backslash V]}^\beta
$$

$$
\frac{M \rarr_v N}{C[M] \rarr_v C[N]}\texttt{APP}_C
$$

#### Call-by-name

$$
\overline{(\lambda x.M)N \rarr_n M[x\backslash N]}^\beta
$$

$$
\frac{M \rarr_n N}{C[M] \rarr_n C[N]}\texttt{APP}_C
$$

**Note: although these look the same, the definition of $C$ for each is different. resulting in different rules**

### Normal Forms

A normal form, with respect to a transition system, is a form that cannot be reduced further. 

A term that has a normal form is said to **converge** otherwise they are said to **diverge**.

A normal form that is not a value is said to be **stuck** e.g. $x$ or $x x $ or $x(\lambda x.x)$ as values are defined as $\lambda x.M$

#### Theorem:

> If a term converges using call-by-value then it converges using call-by-name, although not necessarily to the same normal form.


### Normal Order Reduction

- Reduces under $\lambda$s 
- Not used in practice
    - As it can produce _unwieldy_ expressions

#### Theorem:

> If $M$ is $\beta$-equal to a $\beta$-normal form $N$, then the normal order reduction reduces $M$ to $N$

#### Theorem

> Call-by-name converges whenever normal order converges


Normal order reduction is defined as:


$$
\underline{x \implies_{no} x }
$$
$$
\frac{M \implies_{no} N}{\lambda x.M \implies_{no} \lambda x.N} \\
$$
$$
\frac{M \implies_{n} \lambda x.P \;\;\; P[x\backslash N] \implies_{no} Q}{M N \implies_{no} Q}
$$
$$
\frac{
    M \implies_{n} P \neq \lambda x.T \;\;\; M \implies_{no} Q \;\;\; N \implies_{no} R
}{
M N \implies_{no} Q R
}
$$
