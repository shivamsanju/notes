# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBDZSPX6%2F20250206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250206T005038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDwQpAHFW6%2FZEBxhQVUlSdwXUpLFvIpGLqcuYUf%2BcXc9wIgXruxBFIBg5V7NsS1a6PjdnfWvQJwIsiIu4GRV4RVzgQq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDFeFnMp6zwJ8n%2Flu9SrcAzkpn5e2duHQp1SO8ll%2BpiHgblXeQWhVcfLJyZqZf8c56E%2FXaVRGywYo5K87Fx5N7kqGOSIwsiIOgT03veBNn3qxV0ju3JJqYWMWsNZ67EUbqdsyGtWEe%2FJtlGemsJOEIM5Pyr52kysPA65aPQt8NNJJiGlTt5XwUsiS3ElKpD2TZfelCXOmjv%2B%2FOPxrPQXlSynqrFJIyWeglJMA3bEjthJBOmL%2FzYmYDIfG1B1CL0i3R%2FvrAKylf0zz7%2FWjO61aREImpgRyyIPbGJa9fjfnQk8KSZeR5zRsc0hEP0fGM%2BbD%2FZz94O3QaAgCUQUyh7KBTuqaeR2N66PQsrct3slxUdd3Uqb9tMjj4RMcM8J7UumxHWdEE5Wxy3lr0k8H2W0Rah0WybpfjRNt58%2BwfHP%2Bs3i4ioc3uAVaCvz%2FX7CmS0DcejOFJzUcMuEYjzjSzmP8xbQ15mkG7%2ByD8IUxoFum6nj1%2BQdh62U%2FGt7mDC4GZcNXhNkcwepcSj0fc90itZvOCNX5CtOypBEIxXxeK4Z%2FzSaucAFxND2Rz1ymsKPgWiOm3PrA6SxngU4GkxP8HjxBKs0w7D9wIxfoLrJAijo%2FyEt1%2FjRAufytaVbGdCwMYJduJGRK6u6bCi%2Feb5yIMPjqj70GOqUB766xKWqwHERPv7WCS7ilCyC0G%2FSwgV7gU88DqMu%2FuY7XdWZD8%2B%2FIcg8NXN8cPhSi1t6MgPYXh0aFeNMMPpRIa9Gtudih57zk425WdzjS%2FKZmuFoheFHH%2FODNod3nuWr9oIWCAq6zJ47qa1LLjBabti%2F6pbrxrN8BPKOmv%2Bhshku7jOdQEOS6azyhw04fSSAVKz%2FG9k0R%2F4ukoHrdE3F9fbL9N%2FEQ&X-Amz-Signature=5ed2654623dc59e10bac4edb800b9dab6e01fcff111fa7383ca119d83d52815d&X-Amz-SignedHeaders=host&x-id=GetObject)

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
