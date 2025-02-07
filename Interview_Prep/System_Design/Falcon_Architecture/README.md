# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T32YOZVT%2F20250207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250207T004956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIHZHgIlqQ1bnqIIfgQjH%2FPSwdcI56H6xbG3TTbjR4gbqAiBYfQNlah2UNcQMvh7546pVkyGVpYl5gOSReHGKi105Dir%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMm1jWUS4kEfi2DJyNKtwDxMY56yn6TRVgp5bgmNw6RFObzDm%2BwYA%2BEvkUlLtt%2BkmQR1sNpkuScAG7yuHIetRhv9yCGIyAcmqWQRm73vJ%2Bl9Dr3CIK7oc1Pi60JrS1Hy106fGoBlnXfrHKTCsQiFWOMAUcy0q6Dycr1XztSfR7IgSBtrsZMHn1IO9bKBQTeptPcpeXmEAsbKuGx1Y5433YD82OotQo%2FOgoaFGj7nPIrXJL%2Fczt2nD3W17%2BIa53Dp2RRyylZE3NSeQNGio9vnCAnA8%2BFZsUuUpBChCTzMKFeHzdm7zHAnpPJ12bEqe%2FJ6MQUg9vIlq6E09P3URju0nsKuNOzPKBWrOXJM9bzkkFH8pG5MOZO0VNi6Fc1IO%2FeaLIEBtan8K94XUJH78BPrupdzXiZuP8Q432ZuCxwW0naZzT%2BlpTUBEhNKrMcSGXdiW5%2BskJZ7dQVvQEW8eKBORehOD3r97oJgdBGEz%2FVLJc5mAIWZbB2F5k2Wh3yDDd9GUhf9MrHXXK2oKY3iEYrJgK1fP41ityfnuSB%2BLebN%2BCpCw%2BxtzRYD4tH0Ljfz3C%2F9YOGw3JHAUq5jJ3rzWlqnUdjs5rfI7KFBgMInQJ%2FDlizp6OeKyon3MIGnzEICfkYT9GXX%2FPdLwZoh%2BrYRQw5JmVvQY6pgFNYv5wSuUobjrKYhzW4vnrP8A1tcy%2Fc%2Bs25kb9Lu1VRzS4xUKikTz0yl4Uyz0RJeg71XPojNfntbFMmp9THK3rCUKJXky%2BDcFUFLEyMyGDFvXYLxmX8sGjUewCfqMHpiJXnEB5CNs2Dt6BgQW2RQGaN4Ni%2F902cbaFcz5FLcgrHdEB1%2FVyih3uVOTM4K6K3sYGzYilMiZjgDMnu1QgnJTsnBKU8l9%2B&X-Amz-Signature=fcbb01e910a008695ed0bee6583d63bc23eb870b49cfc0c670a156d43a4b4333&X-Amz-SignedHeaders=host&x-id=GetObject)

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
