# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LV25ACO%2F20250228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250228T005317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCRWAeV6pQXwMUy4ON92YLgbYTNuhxabh8AJumQ6TtQrwIgVrioMtSqcN3bGMH8SyOGA3JS053yXx4ZCdNO9Q6vDlUqiAQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCs4G1GT3PFViTDDzyrcA2xNDKFGq70Xo5SQNzP%2FrMOio5J2Gt8EbRE832Kzv7ugVuMHDSh6l1BzC5okSZrmSrggPPQ9kmAA4LfCrPQQVgDLvO49xUmSyGnLcW3BcUlTlZl1z8e54GTRkEzm9rvE1dLjzF%2BAOMKaeXgvyJIXXV8uH3HvyOK47rHvic1Phi08%2FdVF0iTA%2BVbaDEG71CXHnyg3OGJv5A2rBtJW3oL7UVEN%2BuDLteMecHG1%2FMOtgSDHB1NaKwZnhhjcQf5iD7%2FX97oicM4Y9eRqEwDHiMTPsD2aF8mzaLQ%2B3FybHvFp8t7057%2B27TLNbYfR4KNiM%2F5LiUR4j8nYPoHyB1lo8Zs92LpildIDzKm3UQz1D3cG7XDS3EFdgeGQmch6H74FWgTglBJrYWL9ybnGG%2B5EezM%2FueYLpytgmktgJF4rKaxU0oANwJjmw22e5WANFgEdlGwBccRW3bjUP9rv51jEey%2FFJqMppVzIXT3HHJK2hM6VxegRD2MQiodyD%2FkJDYbFp3D7VW0QDR9sg60cnNCKaWcB8maJZP1o%2BiFYquuJw1fudGUvKk2gfIQ1RyxxX8F5yJEJ4%2BwNjKQonn1MedrE%2FEzXFdW66NzD7G9hGgFoUIFNHOugNh1LDP2ELBJBa2bgMKv1g74GOqUBQclArVJzwBFV1VUZud3lbQATJ6oD7Eze%2BVwsL2304rgtz4yQTl0Ttk%2BfMZ9djRKRn6ZXJEEeM8eKL2ULTR%2Bj4VaqBmtU1aHc8p75mIQthCFnhL2lG3V8pWI0b%2F1koP9qzzCYWBi8oWE284E46zZ9DdcuTopuMubOzNRD3v%2Bb6wWrP%2FsV0w6oSJAdCGx%2FkgbNDPNqtoqMm0gfmJlzfnz4VBzoUrDD&X-Amz-Signature=c11a67aa0de5983f4c6e5542384b3a524fccf7e787909e2030a6877591d2b1a3&X-Amz-SignedHeaders=host&x-id=GetObject)

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
