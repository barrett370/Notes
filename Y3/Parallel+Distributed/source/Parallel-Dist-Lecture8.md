# Lecture 8

## SMs, Cores and Warps


- A GPU has a number of *Streaming Multiprocessors (SMs)* which havea number of *cores*. Threads are schedule n units of *Warps*
- Each SM has a number of resources
  - E.g 400-500 series Nvidia GPUs have
    - 2 Instruction despatch units 
      - Each can start, on each clock cycle, processing n any 2 banks at a time. The 3 banks of 16 cores mean that 2 sequential instructions from one thread warp can be executing simultaneously if are not dependent on each other
    - 3 banks of 16 cores (48 cores)
    - 1 bank of 16 load store units 
      - for calculating source and destination addresses 
    - 1 bank of 4 special functional units 
      - hardware support for calculating $\sin$, $\cos$, reciprocals and square roots
    - 1 bank of 4 texture units
  

## GPU specs:

- Global Memory and constant memory is the only GPU memory that you can copy into.
  - constant memory can only be edited by the host


```json
<< ./deviceQuery
>>  Device 0: "GeForce RTX 2060"
    CUDA Driver Version / Runtime Version          10.1 / 10.0
    CUDA Capability Major/Minor version number:    7.5
    Total amount of global memory:                 5905 MBytes (6191382528 bytes)
    (30) Multiprocessors, (64) CUDA Cores/MP:      1920 CUDA Cores
    GPU Max Clock rate:                            1680 MHz (1.68 GHz)
    Memory Clock rate:                             7001 Mhz
    Memory Bus Width:                              192-bit
    L2 Cache Size:                                 3145728 bytes
    Maximum Texture Dimension Size (x,y,z)         1D=(131072), 2D=(131072, 65536), 3D=(16384, 16384, 16384)
    Maximum Layered 1D Texture Size, (num) layers  1D=(32768), 2048 layers
    Maximum Layered 2D Texture Size, (num) layers  2D=(32768, 32768), 2048 layers
    Total amount of constant memory:               65536 bytes
    Total amount of shared memory per block:       49152 bytes
    Total number of registers available per block: 65536
    Warp size:                                     32
    Maximum number of threads per multiprocessor:  1024
    Maximum number of threads per block:           1024
    Max dimension size of a thread block (x,y,z): (1024, 1024, 64)
    Max dimension size of a grid size    (x,y,z): (2147483647, 65535, 65535)
    Maximum memory pitch:                          2147483647 bytes
    Texture alignment:                             512 bytes
    Concurrent copy and kernel execution:          Yes with 3 copy engine(s)
    Run time limit on kernels:                     No
    Integrated GPU sharing Host Memory:            No
    Support host page-locked memory mapping:       Yes
    Alignment requirement for Surfaces:            Yes
    Device has ECC support:                        Disabled
    Device supports Unified Addressing (UVA):      Yes
    Device supports Compute Preemption:            Yes
    Supports Cooperative Kernel Launch:            Yes
    Supports MultiDevice Co-op Kernel Launch:      Yes
    Device PCI Domain ID / Bus ID / location ID:   0 / 1 / 0    
```
```python
print("foo")
```


## Details of the 1080Ti

- Pascal micro-architecture
  - 4 warp schedulers
  - Each schedulers can issue up to 2 independent instructions from the asme warp each cycle
- 28 SMs
- Max number of blocks per SM is 64
  - therefore, if you have less than 32 threads/block you cannot fill the full SM thread limit, which may lead to under occupancy 
- You shouldn't really have less than 32 threads per blok as otherwise you are under-utilising warps
- Therefore, the theoretical optimal case, if you havea kernel with 32xN threads in total and the kernel is K instructions long, you could potentially execute the kernel in $\frac{}{}$
***/* todo, finish section */***

## Syncronisation

- Warps execute in lock-step
  - so synchronisation within a warp is mostly automatic but (data variables should be marked `volatile`)
  - In practice, it is much more complex
  - We need to be able to synchronise threads in a block
  - We also need to be able to synchronise threads in a warp
  - Cannot synchronise across different blocks
  - **Barrier synchronisation:** `__syncthreads()`
  - Must **Never** have `__syncthreads()` in a branch of a conditional that some threads in the block will not execute
    - else a deadlock will occur.

## More on Warps

- For threads in a block
  - Warp 0 consists of threads 0 $\rightarrow$ 31
  - Warp 1 consists of threads 32 $\rightarrow$ 63
  - $\vdots$

- For threads in a mutli-dimensional block
  - Mutlidimensional threads are linearised in a row-major order




 