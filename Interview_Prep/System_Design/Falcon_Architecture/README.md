# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625S2CVEC%2F20250226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250226T005250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJGMEQCIBQrE7%2BTaz46oLYy4ncgq2%2BLsEQo0o0zBBbbKZW5JbNUAiBAh8ReYKe8E5OVZ7bQ2ZmLvMQTpBzSz8MFjV3cjTmkXCr%2FAwhREAAaDDYzNzQyMzE4MzgwNSIM3CD2%2BhXU9byx6bEEKtwDwMZoC5FtbK4494%2B5fh4bGLJBnI6V5Bw3adJZwtK3A%2BSuw4q3MGNAPzhQWt%2F6%2Fa09HXXZzb%2BopGaejVxzKpZwMgB4bZ2qUKscfzGfGGexlZFzcg8vj1wHuDpdPakTkqpkBbDlN8vgXLc1fBfAlbCKesd48rG2ekcYkvYT2AHFU7%2B5VB3ZA%2B33cLCZuINVp%2BZApS97qcNOGxuEMA37Uas9%2Boj9rxCU3LJhI47T6hNWLQ%2BWitJVWCyhmt6MufpwFexZ9D9m7uv2bBhWWettxeu7nLslIKpaJ5IuntWdplSNMSziirhIvDue5xvvzfWVLqex%2FSolh9lo62DX1443e7aOxWwV3lvaQYHSftCOsaPka1gKLHkemqPCXkRiEQGa9Uc0SnVueDIcW3KzUJtjrezhUiRRcwn2gKTVJlaQZwThNkmHJ7RNisNS8h6%2FHlqmuw3k9VCK3VozAMyqAeyutJ7pfK2qEW%2Fjg1Ug8sr4nWtwK2Gj5OmIfwqT%2FWPSiv7gG%2B2v9Xbu1rLKs4H5nnZW3BIY%2Bz757ZlrC3pGdMODPvHj8%2BM34C0xg%2FTdh0nvcU4C%2F7jS1ZuPq3rZ1Fx5yEx6MbOzx64r%2B2ZoDGSpJiRIaJfM6EHvbtZtxKhSOH130oMwrbv5vQY6pgFjlMuRmfSNHEU8hnIX9Md5oud39XwT2RlbL0wI1p7f0g%2FMwqyBraz1VjOH0XUqxPsetItobn5gRi5nvNmF%2BNG028RkQNV%2BdWIiQbj8IZkC1OQaG3gZYvmnrM8%2Bxp61erYkImqUYVDA912pV9vORiOKlf6DSHoXS4BGL%2B5d41RK%2Fx40vUUJ3RL7olOHEe7VqHv2DmY5LWX5eNpFoopuwOPlohgod%2BKq&X-Amz-Signature=4f2b73a707a87e27b0a84f212f0d4b645983b238e58b584f462d30ebfd822e57&X-Amz-SignedHeaders=host&x-id=GetObject)

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
