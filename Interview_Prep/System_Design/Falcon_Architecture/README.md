# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMBIWGYP%2F20250225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250225T005145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQD2co9MofTCdIcCf1ZUZAM2oFHkEfwI4KyiawhTAeKuFwIhAO4hSs9kRYhGRb2avCviB9qCKcZugQ%2BH8id25aN2%2BwDiKv8DCDkQABoMNjM3NDIzMTgzODA1IgyRoF607QKLgvdrp54q3ANPN6%2F%2Fx8a1TwEn9QZ4b6AIm%2BnstTyAlPGL%2Bs%2BExlAhOMKdMJNYF6GExkrFWvP%2B9BnRPP804xRU%2BtdPgO%2BY83FTRG7Tt3%2Ber2Wd8%2FJbu%2BMQwuI1byEX05SFW4fDDFrJDlrzECOl3fsggqrhcNUOZtTqZQAl678dxI0Us%2FNoZm0IAXANHDSnlskajch9HsdiDSp3qHsENOr05vHbKa82c2ujkf04y6TlGF1gfKR2SOmS%2Fs9SquvRZMVgU%2BDtZTnnnV17VGkxmAKUgftBs0bFzB2TTqTu1aON%2BxJSvoyvCH7X5KB%2B8fPKks7F13fy7Imkmg1cJ8urkBEN3fggZ7j7oZlxS7jc6bPsIqoF8KfgOI%2FFLPyEF9Yu9B9zC3qaXjBAM6OT1VAZNW%2F8ocuwjSL0qiPuPIMt3MvyA7oG7Wgk7C5D7ypwkzH4deTeRKlfsVc%2Fds1fRdNKRWZHDr8GwRZkwi9iekyQk2n1KmKyvhbzlPg%2BgkO7hcYuINH6xdLh3LctWZQPErCNlsAVNAnguWJsI9Tb7JXTZDw4ASmcR3vuRQ68iX8SISNLaJ4BIqL3%2FyA0BrCqhisK8hcoO3WM36Jb8%2Fr%2F2mp6NTpzo5hLZDeVUxe30g2KhFVAvNqOOLVBmDDLgfS9BjqkAc7jGuIg5RyUVrvazGX6eLsPhOwg1vyaKuhfnYdEueM6UsA4ZefSTGCPehxhf27M5O6jMp3PLh8czwcMP5ySl3Ymmn0hoR8I6mcGTVLV8cFrgIT%2BZbyhrm3wce79liOi5gq04mU2JSyb8yzBxF2oFPk6GBZg99%2FtFCimQzUDUYPjyBSGVJvGD%2F%2B1EahBDIiO5m5OHvSrjaB0NI7U6x%2BrBcjP4WXc&X-Amz-Signature=c836857592f07f9ba94b4c59d01545cb001ce3e4210f60a6f277380ae16020fc&X-Amz-SignedHeaders=host&x-id=GetObject)

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
