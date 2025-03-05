# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GFJ2RBA%2F20250305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250305T005449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrYRZ9AvWTpckFEOukBUJCJY8Gi1O77JJNmHRVMp8WOwIgK31OWgmK2H9Qki4gGPJj%2Fj1PyR0Jqsl9lF1fuJHuXisqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIaZPfXkWGjxHFLhuircA%2FtT6FVjHV9DWJz4QM3kX2dSv7dqPv98Vri1358nU5fLYIkACqaeFr6c5r16j5MC86fZ3C4lmfDUDmFE%2BrjsBpSxLHE4GU5zkwq4PfXijmX6Hf%2FnDq33Uo2FB7IHV8tJpW1cKzPuquUp7HU9aG%2FHcD5nSy9xt9ru8wNwpgLAHpwr8rag9HABCVlMpshZFVRbWG76DLGcBckWBh1P%2BBTSB3%2FVdjlak0ed541fIOMFug2zLFIcFuUf0Z9p%2F24mIbA%2F7MFvCQXf1Dtjs4ZpBpS6eyX9wQW4BgMQg4%2F0IHZZA%2Fs2ZaxC29OX3FD5%2FQSavf8pefIISGYIp2ensw50%2Ft2rIFVrs4oOZnnGgdWHI9w7ncCCgE42C5vdjy6dSzeNLW6zuLshxmk0QJYljsKU7TPlwTHH%2BbSJlwpIBkrDQd17Vy3dDlOeUbJismmQzfE2TjHz5POdqU%2BJdnRGMgyqONNFCTc28rShRfrVZtKUqQftHkJRiP7vjGL9yV%2Bl5GNbTTz8LOA0sR%2BxmNuhGuX67MGxNMrmfiQWhyw7%2FpoupwwGDiUtXa0nQ8%2FaqEOIv3hd6bD0kZ3AhAzfgcvwRhzGIhJH%2FOMY39FtjHumJKCz8pQF3QhunLIg9tCWh%2BHtExw8MIGdnr4GOqUBzld9T3QDn6KoAwRjYquDRtelJrX1shPOkqa80mLY96L3Sjq8BwyMwm%2F7aF1q3H7EvJRDrz6CwcZ%2BsXlCxlXwp95nTwTihvscz4ShKgwvxGN%2B63dCQsg6FlWg2dvz32KPySVfYrqJtr%2FwPPRXW6%2FUqNQa70qxYnBEf2EalSsiDaIiGC7ILsKlDFD7J56Xzdvkkroeq%2BCmU25weq4tWxWJwlUKMM8L&X-Amz-Signature=813250f2084375a584d9cd1c0942066be06e906f31bae1e953d2aa281155784a&X-Amz-SignedHeaders=host&x-id=GetObject)

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
