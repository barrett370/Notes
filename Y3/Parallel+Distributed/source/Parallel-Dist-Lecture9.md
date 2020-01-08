# Lecture 9 : GPU Accelerated Parallel Reduce Scan

## Multi-Block Parallel Reduction

The parallel reduction algorithms seen in the last lecture only work if the array fits into a single block.

This issue arises due to sums being calculated between indexes handled by different blocks. As a result, we cannot be sure if the correct numbers are stored in each index at the time of computation as our threads may be out of sync.

**Note: `__syncthreads()` does not work across blocks**

<u>Solution</u>

Repeat the following until the remaining array is of length 1:

- Block Reduce: Call kernel *Block Reduction* on remaining array
  - Thus calculating the reduction for each block of the array
- Compress: Call kernel to copy the first element of each block down to the start of the array and shorten the array to the length of the newly reduced section.
  - `A[0]=A[0]; A[1] = A[1024]; A[2] = A[2048] ; ...`

Block Reduce can use all threads in the block instead of just half if it were to work with *segments* of 2*Block size of the array.

Copy segment from global array into shared memory array at the start and back after computation leads to a massive speedup

## Inclusive Prefix Sum or Inclusive Scan

*Inclusive Prefix Sum* aka *Inclusive Scan* takes a binary associative operator. such as addition, and applies it to calculate a cumulative output vector from an input vector.

A sequential implementation might look something like:

```cpp

void sequential_scan(float *x, float *y, int len){
    y[0] = x[0];
    for (int i = 1 ; i < len ; i++){
        y[i] = y[i-1] + x[i];
    }
}
```

$$
\forall j \in \texttt{A}, \texttt{A}[j] = \sum_{i=0}^{j} \texttt{A}[i]
$$

| Input  | 1   | 2   | 3   | 4   | 5   |
| ------ | --- | --- | --- | --- | --- |
| Output | 1   | 3   | 6   | 10  | 15  |

## Exclusive Prefix Sum or Exclusive Scan

The *Exclusive* variant differs only sightly, the output array can be described mathematically as: 

$$
\forall j \in \texttt{A}, \texttt{A}[j] = \sum_{i=0}^{j-1}\texttt{A}[i]
$$

| Input  | 1   | 2   | 3   | 4   | 5   |
| ------ | --- | --- | --- | --- | --- |
| Output | 0   | 1   | 3   | 6   | 10  |

We will start by looking at algorithms that correctly scan each block without propagating the result further in the array.

An example of a size 16 array with a block size of 4 is as follows:

@import "../resources/16-4ibs.png"

A sequential implementation of an algorithm which yields such a result might be as follows: 

```cpp 

# define BLOCK_SIZE 1024

void sequential_block_scan(float *x, float *y, int len){
    int num_blocks = 1 + (len-1)/BLOCK_SIZE;
    for (blk =0 ; blk < num_blocks ; blk++){
        int blk_start = blk * BLOCK_SIZE;
        int blk_end = blk_start + BLOCK_SIZE;
        if (blk_end>len){
            blk_end = len;
        }
        y[blk_start] = x[blk_start];
        for (int i=blk_start+1; i<blk_end; i++){
            y[i] = y[i+1] + x[i];
        }
    }
}
```

For such an implementation, cost is easy to calculate as for $N$ elements there are $N-1$ FLOPS

$$
\therefore \text{Cost}_\text{SS} = 1024-1 = 1023
$$

## Efficient Scan Algorithms

### Hillis-Steele-Horn (Step Efficient)

code for HSH Scan:

```cpp

#define BLOCK_SIZE 1024

__global__ void hsh_scan(float *X, float *Y, int len){
    __shared__ float XY[BLOCK_SIZE*2];
    int rBuf = 0; wBuf = BLOCK_SIZE;
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i<len){
        XY[wBuf + threadIdx.x] = X[i];
    }

    for (uint s=1; s<BlOCK_SIZE ; s *=2){
        __syncthreads();
        wBuf = BLOCK_SIZE - wBuf ; rBuf = BLOCK_SUZE -rBuf;
        if (threadIdx.x >=s){
            XY[wBuf+threadIdx.x] =
                XY[rBuf + threadIdx.x-s] + XY[rBuf+threadIdx.x];
        }else{
            XY[wBuf + threadIdx.x] = XY[rBuf+threadIdx.x];
        }
    }
    if (i<len){
        Y[i] = XY[wBuf + threadIdx.x];
    }
}
```

#### Cost of HSH Scan

Given $N$ elements:

- There will be $\log_2(N)$ iterations
- In each iteration, all except the *stride* number of threads is doing an addition
- Stride is governed by the equation $2^{i-1}$

$$
\text{Cost}_{\text{HSH}} = \sum_{i=1}^{\log_2(N)}(N-2^{i-1}) = \left( \sum_{i=1}^{\log_2(N)}N \right) - \left( \sum_{i=1}^{\log_2(N)}2^{i-1} \right) \\
= N\log_2(N) - \left(1+2+\ldots+\frac{N}{2}\right) \\
= N\log_2(N) - (N-1)
$$

$$
N = 1024 \implies 
\begin{cases} 
\text{Cost}_\text{HSH} = 1024 \times 10 - (1024 -1) & = 9217 \\ 
\text{Cost}_\text{SS} = 1024-1 & = 1023
\end{cases}
$$

Here you can see that our *step efficient* algorithm is less efficient than the naive scan seen earlier. However, at higher values of $N$ we see a marked improvement in performance.

### Blelloch Scan (Work Efficient)

In Blelloch Scan we first copy $X$ from global to shared memory, $XY$ 
We carry out a reduction phase followed by a Distribution phase before copying $XY$ from shared memory to global memory $Y$


#### Copying phase

```cpp

#define BLOCK_SIZE 1024

__global__ void blelloch_scan(float *X, float *Y, int len){
    __shared__ float XY[BLOCK_SIZE];

    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i<len){
        XY[threadIdx.x] = X[i];
    }

    // Reduction Phase

    // Distribution Phase

    __syncthreads();

    if (i<len){
        Y[i] = XY[threadIdx.x];
    }
}
```

#### Reduction Phase

```cpp 

for (uint stride =1; stride < blockDim.x; stride *=2){
    __syncthreads();
    if ((threadIdx.x +1)% (2*stride) == 0 ) {
        XY[threadIdx.x] += XY[threadIdx.x - stride];
    }
}
```

Here we can see that all threads sync each iteration $\implies$ no deadlock
No read or write races $\implies$ no double buffering required. i.e. no thread writes to a location that another thread reads from within the same iteration.

However, this approach leads to a lot of *Divergence* with different **non-continuous** threads performing the addition on each iteration.

#### Reduction Phase with reduced divergence

```cpp

for (uint stride =1; stride < blockDim.x ; stride *= 2){
    __syncthreads();
    uint index = (threadIdx.x +1) * stride *2 -1 ;
    if (index < blockDim.x){
        XY[index] += XY[index-stride];
    }
}
```
Here the threads performing the addition are continuous which leads to **minimal divergence**

#### Distribution Phase

```cpp
for (uint stride = BLOCK_SIZE/4 ; stride > 0 ; stride /=2){
    __syncthreads();
    uint index = (threadIdx.x+1)*stride *2 -1;
    if (index + stride < BLOCK_SIZE){
        XY[index+stride] += XY[index];
    }
}
```

- All threads sync on each iteration $\implies$ no deadlock
- No read/write races $\therefore$ no double buffering required 


