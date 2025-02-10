# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2ANXCVI%2F20250210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250210T005201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClLatC7ay2QJCWf%2FvlzqrdgIVfaUWqV4caaAeBIFVhpwIhAKYCZ2BJh3V6JpMKIU0S8eGsmsSeEhFz%2BeOS7fKlbkNYKogECLD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzq3N4wNXgvCq5K5WQq3AMHyLO8nXohFOe43fpgka2scjjLdhywQjoBznaPsRt2W6XuzXD2IwBVppsw5gxqeJ6y%2FmH7%2B4kKL%2BCUYDGewdDnzV%2BDEDixbrTZGi8rlHKfiMPXcwo3peHHpnzFpK8i8%2BY11MKtUI4B0SptvCNGQMvO6i%2F6OuUd8XzpxC66ANsOepEG37M15Qn65R43HK4xynpG5A0Dk0JskhDZ9O2TQIVFY7rBln7%2Bk0vCidqFGTl7bLbjhJYiRXKoNSi9d7Bdto17WHrgvpGGth5CJezan8vKp79RJrg4hjo0QROGr0GQiwpSHtEhND3w0NFZ%2FCKF0weBWhyM%2FXSUyP5f6pDZBxjfhf9WKoxUbVpgWZ2Q03ylim%2BBxkk9UHPcmWMhLrnQhcI18sR4AgEJacMsnzEgoSvZ%2Fv8I3RTvZHnSIhafwDsx9A0lP5cASgBFPkBaE79vtBfdvOoGesMrn1c0LYvgCRzRqh0Sc3X5UtOAArwrpoo%2FOwEmZWuQYDtIEGSCI0hoXASonnP%2B8n12tVxpqLPS%2FBgQes8Gx28oBF5X6%2B7VM1L9upj9EpEwwXI7ytEPDIR7JxRQROo%2BdewnD7H6M5MR0V8ePKAgtrY86jA74xYHkQHTmaTSMNJBPDLgDrHXzjDT36S9BjqkAa3kklvQGfSYC2W3SJOfR5LisMjUM%2BvfV3zFv2SnBUf3gTF0jZphpATg6c8ypU1bouLNd1x6qqgOcQM6Dl7j1Gy0%2FC%2F8iXmf8VsdfBYjvkxuHzh%2BJu3ASGjy8cXeaiB36M0ukCp0TWV0zT2BtKSrfTF2lKwV6i8lMXJyu5c%2FKHJ74xZvzfDBVQp0RW8uhKy%2Bk0QLnIb4D0%2BcgB2gJ6wVg05QvDR4&X-Amz-Signature=94f1408a7f2512ae723184306c066faafe19aea8ac8614a8a6caf7b149c6a7d2&X-Amz-SignedHeaders=host&x-id=GetObject)

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
