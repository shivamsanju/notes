# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TER2447B%2F20250227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250227T005330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQDp1geg9tb3qcHFbEXjGaZKIAOmHc3hlALi2toqxJKXEgIgc6h1Ev83VCNY67%2FJMarBE97Nd%2FX%2FBcVfxmQ9TlU2xgAq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDDso7TKcUXWh0Sy7WyrcA7iBWmdSgo0yuxfRvNFL8P7at8iqXFe8BJ3ohwORPM8dzJPkigZ5GNnZOBiSh6jdkoubIGO3dsG3EPuN%2B1LSQG9use5jCG8EYyGTVZ0g2BOM53xrOCVsBFkA0XHojrOHOJTI2DdemeY81PB7Gwxe8%2BRHjtkNY2kC40aMpVtUAp0eQhMMAmIKyA3DPHBsifLiY5uYuQDG84hJSU359XHsIITcWXpLfvzhxmNWSbsEwkVv4eGQr02mBQoqtgN5raiEjS2%2F98t7bauMTlSeWaW%2BQNwK2lqY9iY%2Bcc%2Bbhv8C4%2F1trDqK921jL8ceI3bgNcgfgqJa9R%2Fo7TUuvf5ZYNPDlyNdFzJT%2FslSNVFu9yg83c99D2jOrIXiwcKkuV5Lm7gKbNQVyNl7i03zl0usYKDHA5%2BaW6OQhz%2BMQghooMR8Fa7UaQoCGqP3U7H2ugnk1JsRPnFbuhXv6DFcoi1HD9pYjF1YP9VqDaR1znxE0IcoBp%2FatL3luvmLqllktK%2Br8mUwtBPsQPRempMictjQKjQ0VZDORABZu%2BE4DJYNTy4%2Ffffi6dbtOAu%2BX2eYitM7W9xZKFe7ZaLPDT%2B2J2z8%2Fzt7h9cFBqAqWwmWLAlTP0lrxn%2B3vP2ddLZ%2BszhGRHzAMLvW%2Fr0GOqUBzLBJUHU0ic57Vc337JtzybjLgOnm1wQIj9%2Fvk6xsi0vG%2B0w3PKgOoKkvzk6hDkwTLDsBo8KU9h%2FC4%2FMc3iW9vgsRlZxmNVOxbo8QaRyE5TY25%2B8pixbaVVcNk0DDqb0FgyzZxDTDrX%2Bj8yd6XN40orMhNLe6cSfiL8zhhdxnYIsNytS6mhzCScmemQXJ%2FMrjrdSacJ2DbUO4Hne9%2BqkJ3QgmK4Vk&X-Amz-Signature=fa6ff91d96cab05a3fb47ca685e1e21cb02bd51ade66ae9f51722c5a42937f11&X-Amz-SignedHeaders=host&x-id=GetObject)

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
