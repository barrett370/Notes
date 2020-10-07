# Lecture 4: Arithmetic Expressions

## A simple arithmetic language

$$
t ::= \texttt{true} | \texttt{false} | \texttt{if } t \texttt{ then } t \texttt{else } t | 0 | \texttt{succ }t | \texttt{pred }t | \texttt{iszero }t
$$

This can be implemented in Haskell as: 

```haskell
data Arith = 
  T
  | F
  | Ite Arith Arith Arith
  | Zero
  | Succ Arith
  | Pred Arith
  | Iszero Arith deriving (Show)
```

This is an inductive definition of a type of arithmetic expressions.

We will start by defining a function to compute the size of a term in Haskell:

```haskell
size :: Arith -> Integer
size t =
  case t of 
    T -> 1
    size F -> 1
    size (Ite a b c) -> 1 + size a + size b + size c
    size Zero -> 1
    size (Succ a) -> 1 + size a
    size (Pred a) -> 1 + size a
    size (Iszero a) -> 1 + size a
```

We can go on to define a `depth` function, essentially calculating the depth of the abstract syntax tree:
We require two helper functions, `max2` and `max3`

```haskell

max2:: Integer -> Integer -> Integer
max2 a b 
    | a < b = b
    | otherwise = a

max3 :: Integer -> Integer -> Integer
max3 a b c = max2 (max2 a b) c

depth :: Arith -> Integer

depth t 
   = case t of 
        T -> 1 
        F -> 1 
        Zero -> 1
        Ite a b c -> 1 + max3 (depth a) (depth b) (depth c)
        Succ a -> 1 + depth a
        Pred a -> 1 + depth a
        Iszero a -> 1 + depth a
```

****Note the inbuilt `max` function could have been used instead of `max2`**

#### Induction on Arithmetic Expressions 

Let us prove that $ \texttt{depth } t \leq \texttt{size } t$ by induction on $t$ 

##### Base case (1)

if $t = \texttt{T}$ then $ \texttt{depth T} = 1 \leq \texttt{size T}  = 1$

##### Base case (2) 

if $t = \texttt{F}$ then $ \texttt{depth F} = 1 \leq \texttt{size F } = 1$

##### Base case (3)

if $t = \texttt{Zero}$ then $\texttt{depth Zero} =1 \leq \texttt{size Zero} = 1$

##### Inductive case (1)

if $t = \texttt{lte } a b c $, assume $\texttt{depth } a \leq \texttt{size }a$ & $\texttt{depth }b \leq \texttt{size }b$ & $\texttt{depth }c \leq \texttt{size }c$ and prove $\texttt{depth}(\texttt{lte }a b c) \leq \texttt{size}(\texttt{lte }a b c)$

$$
\texttt{depth}(\texttt{lte }a b c ) \\
= 1 + \texttt{max}(\texttt{depth }a) (\texttt{max} (\texttt{depth }b)(\texttt{depth }c)) \\
\leq 1 + \texttt{max} (\texttt{size }a) (\texttt{max}(\texttt{size }b)(\texttt{size }c)) \\
\leq 1 + \texttt{size }a + \texttt{size }b + \texttt{size }c \\
= \texttt{size }(\texttt{lte }a b c)
$$


##### Inductive case (2)

if $t = \texttt{Succ }a$ then assume $\texttt{depth }a \leq \texttt{size }a$ and prove $\texttt{depth}(\texttt{Succ }a) \leq \texttt{size}(\texttt{Succ }a)$

$$
\texttt{depth}(\texttt{Succ }a) \\
= 1 + \texttt{depth }a \\
\leq 1 + \texttt{size }a\\
= \texttt{size}(\texttt{Succ }a)
$$


##### Inductive Cases 3 & 4 are similar to case (2) 


