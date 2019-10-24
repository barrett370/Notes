# Lecture 2

## Measuring Speed

- Most CPU clocks can't be more accurate than 10ms 
- At 3GHz, 10ms = 30,000,000 cycles
  - ~1$\rightarrow$5 cycles per instruction 
  - $\therefore$ 10ms $\approx$ 10,000,000 instructions
- Code that takes 15ms is reported as having taken 10 or 20 ms
  - Large inaccuracy 
  - 10ms $\pm$ 10ms 

- Instead, run it 100 times, 1500 ms reported as either 1490, 1500 or 1510
  - lower relative inaccuracy 
- **Issue:** compilers are *too* smart, and will attempt to optimise re-runs, therefore, subsequent runs may be much faster than initial
  - This can be mostly negated by flushing caches between each run
  - Alternatively, ignore initial run.

- **Do not include I/O in your timings**
  - remove delay statements / logging 

## Posix Threads

- language independent parallel execution model (Currently only implemented in C)
  - Thread management
  - Mutexes
    - Mutually exclusive lock on a variable
  - Condition variables
    - lock until condition becomes `True`
  - Read/ Write locks
    - Allows multiple readers <u>or</u> a single writer 
  - Barriers
    - Threads whicb hit the barrier (code location) have to wait until all threads in the group also reach that barrier.
    - Allows thread groups to syncronise

## Basics of `pthreads`

```c
pthread_attr_init()
``` 
Gets default thread attributes  & stores ina  `pthread_attr_t` struct

```c
pthread_attr_setdetachstate()
```
Sets the detach state value.

- Joinable
- Detachable 

```c
pthread_create()
```

- Creates a new thread with attributes defined in a `pthread_attr_t` struct 
- Starts running on the function specified with the specified argument & stores thread id in a specific variable

```c
pthread_exit()
```

- Terminates the current thread
  - if joinable:
    - its return value is available to any other thread that calls `pthread_join()` on this thread's id

```c
pthread_join()
```

- Waits for the specific joinable thread to terminate & gets return value from it.

**Note: Making threads joinable requires more memory $\therefore$if not required, make threads detached**

