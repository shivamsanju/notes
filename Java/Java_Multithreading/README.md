# 🚀 Java Multithreading


Multithreading is a core feature of Java that enables concurrent execution of two or more threads to maximize the utilization of CPU resources. In modern applications, especially on multicore systems, it allows developers to execute multiple tasks simultaneously, enhancing performance and responsiveness. Let's explore various topics related to Java multithreading in detail.


# ♨️ **Thread Creation**


In Java, a thread is essentially an independent path of execution within a program. Java provides two primary ways to create threads:


### a. **Extending the** **`Thread`** **Class**


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


### b. **Implementing the** **`Runnable`** **Interface**


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


### c. **Using** **`Callable`** **Interface for Returning Values**


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


### 1. **Thread.interrupt()**


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

### 2. **Why** **`interrupt()`** **is not a guaranteed stop**


Calling `interrupt()` does not guarantee that a thread will stop execution immediately. This is because Java's `interrupt()` mechanism is **cooperative**—it requires the thread to cooperate in its termination. The thread itself must handle the interrupt signal by checking its interrupted status and responding accordingly.


### Scenarios where `interrupt()` might not stop a thread:

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


### 3. **How to handle interruptions correctly**


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


### 4. **Limitations of** **`interrupt()`**

- **Interrupting I/O operations**: If a thread is blocked on an I/O operation (e.g., reading from a socket or file), calling `interrupt()` may not cause the I/O operation to stop, depending on the implementation of the underlying platform's I/O system.
- **Thread-safety concerns**: Interrupts can introduce race conditions if not handled properly. If one thread interrupts another and both threads are sharing data, it can lead to inconsistencies unless the shared data is properly synchronized.

### 5. **Graceful Shutdown Patterns**


To ensure that a thread is terminated gracefully, you can combine the use of `interrupt()` with additional control mechanisms, such as boolean flags or thread-safe variables.


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


# ♨️ **Thread.join()**


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


Sharing data between threads in Java can be tricky due to race conditions. Proper synchronization is required to ensure the integrity of shared resources.


### a. **Shared Data Without Synchronization (Race Condition)**


Without proper synchronization, multiple threads accessing and modifying the same shared data can lead to inconsistent results.


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
	public void setValue(int value) {
	    this.value = value; // Atomic write
	}
	```

- Getters and setters on atomic types are atomic

	```java
	Object obj = new Object();  // Atomic assignment
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


## 8. **Advanced Locking Techniques**


While the basic `synchronized` block and `ReentrantLock` are sufficient in many cases, advanced locking techniques provide finer control and optimization for more complex situations, particularly in high-concurrency applications.


### a. **`ReentrantReadWriteLock`**


The `ReentrantReadWriteLock` allows multiple threads to read from a shared resource simultaneously while ensuring exclusive access for writing. This is particularly useful when read operations are much more frequent than write operations.

- **Read Lock**: Multiple threads can hold this lock at the same time, allowing concurrent reading.
- **Write Lock**: Only one thread can hold this lock, ensuring exclusive access for writing.

```java
import java.util.concurrent.locks.ReentrantReadWriteLock;

class Data {
    private int value;
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    public void write(int newValue) {
        rwLock.writeLock().lock();
        try {
            value = newValue;
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public int read() {
        rwLock.readLock().lock();
        try {
            return value;
        } finally {
            rwLock.readLock().unlock();
        }
    }
}

```


### b. **`StampedLock`**


The `StampedLock` improves upon `ReentrantReadWriteLock` by providing optimistic read locks, which allow a thread to read data without locking at first. The thread can later validate whether a write occurred during the read. This is more efficient in situations where write operations are rare.

- **Optimistic Read**: A lightweight lock that assumes no write is occurring.
- **Pessimistic Read/Write**: Traditional exclusive locks.

```java
import java.util.concurrent.locks.StampedLock;

class Data {
    private int value;
    private final StampedLock lock = new StampedLock();

    public void write(int newValue) {
        long stamp = lock.writeLock();
        try {
            value = newValue;
        } finally {
            lock.unlockWrite(stamp);
        }
    }

    public int read() {
        long stamp = lock.tryOptimisticRead();
        int currentValue = value;

        if (!lock.validate(stamp)) {
            stamp = lock.readLock();
            try {
                currentValue = value;
            } finally {
                lock.unlockRead(stamp);
            }
        }

        return currentValue;
    }
}

```


