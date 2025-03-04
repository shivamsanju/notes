# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6SL4NAF%2F20250304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250304T005458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCgLBRz2nXTYVXRSUYft6vBW83e7Qf8ePK%2FXNO%2BlyfuMQIhAMK9e2pjykoKGjHxsZvAaEMq1ieNnx5nnOGGZAaMivPGKogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxCd%2FPvL%2BJkVyGmrmMq3AM3vtM3CSJPLOFux9k6MaE48N%2F0bDgcKh8zTnMpJTDBMDupEEWCrA2ez6j%2F9B9RAccxWsIj6ex5WbboHd9gCtmpsYBf4K45smlrTxxrw1vmtAmkSsQSmOSbOLpx0vH8L%2BtmTwqhE%2BeMvcsVN%2B6pBdXjNbaJkFIbrjM5mXtHGDkKvtRPWqiNAgXItrfi%2FhFtX9tk%2FK6TqG1q91U5ctt10oIu8hGe2uttbN49j262rJkkz3nzLMaleZE0e2UDiHazOXpvUXRiwP%2Fb%2BBwgLuDaoRHzM0YsffiY0NOHLiCvkTv6F8rQ9wBxTK9Akbb1rDe6FgS%2Brvao7e1Al5cNmBEQlD2UTlwaOyaQesI%2BEnKD5qRGETemgpZby98Bwfg6MbLCYGBjpysIiOMTZNG4nPZXJUcIMEG8s7IDze80NyNuj4MpwesyFyKqvF5J7gW8Y8ak2zQXO21RldYW5IeSEiDVxC3y9DEfyYBgA9Ji4YLnmZ6P5RQV0iI6C%2BOjBdllJ3%2BG1W5Yo6RGiPWJoexD%2Fg6jwNHR6K9Wl6zf4w3nJU7AvhPHHnhPDwO7YdfpUaaapLZ1pzYZwzz9uqK6P3KP1aGNUBhSv39xJaf1p7f2qpKkdFnQOL2xnBPu4wAqZtyH%2FjCX%2BJi%2BBjqkARtZ3TB6oYHYy6FA4G2NzNYjbnNu1PWaqaTMdhUp4F1ob6xjajQ%2BsGZvnkGFO013tfTQS6yNnj3WL9OwrffvXAnr%2FZoWVkVVMBUj7Gv3M5Jqv7LiGvpcgUWJJRD460n4pWamdEU6vcIa5wek9JAOyO9VDu8kWkmF%2FYoL3PY5RmhUlCf77x196iWi%2FjygzBSO9ynKGMkXP6ETIVy2WGdqhGB6%2F8XW&X-Amz-Signature=d6e2930bb5bd31a0aeb4d2bb1081bd01202102c7ed367243e9d130ae76190f97&X-Amz-SignedHeaders=host&x-id=GetObject)

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
