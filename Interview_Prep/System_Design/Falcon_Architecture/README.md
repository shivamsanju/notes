# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEBNBT2L%2F20250309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250309T004639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQC2oYNBA59X0wJXHyJW%2FNxG5CEtOgZ%2BpUdTDA2LpvfNMQIgJTD8HM%2BBI0AZN1C%2Bo%2FsBMrDzXBfwKQj8W4IMZ83uyx0q%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDFAqXEBVl48RcQ81iyrcA0A7PR05P7t4dzMUghZKbCqjz5Jy270NGj6Vjkpalxl3O9dPveiAzt8yHhRqsHzt0fuX76vCsKqCFOPKxE0FPlIVEpl7h8ZXzT8sSXoXQe9%2BjCNTrBz6pbDnzpt8rcV%2BRs%2FN71mKKmKiz3KJZKk2K1Of6JvmN73t%2BzUEFbaxIfBmcZLglBkF%2FdV78BDFDoUfrPEvMFBsTmTVpnxe7BQTAZTZblTV%2FOikd8vcf654Y5lQ3EDvw0r3ZRWEA9TPQI8twYusP2TvwnLgxzrsRt01u4esPZoPUioyTitUFPkmXzbQdmksmfkAqTKAJ9zTL6VfMr3moA61YR4JzCf18WA%2BnGFYEB5AmksTh95XctDi%2Bc1SZ3DzYYU8AFGMhavciCzDXXhbxzwEygtX852LC%2BNFwdqz45XkjkwEbe%2FpsZDODm7%2FdWdLdGLe6tk5qaWv1SI4itGVkJ%2BkpeLWzkvWti9HEbVeIhsvtRIXNrKTa6w09vOcL0SMhdZbG%2B77o6qABczX2HyU3LgVkZQmcvCbNo6ZsYIcFumT51pxeH2e23FxUQ5fCbN%2FolIKWeNG2OBjudv%2FbDnDVuFUGW%2F9zsmlGlzh8RPHS3WV4LlJi%2F0kEx%2F0HjGRmXgkqZnejjxh9YDAMJXJs74GOqUBvKw1QXi2%2BNfu%2FsNw9Q0fJuV6AL1EI5N1Xp44cHjrGC6cE8acPHtawaQwC%2B8eVFW96Z07icnWiv7hkMH3ziGV%2FbX5gzQegpw0EZDWpzSoZtahv2S9QW0cpe%2BhsxsXQCu8o6%2BW%2FE5%2FlajA8DWPhkNVjUtdUNspiyhS8A8eywOYZd%2Bwy5XeTcGguH2CKVC1f4sRURZUmFASj8DjFJMx9ww2uAm6YzPo&X-Amz-Signature=f2abfcef389fabee3e16ba52b0a460a602766879b899693324eb8cbda98658e7&X-Amz-SignedHeaders=host&x-id=GetObject)

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
