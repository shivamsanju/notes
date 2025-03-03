# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URCVMCD7%2F20250303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250303T005400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDFBK2VRMKXF6C2pBAZJs2NR6i99mCgOQUcwiCoPTcpkAiEAzX4fFoeWb3vGzA8CMp8EmYDmT9xj0CCd%2BNcpxYzf71kqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOThHBBprW%2F%2FNf92wCrcA6131UH%2FHN8blxuQjf32hS%2F%2Bwdc8loBDTtdgV6n8m%2BKpixDLltphLrV115fhy7xmbIhjoX7n7G6irOhl4TI95F%2BeIDviX1luJCs7elnRgBck5A30Ec9UpZmV4lFAZ1TtockTTrRwUYCEcLBfMdoQ5kTMJB3rlYQJV0ZGQvym38tfK5A0ZBHS%2B893rKSfH%2FHgLndCODiqbdrJPBMZPW3eXeIc7C4VSLdrEgnlLHLQDCLpQfCtEPslmI2SVKj5%2Ft6Sbx%2BmLY8xJwu0xQMdFsAJzX1FfftIvaUbt5CqPEvLpPymg3qdVBrZLU50SI3MP1xdDbdx5c13e1OiOcomt7EfwvQxk1PGuLGViquOfCa8%2FhohcO5wdvrdgjNfgiU%2BUsVsrJpVx7A5xtBt6H9dxj28rFICgKPJFQY3bqfj1nuf5q4MxGBMg9ezqpYauueKsVXHzu8F%2FYewysZf7O3DojsAckGjlALNuBzuDHxLDnB3hHJgGhn%2FXDZQlQNKnMiFx9OClX5oc6irp1kI2dRzboYVhcQ%2FJKC8uNfw%2B9trVQzpRJdIZ2bubBGiqM0I48cAj7G7XBuSBNEzGBbdQpKaSjX5FDkaWTkU7yJOJNhQqRUMtLrJWunbnY5pmINd5w0JMLvIk74GOqUB%2F7eSaf6qy5RnOQrDLl0TG4Rg2vRUgjRq0JjNHPJ7jawh3pIsk7%2F%2BnTtB14COlPaCwMO5TRTuuTvTFsvCIpJ%2FkGrgS0JVA5G%2BWjznOHkzMtX67zQxDj4W424CocxjH2QIBrnSWzTCrFQ9u54GWDnJAvSL5Z%2FWwY7qqfor0K6OJ89KGKOLYdb%2Fv7hweLzOLX0LdJlWlP4Lr9lddxRvcbRSFkt%2BB6sJ&X-Amz-Signature=b0a0741a8dbc689e6c352a9948ebe22144c2b889f9159fd9120a2e674a1e1765&X-Amz-SignedHeaders=host&x-id=GetObject)

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
