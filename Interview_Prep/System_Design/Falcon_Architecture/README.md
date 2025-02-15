# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZECYUPFW%2F20250215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250215T004926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIBuagaSDiHb1RIfjpbpA4Pl%2F%2Bf7ssUv96G6Ev0TUqs%2FEAiA%2F4BU4VHEc1Jmmx7eXJO9fBWzXWVRnQVMFBp9vQygdKCr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIMRn15Lh4VYukYJvsvKtwDhPKQZ1flQMf3iG6g1zFD8o2fGMZw0YE6KS8NPCHUNjRk39e8oliMuELlZhdM8%2F7RIZpDuSziT7urNrzfs5MRX4g%2F68lzORrAFQuIg24cfE7L%2FfIyw20%2FG6yokUzCZYVzVhCXJj5Fi8rQc0Q9ETeknxAO0cN9iDhZ1IAVdEAqifNG6U4Gu0PDIp4C4Ysm66iz1OYuLtBqgVuMXBgRWj3NHoUN7S7ZMOdggeVrLhcfJSPUV2JP%2F6VDb9hu5SfeHc9RCDZJPYJlzPguXkzS3BSe3PZ9xqHtBFVwDfDxb0WjqOQ0Bs5QQGG1fPVuhHE4rFdzZ7%2Bux2ojfs84dAr7b0aMcUVal3HfAef5OoRV2xr%2FJPYOIDUuH6Bfyg7CcKRTRBQBulG07dF50ZR39uN9Cg3lsnT%2BoL8lurKcY9YeXXReMJMY4MKRjHnWQbyGciuILHCbqqnPcq1V3gd4zWVdLkImCqVdA%2FqzpaHMYqBkQytgAhCMOYJEi%2FlUyQFBh%2FqnreIWvfkk4%2FATd%2FbPB5vObFSFN8DJvAaWD3GWx8SRnxLOKR28TGmfFjTn1cwslCBVRoqJZB1xtl5tUeQrzqvcZINMXh6nCXR5fZ3ldaoRTla8DYCoiH8FYpPtjZ4LPwow3rK%2FvQY6pgGUQqGIxZGsWp%2FcCBfi6TscpMxVVs1v24Fv1N3TXOwoZaO4d2kezvpjbHl8XulZ7grjXERRqQ1L2X174PaEtt0uv%2FPJCdapZGYoiqV3qEad3mySr1w7I%2FuLPwdaUw4Y00%2FkDbhcciQMqZ1SV5VeByxLHwGgoxbD2eTlleVmsULBIGaQEoTFUuuBJ%2FOYz0l2UHBTbJSvy56dGhhKjHdK3xD0ZUZg1NXL&X-Amz-Signature=67389976efb755d4c51de6914345054f288eaaee0750f0e49e0628fcaf51451b&X-Amz-SignedHeaders=host&x-id=GetObject)

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
