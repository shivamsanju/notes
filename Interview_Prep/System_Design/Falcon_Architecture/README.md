# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HMFER4C%2F20250217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250217T005318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIBIrCbTWo%2BEJ1k7fFW2IfVe8Bx2ZnAcRGddTfrtKSro1AiAIDpRxspndckvAF%2BGQB2IjH9hLEN%2BOMPBD%2FRUgwTIUBCr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIM%2FLOg9s8IB1M8r84VKtwDwoFdOVmmQYxVa2aMgStjIQJ5R96cb5O3JLERH%2F9k%2Fm56qGNJCk25aYtpDO1xJH5s7fvoLJqYUXD4mEAQu%2BrxLXXospmKytp0cZ2chbOhE%2FXQbRXpIz7lkMZrtKU0qqcWdpLZj9eZuL3iggEgi%2BvRFU75LaErQbYc%2BQjGF4kqTTt45dy08r%2F8kkAnqO7U2f7KlnmQJoNzvPFA%2B4GlBqsP2bvMPiDoLzZZbn7ttZ7GEd5pPBr3FuQhN0uEmPoIl8Ei9IN%2BlKWT8yAUgHH4EVh%2B5M9L7H5TAwOaQn50b%2BP1ycyvqv0iqPBIHlcWlAQ518fxOJtEwGOxjURb1c34%2FQwuvs04ag08Wd3uxDbF9WjXnueqOXn1Tpz7qBnrTVzfXoxcUGq7QYouyuhv0hkvZwSL%2Bhy%2Fp9IRsVaskp8yI9cRTrZ5fm92if3p3z6z%2Bn2pkQ0w0w6a6Ubo%2BTGYfbOP4I2YWEuJpMPvDvUZkzMV9LDJispojmgflNxCrVYnGlRWOCGRB8bVRdjgCLq%2FEGg4fx8X%2FdEi5GW4aIrqVdelVLkHA6OvsHJHUyK3ABW5ecUpdNFQkzO%2FvxHMqBkxIExX3VQDWxRbed11aX9VaeErJem6P4dPz91vPNUbSClI3xIwmP7JvQY6pgF%2B%2FnMdoTLvI3R6LhrqzBFYv%2BZzbKmrCPY%2BArLISv%2F0vdMmUP%2BzntTV9il6ykfVC33LX29sM0ivxkjRcz94JM%2FpQMF7yey1iCAEsquwJirG3rSbuRSa3c1rn5U6xCYoEjnnIYgOkMskgxG%2BPZLsk8gwAT8mJiFNPG1hn2kAjTjzlLgXPFmUnjuo0xCMTtfxJjTfXvAuMfh0W3eRFto%2FJX0CvQ%2FSoYQ3&X-Amz-Signature=d5e214b9ca6941fd0f5409fb838922775b51b29a91e1afbc0cb064ebdf1f831e&X-Amz-SignedHeaders=host&x-id=GetObject)

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
