# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRKM5RSQ%2F20250213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250213T005045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD8VI%2BeSkehhJ8Yv9Tm%2FVa5bCoVv%2B6gdGpXdSYJ01WK3AIhAKt3L9YmNoRK%2F%2F63spzXVLHuRTqruxgYNegCK%2B6iNQaZKogECPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy0Vc6vzHOdVwsbkCwq3AMP87xSjFczkOzGTuqeGHT9%2FjfoFDSGesKEycoZVDX5RE8E9iwYXsPjBcXUjzYUMoxT6cTucK0vtNtKQVnSqjZ1kPQrL56diH3Q6yhRpOpQTdt6bTPuYsa0vS5gOg%2B1a%2FXWRksIb5boXitjyN8u8idppU%2B9kMZZCrlginhqFyiqV5J3feSquAEKqesB8bIIGKgIhecqNhLSSX%2F7c1aWAYUcrcQ4ncggyEpslYMfQ%2B%2Betq57z7qUb%2BIBNPCI1qxL1JW9P49W5O0jWFKEHJgLRLKQHX9UBW5fSy5I4BFpLQrQ%2FL6bIjX86ly4e1CDSqfZTgZ4WyZKAPqTEb8H34OIRKMai%2FeJPcJlHYtGjF%2FmHEePQO%2FecuGeYrKLfM2dRq6tQfn4ZSgzR8oLhV91aDCiJNDWiPGo746hH40YgM6GMOZ9y1D6TS3b5g%2F7tVuGRXnJXyInvKjHqNsUcNs6vM6nKXeR2c98SBqYrsz37XnqnRF9HK9i2Asi0HccjyLBeDnmELJEiLlLAWMeszz89xcxpjM7VKURnmX8nmhNxnU%2BtEmdNMGrMA52Ompg2Y%2BqqjfKk7ZrgAmCqKj2x%2FcjD6l4m3A9wnkiBKhKXJpXJjQZ9RpXOK7yLHoKksI6TT2ZhzCU%2B7S9BjqkAf%2FdBVaS2NUsyJ8ePDWiN2dcYaFvk2rJ1VE8ok8SNd5%2FW%2F2K7B2gjbYrUAtndTNFoacZiktHuFiXyOwWpsaJuK65Rr8TaIfc1nMXCseV3FoJ%2B%2BBbqg%2BZVQVdI174IoOrNxzmfrPwAuFI79wqlRV4BA7uCFYUdG3bNAEJs8OArz%2BWYvUBkA1evQDbKpqpRomUt5ZYgHdkUZRPvh5n2Ow%2Bj2m1m%2FKS&X-Amz-Signature=1e1da56299177c271ac428701582d9e1e50e8d1f035c9975d8b18309d2345741&X-Amz-SignedHeaders=host&x-id=GetObject)

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
