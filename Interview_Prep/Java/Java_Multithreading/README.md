# 🚀 Java Multithreading


Multithreading is a core feature of Java that enables concurrent execution of two or more threads to maximize the utilization of CPU resources. In modern applications, especially on multicore systems, it allows developers to execute multiple tasks simultaneously, enhancing performance and responsiveness. Let's explore various topics related to Java multithreading in detail.


# ♨️ **Thread Creation**


In Java, a thread is essentially an independent path of execution within a program. Java provides two primary ways to create threads:


### 1. **Extending the** **`Thread`** **Class**


The simplest way to create a thread is by extending the `Thread` class and overriding its `run()` method. The `run()` method contains the code that the thread will execute.


```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running.");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // start() launches the new thread
    }
}
```


### 2. **Implementing the** **`Runnable`** **Interface**


A more flexible way to create threads is by implementing the `Runnable` interface. This approach is preferred in scenarios where the class needs to extend another class, as Java does not support multiple inheritance.


```java
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Thread is running using Runnable.");
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start();
    }
}
```


### 3. **Using** **`Callable`** **Interface for Returning Values**


Unlike `Runnable`, `Callable` can return a result and throw checked exceptions. It is commonly used with the `ExecutorService`.


```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

class MyCallable implements Callable<Integer> {
    public Integer call() throws Exception {
        return 123;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        FutureTask<Integer> futureTask = new FutureTask<>(new MyCallable());
        Thread thread = new Thread(futureTask);
        thread.start();

        System.out.println(futureTask.get());  // Fetch the result
    }
}
```


### 4. Using lambda functions


```java
public static void main(String[] args) {
    SharedClass sharedClass = new SharedClass();
    
    Thread thread1 = new Thread(() -> sharedClass.method1());
    Thread thread2 = new Thread(() -> sharedClass.method2());

    thread1.start();
    thread2.start();
 }
 
 private static class SharedClass {
    int a = 0;
    int b = 0;

    public void method1() {
        int local1 = a;
        this.b = 1;
    }

    public void method2() {
        int local2 = b;
        this.a = 2;           
    }       
 }
```


# ♨️ **Thread States**


A thread in Java can exist in one of several states, as defined by the `Thread.State` enumeration:

1. **NEW**: A thread that has been created but not yet started.
2. **RUNNABLE**: A thread that is ready to run or running.
3. **BLOCKED**: A thread that is blocked, waiting to acquire a lock.
4. **WAITING**: A thread that is waiting indefinitely for another thread to perform a particular action.
5. **TIMED_WAITING**: A thread that is waiting for another thread to perform an action within a specific waiting time.
6. **TERMINATED**: A thread that has finished execution.

```java
class ThreadStateDemo extends Thread {
    public void run() {
        System.out.println("Thread is in RUNNABLE state.");
        try {
            Thread.sleep(2000);  // TIMED_WAITING state
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Thread completed execution.");
    }

    public static void main(String[] args) {
        ThreadStateDemo thread = new ThreadStateDemo();
        System.out.println("State before start: " + thread.getState());  // NEW
        thread.start();
        System.out.println("State after start: " + thread.getState());   // RUNNABLE
    }
}
```


# ♨️ **Thread Interruption**


Thread destruction is the process of safely stopping or terminating a thread once its task is completed or no longer needed. In Java, threads are not destroyed by force; instead, they are asked to gracefully terminate by being interrupted or by finishing their execution naturally. One of the key ways to signal a thread to stop is by using the `Thread.interrupt()` method.


### **`Thread.interrupt()`**


The `Thread.interrupt()` method is used to interrupt a thread. When a thread is interrupted, it does not forcibly stop the thread. Instead, it sets an internal flag called the "interrupt status." The interrupted thread can check this flag to see if it has been interrupted and take appropriate action.

- **How it works**: When `interrupt()` is called on a thread:
	- If the thread is **sleeping**, **waiting**, or **blocked** on a method like `Thread.sleep()`, `Object.wait()`, or `Thread.join()`, the thread will throw an `InterruptedException`.
	- If the thread is **running** normally, it won’t immediately stop; the interrupt status will just be set. It's up to the thread's logic to periodically check whether it has been interrupted using `Thread.interrupted()` or `Thread.isInterrupted()` and then decide how to handle the interruption.

```java
class MyThread extends Thread {
    public void run() {
        try {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread is running");
                Thread.sleep(1000);  // Sleep for 1 second
            }
        } catch (InterruptedException e) {
            System.out.println("Thread was interrupted during sleep");
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        MyThread t = new MyThread();
        t.start();
        Thread.sleep(3000); // Main thread sleeps for 3 seconds
        t.interrupt(); // Interrupt the thread
    }
}
```


In this example:

- The thread `t` is interrupted while it’s sleeping, causing it to throw an `InterruptedException`. The thread can then catch this exception and terminate gracefully or handle it appropriately.

### **Why** **`interrupt()`** **is not a guaranteed stop**


Calling `interrupt()` does not guarantee that a thread will stop execution immediately. This is because Java's `interrupt()` mechanism is **cooperative**—it requires the thread to cooperate in its termination. The thread itself must handle the interrupt signal by checking its interrupted status and responding accordingly.


**Scenarios where** **`interrupt()`** **might not stop a thread:**

