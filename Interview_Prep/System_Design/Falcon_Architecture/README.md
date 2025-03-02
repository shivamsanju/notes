# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY7P553Q%2F20250302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250302T005525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQCMsomMnGbTZQh7MnVjrXoTayf%2F0L9wyeVUp7H9Ir4tzAIhAKUJwk6y4Zuwa4hoft0jhnKnzsjRoDItjQdJW35LJUAMKogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzIko2SggSRhZVGPW8q3AN2K%2Ft7xv77bGoM8uJgvYmxve%2BFPSEL37%2FDp9QaF79UkYTqmbIZ%2F%2BHfdc5b4A8ArNKSbZCF04AdqfBWPH6zMNA%2FPh%2BYFTa0vB15gnuJ5DCIpVoWaZzpl8FEcGQY7Vb%2BIudB6d47pqqqjFphB%2FnxthhHQZ7v63bqPk6sruatMiI9Vr%2FQvrFKvFUO9n4Fzp3HUTFPTTP7oDETEtL3cWYR6vo1vu7NaKf8%2FXZzynx8rCTAqODhuikK29p1mNzw%2BO6X3CvoTzfUG9xmgJaG9LKNn5wz3O%2FbQVze%2BrERYV4VPgoWdy4xzu1hzf5xxe4u1h0T2YSvFzzNwTOrXuApbrMcFvKoo3n8DDFD%2Fr%2BaZFQlMQWPFw6D4xfJsApVmnptsyU88Hpk0%2FpV1LkAt2jvN5HfFoXMNb%2FfyFQ3L3bPv22EQcCMhY9bh3C7xMCimmw0qvKpQ%2Fh%2BYRBY1%2FWwvAQ%2BBBMhHYn%2BrRGMgO8n69AsU3Uv0R9VaJFNpLxhLG3%2B4snfUCzjxhAYbxiXA1i22%2FSO4nW380RTPzehffdSKBn7Mn3ksOC68IF2qX592HgjIi50YLzoA%2BI1YexChXwfgt6LQVevUIQJ963Ic9KF5UBaZPiAGHlr6PnpI6FIj9SDqZK3rzDl1o6%2BBjqkAR0dgMZNrjOWyq%2B6OyM7a22Vtaf4ctuPZK8cenm2OBaAyj%2B6uYAF47WJFfSwvtkCm6d6RvqH0TJamCFuRDCvUVUh%2BKpkvEtML1Tenq96wqbLVKDgJmEr8dSDV1SrCTKx6OCvppvRhFQLwsd0gAOetsFZrk2Y6O7IfvpIt2AOXxtNb86jEmJItaYBQoTb%2B1BkR72AQZB8m%2FrLSOmUkLbhts36Z3mR&X-Amz-Signature=7323109dfe6eade26733545d1879ab7ca18cd5ef2531845742c80eac9032ccc5&X-Amz-SignedHeaders=host&x-id=GetObject)

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
