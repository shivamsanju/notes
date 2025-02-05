# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZUWDBHB%2F20250205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250205T004942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQDGGl%2Fq0HqOxGaL07zXDIKQXIEfCG1KySg0D81IKGpZaAIhAKBKP57gZ96SgejQUbRoetck6iz8SqN8JwDJdUO%2BDs93Kv8DCDkQABoMNjM3NDIzMTgzODA1Igx3bN9ZWv8bU9%2F62Wwq3AMHKBkbjQhi9WUCOU4ZQ6jbBPz5%2BUJfYnFNIMZWw097R1H%2FL8bhkRyXvtAVj8ty%2BuTwH538klpfuoQWlp%2Fn81DX7RfvbWjDYf6rf%2BOXKEf3fQShMyy3gw%2BuGLHj3wSsspyn7znU3W708U%2BqYVgl2TVDVUUJeom%2FEMdAkLtgzWGEWMDTw8Go4DIYXj6cNgZVPbeno5Bkrd8VuKKo6ID8DRQ%2BIenxe7tUCCNh5rReXGsIkoLiV6TluJYVl%2Baq3vliifh7EhGzP%2FviTkeLWR9%2FXGrBcTJeQ7xMDtL%2Bf7%2BR99TOiy6wqsD84rBY7HTxQni6MmpKGDlt5l%2FtRhGGF%2BxOKn%2F5SWZ%2FYbin57K4nZBUCJdFvtYOdLOdc2ch45FdXjPsZw6uJcGsF2K3K8AaNIZ%2FZp5BHhVxn26R87uwSh%2BHrnveFLhfu1I%2FbI8x81kemlqqGpnVeuAlFn4UbcWwVWx20ziTGOcM0D2vKRZ9boej0mzoTEHv273IRNwJzoKV164o5YS2kwB6AEs7RNIxheWZohNbunk3yRzIJjSkFetUhpT5%2BHj1vYlDisLQeSpsAYbYDuqfL2zSONuBtEM2%2BX3RX4nKObkkU%2FGnCRbp6Q%2FoPZ2IoR%2BDSoy5WLO7VnOEMDCXzYq9BjqkAYv0eVAZDXHHWPRwO%2BuRlAlPpo875TCgnjBTtGQ7HRALMgOwHV82lYmvH4xlM2RytNJllh8qtiQV0Ghxy5cvtpz4CTW%2Bga6l%2FBlbEC9L5t4UhLjsdIhkwYffOxv4olWaNbQdaTsRHcn%2FBu%2FYz7jw5ty4KSGafYnxx75adi2y%2BKw%2FOsKZEFoFrqXqD8dojPviI7XqWVzTPG%2Bb6jl8cRKMJPLpfedX&X-Amz-Signature=5bdd3d36daefb8ac25c1d5836604a3aeebe3e949c57feef09bad0cc9bf2489ff&X-Amz-SignedHeaders=host&x-id=GetObject)

- **Kimble PSA, Salesforce, and Azure Blob Storage** trigger events in **Azure Data Factory** when data is updated or created.
- **Azure Data Factory** performs **data transformation** to convert raw data into a structured format.
- After transformation, the data is stored in a **Database**.
- **Azure Data Factory** sends a message to **RabbitMQ**, indicating that the data has been updated and aggregation needs to be performed.
- **RabbitMQ** queues this message, which is then picked up by the **Aggregator Service** (written in Java).
- The **Aggregator Service** precomputes complex aggregations and stores the aggregated data back in the **Database**.
- The **Aggregator Service** also writes the aggregated data to a **Cache** using a write-through caching technique, ensuring quick data retrieval.
- When a **Node.js Server** receives a request, it first checks the **Cache** for the required data.
- If the data is not found in the **Cache**, the **Node.js Server** fetches it from the **Database**.
- Finally, the **Node.js Server** serves the requested data to the **Host** through a REST API.
