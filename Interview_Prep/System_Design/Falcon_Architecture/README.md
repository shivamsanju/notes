# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2IF3PBG%2F20250214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250214T004952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICE%2BeB9L7256wA6wbd%2Bw1BRscyHi%2BaCH%2FjtKvuFLJGK%2BAiEAlIEkgszSQY%2BRFI0T5qNmPxntKMyC43IptQ%2BxoLqIeLAq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDLEsktcJZUmb%2FIa7OyrcA1BUqIgIdrLHegXvRVhiXvGStl07p%2BopmeDXNrEAjJbHHU9A1PmZxjU5nGn9XIr91AhX4DxS6RScovbNSUj8r9tD6TiSXf0aoxe9aJRawMFDoXEe62%2FDQqgUEC36pG6OnEpAv7KIgNcMhj6JXKmVvoBk%2BaI7cY4nU8qSfCSeqhztvmMjUqfDUsqaXItREADzSTIBzaFo5mgivx01WBIzvZpeu%2FvvAcvQiM81XeyQ0BdCNNv1bB8XmgbY%2BHFYO5lnfJJ2VfB%2B8s81jwJfPdtbod6TZ7uZp8Zctog5W9C4rxV9fTykmP6wdSDQyMbRw2h1BeM3bDonaTwq5iGdNh4yCIGHSNEGn1mQy4tJTjwgDTYVAREmp51EBFDMkvYecA4C7eELq1%2FjsS2VCZU0uKKm%2BFbt3vmU4Xk4UxBpO2Zt3WMxf6HmUusp20xaujTk1XRMqyuZxVxxKlIjFrYD8F4tgwpwrqvpf5NSEP7LOdFtDk1gjq37INFAJGt8ehQbsy%2F4xp5Pv0ePWqs3UGgEXT0%2B2onXY2ZBmlMWA%2Fy5RdywAFC7sWyL6c8SxY4Nsn7%2BzNhLE%2FKj8ROL0b4Eq%2BcSByejmXMcd3k2zJrfJy%2BCbV5mwxxHYOQy8bhVDp37tP9zMJ2Cur0GOqUBZVxs%2BYZs%2B92zvXQG6pUYYCluzgV2nCX5OhNKVWJ0BRlmyapkMJOovraKK39tgOdhUQbEvgd%2Bo7vK34e88PGNSGO7ADKjX3p2VbF4Fn5Tcw2YnCCNBuVlTLXJod2DML%2FlflB%2Br78JN5rowJHTTFA0oAGhJMayosATGYOZRz1oK35jDN2UDlsgFiuQnOzqRvArKy4748EqBuYKnYheUnzCVR7cRgW8&X-Amz-Signature=524fd3b89e25debfd014aecc4bd8aca60ddab265d05ca3b78993035c5f60e5bc&X-Amz-SignedHeaders=host&x-id=GetObject)

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
