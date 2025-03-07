# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNOCD5BL%2F20250307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250307T005512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2FYrXYYfqFj%2B7qsOraUiIkLWx1z2E6dlB1eMQ3PzOTRAiEAj%2FIlonMrbMYJaFUW8FndE07IM7fQokqf347WV3wxOvUq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDCRK94lkKCpj6GoI5CrcA%2FWZIbkkRHznsolcCZqRw5098z0iREv63Vymtk4N1M7ZOLokSw4G3ZWwOmarSSf07AcnJ8uyD7P6kZk3zQXyZWGgS1uz6jNtzLfsBu0f65HlzMAe7og9HyM8BVGnJAbFaqBMq9e%2BzWMG3%2FB21NPoNeaK0sduamdBehDh00Kw3riXnu2OrsMkfsjhKZ%2BTjh232SoafRSyOvO%2B5GUnJHV4sd6L7IabvV84Smk8w%2FJ%2FSzwKPJSqzz8dfTHM4lk4ZzlUuSKDJErZiJhaNvCfFvGbGZYHTLu2bcl9zMb%2BmqmNl9EB6rrGqMp4W5gY8B5%2FM9TWR%2B5QXB3GVCLL80BEy6OCtxdCEwDVhH4x0kMU2D%2BbMwumAz18hbIPUCHpafaZOFbMl6OtGRqmNxF03Sw2H65NUwM9xnL3VRr01J93eobv5aOsUuNT40Ab6Fr7YNAnu1rveo10UylkI6mHKOjIAy1ZTB3YFgXzr5ILIniPb86mGg71ByDzpODtktvMTJEL6KfeA%2B9i9OqZkME2rpgWtIxFqvbohteUHgtr11n0yJ7AkHVA0e4kxrR2%2FjuhmjTPIl2iw8WimoWGoh2vLqJARERRKQJU4ldx92viSlSNazBrsuEskDNrRZGWUcCJCM%2FyMKLIqL4GOqUBWJNJgxse5uojLKHqzdCnFVZ5DBPljkXJO4zwvBImmm1KKPxT9cBKD2a8fSto0Xg2LVG87mPeYNzc0g%2FvIwUddATp0NARHTpUEyIx0nI5ueWQ2eZcAJEsud1WMoWW1n2Ein7dN6gxKqPrmKCC%2Bj8N9cblFj0EKFkmaSuGleQqbzvi6PuXgYfVq7%2F7SvxQx7DZ0O7JYkE%2B8fYwBH%2FaoXFn5HtkPSzU&X-Amz-Signature=16a99f6034910aaa71dffd17757467d270b463c2deb48819b1238fd7214a4e34&X-Amz-SignedHeaders=host&x-id=GetObject)

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
