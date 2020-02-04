# Lecture 4 

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Lecture 4](#lecture-4)
  - [Threads](#threads)
    - [Threads in Java](#threads-in-java)
      - [Creating a Thread](#creating-a-thread)
        - [Example of a Runnable Class](#example-of-a-runnable-class)
        - [Instantiating a Thread](#instantiating-a-thread)
  - [Monitors](#monitors)
    - [Concurrent access Queue Implementation](#concurrent-access-queue-implementation)
  - [Mutual Exclusion](#mutual-exclusion)
  - [Waiting](#waiting)
    - [Spinning](#spinning)
    - [Blocking](#blocking)
    - [The `wait()` method](#the-wait-method)
      - [Usage](#usage)
    - [Awakening](#awakening)
  - [Thread local data](#thread-local-data)
    - [Thread local data in Java](#thread-local-data-in-java)
      - [Thread local methods](#thread-local-methods)
    - [Thread local IDs](#thread-local-ids)

<!-- /code_chunk_output -->


## Threads

- Execute a sequential series of instructions 
- You can *tell* a thread
  - What to do
  - When to start
- You can
  - Wait for it to finish 
  - Interrupt it
  - Give it priority over other threads

### Threads in Java

- Implemented in the `java.lang.Thread` class

Each thread must have a method:
```java
void run(){...}
```

- This method executes when the thread is started
- The thread *vanishes* when it returns
- You must implement this method.

#### Creating a Thread

- Create a `Runnable` object
  - `Runnable` is an interface
  - Requires a `run()` method to me implemented
- Pass `Runnable` object to thread constructor

##### Example of a Runnable Class

```java
public class Hello implements Runnable {
    String message;
    public Hello(String m){
        this.message = m;
    }

    public void run(){
        System.out.println(this.message);
    }
}

```

- Where:
  - By the implementation of `Runnable` requires the implementation of the `run()` method.

##### Instantiating a Thread

```java 
String m = "Hello from " + i; 
Runnable h = new Hello(m)
Thread t = new Thread(h)
```

However this is very verbose and can be streamlined using Java's *anonymous inner class* syntax. 

```java 
t = new Thread(
        new Runnable() {
            public void run() {
                System.out.println(m);
            }
        }
);
```


This can be streamlined furter still by using Java's *lambda* functions:

```java
t = new Thread(
        () -> {
            System.out.println(m);
        }
)
```

Starting a thread can be achieved using the method `t.start();`
Similarly, joining a thread is possible through `t.join();`

## Monitors

- **Every** java object has an implicit lock
- Managed by the `syncronized` modifier on methods and code blocks.

### Concurrent access Queue Implementation

```java 
public class Queue<T>{
    private static final int QSIZE = 10;
    private QueueObject<T> head;
    private QueueObject<T> tail;
    private int item_count;

    Queue() {
        item_count = 0;
        this.head = null;
        this.tail = null;
    }

    private boolean isEmpty() {
        return head == null;
    }

    public synchronized void enq(T x) throws InterruptedException {
        while (item_count == QSIZE) { //while full
            wait();
        }

        QueueObject<T> newItem = new QueueObject<>(x);
        if (isEmpty()) {
            this.head = newItem;
            this.tail = newItem;
        } else {
            this.tail.setNext(newItem);
            this.tail = newItem;
        }
        notifyAll(); //let dequeuers know there are now items to dequeue
        item_count++;
    }

    public synchronized T deq() throws InterruptedException {
        while (isEmpty()) { //while empty
            wait();
        }

        QueueObject<T> ret = this.head;
        this.head = this.head.getNext();

        item_count--;
        notifyAll(); //let enqueuers know that there is definitely space now
        return ret.getVal();

    }


}

class QueueObject<T> {
    private T val;

    T getVal() {
        return val;
    }

    void setNext(QueueObject<T> next) {
        this.next = next;
    }

    public QueueObject<T> getNext() {
        return next;
    }

    private QueueObject<T> next;

    QueueObject(T val) {
        this.next = null;
        this.val = val;
    }
}
```

- This implementation features *generics* and as such will work with objects of any type.
- This is an object-pointer based queue implementation. For a more detailed implementation see my [functional repository from Year 2](https://github.com/barrett370/Y2-Functional/blob/master/Revision/A4.ml)

This is an optimal implementation and satisfies the following:

## Mutual Exclusion 
- Only one thread modifying queue fields at a time
- Achieved using `syncronised` methods
  - locks object on call
  - releases lock on return
  - code in the syncronised method / code block is known as the *critical section*
- These can also be placed around specific blocks of code in a method by:

```java 
void foo(){
    ...
    syncronized (this) {
        ...
    }
    ...
}
```

- *What happens if you lock the same object twice?*
  - Java does not suffer from deadlocks
  - Keeps track of number of times locked and unlocked & only releases lock when they even out. 

-


## Waiting

- *What if?*
  - The enqueuer finds a full queue? 
  - The dequeuer finds an empty queue? 
    - wait for something to happen

### Spinning

```java
while (itemCount == QSIZE){} //wait
```

- Here a condition is retested repeatedly 
  - Good for short intervals
    - as expensive to call the OS
  - Works **Only on multiprocessors**

- If spinning occurs inside the critical section of the code, a **deadlock** can occur.
  - If the Enqueuer is waiting for a dequeuer whilst also holding the lock
  - If the dequeuer is then waiting for the enqueuer to release the lock $\implies$ nothing will ever happen! 

### Blocking

- Release the lock whilst waiting
- When *something changes*, re-aquire the lock then either re-release lock and wait again or finish and return 

- Essentially asks the OS to run some other thread
  - Good for longer intervals
  - Processor can do work whilst this thread is waiting 

### The `wait()` method

```java
try{
    q.wait(); // throws InterrupedException 
} catch (InterruptedException e){
    ...
}
```

- Releases the lock on q 
- sleeps, giving up the processor
- Awakens and resumes running
- re-aquires lock and returns 

#### Usage 

```java
...
while (item_count == QSIZE) { //while full
        wait();
}
...
```

### Awakening

- For a thread to awaken it must be *notified* by another thread
  - Failure to wakeup a sleeping thread is known as a *"lost wakeup"*

```java
q.notify();
```

- Awakens **one** waiting thread
  - Which reacquires the lock and returns 

```java
q.notifyAll();
```

- Awakens **all** waiting threads
  - one of which will re-acquire the lock and return 

**Note: In practice, always use `notifyAll()` to avoid lost wakeup bugs**

## Thread local data

- In many of our examples, we assume that threads have unique IDs $\in \{1,\cdots,n-1\}$
- Where do they come from ?


### Thread local data in Java

- `Threadlocal<T>` class
- No built-in language support 

#### Thread local methods

```java
Threadlocal<T> local;
T x = ...;
local.set(x);
```

- Changes current threads version of the data, `x`, other threads are unaffected. 
- Value can be retrieved via: 

```java
Threadlocal<T> local;
T x = local.get();
```

- Thread local variables can be initialised as follows:

``` java 
T x = local.initialValue()
```
  
- This is implicitly called by `get()` the first time the thread-local variable is accessed 

### Thread local IDs

```java
package threadMisc;

public class ThreadID {
    private static volatile int nextID = 0;

    private static class ThreadLocalID extends ThreadLocal<Integer>{
        protected synchronized Integer initialValue(){
            return nextID++;
        }
    }

    private static ThreadLocalID threadID = new ThreadLocalID();
    public static int get(){
        return threadID.get();
    }
}
```

- Where:
  - `nextID` is the next ID to assign 
  - `LocalID` is a subclass of `ThreadLocal<Integer>`
  - And `initialValue()` is overwritten to provider unique threadIDs
