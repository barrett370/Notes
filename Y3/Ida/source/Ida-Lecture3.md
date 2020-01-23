# Lecture 3: Stopping, Stemming & TF-IDF Similarity

## Text Pre-Processing

### Stop word removal

- Simple techniques to remove *noise words* from texts
- Remove common *noise* words which contribute no information to the IR process. Such as "The"

### Stemming (Morphology)

- Remove irrelevant differences from different *versions* of the same word
- Identify different forms of the same word such as "run" and "ran". We identify them using a common *stem*

Essentially, if a query and a document contian different forms of the same word, then they are related.

Remove *surface markings* from words to reveal their basic form 

- $\texttt{form\underline{s}} \rightarrow \texttt{form, form\underline{ing}} \rightarrow \texttt{form}$
- $\texttt{form\underline{ed}} \rightarrow \texttt{form, form\underline{er}} \rightarrow \texttt{form}$

*"form"* is the **stem** of forms, forming, formed and former

Stemming replaces tokens (words) with **equivalence classes** of tokens

Equivalence classes are **stems**

This:

- Reduces the number of different words in a corpus
- Increases the number of instances of each tokens

However, not all words obey regular rules e.g. $\texttt{run\underline{ning}}\rightarrow\texttt{run}$

A common solution to this problem is to identify a **sub-pattern of letters** within words and devise **rules** for dealing with these patterns

Example rules [Belew, p45]

- $\texttt{(.*)SSES} \rightarrow \texttt{/1SS}$
  - Any string ending *SSES* is stemmed by replacing *SSES* with *SS* 

A stemmer is a piece of software which implements a stemming algorithm
The **Porter Stemmer** is a standard stemmer which implements a set of about 60 rules
The use of a stemmer usually reduces vocab size by 10 to 50 % 

## Simple Text Retrieval

Given 2 documents $d_1$ and $d_2$ assuming:

1) all stopwords have been removed and
2) stemming has been applied. 

We want to know if $d_1$ and $d_2$ are *about* the same thing, i.e. we want to calculate the similarity. 
The simplest approach is to calculate the **TF-IDF** similarity

### Matching

Given a query $\bf{q}$ and a document $\bf{d}$ we want to define a number:

$$
Sim(\textbf{q},\textbf{d})
$$

Given the query we want to return documents $\bf d_1 d_2 \ldots d_N$ s.t. :

- $\bf d_1$ is the document for which $Sim(\bf q,d)$ is biggest
- $\bf d_2$ is the next biggest etc.

### Similarity

The similarity between $\bf q$ and $\bf d$ will depend on the number **terms** which are common to $\bf q$ and $\bf d$

We also eed to know how *useful* each common term is for discrimintation between different documents

### IDF Weighting 

A popular measure of the significance of a term for discriminating documents is the **Inverse document frequency (IDF)**

For a token $\bf t$ we define: 

$$
IDF(t) = \log \left( \frac{ND}{ND_t} \right)
$$

where:

- $ND$ is the total number of documents in the corpus 
- $ND_t$ is the number of those documents that include $\bf t$
- Note: in this equation $\log = \log_e$ the natural logarithm

## TF-IDF Weight 

Let $\bf t$ be a term in $\bf d$, a document 

The TF-IDF weight $w_{td}$ of term $t$ for document $d$ is: 

$$
w_{td} = f_{td}\cdot IDF(t)
$$

where $f_{td}$ is the **term frequency** i.e. the number of times $t$ occurs in $d$

So for $w_{td}$ to be large:

- $f_{td}$ must be large, so $t$ must occur often in d 
- $IDF(t)$ must be large, so $t$ must occur only in relatively few documents

### Query Weights 

Given a term $t$ and a query $q$

If $q$ is a long query, we can treat q as a document 

$$
w_{tq} = f_{tq} \cdot IDF(t)
$$

where $f_{tq}$ is the query term frequency 

If $q$ is a short query we define the TF-IDF weight as:

$$
w_{tq} = IDF(t)
$$

### TF-IDF Similarity

Define the similarity between query $q$ and document $d$ as: 

$$
Sim(q,d) = \frac{\sum_{t\in q \cap d} w_{td} \cdot w_{tq}}{\|d\|\cdot\|q\|}
$$

where: 

- We sum over all terms in both $q$ **and** $d$ 
- $\|q\|$ is the length of query $q$ 
- $\|d\|$ is the length of document $d$

#### Document Length 

Given a document $d$. For each term $t \in d$ we can define the TF-IDF weight $w_{td}$ 

The **length** of the document $d$ is defined by: 

$$
Len(d) = \|d\| = \sqrt{\sum_{t\in d} w_{td}^2}
$$

### Practical Considerations 

For a query $q$ we must: 
  
- Calculate $\$q\|$ and $w_{tq}$ for for each $t\in q$ 
- This isn't too expensive 

For each document $d$ 

- $\|d\|$ can be computed in advance 
- $w_{td}$ can be computed in advance for each term $t \in d$ 

The potential number of documents is very large $\implies$ time to compute $Sim(q,d)$ is **huge**

Assume $q$ contains a term $t$. If $t$ didn't already occur in the corpus, it is of no use.

Therefore, we need to identify all documents $d$ which include $t$. However, this will take too long if the number of documents is very large. As it frequently is in real-world applications

To speed up computation we can compute a data structure called the *Document Index*, in advance


### The Document Index

@import "../resources/l3-di.png"

@import "../resources/l3.di2.png"


## Summary of the IR Process

@import "../resources/l3-ir.png"



