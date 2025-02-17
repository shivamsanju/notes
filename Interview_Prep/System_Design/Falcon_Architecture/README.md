# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFZ6DDKG%2F20250218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250218T004959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCCPImSH0S2aUXyJp5vqbOBtdjTXF4rwxE3AC8XWnb97QIhALM41MuD9SIwp2ZAicTQRetNkfUBFR8BXYd48N%2FSJ7dDKogECIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyNWtrSvjRIGFt4mSsq3AOgiq91HmqRuQGHsXm8Kn4AUG56tXHBZXi41mZzLkaeuGEfgY8AU7iZuMZS2Nf7ttEXFNnA2BXSFtj%2BTERayMhAWe0b0yKVljUGGvmvR0wBBTCh5BO3OUOc7n8qlryETsmO5s%2BWLjAudMn7fwq1xuhFsKV57a%2Bjy7CEIu0PPCtbDiJQGJnDzLGCeJ3GjbBtOLfZWPEGbJn2jyXin33RXb%2B7buk3IQo6qT452LGVanDRSY%2FZu%2FmIfhUB%2B7IFf3fJtK7pHsLgGDOse4qIO5U8HDT7Kauj%2F7E6RYlUxrKauspgzpMBSryWTVJGqwqJPwt1KxpLt6%2FamtL6GUBvGoc%2FPIOcdbP315zeRfWNkmYtbrzOjqCnZMVfBQDDGrSYh4lM%2FFFjQSXqBlsDX1M48f8EUUVd68rKGqF0FzXo1uZb6hxCEPMFum1RHWVjaYfjeD9ihTIh89pphuKuonnpGyYO3h5NN0UoY%2BSmV9Z0vHXPxBnpkofWVZYVjH2lQd5Tr%2BBkk3EqAS%2BK%2BHxSKP66ABaS2Vpmozwv5zit540XXUFXNAbuM%2B%2F%2BIgY9xuXlVFWL0VZjCAbFZpat%2FLEfXMraufrdra9F5VkOxRG3t%2FK5Hz4uN5dp3g1unsWsAHzzB2ktSzDPpM%2B9BjqkAcnIdM2lYrzvwOQ8yG3emi3WmkVvYVyQvmFcWTdUT%2FhnlGDEfQfLT%2BEZbkeipYkUZzZyKhDIAbF1c3HHzq7YYOIlsidn1%2BxeIsqdrDWPFZnBN8X3dXzYmJy7JrFAaVLmgtI2%2FzbdS1m3XtHxHGRB4Hhm3AJTW0Ves7r1yL9MLUSzNHJgcljM9I85MaunDwW8QNjvlA8vFqrr3fNyVd4SKgotrsrc&X-Amz-Signature=f530b571b08131176de9760db294dffa2b0fe98271534a141f57a83e50105707&X-Amz-SignedHeaders=host&x-id=GetObject)

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
