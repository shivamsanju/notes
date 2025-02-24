# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PKOFXKD%2F20250224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250224T005325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHx%2BJY%2B5FVkC2GE7vw%2BKJ%2BSyhKxo1IGPfxzftA%2BSKjLDAiBtXqH6pEK6RJkQwQRMQEc0Dqadw91ftgefYpYx5teqECr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIM79B8rkcBl4MqbRt%2FKtwDA1f2HNtkhyXf%2Bb9f7kOkveUkOGfJopGOg24H%2Fh7B3reDO6TT8PgSkQaUz%2BMQX%2BSqf9ECTOqNOvYugeJxIeFNUuGzQO5IAh8E6yRSmg%2BXR%2FUUhb0mcVYZ2zULrlwcJadRTQkc7muU1ThlTO85h4vxq2aGvWUGl7HvWEa7YTPXG6bQwPUmz6B0fW2dpBOsccpL84Y5LwmLpNVm7tH4x9hGrV86uVQ4p%2Fvxso46a%2BIsHw5ufL3ooqtqmMKrjtsbVdR6BiGktV4jIROBEtPX%2F23EZ5x7pveDGMofH7GQTrVmfA0vVHCExzUv9Y27EOdi4N7XJtdYGQducNWba5aEmS%2BYsMK4uLs2kHLgtP3ND8WX2vB0RXJukNFcqXjm1Ij3AF0aaNFkjY5HiwRAIqtEr8K%2FJEXxZceSWswweEKsp9mwkOtvwm8hdKXl%2FNN1FygogoSLGN7w51OXR4MyqwzUXYXFbPNsGAKQrMnT3RWCXO2HOcl8MIHxfzrG7FF4lfhjBSqydyrgfs%2BLpEG8DEySaBjCWR6Hh9hk3S97B321MibLgxW0jhaR26K2q8pCUdGKiZH2ES%2FDVHjS6Dg45GGm%2BfBz%2BJeDlnr%2F262c%2BcXoqv5g%2FUyYgCCbL3gps6Ok5c0wvu%2FuvQY6pgGmXE3LghbVRAZa4YRA7lXEjzwd8RmwpvNheCNMXEwa3TZ4VJY0fp%2BSAaj35eW%2B%2F6PqMiiq1HoOAwf7lBOz59n5p2PDTXnU%2BFxETi1RnDOvEQHJf0A6rOuEWvr3RGeV%2FiSBTi0SVTBzrc99AM8CiL1r3kB0xHrwzOuyEVXNuHj1QUTSzJmd2Hltq4SVPHov%2B8E44k4ghX2QOuVRHhMwhWcGxk9UY7J3&X-Amz-Signature=8000c5155308cc2db64a66b20f9429d07cf9e84ccea14616aab6a53ba8982631&X-Amz-SignedHeaders=host&x-id=GetObject)

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
