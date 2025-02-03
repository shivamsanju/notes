# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRRMLGRM%2F20250203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250203T005015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDyqvV7ym810nXkBeEO%2F%2BoBj8UFxBewb%2Bip9Ohd9xCWRAiBSUNhX4IJBQd1DCKjkw0yd3DUk6sh%2FNS%2FHZuMe%2BnGxlSqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMd4vEwnlRVMZJlms4KtwDL8s3Y0y7Bw1o180lSBAr568i63Cp4tvhQZECebKSCSQ3%2FneON2FFcyT%2FFAB1V4DdEcpK9JykXLVgFhd1CSOjK%2Fgre7YlwD51R%2FNUxEhfIjAVIROvBy2pSR7Yxh9wTZ9B1n8t6i9XCfLceNJRbNe5uoBX92lKVmjZ3szLjqlAWCt5q9A%2BXfl5clcVDdPgqXwh5ali2qG2K1z01xOlqbCsg2EzQSli3KgqoCK3U9E8PmaQR8MKNZbgxTjCkHHGg3VWWOark%2BzuRs3vkK76L5s3Y7WSXacy6hoyvQYlP17Ey60wO0nyJBsSRhI2jzlG73z%2BpVLmHMgXVwwb%2F9z4r2eFZvELY4ggHI1uwi5JHz%2BuwOpe0I7r23lmRY9a%2BKKWYhxU2%2FZ3rLF4R7r4Um2mwQMaBWCH4nb%2B9%2BkMvIiefYWvpSq2tH6BnsK6GgYqvuw5EW6w4vGlNN3f1IX0Xcqx0%2BaWEnyF%2Fy%2Bcov3YfM6TJLXEfSG3z36hJ4hrXdrmWRxGI2YuYP5Bt2u2RA60v76nEnQ8%2BODtYqAuLyGrLM%2B%2BV003sQtUxh8V3VjXC5x5SpaHAHogkzCQ4YkumHZ9%2FSo3IpdLeIpNUsZQ7%2Bl9MCPkUYd9YBO6dsYqe8wfmt8PqAIwmuT%2FvAY6pgGMl%2FTdoGh9fzDwSJaGp8RH9TUDjooxD6fAJhjkOZVGGiOSOQswbtwmZ02E4savrAaPvgk29P5pq2q9GTlyitVH4Z%2B7Gghue1ZMF6Dps0eDy%2FJ1zzXAQP2Up%2BWhOcNeS9viPCGEDqU2gRPmRstwC1kldzrWkHVZf1Rf%2FXxBR2Ho49ro82V0AfE4u0TcKB98Aq2XMiIt7og7HAVc0ltA2fFFLibrScYO&X-Amz-Signature=ce32a5187ac88ad283bc92c7162098744f81cb1464569df16ffdad8b6b70e4ed&X-Amz-SignedHeaders=host&x-id=GetObject)

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
