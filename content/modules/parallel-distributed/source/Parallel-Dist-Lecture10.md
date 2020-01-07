# Lecture 10

## Common CUDA Programming Errors

- `malloc`, `cudaMalloc` and `cudaMemcpy` take arguments specified in **bytes**

- Make sure you read kernel code, i.e code specified as `__global__` or `__shared__` as if it is being run mutiple times concurrently
- Read/Write race conditions, e.g if the following code is being run on multiple threads at the same time 

```c++
__global__  kern(int *A, int len){
    int i = blockDim.x * blockIdx.x + threadIdx.x
    if (i > 1 && i < len){
        A[i] += A[i-1];
    }
}
```

- If both thread $i$ and $i-1$ are writing to A at the same time we do not know what value either will deal with as it is a **race condition** 
    - One way to solve this is to use double-buffering 

- Accessing past the end (or before the beginning) of an allocated array
- Omitting necessary barrier synchronisations 
- Confusion in `cudaMemcpy`, only ever use to copy from host $\rightarrow$ device or from device $\rightarrow$ host.
- Roundoff errors

## Atomic Operations 

We often need to implement a read-modify-write operation in parallel:

```c++
A[index] += 1; 
```

If multiple threads might be trying to do such an operation on the same memory location, then we have to avoid read/write races
To achieve this we can:

- Restructure our code and use `__syncthreads()` to enforce serial memory access
  
- Restructure code to that different threads maintain their own changes locally then have a single thread collate all results and update the target memory location.
- Use an *atomic operation* `atomicAdd(&A[index],1)`
  - give the address of the location and the value you want to add.
  - This will essentially lose you your parallelism 
  - However, if this is a very uncommon occurrence, then this may be a sensible solution, but the opportunities are rare.

## Coalesced Global Memory Access

Global memory accesses occur in *memory transactions* or *bursts* of size 32, 64 or 128 bytes

- Each memory transactions takes $\approx$ the same time 
- Therefore, reading/writing 8, 16 or 32 words takes about the same amount of time as for a single word
- So long as the threads in a warp read a set of consecutive words, only 1 memory transaction is required
- If consecutive threads read non-consecutive words, then each read required a separate memory transaction, this is called **strided access** and is much worse than consecutive access
- Array of Structs (AoS) vs Struct of Arrays (SoA)
- Specially important for 2 or 3 dimensional arrays. E.g. let $i$ be the thread ID:

```c++
struct { int a ; int b } X[LEN] ; // X[i].a = X[i].b strided access
struct {int a[LEN] ; int b[LEN] } X ; // X.a[i] = X.b[i] consecutive access
```

- Although, intuitively, the first approach seems nicer it causes strided access as the Xs are stored consecutively with their corresponding as and bs, meaning threads accessing as or bs require multiple reads from memory.
- Whereas, the second struct stores all as and bs consecutively allowing for much faster parallel access.

Global memory is partitioned in **burst sections**

- Whenever a location in global memory is accessed, al, other locations in the same section are also delivered
- Burst sections can be 128 bytes + 
- When a warp executes a load or store, the number of DRAM requests issues and serialised is the number of different burst sections addressed.
- E.g. with a warp size of 4, a burst size of 16, stride =2, therefore, 2 memory transactions required.


## Shared Memory Banks

Shared memory accesses are $\approx$ 2 orders of magnitude faster than global memory accesses

- Shared memory in GPUs of compute capability 2.0 or better is dived into 32 equally sized banks
- Shared memory is organised so that 32 consecutive memory word accesses are spread over all 32 banks, one word from each
- Devices with compute capability 3.0 + can optionally have banks organised by double, instead of single word.
- Simultaneous access (by different threads in same warp) to different banks can be serviced simultaneously. However, simultaneous access to the **same bank** must be serialised
    - **Exception:** simultaneous read of the same address by all threads in a warp can be served simultaneously through a process called a *broadcast*
    - **Exception:** simultaneious read of the same address by some number of threads in a warp can eb serviced simultaneously on devices with compute capability 2.0+ by a process called *multicast*

Shared memory banks are structured into **banks**

- Modern GPUs have 32 4-byte word banks but an be configured as 32 8-byte double word banks
- The bank used for a word address is the remainder when you dived the word address by the number of banks
- Shared memory can deliver/accept 1 word simultaneously from each bank in a single read/write transaction
- Multiple accesses to the same bank are serialised

In global memory you should strive for consecutive memory addressing, the same for shared but if that is not possible shared memory should be optimised for as few threads hitting the same banks.

### Shared Memory Allocation

We have been using one approach to shared memory allocation in our GPU kernels

To run a kernel as follows:

```C++
kernel1<<<gridDim, blockDim>>>(in,out,len);
```

The kernel is written as:

```C++
__global__ kernel1(int[] in, int[] out, int len){
    __shared__ int XY[BLOCK_SIZE] ; // where BLOCK_SIZE is defined globally outside of the kernel, not a variable
    ...
}
```

An alternative approach allows for a *runtime* parameter in the kernel invocation:

