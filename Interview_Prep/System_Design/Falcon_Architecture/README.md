# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWDJFMMQ%2F20250311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250311T005519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCsWqQp39tX2k9%2FkOwouG1lFXzrd5fKtid0dJYWq4VGwwIgV79YoBNKCUDV0FqW1SLjyeREyCMClFpJr7X%2FlrKj84EqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDII%2Fg4TswjVd%2BG5RPCrcA4lyR590GLMgzLETcfAD3s6td2Qt34ddGe4Kq0mqBTe1rWVAt76MkeBr8lPjX6OgwqJqcqHRmVkBdSlwJwxDKED2iRbIW%2BlTE%2Fricl%2Fydpx52hEx%2BSv%2BJ28889xlnGjWV7KkFiOCq%2BET%2FlObAXeMU1UKdWvdL8MTz5Vv4mcqSc2WFSGyhdPNHgBkUlDtE95GCJ%2FNM8MGd4BHTGcR3SZIRcwpXcNAGkqxLFkZfW0RSfuOR1P9CsaoPKrqdIkj3vC%2BnZjO4qKls0uTD9VlFYYljhmZjMLv2dA4gsxkMS6mgKKiBEhk4IyhlwoE6b82HUUcVj0LeTRoVNaXUxtJfSTZXBMTd7zXMrZkP1eetl5VY8tNY2MBEAOZO1PCWLknzs9cCjIXRTHJLi3g6yjSBPPQNrhYbovsITSe9%2FQ09MURFuJgd1pM5GkCXPAKOAI6kK1OwfifDCHtFrmMM4MdD2TUciud%2BPDbhZGdkiUNVh7OoNiPqcgOMeh9X6IBT6VxSd4hzyZ0dhvrWleWKbhxfJbQhw%2By8ulHt%2FIRODwSosszpj79dDQ89qpygYG%2Br0GKLjZmv4d3Wks0xGHGPHOTZohIgITczdHUiMEOwmDsie0SE1cFmJfn8sknK9mTiMISMLuNvr4GOqUBBPt4xASomW57zJb9LBGd6ZEUJCyxxzhx8mdpDq%2Fj9xsAvACPk7cIWbKJGmJiCcayFrwd%2FIZ2ULav4PcouPUQw4MGLgZf7j8tSYzVmRLrHSAauYn%2FJmyOzTMp2qoT%2Fo6KHUdqCfsC09ncnFnFCBEAwDeO663WdEuxQIxkLMI%2BoC1MFbSHAvEiyNJWzEedVxXyOLlqoSaKGksCnnysV0E7ek0L31nE&X-Amz-Signature=0895460b7cf169f4a770a35b25390f6e85a397958cc0dddade8253d0f0c50e3d&X-Amz-SignedHeaders=host&x-id=GetObject)

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