### c. **Condition Variables with** **`Lock`**


In Java, the `Condition` interface provides finer control over thread coordination. It allows threads to wait and be signaled, offering more flexibility than `Object.wait()` and `Object.notify()`.


```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class SharedResource {
    private final Lock lock = new ReentrantLock();
    private final Condition condition = lock.newCondition();
    private boolean isAvailable = false;

    public void produce() throws InterruptedException {
        lock.lock();
        try {
            while (isAvailable) {
                condition.await();
            }
            System.out.println("Producing item...");
            isAvailable = true;
            condition.signal();
        } finally {
            lock.unlock();
        }
    }

    public void consume() throws InterruptedException {
        lock.lock();
        try {
            while (!isAvailable) {
                condition.await();
            }
            System.out.println("Consuming item...");
            isAvailable = false;
            condition.signal();
        } finally {
            lock.unlock();
        }
    }
}

```


---


### 8. **Inter-Thread Communication**


Inter-thread communication is crucial in multithreaded programs, allowing threads to cooperate and coordinate their actions. In Java, threads can communicate using methods like `wait()`, `notify()`, and `notifyAll()`, which are provided by the `Object` class.


### a. **Using** **`wait()`****,** **`notify()`****, and** **`notifyAll()`**

- **`wait()`**: Causes the current thread to wait until another thread calls `notify()` or `notifyAll()` on the same object.
- **`notify()`**: Wakes up one of the threads that called `wait()` on the same object.
- **`notifyAll()`**: Wakes up all threads that called `wait()` on the same object.

```java
class SharedResource {
    private boolean isAvailable = false;

    public synchronized void produce() throws InterruptedException {
        while (isAvailable) {
            wait();  // Wait until the resource is consumed
        }
        System.out.println("Producing item...");
        isAvailable = true;
        notify();  // Notify the consumer thread
    }

    public synchronized void consume() throws InterruptedException {
        while (!isAvailable) {
            wait();  // Wait until the resource is produced
        }
        System.out.println("Consuming item...");
        isAvailable = false;
        notify();  // Notify the producer thread
    }
}

public class Main {
    public static void main(String[] args) {
        SharedResource resource = new SharedResource();

        Thread producer = new Thread(() -> {
            try {
                resource.produce();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread consumer = new Thread(() -> {
            try {
                resource.consume();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        producer.start();
        consumer.start();
    }
}

```


---


### 9. **Lock-Free Algorithms and Data Structures**


Lock-free algorithms are non-blocking algorithms that do not require explicit locks to manage access to shared resources. They are designed to allow multiple threads to execute concurrently without introducing race conditions or deadlocks.


### a. **Atomic Variables**


Java provides classes like `AtomicInteger`, `AtomicBoolean`, and `AtomicReference` to perform atomic operations without synchronization. These are part of the `java.util.concurrent.atomic` package.


```java
import java.util.concurrent.atomic.AtomicInteger;

class Counter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}

```


### b. **Concurrent Data Structures**


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


---


### 10. **Threading Models for High-Performance I/O**


For high-performance I/O, Java offers multiple threading models that can handle concurrent I/O operations efficiently. These models are critical for server applications handling numerous connections simultaneously.


### a. **Thread-Per-Request Model**


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


### b. **Thread Pool Model**


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


### c. **Asynchronous I/O (NIO)**


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


---


### 11. **Virtual Threads (Project Loom)**


Java's **virtual threads**, introduced as part of Project Loom, aim to simplify writing, debugging, and maintaining concurrent applications. Unlike traditional platform threads, virtual threads are lightweight and can be created in large numbers without significant performance penalties.

- **Virtual threads** allow blocking I/O operations without consuming significant resources, as the underlying thread can be paused without blocking the actual platform thread.
- They are designed to be much more scalable, enabling millions of concurrent threads.

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


---

