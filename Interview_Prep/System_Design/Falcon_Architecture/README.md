# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DYSPPFJ%2F20250212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250212T005051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHipYSzPp7mIJAlgULWeB8XoxxmvT7I1JTkduTWqsGo%2BAiA3Jb2Fv2q2%2B8MOfOG%2Fx2dDESniK9VroYMEVzjyndX6ASqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkU6m3yzUX142lTSnKtwDMIskrtvtbGvPyktPU7APRO%2B9hvlBoj0AQrwupsZKGwg%2BEGyjLB9INHKfC%2FnkGpenPqxFl2zxk7u%2BRMgSPXtrj671J7vYWzy%2B8le%2Fbp1XIovB%2Bw%2BURp1aQwO2%2F6Dyj7Ud8HkWXqghbo9LDK8tI3AoH%2Fkhtwba%2BzBgCE5OdVpj%2FrBzXe%2FTH6lCkVhzJdm8Q5zkoDnp2Gz%2FSbNPtkyCqXy9tkWbDw9mitpB01jf4jMTi%2BDC%2FTe%2FU4waceh8oCPOPec6aWDUtpP3JRlGO4T8Y%2Fen6kDKvx0xpnDiwSeTCcvp%2Fcd69OG3CaOoUk4aq%2FxWsWA2L8dUwWAEgu3dOT7%2BYWzSzgQYSEJgFk9aQ%2BDemdePla%2FjbnqbwOf0YnTPf8Dij9Ek3J4EGRVCzPMZ1GiltzKMeelibg%2Bp50lnIERQ795MMq38ZfJgNXrbZluZ6iSbz841ZH8I6U5NNR9StJpYJESyWXKvQflWBZGIKQ65ziwNxTAXLA40nqzm7CCnlAzibargNvIQUMCSOfR3Sfl0ntrMpTQdmH%2FsYsKpxKSte5XGeTwfyEDC9CoaYp%2BjYEG1q%2F5bwfStXLsavFm%2BYH9cqaW%2B2bzAEyYTHNlTMEg9fWvDOqDiuCw6lv5H7QBAFeIw4MeuvQY6pgGROTBxoD66xk8B0eu42bPN6jbFsIHv8xSQ5fXSwy3qLwm0JoS2zcbIqqjDxhKljk8CjZALlOtl7OXKJSK1vHQBQP8aTDRGnDIPOCI6RmvfS3oNup%2BeoRPL0hhxoqqNV3HsdRw0o5z2uwOXRtF7Z9fm2Ban%2BuJSvhYcS2baU5F%2BG3inFvrHxDLE9CQFN066Ep%2FKerLWyadLaia32KIrL1b%2F1c3x85QV&X-Amz-Signature=392ed60ba41a759ea117b590e68435cd87c6ccf6d38e2089daedfa50046c7000&X-Amz-SignedHeaders=host&x-id=GetObject)

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
