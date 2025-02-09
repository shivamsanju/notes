# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN7DOM3A%2F20250209%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250209T005340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFQEVbeTGKzY5JdtpYh%2BjVKzxWeQ4mI6Ik4BmQRh9MM4AiAYhX9aYk4%2BemDe65SkFu9Gq4snoumnGE0wsnxF0H%2FKAiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMno9chEcYS%2FynPAlcKtwDmNTaLaeeS4QQq9WuUZCLQDOa4vJwyYJ7oXAZrZwReHS1IDyXQVDyj%2F2cFTwxwkK0fD5tPoDgUlVKgNXfWraRYRpw2aYNnCvxkHzPEb1i6s6l9sM49Z2zJjvalDMbPMMuEkYlextpU9UtrERwoWb023Z9vScPNxD3Jx36V3U4TV6BreZ9foH8A%2BkDqZvhOwRsIwZL72TtIEWCkBAU0ak1YMhMJ29LEEgmAOKY1YMSxsrS%2BilnQS%2FVZUosR4lVZDPWuKgYtc6z1NwUwZzo%2BH3zbpXXCbT05hR2N3k5ZkiRqF3roDPArngybxwbJLmr4QwSrlwZ4AJxgtrFRv2AUfN2XwdDMBGYcyX3OM6pK0X%2FICA3PIQf8VgkhRfUx6ZWLyqlMFDkFl1ed1%2BjbbutejuviOPJe5qEb5PWaMkrp%2Byq1MLvli%2F%2FaMt5P%2BShu7KJ6uZxAqGB%2BD3e0ODiKMilcI8ESk6YS0169ZoT1GcRPOe5v4HBfvkuMWBWg0tqsDFbL6EqavmF%2BwKyC2lsm74%2BFdjoWACvArzXcxFkIIHtjMRl6owld4lKDiyEhOTuaSv0A67SkReos2c1Z8lDpldKPmAKY1EfFgxhWz7TuaiMLAHlX3Qs9JnQahYY4y3rtYgwu%2FOfvQY6pgEKCH%2FB3cIMVm2p88zWm9Kt2biUHbjtgI8Br9rv%2BmbPEUjSOIZa3TfSh9il6DBteAxZHqktXjkItQIIGCEG%2Frug27ePGtWDKyrQOrg%2FEfSEBIODgcctFJKkWXGkQwgqsnP1UVzK2qIo5U79rm1DUFpE9OwCz%2BRAOqtcF8vs2kQ5%2FrmPkcNwuwi3cEzY4J%2Fm5mcKZz2G86hQI%2B2aOITiCjkZItS4gwUJ&X-Amz-Signature=cb9db28449785ba25b3bba5eb515525d12eaa5edb677a456a674ab4d9af73235&X-Amz-SignedHeaders=host&x-id=GetObject)

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
