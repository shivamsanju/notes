# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W47J62WZ%2F20250223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250223T005548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBWVM3Mk%2FP4x%2FQEkbCVqaCr%2B1AhEcHFGR3ug0a3Fa33sAiA1rrK5LwyjMy1vKAnEe21VAPDbtqikP7nBiqZq5YpJNSqIBAj4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXMwuSwHcgQ9gI7LbKtwDnpvzR5T6tKB38gCnl5R7qJXR46BrZwW2rJQ1SNRj5ihQCC%2BcaphdZ64ZOt%2FKXKK64B7AlwJ%2FM7LbaFCBSwuZPh%2FnNJipZ5GmMpgRN1nHlBnqkks2AdyZussDqq3VGoeFReJeShgoHG37iEOhpifm4h6LHgs7zCzUaCwVc9uPRBI0wk%2FM0%2B0mQa2d4bp9oWRQ8eshnNCl%2Bho%2FhH1c8kf0hPF5tj27JhNjVEk4w0k0JqapDnQvur2GNMdHVFWTh8P7pqxxtIkOoEvT6YsVgUNXrRJc42jX17TqrpPfHwdZsPAx3Rft9Z0Dql%2Fvg1IlFDyNrYUKVFF2hjm1EujMre%2BtG97%2Bo6IDLIHPIPLxz95fmFOZLRQ4%2FrYuYeh9hLKXMoa3oIDVyeOLa1ey8fQxl4B42PC%2FP6SpgZKXkwc5kNzfIPNisNoL%2FFA7j3I1CSVWRTYHVQYtfB22iFGdE7gK5z%2FmMcZeN%2Flmu8FChKydc7Al1iaqL86TWx5o8vlxSweIU36O9IHuQQ91p8ewHabz7AuIQ12F8%2FOk5hNZsPKkShF33DobqTc1316%2Fy9fLuZBY9KGfC5KLjJ7sG785FwMyfc7SDOXknMj58p9gls%2BtZHkUJjDGD97ZkV1Wa8O%2B%2BSswwarpvQY6pgFvM5QF5vprn%2BfLT45xIPLvJrSK7YOUynApIX4v0Nha0SGFB6%2BjeFdZVl%2BbKtRMRmfqwKxdv%2B2zovEjW0oxlS2W86tQgk%2BAH6PuUpLPntoMYglLQQLZRiG10lN%2FDr%2FmbEmHcoTpi0zfvodA2xbbmJwxVaesWcQgmT15wdcRy%2FOexVn36WNuSi759t9Ljl4sbxZEfy2eHGutDQaqymmDTmgoX0UtY6fP&X-Amz-Signature=d6d18242b9f6ad50b1736caa14fd53c2b3caf07529d2aabd912a93a623e2b994&X-Amz-SignedHeaders=host&x-id=GetObject)

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
