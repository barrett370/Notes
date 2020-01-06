# Lecture 12

## GPU Sorting

### Merge sort on NVidia GPUs

In order to make good use of the hardware we consider 3 stages:

1. Many small sequences
    - Each less than one *block size*
    - Here there are many small merges to do
    - Each thread can do 1 merge
    - Each block handles many merges
    - Memory coalescing: better ...




### Bitonic Sort


- A comparitor is a function that swaps two elements if they are in th wrong order
- A monotonic increasing/decreasing sequence is one where very element is equal to or greater/less than every preceding element
- A bitonic sequence is a sequence which changes order direct at most once, or a circular shift of such a sequence.
  - Circular shift means that we can take the sequence 1,2,10,11,9,4 which is bitonic and write it as 9,4,1,2,10,11 and it is still bitonic

The central idea behind Bitonic sort:

- A simple parallel arrangement of comparators can split a bitonic sequence into two bitonic sequences where all elements of the first are less than all elements of the second

