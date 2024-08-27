# 🚀 SOLID Principles


## 1. **Single Responsibility Principle (SRP)**


**Definition**: A class should have only one reason to change, meaning it should have only one job or responsibility.


**Important Points**:
- Ensures that a class is focused on one task or feature.
- Reduces the risk of unintended side effects when changes are made.
- Enhances code readability and maintainability.


**Example**:


```java
// BAD example - violating SRP
class UserService {
    public void registerUser(User user) {
        // Register user
    }

    public void sendWelcomeEmail(User user) {
        // Send email
    }

    public void logUserRegistration(User user) {
        // Log registration
    }
}

// GOOD example - adhering to SRP
class UserService {
    public void registerUser(User user) {
        // Register user
    }
}

class EmailService {
    public void sendWelcomeEmail(User user) {
        // Send email
    }
}

class LoggingService {
    public void logUserRegistration(User user) {
        // Log registration
    }
}
```


## 2. **Open/Closed Principle (OCP)**


**Definition**: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.


**Important Points**:
- New functionality can be added by extending existing code.
- Existing code remains unchanged, reducing the risk of introducing bugs.


**Example**:


```java
// BAD example - violating OCP
class Rectangle {
    public double length;
    public double width;
}

class AreaCalculator {
    public double calculateArea(Rectangle rectangle) {
        return rectangle.length * rectangle.width;
    }
}

// GOOD example - adhering to OCP
interface Shape {
    double calculateArea();
}

class Rectangle implements Shape {
    public double length;
    public double width;

    public double calculateArea() {
        return length * width;
    }
}

class Circle implements Shape {
    public double radius;

    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```


## 3. **Liskov Substitution Principle (LSP)**


**Definition**: Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.


**Important Points**:
- Subtypes must be substitutable for their base types.
- Promotes the use of polymorphism.


**Example**:


```java
// BAD example - violating LSP
class Bird {
    public void fly() {
        // Fly in the sky
    }
}

class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostrich can't fly!");
    }
}

// GOOD example - adhering to LSP
interface Bird {
    void eat();
}

class FlyingBird implements Bird {
    public void fly() {
        // Fly in the sky
    }

    @Override
    public void eat() {
        // Eat food
    }
}

class Ostrich implements Bird {
    @Override
    public void eat() {
        // Eat food
    }
}
```


## 4. **Interface Segregation Principle (ISP)**


**Definition**: A client should not be forced to depend on interfaces it does not use.


**Important Points**:
- Promotes small, specific interfaces rather than large, monolithic ones.
- Reduces the impact of changes in the code.


**Example**:


```java
// BAD example - violating ISP
interface Worker {
    void work();
    void eat();
}

class HumanWorker implements Worker {
    public void work() {
        // Work
    }

    public void eat() {
        // Eat
    }
}

class RobotWorker implements Worker {
    public void work() {
        // Work
    }

    public void eat() {
        // Robots don't eat
    }
}

// GOOD example - adhering to ISP
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class HumanWorker implements Workable, Eatable {
    public void work() {
        // Work
    }

    public void eat() {
        // Eat
    }
}

class RobotWorker implements Workable {
    public void work() {
        // Work
    }
}
```


## 5. **Dependency Inversion Principle (DIP)**


**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.


**Important Points**:
- Promotes loose coupling between classes.
- Enhances code flexibility and reusability.


**Example**:


```java
// BAD example - violating DIP
class LightBulb {
    public void turnOn() {
        // Turn on the light
    }

    public void turnOff() {
        // Turn off the light
    }
}

class Switch {
    private LightBulb lightBulb;

    public Switch(LightBulb lightBulb) {
        this.lightBulb = lightBulb;
    }

    public void operate() {
        lightBulb.turnOn();
    }
}

// GOOD example - adhering to DIP
interface Switchable {
    void turnOn();
    void turnOff();
}

class LightBulb implements Switchable {
    public void turnOn() {
        // Turn on the light
    }

    public void turnOff() {
        // Turn off the light
    }
}

class Switch {
    private Switchable device;

    public Switch(Switchable device) {
        this.device = device;
    }

    public void operate() {
        device.turnOn();
    }
}
```

