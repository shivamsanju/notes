# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKVMIH5M%2F20250306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250306T005519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCIRml120I0bxRS9ap%2FXMzCbWmZo4ru0426KVj19oA83AIgCaNn4Y%2BjIcxEQNO688jDGJQDFJ7enwiKnWcZCa0mMw0q%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDLKLWevxQLaqfE7cPSrcA9FABjGQBfIIgdPkqXdPUufPm7g0RiJ4m8nCTfF66BHwKWpJByQ38NRMbGFZ9Txwqe6y1XpEQ%2BWUEMUdprlhyXN%2FYvRLEzJELNNGZnpvpPCnqjCvxVNThrQjgX2Azv%2FCT2OytTJIrOIgw5JtXRxaPIJmk56XevyQkb94nnbZt0CrcBJSomi1p1Xjv5A3V5HXE1KqWao%2BGL9%2FijUws8O%2FK3MwBEYANqiao453cpFFlouT%2FxbcDsLNaS7CKCHePbcdsLSP%2BvEKBz23k6TXnphkIxGh62CxUvAmNR%2B5lW5kLxvUuXw1Iago3RNj%2B6KjhsRpf1xy3dPvRInuzoEG6aiTxlRKrY2zskyC%2FDHupx88uLTF9EikHxxfTrINIrbPB%2F7X4SUK9O711ZaqUSpdRIHlJLhzHQp8FW5puCIBMafJmmxtJfq5Vss1PH5h%2Big70FaT%2Bk6NP6e7OyQQZpyH4ZXFxUVLMPUbBHyYqhxzaXf5vSYDJ%2BGun6uUWDUY9D5vJsa0L0nKGrexJA4UXrxQYPNOzhJ7qsvk5wrgrZzetRDdhQvxiMkW3c9mXp5OyS5bTpE%2B0hZuThUCDlFkYqCkhUh79tNynEcA4mm0lbjPficVh5GRXPjx8XluWDk22951MLPFo74GOqUBjn4%2FNY3AWYsBs%2BhDP%2FqO%2FpIT65Xk%2BbF2aw0MA98953JCpU%2B5C3mQe1RuhKeXS8HY%2BpybayH1jTmNT0nxgoAbBcSWCN1ol4LCdOwX8jjJrHUHTmB%2B4bqKdoMRIggTYQWO9IKVgFy2Uf%2FlaKMc9w9iZebkUeP7Jd4pjcupsPDKge8%2BxK%2BAqOFLT2ZxDqPldR98M3axypV0Ls3XuKNdl5%2FfSd8TCuQs&X-Amz-Signature=3c63d38265c1a65f54303f6394df744d96f5f3afdaa2b0202cc36ad413dbf0f8&X-Amz-SignedHeaders=host&x-id=GetObject)

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
