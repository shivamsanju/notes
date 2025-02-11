# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETRFL4Y%2F20250211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250211T005007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8tpdqLfhIdzwWK%2Bk4fcAkFFTyZPSX8peT8HtHCecCQAIgUAUTLgySAgyhzOZR5HtPfVbqws5eoWD9OOGCL68a1ooqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJEzJt31Tlq1kRqdYircAyTPCwLNYj1jCt61oEAt7cIaE9BGi9gHJvr7TMwtf1MlrowgwbNXYl4GweLdm9%2F7qZsQxJFYqd2Rqttx0rciomjK71BwbOlC6s2I4Z32NDtOFEqjPChLWZU8KZ%2B6%2BFRE8IcjSEZeabXHd2fwr3ss%2Fl5Cf%2FtRLG10JDVaEg4xgX0r1OeGtT1f6SEWwWfvA8hsxjRBczlF1XHG%2FMY2aQEvyBpscx%2FLwns8FnulMuf1f%2Bryi75zdbhDU803ToklY55Moc0t3JPVgRoRppYGFsBdH%2FFvanFRgz548%2FuE7E%2FI5ODXtwqAt1W2lp9mzGMvk9wNMVf4EUEWpe0tqCvAYyhwS7UkprMtJpvr4HZwzHCmiLnsZuLb%2BYQQzG0OgcDRhpJhVxn4hQLbotutpdiaHdig%2BbxpjebS6IhIY8oAj0DfzfEpyBDwuZRZl0dRud2DX6e0oGoAfV1datoJ8WSKemOrzBayKWQIo4UkUiVLVmvjY2OitRqV7leabSRimeeLkcRZWWSc2WGGIMsaw3xX9M7YPjFJ9ZaiGUmHJLQBRCTAYkaxoj3wmLIWc8tyfcyDTo3%2Bvktd67WnV07EOfly%2FGmnEKz60kfVBMqwtwkY%2FB%2FHcBxmSSX%2F4kE1RcKmYSTKMKixqr0GOqUBWQUqiC%2FzOoD3rBtKLLi01ChbuTH%2BHSRRQD9sKSk%2BtX5URWGKusyxW0Kl1x0WUmmyh1ygAKpwfDPqSe0Z4dWcqNhpKEHEI60cPyK5htJKQO1lKhgCIL1rb%2FfAFc4HuI2iCZtUV2JcipCkmt3eD%2FNS6wsMzwwOBY%2ByiWR%2B3Q08FYCcxJgK9rRdm0whcQcPIlrwAcGpjL6vtZX3SLylr7cbr9Irx1NX&X-Amz-Signature=64aa1246324e5622ef5db8a37a14ca5493f3facc634e2cc57429cecc5c48ef7c&X-Amz-SignedHeaders=host&x-id=GetObject)

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
