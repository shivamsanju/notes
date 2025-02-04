# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RPTZJ52%2F20250204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250204T004945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJHMEUCIG3XRDZGmzHYg2be8Ab8axoiVHrIu0gJrnR6xidTkPZPAiEA1MK0DaB27BNzkIqxoWCXstrFEmPY16aFJat34%2BlIpfwq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDH%2BxXx%2F7ZUR2D1nFwCrcA0SSBqlUansLT5WNAiTF5SgroXFaZs8YflbGEeEBx6w1UMGJcKoswM5XhcNU4nkRKo6i8MQqH2HbXWO8%2BZok5kdy6%2FVcleMddOQI%2B82Yw%2B6oGWHE1apQCWlzL%2BjnCuFVDcjYtrjsWVja063VF%2BxG%2FVQ7rtdMvrvmUU8M4Of5wpLgDTfocZF%2B1XwovSNfOy9XepGE2OvJ6tJIWyvM4j4AvcLfXaEOEn2N1knV6w4eU%2Br9Bg6hwY9s37t0UZoOyO8nqPUvowjKc0dzyXopfK0y0%2B8Yk7MqdcP3cTbLE%2FLInfOWsvE24V6QBqHosxaprVvNuXlufr9sOeQ0QuwAbo4TUe9LJ4z57blZIDjzAL3gEDMfKLDF94vZUsRsf4orpW%2F%2FgVYYTiL889Z1xuK0y3FDLPjxmtM4pbaP%2BlsfJRSYD12stCMGdx6md5bCs4clwlBwaiQeRyZYO43lfSzLmXmNIGlnKUfKInjJIL8sLyCb2clx2qJ08tBw%2Fqy11XvKK%2BeskUMu7oSQleKtBJ2bobZSgqKzrvGdkKa48q%2F79gLthfF9%2BWJAC7stEdV4HpfEKGMQSLacRpJvyHi9LSD53L8dS7UATKcFlSblQ85honyMXXipPBNAIdqESlY5iq0JMN2Uhb0GOqUBflNTHBxFNKIZbFwOTmR6Al1UIQVqtavYsY1QFUiYF0UK5WQNffLEyl2jQr4Wl%2FoWBcwGFuPyr1w7GwI%2FilSH4YObJTMhLyg4os5dRnSSCqfSi9RX7G4yRLt%2BleYsUWMBLSiyS8m0o1KO3%2B8vjGAAX8SUunDTEBKuvQQBTY7jkCzLiO4zqBqkijCVE%2F2m03U2WCngplxtSQmUhULCEjVezBqaXquL&X-Amz-Signature=b42eb9d175387ba697576ed8440c77f052743931aebe0d7ba0e5f5d98a021cc5&X-Amz-SignedHeaders=host&x-id=GetObject)

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
