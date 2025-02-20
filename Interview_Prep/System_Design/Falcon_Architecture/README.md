# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIB5GFZ6%2F20250220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250220T005114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDqTZ%2B2y%2FH0FTzVvpEqijVuh4iPJyW334KmDnFejUfLwQIhANEVnQYqcx1WTtkq6WFQjbtNuK8nWh1ffiiPcr5Id1RIKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzbwEdYKM9FiSJxN%2BYq3AOOHOX7%2FuZyKT47oykv6Jeo9uyI4kUXJFJyeoaQ1ikhDIywYwohmVxvnV33IS1J9WHBlBn8%2BJnRfKgtgdfUhY5PKmrOJ7ZTd25S93N4F34VQKIU%2Fd1GsnFEHCq9ehxu15HPM1kn4l%2FaeXGLI28v4PE1XcY%2F5kcrgxsQ9ecXsGkosoXs19yPcwsgnTniudVRqBFHmMTSXiC9Y4MGyX1BmwEouVYAb0A4UvdVA3LIrB2RwEzIqPN8rwY2xr9OyG1LFIhntW5wdyGO1G3xkvEmz8wjf4051UpDmq3GCbU0tYq7uhujNEV0YlTEb6o6FbYQ2SxbufTOek9TokGhBMGaMEpVy%2BXwKxer6yQfjUxk6X%2FaoqmhCvvn02Ymlar%2BZgVQRLOVGrswthHrrzn%2FNmN6nPmXesDRgOloQ%2FAk2FactbGP%2FnuuYOuOkMXOFCUidphyx3vt7OaKVB%2FnfW5Zt52S%2FlMp2eN%2FgrchbPAVEbrQM1kw4aFpgABafOF0IiweiqWtilKlFE3llVYQ4XWjuf77UdTwXtbd6LX2nonztSBQzkd0UtcwcCxuBz6w97gHSSbDaWh98FZy%2Bu51J0WryOTspM6tIOA9EBcanGuR2S2fktygf2nzp46BhaLgeDVe0zD65Nm9BjqkAburzVlE3keZWafxf1RHgbzTmNcnO%2FGCgrV4MDEO2nhVI8gQ1R%2BNSZhEmDEyzCNv6uDMyzOcY%2FhQywgG32LqGR2cbOABZeKehcLSndZahFVIZ3osq32D%2BZqlgb2c3LhegBdpwH%2F0qyUV1ho9kNvMueTEC0Rerzx5adAxLiNFNUTU2y%2BcBTlSsWFpYEDorYfZ2izujsNtdjksEqc26zA6VOndUy5R&X-Amz-Signature=3a610b6a5ed81c6fc35e78a644d5a4258f8e92c04256bf254c344df4a49abbce&X-Amz-SignedHeaders=host&x-id=GetObject)

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
