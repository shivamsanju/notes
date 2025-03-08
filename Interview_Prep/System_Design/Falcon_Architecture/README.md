# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTZTXAB6%2F20250308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250308T004226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCOwPBKJ5NU6xoUxCjohmu3mvWu02bQuurgomCvMnwMVwIgYdakIHqyxHChqOAGPaX2BxHfooe2QYBl4aJORg5aj2Qq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDHNL1HrW5wG%2F9DnpbCrcA%2F6yi41amUtKU4uH%2Bn5BBujq4b6SR%2FoPCiQ3YBXHChBWq%2BiPGuJ2Bse0PM3oyoRqaxfEXdMH5I1RBJ%2B5QucNTo4D6%2FXadxzCt6piSaPyfsliJc%2F3%2B1M2QUwkhTyyZ3TNs4%2FBwv3E8QwFkcjU7g34TyTRxiEfiA92SLWtIXtCYoVI1ddedlTGFT1oWR79dBUQxcZDNqc%2FtpZ2ulHuZjO2Po9W1yDTeUbV1PEvKMZROqLuRexzzZ%2FYj5YZM2MXZR0Q22SQluiezuMjj87W%2FZsdjE2WnY8BPvxmHnvrgMrZ2HDmHInuAtwWAVwElMy8Y7t%2FgOROglpUiv1IeuaNuj1ZlX8UlCpKYmoPsnfHUzfiv3h7wr7geRSDkXOIe7hXtfERMe0qrOTFO6oy1Ry7eQKkjiN9h33UPMpldqhQw91DgBnOKB9hjCtbdsfpo3t9n932A2BwEVbCx36X%2F3h03y2z5N1TfV80qKEBhx04fC2Vdq1yjzb%2FLJ%2F5ywvEJOy3nq2nFK%2F7AO0B%2FneQBy0GdhnZa5AOQhPxzQEBx1g0DXy43alCeGhFN0coTxt1LNcGLRPxoYVu6wustY6jcVK9dJ1T9CXuQdcAuMEDRnFKAxFFqpcFiUSVPHPIxIzSfQCkMNCdrr4GOqUB3j4lz1ImlC4ugApNWpuw3szlr9JNk%2FwnubBoPUjyBRDM0M4E17ohMugw35SOKVs9DcaZq%2BDdVhO9HKFe3e1rTE7t2RkOgAFRuXurIFFXSxfb9bmHlMwJWdsAHO%2FFuYC01RfNhPGL3GYEtr2tFflQKHvTvMuEeqslgO8KmP5NVrbPn6XejeXigBzzb6xkezghcy0I813dXyhxUTR4R9hytNS%2B%2BRXI&X-Amz-Signature=9e25f8bb2ac207661abcbdf22f5a0a9ebf87b5d4bd9c35296d2e63b86a0d3813&X-Amz-SignedHeaders=host&x-id=GetObject)

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