1. **Busy Loop or Long Computation**: If a thread is in a long-running or busy computation and never checks for its interrupt status, it will continue running. For example, a loop that never checks `Thread.interrupted()` will not stop, even if `interrupt()` is called.
2. **Not Handling** **`InterruptedException`** **Properly**: If a thread catches an `InterruptedException` but does nothing to stop itself (e.g., just prints a message and continues running), it won’t terminate. To ensure proper termination, the thread should either:
	- Exit the `run()` method after being interrupted.
	- Re-throw the `InterruptedException` (in cases where the thread needs to notify the calling code about the interruption).

```java
public class MyThread extends Thread {
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            // Simulate a long-running task
            System.out.println("Thread is running...");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        MyThread t = new MyThread();
        t.start();
        Thread.sleep(2000); // Let the thread run for 2 seconds
        t.interrupt();      // Interrupt the thread
    }
}
```


In this example, the thread periodically checks `Thread.currentThread().isInterrupted()` and exits the loop if it is interrupted.


### **How to handle interruptions correctly**


To correctly handle interruptions and ensure proper thread destruction, the following practices are recommended:

1. **Periodically check for interrupts**: In long-running loops or tasks, explicitly check whether the thread has been interrupted using `Thread.interrupted()` or `Thread.isInterrupted()`.
2. **Properly handle** **`InterruptedException`**: If your thread is blocked by methods that throw `InterruptedException` (e.g., `Thread.sleep()` or `Object.wait()`), catch the exception and either:
	- Stop the thread.
	- Re-throw the exception (if you're in a method that allows it).
	- Set the interrupt flag again if the exception is caught, because catching an `InterruptedException` clears the interrupt status.

```java
public class MyThread extends Thread {
    public void run() {
        try {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread is running...");
                Thread.sleep(1000);  // Sleep for 1 second
            }
        } catch (InterruptedException e) {
            System.out.println("Thread was interrupted");
            Thread.currentThread().interrupt();  // Reset interrupt flag
        }
    }

    public static void main(String[] args) throws InterruptedException {
        MyThread t = new MyThread();
        t.start();
        Thread.sleep(3000); // Main thread sleeps for 3 seconds
        t.interrupt();      // Interrupt the thread
    }
}
```


In this example, we explicitly reset the interrupt flag with `Thread.currentThread().interrupt()` after catching the `InterruptedException`.


### **Limitations of** **`interrupt()`**

- **Interrupting I/O operations**: If a thread is blocked on an I/O operation (e.g., reading from a socket or file), calling `interrupt()` may not cause the I/O operation to stop, depending on the implementation of the underlying platform's I/O system.
- **Thread-safety concerns**: Interrupts can introduce race conditions if not handled properly. If one thread interrupts another and both threads are sharing data, it can lead to inconsistencies unless the shared data is properly synchronized.

### **Graceful Shutdown Patterns**


To ensure that a thread is terminated gracefully, you can combine the use of `interrupt()` with additional control mechanisms, such as Boolean flags or thread-safe variables.


```java
class GracefulShutdownThread extends Thread {
    private volatile boolean shutdownRequested = false;

    public void shutdown() {
        shutdownRequested = true;
        interrupt();  // Signal thread to stop
    }

    public void run() {
        while (!shutdownRequested) {
            // Perform tasks
            if (Thread.interrupted()) {
                System.out.println("Thread interrupted. Exiting...");
                break;
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        GracefulShutdownThread t = new GracefulShutdownThread();
        t.start();
        Thread.sleep(2000);
        t.shutdown();  // Request shutdown
    }
}
```


This example demonstrates a graceful shutdown using a Boolean flag combined with the `interrupt()` mechanism to ensure the thread can clean up resources and exit safely.


# ♨️ **Thread join method**


The `join()` method allows one thread to wait for the completion of another. It is useful when you want to ensure that a thread has finished executing before the next thread begins.


```java
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Child thread");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();

        try {
            thread.join();  // Main thread waits until child thread completes
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Main thread continues after child thread completes.");
    }
}
```


# ♨️ **Data Sharing Between Threads**


Sharing data between threads in Java can be tricky due to race conditions. Proper synchronization is required to ensure the integrity of shared resources. Without proper synchronization, multiple threads accessing and modifying the same shared data can lead to inconsistent results.


```java
class Counter {
    private int count = 0;

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Final count (without synchronization): " + counter.getCount());
    }
}
```


In the above code, since `increment()` is not synchronized, the final count might be less than 2000 due to race conditions.


# ♨️ **Thread Synchronization**


Synchronization ensures that only one thread accesses a shared resource at a time, preventing data corruption.


### **Synchronized Method**


Using the `synchronized` keyword on a method ensures that only one thread can execute it at a time.


```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}
```


### **Synchronized Block**


More fine-grained control can be achieved by synchronizing only specific blocks of code. 


```java
class Counter {
    private int count = 0;
    final Object lock = new Object();

    public void increment() {
        synchronized (this.lock) {
            count++;
        }
    }

    public int getCount() {
        synchronized (this.lock) {
            return count;
        }
    }
}
```


> 💡 Synchronized method is also basically a lock on this object.


### **Synchronized block vs Synchronized method**


| **Aspect**      | **Synchronized Method**                                                     | **Synchronized Block**                                                  |
| --------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Scope**       | Locks the entire method.                                                    | Locks only the specific code block.                                     |
| **Granularity** | Coarse-grained control (entire method).                                     | Fine-grained control (specific block of code).                          |
| **Performance** | Lower performance if the method is large or has non-critical sections.      | Better performance as only critical sections are locked.                |
| **Complexity**  | Easier to implement and read.                                               | Requires more thought and careful implementation.                       |
| **Usage**       | Best for small methods or methods that entirely deal with shared resources. | Best for methods where only part of the code accesses shared resources. |


# ♨️ **Atomic Operations in Java**


**Uninterrupted Execution**: Atomic operations are indivisible, meaning that once started, they run to completion without any chance of being interrupted by other threads.


**Thread-Safety**: Since atomic operations cannot be interfered with, they are inherently thread-safe without needing explicit synchronization mechanisms.


### **1. Primitive Variable Assignments**

- Assigning a value to a variable of any of the primitive types (`boolean`, `byte`, `short`, `int`, `char`, `float`, `long`, `double`) **except for** **`long`** **and** **`double`** is atomic.

	```java
	int x = 10;  // Atomic
	boolean flag = true;  // Atomic
	```


### **2. Atomic for 32-bit Primitives (****`int`****,** **`boolean`****,** **`char`****,** **`float`****)**

- Reading and writing to these primitives are atomic by default because these operations are done in a single step in modern 32-bit JVMs.

### **3.** **`long`** **and** **`double`** **(64-bit Primitives)**

- **Not Atomic by Default**: Unlike 32-bit primitives, reads and writes to `long` and `double` variables are not guaranteed to be atomic on all JVMs, as they may be split into two 32-bit operations.
- **Using** **`volatile`**: Marking `long` or `double` as `volatile` ensures that operations on them are atomic across all platforms.

	```java
	volatile long counter;  // Atomic read/write ensured
	```


### **4. Reference Assignments**

- Assigning a reference variable (e.g., object references) is atomic.

	```java
	Object obj = new Object();  // Atomic assignment
	```

- Getters and setters on atomic types are atomic

	```java
	public void setValue(int value) {
	    this.value = value; // Atomic write
	}
	
	public void getSomeObject() {
		   return this.someObject; // Atomic
	}
	```


### **5.  Atomic Classes (****`java.util.concurrent.atomic`****)**


Java provides several classes in the `java.util.concurrent.atomic` package to perform atomic operations on variables. These classes avoid the need for explicit synchronization and offer thread-safe atomic read-modify-write operations.

- **`AtomicInteger`**: For atomic operations on `int` values.
- **`AtomicLong`**: For atomic operations on `long` values.
- **`AtomicBoolean`**: For atomic operations on `boolean` values.
- **`AtomicReference`**: For atomic operations on object references.

Example usage of `AtomicInteger`:


```java
AtomicInteger atomicInt = new AtomicInteger(0);
atomicInt.incrementAndGet();  // Atomic increment
```


**Operations on Atomic Variables**
The atomic classes support atomic operations, such as:

	- **`get()`**: Retrieves the current value.
	- **`set()`**: Sets a new value.
	- **`incrementAndGet()`** / **`decrementAndGet()`**: Atomically increments/decrements the current value and returns the updated value.
	- **`compareAndSet(expectedValue, newValue)`**: Atomically sets the value if it matches the expected value (useful in non-blocking algorithms).

### **6. Non-Atomic Operations in Java**


**Compound Operations**: Operations like `x = x + 1` or `x++` are **not atomic** because they involve multiple steps (read, modify, and write). Even though the individual read and write steps may be atomic, the overall operation is not.


```java
int x = 0;
x++;  // Non-atomic, involves multiple steps (read-modify-write)
```


To perform this safely in a multithreaded environment, you can use an atomic class like `AtomicInteger`:


```java
AtomicInteger atomicInt = new AtomicInteger(0);
atomicInt.incrementAndGet();  // Atomic operation
```


# ♨️ Volatile keyword


### **Volatile Keyword in Java**


The `volatile` keyword in Java is used to indicate that a variable’s value will be modified by different threads. It ensures that changes to the variable are visible to all threads and prevents the compiler from applying optimizations that might assume that the variable’s value does not change unexpectedly.


### **Key Points:**

- **Visibility Guarantee**: When a variable is declared as `volatile`, reads and writes to that variable are directly done from and to the main memory, ensuring that any thread reading the variable sees the most recent value written by any other thread.

	```java
	private volatile boolean flag;
	```

- **Atomicity**: While `volatile` ensures visibility, it does not guarantee atomicity. Operations such as `increment` are not atomic, and additional synchronization is needed for compound actions.

	```java
	// Non-atomic compound operation
	private volatile int count;
	```

- **No Caching**: The `volatile` keyword prevents the JVM and CPU from caching the variable value in a register or local cache, ensuring that every read operation retrieves the latest value from the main memory.
- **Use Case**: `volatile` is typically used for flags, state variables, or simple state indicators where you need to ensure that changes are visible to all threads, without needing the overhead of synchronization.

### **Example:**


```java
public class VolatileExample {
    private volatile boolean running = true;

    public void stop() {
        running = false; // Write operation
    }

    public void run() {
        while (running) {
            // Do some work
        }
    }
}
```


In the example above, the `running` variable is marked as `volatile` to ensure that changes made in the `stop` method are visible to the `run` method. Without `volatile`, the `run` method might not see the updated value of `running`, causing it to run indefinitely.


# ♨️ Thread Deadlock


A **deadlock** in Java occurs when two or more threads are blocked forever, each waiting for the other to release a resource. This happens when multiple threads need access to shared resources and attempt to acquire locks in an inconsistent order, causing a situation where none of them can proceed.


### **Conditions for Deadlock:**


Deadlock can occur if the following four conditions are met simultaneously:

1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode, meaning that only one thread can access a resource at a time.
2. **Hold and Wait**: A thread holding at least one resource is waiting to acquire additional resources held by other threads.
3. **No Preemption**: Resources cannot be forcibly taken away from a thread holding them. They must be released voluntarily.
4. **Circular Wait**: A circular chain of threads exists where each thread holds at least one resource that the next thread in the chain is waiting for.

### **Example of Deadlock:**


In the following example, two threads attempt to acquire two locks in different orders, resulting in a deadlock:


```java
public class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void method1() {
        synchronized (lock1) {
            System.out.println("Thread 1: Holding lock 1...");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            System.out.println("Thread 1: Waiting for lock 2...");
            synchronized (lock2) {
                System.out.println("Thread 1: Holding lock 1 and lock 2...");
            }
        }
    }

    public void method2() {
        synchronized (lock2) {
            System.out.println("Thread 2: Holding lock 2...");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            System.out.println("Thread 2: Waiting for lock 1...");
            synchronized (lock1) {
                System.out.println("Thread 2: Holding lock 2 and lock 1...");
            }
        }
    }

    public static void main(String[] args) {
        DeadlockExample deadlock = new DeadlockExample();

        Thread t1 = new Thread(deadlock::method1);
        Thread t2 = new Thread(deadlock::method2);

        t1.start();
        t2.start();
    }
}
```

- **Explanation**:
	- **Thread 1** holds `lock1` and waits for `lock2`.
	- **Thread 2** holds `lock2` and waits for `lock1`.
	- Both threads are waiting indefinitely for each other to release their respective locks, causing a deadlock.

### **Detecting Deadlock in Java:**

1. **Thread Dump**: In a real-world scenario, you can detect deadlocks by analyzing thread dumps, which display the state of all threads in a Java Virtual Machine (JVM). A thread dump can show the "waiting for" relationships, which can help identify the circular wait conditions.
2. **Using Watchdog**:  A **watchdog** is a monitoring mechanism that can be used to detect and resolve issues such as deadlocks in multithreaded applications. In the context of deadlock detection, a watchdog works by periodically checking the state of threads to see if they have become stuck or unresponsive for an extended period of time, indicating a potential deadlock.
3. **Using** **`ThreadMXBean`**: Java provides the `ThreadMXBean` class to detect deadlocks programmatically. The `findDeadlockedThreads()` method can identify threads that are in deadlock.

```java
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadInfo;
import java.lang.management.ThreadMXBean;

public class DeadlockDetection {
    public static void detectDeadlock() {
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        long[] threadIds = threadBean.findDeadlockedThreads();

        if (threadIds != null) {
            ThreadInfo[] threadInfo = threadBean.getThreadInfo(threadIds);
            System.out.println("Deadlock detected!");
            for (ThreadInfo info : threadInfo) {
                System.out.println(info);
            }
        } else {
            System.out.println("No deadlock detected.");
        }
    }
}
```


### **Preventing Deadlock:**

1. **Lock Ordering**: Establish a consistent order in which locks are acquired. If all threads acquire the locks in the same order, circular wait conditions can be avoided. For instance, always acquire `lock1` before `lock2` in all methods.
2. Use minimum number of locks
3. Using advanced locking techniques.

# ♨️ **Advanced Locking Techniques**


Locking is a fundamental concept in multithreaded programming, used to ensure that only one thread can access a shared resource at a time to prevent data corruption or inconsistency. Java provides several locking mechanisms, each designed to handle specific concurrency requirements.


### **1. Intrinsic Locks (Synchronized Keyword)**


Java’s intrinsic locking mechanism is provided by the `synchronized` keyword. Intrinsic locks are also called **monitor locks**.

- **Method-Level Locking**: Entire methods can be synchronized using the `synchronized` keyword.

	```java
	public synchronized void method() {
	    // critical section
	}
	```

- **Block-Level Locking**: A synchronized block limits the lock to only a part of the method.

	```java
	public void method() {
	    synchronized (this) {
	        // critical section
	    }
	}
	```

- **Pros**:
	- Simple and easy to use.
	- Provides reentrancy, allowing a thread that has acquired the lock to re-enter it.
- **Cons**:
	- Can lead to thread contention and performance issues if overused.
	- Always blocks threads until the lock is available (no timeout mechanism).

### **2. Explicit Locks (****`Lock`** **and** **`ReentrantLock`****)**


The `Lock` interface provides more sophisticated locking mechanisms than the intrinsic locks. One of the most commonly used implementations is `ReentrantLock`.

- **`ReentrantLock`**: This is a reentrant lock, similar to `synchronized`, but with more advanced features. A reentrant lock is one where a process can claim the lock multiple times without blocking on itself. It's useful in situations where it's not easy to keep track of whether you've already grabbed a lock. If a lock is non-re-entrant, you could grab the lock, then block when you go to grab it again, effectively deadlocking your own process.

	```java
	Lock lock = new ReentrantLock();
	
	public void method() {
	    lock.lock();  // Acquires the lock
	    try {
	        // critical section
	    } finally {
	        lock.unlock();  // Always releases the lock in finally block
	    }
	}
	```

- **Key Features**:
	- **Try-Lock**: You can attempt to acquire the lock and avoid waiting indefinitely using the `tryLock()` method.

		```java
		if (lock.tryLock()) {
		    try {
		        // critical section
		    } finally {
		        lock.unlock();
		    }
		}
		```

	- **Interruptible Locking**: Threads waiting on a lock can be interrupted, allowing for more flexibility. for this use `lock.lockInterruptibly()`
	- **Fair Lock**: You can specify whether the lock should be fair (threads acquire locks in the order they request them) by passing a boolean argument to the constructor.

		```java
		Lock fairLock = new ReentrantLock(true);
		```

- **Pros**:
	- More flexible than `synchronized`.
	- Ability to avoid deadlock using `tryLock()` with timeouts.
	- Provides fairness and interruptible locking.
- **Cons**:
	- Requires manual lock management (must always unlock in `finally` block).
	- Slightly more complex to implement compared to intrinsic locks.

### **3. ReadWriteLock**


`ReadWriteLock` is used when you have a resource that can be safely read by multiple threads simultaneously but must be exclusively locked for writing.

- **Key Features**:
	- Allows multiple readers to access the resource concurrently if no thread is writing.
	- Only one writer can access the resource at a time, and no readers can access it while a write is happening.
	- **`ReentrantReadWriteLock`** **is a**n implementation of `ReadWriteLock` that allows a thread to acquire a read lock multiple times if needed, making it reentrant.

	```java
	ReadWriteLock rwLock = new ReentrantReadWriteLock();
	
	public void readMethod() {
	    rwLock.readLock().lock();
	    try {
	        // reading
	    } finally {
	        rwLock.readLock().unlock();
	    }
	}
	
	public void writeMethod() {
	    rwLock.writeLock().lock();
	    try {
	        // writing
	    } finally {
	        rwLock.writeLock().unlock();
	    }
	}
	```

- **Pros**:
	- Improves performance in read-heavy applications by allowing concurrent reads.
	- Prevents writers from interfering with readers and vice versa.
- **Cons**:
	- More complex to manage than basic `Lock`.
	- If not used properly, may lead to **write starvation** (writers may get delayed indefinitely if there are frequent readers).

### **4. StampedLock**


`StampedLock` is an advanced lock introduced in Java 8. It is similar to `ReadWriteLock` but provides additional features for optimistic reading.

- **Key Features**:
	- **Optimistic Read Lock**: Allows reads without blocking, assuming no write operation occurs. If a write happens, the read lock is validated.

		```java
		StampedLock lock = new StampedLock();
		long stamp = lock.tryOptimisticRead();
		// reading operation
		if (!lock.validate(stamp)) {
		    stamp = lock.readLock();
		    try {
		        // fallback to normal read lock
		    } finally {
		        lock.unlockRead(stamp);
		    }
		}
		```

	- Supports **write lock** and **read lock** similar to `ReadWriteLock`.
	- Optimized for situations with infrequent writes and frequent reads.
- **Pros**:
	- High performance for optimistic reads.
	- Suitable for scenarios with many reads and few writes.
- **Cons**:
	- Not reentrant. The same thread cannot re-acquire the lock it already holds.
	- More complex than `ReadWriteLock`.

### **5. SpinLock**


A **`SpinLock`** is a lock where the thread trying to acquire the lock simply waits in a loop ("spins") checking if the lock is available. It doesn’t block the thread but uses CPU cycles until the lock becomes available.

- **Key Features**:
	- **Non-blocking**: Threads do not get put to sleep but keep spinning, using CPU cycles until they acquire the lock.
	- Effective for short lock-hold times, as putting threads to sleep and waking them up (context switching) can be more expensive.

	```java
	public class SpinLock {
	    private AtomicBoolean lock = new AtomicBoolean(false);
	
	    public void lock() {
	        while (!lock.compareAndSet(false, true)) {
	            // busy-wait (spin) until the lock is available
	        }
	    }
	
	    public void unlock() {
	        lock.set(false);
	    }
	}
	```

- **Pros**:
	- Avoids the overhead of context switching for very short critical sections.
- **Cons**:
	- Inefficient for longer critical sections as it consumes CPU cycles.
	- Can lead to **CPU starvation** if the lock is held for long periods.

### **6. Semaphore**


A `Semaphore` is not technically a lock, but it can be used for controlling access to a resource by multiple threads. It allows a certain number of permits, meaning multiple threads can acquire it concurrently, up to a specified limit.

- **Key Features**:
	- Allows more than one thread to access a resource concurrently, based on the number of permits.

	```java
	Semaphore semaphore = new Semaphore(3);  // 3 permits
	
	public void accessResource() {
	    try {
	        semaphore.acquire();
	        // critical section
	    } finally {
	        semaphore.release();
	    }
	}
	```

- **Pros**:
	- Useful when you want to allow multiple threads to access a resource concurrently.
	- Flexible, allows dynamic control of the number of threads accessing the resource.
- **Cons**:
	- Cannot completely replace locks for exclusive access scenarios.

### **Conclusion**

- **`synchronized`** is simple and sufficient for basic cases.
- **`ReentrantLock`** provides more control, flexibility, and fairness options.
- **`ReadWriteLock`** is ideal for read-heavy scenarios where write contention is low.
- **`StampedLock`** is highly efficient for cases where optimistic reading can be leveraged.
- **SpinLock** is effective for very short critical sections with minimal contention.
- **Semaphore** controls concurrent access to a resource and is suitable for managing resource pools.

# ♨️ Semaphores


A **semaphore** is a synchronization construct that controls access to a shared resource by multiple threads. Unlike locks, which allow only one thread to access a resource at a time, semaphores can allow a set number of threads to access the resource concurrently. This makes semaphores useful in scenarios where we want to limit concurrent access rather than completely restrict it.


In Java, semaphores are part of the `java.util.concurrent` package and can be used to implement various synchronization patterns.


### **Key Features of Semaphores**

1. **Permits**: Semaphores maintain a set number of permits. A thread can acquire a permit, and if one is available, it proceeds. If no permits are available, the thread waits until a permit is released.
2. **Acquire and Release**: Threads acquire a permit using the `acquire()` method and release a permit with the `release()` method. These methods can be invoked multiple times, depending on how many permits are allowed.
3. **Fair and Unfair Semaphores**: A semaphore can be fair (FIFO order of waiting threads) or unfair (random order), depending on how it is initialized.

### **Differences from Locks**

- **Concurrency Level**: Locks permit a single thread to access a resource, while semaphores allow multiple threads (as many as the number of permits).
- **Use Case**: Locks are useful for exclusive access, whereas semaphores are used when multiple threads can safely access a resource simultaneously (e.g., limiting concurrent access to a pool of resources).
- **No Ownership**: Semaphores do not track which thread acquired a permit, unlike locks, which are thread aware. This can lead to scenarios where a thread might release a permit it didn't acquire.

### **Semaphore Limitations**

1. **Complexity**: Semaphores are more complex to use compared to locks, as developers must manage permits and avoid issues like not releasing permits properly, which can lead to resource leaks.
2. **Overuse of Permits**: If a thread does not properly release a permit after acquiring it, this can lead to deadlock or starvation, where other threads are indefinitely blocked.
3. **No Ownership**: Semaphores do not track which thread acquired a permit, unlike locks, which are thread aware. This can lead to scenarios where a thread might release a permit it didn't acquire.
4. **Lack of Exclusive Access**: Unlike locks, semaphores are not designed to provide exclusive access to a resource. They only limit the number of threads that can access a resource simultaneously.

### **Simple Semaphore Implementation in Java**


```java
import java.util.concurrent.Semaphore;

public class SimpleSemaphoreExample {
    private final Semaphore semaphore;

    public SimpleSemaphoreExample(int permits) {
        this.semaphore = new Semaphore(permits);  // Number of permits
    }

    public void accessResource() {
        try {
            semaphore.acquire();  // Acquire a permit
            System.out.println(Thread.currentThread().getName() + " is accessing the resource.");
            // Simulate resource access
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            semaphore.release();  // Release the permit
            System.out.println(Thread.currentThread().getName() + " has released the resource.");
        }
    }

    public static void main(String[] args) {
        SimpleSemaphoreExample example = new SimpleSemaphoreExample(2);  // 2 permits

        for (int i = 0; i < 5; i++) {
            new Thread(() -> example.accessResource()).start();
        }
    }
}
```


### **Producer-Consumer Problem Using Semaphore and Deque**


The **Producer-Consumer** problem is a classic synchronization problem where one or more producers generate data and place it in a shared resource (like a buffer), and one or more consumers take the data from the shared resource.


Here, we will solve the producer-consumer problem using a `Deque` (double-ended queue) as the queue and semaphores to synchronize access.

1. **Semaphore for Empty Slots**: To track how many empty slots are available in the queue. A producer must acquire a permit from this semaphore before producing.
2. **Semaphore for Full Slots**: To track how many items are available for consumption. A consumer must acquire a permit from this semaphore before consuming.

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ProducerConsumerService {
    private static final int BUFFER_SIZE = 10;
    private final Deque<Integer> queue = new ArrayDeque<>();

    private final Semaphore emptySlots = new Semaphore(BUFFER_SIZE); // Available empty slots in the buffer
    private final Semaphore fullSlots = new Semaphore(0); // Available full slots (items to consume)
    private final Lock lock = new ReentrantLock();

    class Producer implements Runnable {
        public void run() {
            try {
                for (int i = 1; i <= 10; i++) {
                    emptySlots.acquire();

                    lock.lock();
                    queue.offer(i);
                    System.out.println("Produced item: " + i);
                    lock.unlock();

                    fullSlots.release();
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    class Consumer implements Runnable {
        public void run() {
            try {
                for (int i = 1; i <= 10; i++) {
                    fullSlots.acquire();

                    lock.lock();
                    int item = queue.poll();
                    lock.unlock();

                    emptySlots.release();
                    Thread.sleep(200);
                    System.out.println("Consumed item: " + item);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void main(String[] args) {
        ProducerConsumerService pc = new ProducerConsumerService();

        Thread producer = new Thread(pc.new Producer());
        Thread consumer1 = new Thread(pc.new Consumer());
        Thread consumer2 = new Thread(pc.new Consumer());
        Thread consumer3 = new Thread(pc.new Consumer());

        producer.start();
        consumer1.start();
        consumer2.start();
        consumer3.start();

        try {
            producer.join();
            consumer1.join();
            consumer2.join();
            consumer3.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("In");
        }

    }
}
```


# ♨️ Inter Thread Communication


Inter-thread communication in Java enables threads to communicate and synchronize their tasks effectively, often used when multiple threads need to work on shared resources. Java provides the methods `wait()`, `notify()`, and `notifyAll()` as part of the `Object` class to facilitate this communication, combined with synchronization (`synchronized` keyword). It also provides condition variables.


### 1. Using Condition Variables

- **Key Concepts**
	- Condition variables in Java are part of the `java.util.concurrent.locks` package and provide an alternative way to manage thread synchronization compared to `wait()`, `notify()`, and `notifyAll()` methods.
	- They are used in conjunction with explicit locks (`ReentrantLock`) to allow more complex thread coordination scenarios.
- **Methods**
	1. **`await()`**
		- **Purpose**: Causes the current thread to wait until it is signaled or interrupted.
		- **How It Works**: The thread must hold the associated `Lock` before calling `await()`. It releases the lock and enters a waiting state. The thread will remain in this state until it is signaled via `signal()` or `signalAll()`, or it is interrupted.
	2. **`signal()`**
		- **Purpose**: Wakes up a single thread that is waiting on the associated condition.
		- **How It Works**: The thread that calls `signal()` must hold the associated `Lock`. The waiting thread is moved from the **waiting state** to the **ready state**, but it will only proceed once it reacquires the lock.
	3. **`signalAll()`**
		- **Purpose**: Wakes up all threads waiting on the associated condition.
		- **How It Works**: All waiting threads are moved to the **ready state**, but each must reacquire the lock before proceeding. This can be more efficient compared to using `notifyAll()` in certain scenarios.
- **Example**

	The `SimpleCountDownLatch` has the following main operations:

	- `countDown()` - Decrements the `count` of the latch, releasing all waiting threads when the count reaches zero. If the current count already equals zero, then nothing happens.
	- `await()` - Causes the current thread to wait until the latch has counted down to zero. If the current count is already zero, then this method returns immediately.

	```java
	import java.util.concurrent.locks.Condition;
	import java.util.concurrent.locks.Lock;
	import java.util.concurrent.locks.ReentrantLock;
	
	public class SimpleCountDownLatch {
	    private int count;
	    private Lock lock;
	    private Condition condition;
	
	    public SimpleCountDownLatch(int count) {
	        this.count = count;
	        if (count < 0) {
	            throw new IllegalArgumentException("count cannot be negative");
	        }
	        lock = new ReentrantLock();
	        condition = lock.newCondition();
	    }
	
	    /**
	     * Causes the current thread to wait until the latch has counted down to zero.
	     * If the current count is already zero then this method returns immediately.
	    */
	    public void await() throws InterruptedException {
	        lock.lock();
	        while(count != 0){
		        condition.await();
	        }
	        lock.unlock();
	    }
	
	    /**
	     *  Decrements the count of the latch, releasing all waiting threads when the count reaches zero. 
	     *  If the current count already equals zero then nothing happens.
	     */
	    public void countDown() {
			lock.lock();
	        if (count != 0){
	            count--;
	            if (count == 0){
	                condition.signalAll();
	            }
	        }
	        lock.unlock();
	    }
	
	    /**
	     * Returns the current count.
	    */
	    public int getCount() {
			return count;
	    }
	}
	```


### 2. Using `wait`, `notify`, `notifyAll`

- **Key Concepts**
	- Every Java object has a monitor (also known as a lock). A thread can acquire the monitor by entering a `synchronized` block or method. Only one thread can hold a monitor at any given time.
- **Methods**

	**1.** **`wait()`**

	- **Purpose**: Makes the current thread release the lock (monitor) on an object and enter a waiting state until `notify()` or `notifyAll()` is called on the same object.
	- **How It Works**: The thread must acquire the object’s monitor before calling `wait()`, which is why `wait()` is called inside a `synchronized` block or method. When a thread calls `wait()`, it releases the monitor and waits in the **waiting pool**. The thread remains in this state until it is notified, interrupted, or a specified timeout expires.

	**2.** **`notify()`**

	- **Purpose**: Wakes up a single thread that is waiting on the object's monitor.
	- **How It Works**: Only one waiting thread is moved from the **waiting pool** to the **ready queue**, but the thread can only proceed when it regains the object’s monitor. If no thread is waiting, `notify()` has no effect.

	**3.** **`notifyAll()`**

	- **Purpose**: Wakes up all threads that are waiting on the object's monitor.
	- **How It Works**: All waiting threads are moved from the **waiting pool** to the **ready queue**, but they will compete to reacquire the monitor one by one. Only one thread can proceed at a time.
- **Example**

	```java
	public class SimpleCountDownLatch {
	    private int count;
	 
	    public SimpleCountDownLatch(int count) {
	        this.count = count;
	        if (count < 0) {
	            throw new IllegalArgumentException("count cannot be negative");
	        }
	    }
	 
	    /**
	     * Causes the current thread to wait until the latch has counted down to zero.
	     * If the current count is already zero then this method returns immediately.
	    */
	    public void await() throws InterruptedException {
	        synchronized (this) {
	            while (count > 0) {
	                this.wait();
	            }
	        }
	    }
	 
	    /**
	     *  Decrements the count of the latch, releasing all waiting threads when the count reaches zero.
	     *  If the current count already equals zero then nothing happens.
	     */
	    public void countDown() {
	        synchronized (this) {
	            if (count > 0) {
	                count--;
	                
	                if (count == 0) {
	                    this.notifyAll();
	                }
	            }
	        }
	    }
	 
	    /**
	     * Returns the current count.
	    */
	    public int getCount() {
	        return this.count;
	    }
	}
	```


### Comparision 


| Feature                  | Condition Variables                                                              | `wait`, `notify`, `notifyAll`                                   |
| ------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Package**              | `java.util.concurrent.locks`                                                     | `java.lang.Object`                                              |
| **Associated Class**     | `Lock` (e.g., `ReentrantLock`)                                                   | `Object`                                                        |
| **Lock Management**      | Explicit lock management (`lock()`, `unlock()`)                                  | Implicit; relies on synchronized blocks/methods                 |
| **Wait Method**          | `await()`, `await(long timeout, TimeUnit unit)`, `awaitNanos(long nanosTimeout)` | `wait()`, `wait(long timeout)`, `wait(long timeout, int nanos)` |
| **Notification Methods** | `signal()`, `signalAll()`                                                        | `notify()`, `notifyAll()`                                       |
| **Flexibility**          | More flexible and advanced synchronization                                       | Basic synchronization                                           |
| **Timeout Support**      | Yes, supports timeout for waiting                                                | Limited, `wait(long timeout)`                                   |
| **Fairness**             | Can be set to fair or non-fair (`ReentrantLock` allows fair locks)               | Fairness depends on lock object and usage                       |
| **Interruptibility**     | Interruptible                                                                    | Interruptible (when waiting)                                    |
| **Usage Context**        | Advanced scenarios needing fine-grained control                                  | Simpler scenarios with basic synchronization                    |


# ♨️ **Lock-Free Algorithms and Data Structures**


Lock-free algorithms are non-blocking algorithms that do not require explicit locks to manage access to shared resources. They are designed to allow multiple threads to execute concurrently without introducing race conditions or deadlocks.


### **Atomic Variables**


Java provides classes like `AtomicInteger`, `AtomicBoolean`, and `AtomicReference` to perform atomic operations without synchronization. These are part of the `java.util.concurrent.atomic` package.


### **`AtomicReference`**


`AtomicReference` is a class that provides an atomic way to update a reference to an object. It supports several atomic operations such as `compareAndSet`, which is used to update the reference if it matches an expected value.


```java
import java.util.concurrent.atomic.AtomicReference;

class Node {
    int value;
    Node next;

    Node(int value) {
        this.value = value;
    }
}

class LockFreeStack {
    private final AtomicReference<Node> top = new AtomicReference<>();

    public void push(int value) {
        Node newNode = new Node(value);
        Node oldTop;
        do {
            oldTop = top.get();
            newNode.next = oldTop;
        } while (!top.compareAndSet(oldTop, newNode));
    }

    public Integer pop() {
        Node oldTop;
        Node newTop;
        do {
            oldTop = top.get();
            if (oldTop == null) return null;
            newTop = oldTop.next;
        } while (!top.compareAndSet(oldTop, newTop));
        return oldTop.value;
    }
}
```


In this example, `compareAndSet` is used to ensure that the `top` reference is only updated if it still points to the expected `oldTop` node, thereby preventing race conditions.


### **Concurrent Data Structures**


Java provides several thread-safe, lock-free data structures, such as:

- **`ConcurrentHashMap`**: A high-performance thread-safe version of `HashMap`.
- **`ConcurrentLinkedQueue`**: A non-blocking queue based on linked nodes.

```java
import java.util.concurrent.ConcurrentHashMap;

class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("Key1", 100);
        System.out.println(map.get("Key1"));
    }
}
```


# ♨️ **Threading Models for High-Performance I/O**


For high-performance I/O, Java offers multiple threading models that can handle concurrent I/O operations efficiently. These models are critical for server applications handling numerous connections simultaneously.


### **Thread-Per-Request Model**


In this model, a new thread is created for every client request. While simple to implement, it does not scale well for large numbers of concurrent connections due to the overhead of thread creation and context switching.


```java
// Simple example of thread per request
class ClientHandler extends Thread {
    private Socket clientSocket;

    public ClientHandler(Socket socket) {
        this.clientSocket = socket;
    }

    public void run() {
        // Handle client request
    }
}
```


### **Thread Pool Model**


A more efficient approach is to use a thread pool, where a limited number of threads handle multiple client requests. This model reduces the overhead of creating and destroying threads.


```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class ThreadPoolServer {
    private final ExecutorService executorService = Executors.newFixedThreadPool(10);

    public void handleClient(Socket clientSocket) {
        executorService.submit(() -> {
            // Handle client request here
        });
    }
}
```


### **Asynchronous I/O (NIO) with Thread per Core**


Java's New I/O (NIO) package provides non-blocking I/O operations. Using `Selector` and `Channel`, the NIO framework allows a single thread to manage multiple connections, making it ideal for high-performance network applications.


```java
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;

class NonBlockingServer {
    public static void main(String[] args) throws Exception {
        Selector selector = Selector.open();
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.configureBlocking(false);
        // Register channel with selector and handle connections
    }
}
```


# ♨️ **Virtual Threads (JDK 21)**

- Java's **virtual threads**, introduced as part of Project Loom, aim to simplify writing, debugging, and maintaining concurrent applications.
- Unlike traditional platform threads, virtual threads are lightweight and can be created in large numbers without significant performance penalties.
- Virtual Threads are managed by JVM and are just like an object in heap space which can be removed by garbage collector if not used anymore.
- **Virtual threads** allow blocking I/O operations without consuming significant resources, as the underlying thread can be paused without blocking the actual platform thread.
- They are designed to be much more scalable, enabling millions of concurrent threads.
- When we create a virtual thread, JVM creates a pool of platform threads and mounts virtual threads to one of the platform threads.

```java
public class Main {
    public static void main(String[] args) {
        Thread virtualThread = Thread.ofVirtual().start(() -> {
            System.out.println("Running in a virtual thread!");
        });

        virtualThread.join();  // Wait for the virtual thread to complete
    }
}
```


In traditional systems, creating millions of threads is impractical due to memory constraints and CPU overhead, but virtual threads eliminate these limitations, making them highly suitable for I/O-bound tasks.


### Best Practices

- We should never create a pool of virtual threads as JVM handles it by creating a pool of platform thread.
- Setting a priority of virtual thread has no effect.
- Virtual threads are always daemon threads. An attempt to set them as non-daemon threads will throw an exception.
- Virtual threads do not improve the latency of the execution of a task that involves only CPU operations. It’s better to use platform threads.