```C++
kernel2<<<gridDim, blockDim, sharedBytes>>>(in,out,len);


__global__ kernel2(int[] in, int[] out, int len){
    extern __shared__ int XY[]
    ...
}
```

This allocates, at kernel invocation, a certain number of shared bytes for you shared memory data structures.

- **Note: you cannot use a hybrid approach**

Advantage: you can choose the amount of shared memory per block at runtime.

However, you can only specify one block of shared memory per block in the kernel invocation
If you want multiple shared items dynamically allocated you have to do something like: 

```C++

__global__ kernel2(int[] in, int[] out, int len){
    extern __shared__ double data[]
    
    float *d1 = (float *)&data[0];
    double *d2 = (double *)&data[4];
    int *d3 = (int *)&data[12];
     
}
```
- **Watch out for memory alignment**

## Multi-Dimensional Kernels

- CUDA supports 2 and 3 dimensional kernels to help with inherently 2 and 3 dimensional problems

```C++
dim3 dimGrid2(GRID_WIDTH, GRID_HEIGHT); //dim3 is the structure but can be used for 2d kernels
dim3 dimBlock2(BLOCK_WIDTH, BLOCK_HEIGHT);
my2d_kernel<<<dimGrid2, dimBlock2>>>(...);
...
dim3 dimGrid3(GRID_WIDTH, GRID_HEIGHT, GRID_DEPTH);
dim3 dimBlock3(BLOCK_WIDTH, BLOCK_HEIGHT, BLOCK_DEPTH);
my3d_kernel<<<dimGrid3, dimBlock3>>>(...);
```

- `dim3` is a `struct` of x,y and z fields can take 1, 2 or 3 integer parameters in its constructor (missing params are set to 1)
- The grids and blocks can have different dimensionalities

Each thread has access to a number of variables, `dim3` and `uint3` struct, where `uint3` is like `dim3` but without constructors

- `gridDim: dim3` is the dimensions of the grid
- `blockDim: dim3` is the dimensions of the block
- `blockIdx : uint3` is the block index within the grid
- `threadIdx : uint3` is the thread index within the block


### Memory Layout

- Multi-dimensional arrays, `A[k][j][i]` are ordered by their inner index, outwards

#### Multi-Dimensional Indexing

Even when working multidimensionally, we often have to explicitly apply threads to 2 or 3D structure of dimensionality equal to our problem domain.

e.g. given a data structure $D$ of dimension $N \times N$ and the block dimensionality of size $K \times K$ we can have access as follows :
```c++
int i = blockIdx.x * K + threadIdx.x;
int j = blockIdx.y * K + threadIdx.y;

// D is just a pointer to a block of memory
... D[i + j * N] ...

// D is a declared 2d C array

... D[j][i] ...

```

You should still pay attention to memory indexing in relation to memory coalescing. i.e make sure you index as above `D[i + j *N]` if $i$ is the fastest changing index.

### Transpose 

$$\forall i,j \in N \\ M \in N\times N \\ \text{ swap } M[i][j] \text{ with } M[j][i]$$

Serial on host: 
```C++
// for a  NxN matrix
#define N 1024

void transpose_HOST(int[] in, int[] out){
    for (int j = 0; j < N ; j++){ //loop over rows
        for (int i = 0 ; i < N; i++){ //loop over columns 
            out[j + i *N] = in[i+j*N]
        }
    }
}
```

Serial 1 device thread:

```C++

#define N 1024

__global__ void transpose_serial(int[] in, int[] out){
    for (int j = 0; j < N ; j++){ //loop over rows
        for (int i = 0 ; i < N; i++){ //loop over columns 
            out[j + i *N] = in[i+j*N]
        }
    }
}
...

    transpose_serial<<<1,1>>>(d_in, d_out);
```

> for notes on how to use nsight profiler, see slide deck

This serial execution code performs very poorly as there is no shared memory usage, only a single thread of execution and poorly optimised global memory accesses

1 Thread per row
```C++

__global__ void transpose_thread_per_row(int[] in, int[] out){
    int i = threadIdx.x;
    for (int j = 0 ; j < N; j++){
        out[j + i *N] = in[ i + j *N];
    }
}
 
...
    transpose_thread_per_row<<<1,N>>>(d_in,d_out);
```

This approach performs better with high warp execution efficiency, global load efficiency and better occupancy. However the lack of use of shared memory and non-coalesced column access loses performance.

1 Thread per elements

```C++
#define N 1024
#define K 32

__global__ void transpose_thread_per_element(int[] in, int[] out){
    int i = blockIdx.x * K + threadIdx.x;
    int j = blockIdx.y * K + threadIdx.y;
    out [j+i*N] = in[i+j*N];
}
...
    dim3 blocks(N/K, N/K);
    dim3 threads(K,K);
    transpose_thread_per_element<<<blocks,threads>>>(d_in,d_out);
```

- There is no race condition, therefore no `__syncthreads()`

This approach is **much** faster than the previous attempts (58$\mu$s)


**The remainder of the lecture is better delivered via the slide deck**



