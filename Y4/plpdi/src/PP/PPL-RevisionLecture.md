# Principals of Programming Languages: Revision Lecture

## Simply typed $\lambda$-Calculus

The syntax of the Simply Typed $\lambda$-Calculus can be defined as:

$$
T ::= \mathbb{B} | T \rarr T 
$$
$$
M ::= x | \lambda x: T.M | M M | \texttt{true} | \texttt{false} | \texttt{if } M \texttt{ then } M \texttt{ else } M
$$

You can see here that we use the Church style for typing whereby, variables in $\lambda$ abstractions are annotated with types.

Values are atomic, i.e. they cannot be evaluated further and are of the form:

$$
V ::= \lambda x: T.M | \texttt{true} | \texttt{false}
$$

When we compute a term we are typically trying to reduce it to a value.

When we want to define the call-by-value small-step operational semantics of a language we use evaluation contexts. The Call-by-value evaluation contexts for the small-step operational semantics of $\lambda$-Calculus is defined as:

$$
C ::= \bullet | C M | V C | \texttt{if } C \texttt{ then } M \texttt{ else } M 
$$

A context is a term with a *hole* ($\bullet$) in it. 

You can tell that this is the call-by-value evaluation context as you can see that we always evaluate the arguments of a application before the application itself.

These contexts yield the following rules:

$$
\frac{}{( \lambda x: T. M) V \rarr_v M[x\backslash V])}\beta
$$

$$
\frac{}{ \texttt{if true}  \texttt{ then } M \texttt{ else } N \rarr_v M } \texttt{IteT}
$$

$$
\frac{M \rarr_v N}{C[M] \rarr_v C[N]} \texttt{CTX}_C
$$

$$
\frac{}{\texttt{if false}  \texttt{ then } M  \texttt{ else } N\rarr_v N} \texttt{IteF}
$$

And to facilitate the typing of these expressions we use the following typing rules:

$$
\frac{}{\Gamma,x : T \vdash x : T}  \texttt{VAR}
$$

$$
\frac{\Gamma, x : T \vdash M:U}{\Gamma \vdash \lambda x:T.M : T \rarr U} \texttt{ABS}
$$

$$
\frac{\Gamma \vdash M : T \rarr U \Gamma \vdash N :T}{\Gamma \vdash M N : U} \texttt{APP}
$$

$$
\frac{}{\Gamma \vdash \texttt{true} : \mathbb{B}} \texttt{T}
$$

$$
\frac{}{\Gamma \vdash \texttt{false} : \mathbb{B} } \texttt{F}
$$

$$
\frac{\Gamma \vdash M : \mathbb{B} \Gamma \vdash N :T \Gamma \vdash P :T}{\Gamma \vdash \texttt{if } M \texttt{ then } N \texttt{ else } P:T  } \texttt{ITE}
$$