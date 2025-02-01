# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGXIVGLX%2F20250201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250201T005255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6XgT2yQA8ru%2Bq%2F3LwclRKvx0SbCFGruUG9QDN8pKQZQIgbWnPd4j2%2FSoDGt8BuJAjTnzbBwalT8v2cAH30n45uCgqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPEgP8eYCCoklu8iaircA6ayL08k3XLMWeuGzSvilthoZr3IzXG6ahizuIq2lqHfzlgZej1ekxFkFZZmfWu%2BHFS3nlIFgdC8zL5fam4v6aaBdyt3lyQhMwCTdzV3KAezWa25GDt0oq1W9bnNoArYkrfykh%2FF1xVApFX7RFjbDFoXYuzyaBN8FkR1ym%2BZBRjrmOFD%2FmUyhypQXMrIR82bkqW4xFQZ6cbfOvI0ltvjsSmCYYwej20sRIOifmBI%2F5891ssU5xddMR060XLftM8GHGRVNSCQrPPh1%2FWzlEtd3oekdfVsv6B%2Byd32JcdxMD270BOGKrMbEeYVXTnLS7AzPR2hls7rTAYoDpLa2SR3fGwrLzLXBypiVRYvWlu2nDNX7k9SV12Mc2TsR5DVSUDhlTyEMarbHDAEkPWd8ZLjmJzg%2BrqQw0vyF5RFqcmnNicxUr8facMBRJuwN5R3OqqGOMGIqOXul8qrJjVEVPgGvFX%2Fn0iiq5uAjLvWEcUll5oS4rHpZnpVOn0kWrCv1hhItdSdfDOpNenZoMTKyxWwCIQH0PwM96cyBAybNiZIkiFCrr2lU9NgBhJvF3NSs4Yr4hq1wC%2F82qXNhKLlaDRvKEs6saOwpk8DZRw44DJ%2F%2Bzz%2FDtviGcJvxkcvDKnoMO7M9bwGOqUBB0N08ZAWIoOVyGzYp2zYUlLh3jB%2FekEKUq2LbsfDJxIGB8BUew3xN63obP0AQ6ldqRaUBoifcedwa1HCt0tf9ohEdjCGhKFww%2F1KdeiXe%2BvlBthjCf7WNrysZQ%2Bv9NCnYt27YEyC77EADZazq9fJtmtp64mMMaXJSnse1DcaTgW6c45jA8JlDenXeq3r3Fa4D%2FodvBzNVnDBab4B55LB3uIL%2FYiW&X-Amz-Signature=b8c8923af36fddeb9f3c08009652ecc135650b5694d9182e487d6aab81678359&X-Amz-SignedHeaders=host&x-id=GetObject)

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
