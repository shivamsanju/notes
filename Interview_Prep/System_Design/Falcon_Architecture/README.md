# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666YXLO6R%2F20250202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250202T005301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHqRGWvu8cQGdxd8GB3p0aUwP1b9KWfHR%2F5ZBnlbYLuAIgCC0MElkfj6VA%2FQprTZa09sqJJmXIyY8evWBwEtq1k60qiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJDFUTCo4JrxBRqgjyrcA%2BaNs82K8z8yYKYNBtFKotjmxzUeDR7Ut6sxVnv%2Bfu3p0PDqYOcPoUlBn6gSjdoCrrfTQGMeuHvI6L6ppjyhCBplNSUd%2F%2FNftwH5NcFdtmaonYs3GnaWnj5mhKE8y3qIfYMtacPMbo5oRo0zCS5heHymgU2xLs48vR%2FQ5ZVqaOBJfGUZX7Jbh%2Bkl1dKZ63TKlqun1uDE6y7csIwWZiUV7C%2BQbEgjohRpmC2MXaHtRg175rFm1nHvXNaoTMuoIC%2Forcky49HlZ7S5wcqquW43vpViyDldZThPypsmZl6n1xAkNJBiIkPc88HWBYDdeA0IO9uCkex0uQsh3ShpGgjRcQyABFQzr0%2BCeT31%2BqlwRSgs7HpmFlieHG92iR%2FgyVMqGlEflAwIWFHkqxEB5Ym18hQR%2BvMbSGIN5I0weUaQb9F0oCGInBfUb5uGvzbedmsa6PJYYFEzPnVw3sH6nfVZND7mlddgbNl1bYFwrq8%2BiId6Dq1S2w%2BbNMpWwZs5WAPR2YStKKcXM5BH5zHb5LAuAcgc0ZJJmhBI4DvLr242fYh3ZlAvkfTWbyRbQSwL%2F3eLAiBtKFHEy7ZNqXsTQODgXU7kbKhomMRhHmu9A7nsEj9nBBmOym98VLQ3zFfNMJby%2BrwGOqUB7g2CIt3FoErmlXI%2FazJgRbiJF9pPOzbTWsNbmcCF5cQZiqAzR2cA3CIV%2Fd1hXtgcY%2BU0Ws1Epn%2BMQhnjbDhNFayS6OokEA9qClvGc8iuCJDjr7iDllHRpyxg2s5SVqCzK9OT4oSy8W4ZJXEnHTIFvWXJ7TXsOHRHwAvfbGxqoUnn2X3rA0VnbNgg%2F1G9HMKJVIlUVKcLiCiXYkvwuKb%2BDct63Xyo&X-Amz-Signature=41d6402f6b0361c6ea00a2830aeec9f27ede814cc8a7d028a4a90e329ac6c111&X-Amz-SignedHeaders=host&x-id=GetObject)

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
