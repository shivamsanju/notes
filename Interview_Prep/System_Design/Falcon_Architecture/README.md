# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4K3WLBL%2F20250221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250221T005116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9WHWDRum7vCzv0tHKPvL0NFn8nX0eAIsydypa%2BGqrYAIhAOzdyqpPAYENXZ7NOkrMNUyM8D9q7aX8vXuSBenruBaHKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxhumTRemb9zktX43Qq3ANn2sCxRwPDx%2FaDA7b3iBbn38eCPJqXOC0nB8M1784aNraMzaE84U%2ByD1suYXTRUzWSlXloejP1kOeIA%2BGWt3DxBcGBZkUe48JC9hBFQn33qpRM0sMtIjlssaEmGYo6vPIwh%2FAR%2F5YuJx3OPJrWX%2BsZ17FdsQdYNp8f%2BxDUgRp7bFRBJWW5RVbOI30iLKwxobAJBz8%2BKRXUXF2yOQkyp4oWE60QwD8VCnzK3QJoGyV6wnbrbax3Zg82IfKJsDGKndvyU80Vy4t1zoIptYF4bEXSIL5X4l%2Btaub1uqTMyqn7FGYqIuCT%2FQyl%2BNKtojSzGEvcUEW2nfk231K5u41X3LhLPXCK68RXjt8218OO9uiRYaTtO2NDpRNPLyzT%2BSJsXa4S71vZfczPG0wq1T9fR%2BXIyxmk%2FnwevaTVxQZQ1lxrA2r8wV%2B6fVkeUCaE%2BizLVhLtFQJLBsoSe7PlW%2B2WYUtyoqKKhudJh5ZuyEjkNhJiKCsKdZ98mkyU4nWX2hmz65nuv82kg198dpDLaWb%2F8lktfUYgqzzc5cNxEbWDfqCN2jmrwYy27QxZ5RMqwDhfiMNxWeaG7pTbySCVo6eEcUgNLaPsbD6tojIVGd%2FILHQPyi9s72%2FTPmQbrnnGfDCcg9%2B9BjqkARgcKdzTqn63O6PHEz1jUbOBn6WrA4Im%2B%2B27%2FufM%2BJmzB3cIoTKK6VfOu%2FOi1zcNQd%2BYb9axddEmnsdCO%2Bq1w%2BMLt03H2B9Sp9nByjamo1PmfYpZUiofaI9pqNaNSpW6%2BAbjnG9acByr5HBIu41HrHVAVRyn1wpInzpsxD1qUTluWtYnDkfytq8fKSvslFXE%2F8DpB84HMKCcKWOTEpgLJsB0QF9X&X-Amz-Signature=0f6b3574729a2f5ea36c1152b65b9496ec7ba7bdc2209b67589e00f63642c9eb&X-Amz-SignedHeaders=host&x-id=GetObject)

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
