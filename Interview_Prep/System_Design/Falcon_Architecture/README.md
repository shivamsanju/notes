# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TROIS5NU%2F20250312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250312T005423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIH0KQECPH6uteUWtC6KCNPDh6J6MHR9pHjWlHa%2BDUDFAAiEA%2BnjYmHRQwzSo1ZtTGl%2Bde2fbzTsMJNrMtICybb6AWFIqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMEZO2XB1GBhxnlyQircAwXy9Ruy9itcLNfe6xYX1A1XI0X4h1OKZrNcafGXs2hoEs6yZhEkPsdVXifldZovU9kpQPzWxmWkUh8ziMzGseZ%2FQ%2BYsaxx7tV55ZJyioocnFgN65CMcjueW2rrE88URTFjAx7rBqCZk0y5WkNWMDA0432n3yi2qZspty34fGz6rAgyfRNnUa3%2BhIHlNG%2BtO%2B%2F233dw6ulaPWi00mKwNMfkf1J7HjGReKJml9ZGLzx1hYXz4Ehb6CYeiEF1HN6xUFC5DoFE37mrJBvv%2BXpiJpvwNBNPOTZLoOLSX78ThWdNUPuffdpR4QwKJ90TIl64%2FolEOQVRPcNFihJkKoC2cg5HU9MasWYYe9qIf1%2FtaJYg12mSdd4xYfy0jiKVJSAuX%2FZzK9sQruNwDKQx%2BgsUa9YdQ8LmmgolSLa2RAPT%2B%2BCtDts4jx7G1GFb%2FhBcFxpVY4ICgvK0hPybikkZL4C5jQ%2BM%2BIB02bdUdKDaLStfqi5FFiukISowF2sD%2F6wHA%2BI9H3E1iC%2BVmsFFNPsf8bED7NhCwybbvOisEWss8MoxwwU9OAA2V1sAsxAWEC5PjWlxiSR3Bbp1Gind5HM9%2BMcNIurbQWhsfCKqrRSopgz57cyF37%2BXF2KA0MrNct%2BOHMJSNw74GOqUBpWN8aEm8sNGgNswx5BNJ%2BSJRL1XITkspdPBRvU5JfMwLBybPPJTEvV5tn7gAWRPTlXbSGvbZzV44VpVE13SQKpU25rlv9tXNlqkwtEiAOc3ofCBDVRwGgOfr%2FE4cFiKq7GZJDWsfpbnmyyd0D%2BVAyeaY3tvl9KHz8aEEAB2G2OFHsDDiLfs14%2FSlljLlLLt6RDZsz%2FFVTxRV7p0%2FGp52YQITIE4y&X-Amz-Signature=72b48fbfa5ccc0bd6e257e31dbe4297fdc966aa59779e3342a9e99ea5985bf07&X-Amz-SignedHeaders=host&x-id=GetObject)

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
