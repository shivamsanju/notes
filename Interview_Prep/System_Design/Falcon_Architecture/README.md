# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X47Q6W77%2F20250222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250222T004831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGjFlFVQwaZvVCrPReEk%2BlOhP5Wu0WxE5xC0pPcYisXlAiBisswqhJxwEom0eGplrgERGJlE%2Ftv5Rstwi%2FeZyQM50iqIBAjh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRkAuGERF2oXP9%2BEBKtwDkfedLDC2tmqWBM2DvRtaA%2F1KxsqhMF5aljDQHpwzwaozwIprElPYBdjCeMOJBwM8hMNdyCzMxy0ZBVeOzkJjLj3riz1a4%2F6ktqKOSmVGkuxsXoYZzC6VJLAAFbyGMGdxqe2aixnkj6Sefd%2Bi%2FQUdLJtZ7k6dq3JKcDKJL7V4dPBTX6KDWBfbJzAGcls2ZoXt9KHDJLtU10NzlLZ%2BYup0eZo5Gje42vCyQ3kfn6zcyjDrw5JbmiSmLYPZQeqk2u6X2VKuR6G0LVGarQE0GZ9FARaukfjOwBgXfLEJwyg9OuGdvROEkPlOYuyJRZ0NCgzXqosVAFJRLRG6GYAi2RxJ6%2BN3z8Era0EKl8k6QTXl0NzfEk8CJcgtk9QeEuCAxIyXRoQJhhzxqvEncqFH67FZKmLvveQESYg9%2BoqHeuhukXwEBVjKVmyeKfS1qinW%2Bz0WwBUj%2FORrbvQ0rKbkabC29weDy%2FpwgPj9CbQB0urTkaPoms4Ft2ZkwoQLPv91WKDQ8YJ9vM75ooSOYf7PBEe8mYnM4q126Q%2BOL1bXgrNSPe5NcqBq0ejYov24gUqxZJgzKe8PZFLL7FHc1HDYQ7ZXb4RqMBtBu0eIa7eOUottki3kxXzMom%2FcJ7hay8Ewla%2FkvQY6pgEqn0bzZBQsVX4xwLh6FUp6YeQWX9yq29T8LCSDN%2BiAqXbEApaUfGA%2F2GZoFlxXPaaaYiDg4zhGLJlfOgAqp%2FwGOz7W%2BVFJjqYRRiPIJEu%2FfJoZeiohYl4Un%2FgF9nMwGfOrB47RWnkMUNEfgce4lsDqoi95dbx0qVYrI9IH%2BgCwZnDqiaUnMhZjXVnog%2BwrPPNq12ZR%2F4p%2B1oMXUORBK1Y4A24GoTgL&X-Amz-Signature=862bba68887ff0b2ca666f2c4136128cc6c2be2c0f18a1b162460f246d1ca34b&X-Amz-SignedHeaders=host&x-id=GetObject)

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
