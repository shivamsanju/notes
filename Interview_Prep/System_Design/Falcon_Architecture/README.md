# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HPWJFS5%2F20250131%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250131T004912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAWk1WwIqW%2BmSlD%2BslumBW3vs2zaGYs6wlEpbhC4Rs8aAiEA8cXeV2%2BYSf8ouukFT%2BHHoqdkH3u46oREdtKYyEhw2X0qiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNzuWyUTfzEOh2n%2BEyrcA3pjFzatkLPaINVsz9o414FdjvAGRfQ8pU4T3fqD5tmfnYqU4ha8M5ap4%2FFgT%2FDoiTG7dDm47Lq4AhvqRvMm4oDbIcimVRO%2BoKB0anphS3CbXCLoFY0%2F6LE32wmGp7%2BixY5XOhvuN2bO6qFdqm5tl%2Fk28pOixrva0P1InMvBHi6V3V8jILfdb0zLoxdrXG79kZfFnYrG%2BZsBrSlyZxb0ZgXvIqOi7H%2FLH6QFvF4dPCxH6W74PK2IH8co0mDTsYadxTI%2B8umZ3sYRfQcJ19XVVQMOHxuyN6ED7WA8AMggIKW1bMZJ7XpWdonoYwJD6s3CFRiRc2rIO3fPwc%2BpRQ9JLY7Fo20%2BZZK%2B7wPKqc4ktqXwVX18oLmrBPhqamJmWFa0q9l0x8N0j1v8gsXzaUes3uDVcRS8S9l7WfMurbjbPth1UfvRZP3pcBCXM6HznVjkgi2gAtyvnaUkNY%2BKLnx%2FduCgGWuau3wATiewp6fXkH9NcrSGHwd0afRTb1kmvi81voWo3pAfIUYHCDzU%2FiNR%2Fckjwiek4S8CgLsTF8evpt0gE8%2Bcmy1B6C16fqpBay43moNbWFpknTg7wP8rj%2BTiChFs2jmWBZJxXdd85%2F0j5FhaPgnfLR0xjozMKJy%2BMIi18LwGOqUBskHzS94Riaauc6wZ%2BkdGcdQD4zOmHRR0j8MQP4A8AWJxPmP23hBCwekvgjEVQg%2BxgdIXg%2Bd9%2BXBbXSkFhRjFu1FXFSV9MMT6otezOY7cer0jdWfm6B%2BS6tf%2FYKG4ldHdqv%2FwzZQvVI28BWBu%2Bq0HoK7muGvmn%2B4xMhdIwMmeurIb%2B5jC%2FHf64BI1a9cYnF63cW8rdn8uYz1NKxb4CjaBPp2saOjP&X-Amz-Signature=36dead41e38c40ee955fa8fd1eb223ed71049f008abfeb7c9b0cfd0a6a9688ea&X-Amz-SignedHeaders=host&x-id=GetObject)

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
