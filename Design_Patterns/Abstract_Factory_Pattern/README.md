
### Purpose

- Provide an interface that delegates creation calls to one or more concrete classes in order to deliver specific objects.

```mermaid
classDiagram
    class AbstractFactory {
        <<interface>>
        +createProductA() : AbstractProductA
        +createProductB() : AbstractProductB
    }

    class ConcreteFactory1 {
        +createProductA() : ProductA1
        +createProductB() : ProductB1
    }

    class ConcreteFactory2 {
        +createProductA() : ProductA2
        +createProductB() : ProductB2
    }

    class AbstractProductA {
        <<interface>>
    }

    class AbstractProductB {
        <<interface>>
    }

    class ProductA1 {
    }

    class ProductA2 {
    }

    class ProductB1 {
    }

    class ProductB2 {
    }

    AbstractFactory <|.. ConcreteFactory1
    AbstractFactory <|.. ConcreteFactory2
    AbstractProductA <|.. ProductA1
    AbstractProductA <|.. ProductA2
    AbstractProductB <|.. ProductB1
    AbstractProductB <|.. ProductB2
    ConcreteFactory1 --> ProductA1
    ConcreteFactory1 --> ProductB1
    ConcreteFactory2 --> ProductA2
    ConcreteFactory2 --> ProductB2

```


### Use when

- The creation of objects should be independent of the system utilizing them.
- Systems should be capable of using multiple families of objects.
- Families of objects must be used together.
- Libraries must be published without exposing implementation details.
- Concrete classes should be decoupled from clients.

### Example


Email editors allow for editing in multiple formats, including plain text, rich text, and HTML. Depending on the format, different objects are required: for plain text, a body object represents the text, and an attachment object encrypts attachments into Base64. For HTML, the body object represents HTML-encoded text, and the attachment object enables both inline representation and standard attachments. By using an abstract factory for creation, we ensure that the appropriate object sets are generated based on the email style being sent.

