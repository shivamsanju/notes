# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466774FRGLW%2F20250313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250313T005504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCD%2By%2FceYeu%2BuFR%2FJ8IwLxXKKrhvYCW8TMQhYr0j5lm5AIgNJPcgkuxqVF4yr5oa%2Bo%2FUAhlswUyC9toUjkMI4C4F48qiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAhdclY5jPkU%2BPSLLyrcA%2B7C4aJ2K7kAZg%2FRToN5t9cYtU9cCiymLCwWLSDoSdjS8CPkZ9WgVqE614TOtvF6NYRSEQ2Mp0OVaqChPUiXe%2F9Cwy02NftWdezoL1s%2BGtC3EzqEuv3xu1cfXE%2B4Tt4Ho49wDqngrCVQbqTjed1Z2mfwQC3zu0ecbUnhV%2FwPd3KwpoE0JWMGFQfnyDUZJOkHUk%2FbqH1E2dDiJJ4RZX0WR%2FyBLBvJzn0uDMsneM9gmK4PJxFDOWuEuNtcSBhmgaVNkB%2Bv7veRlPNFXp0jwRDJhMoaXM7ZGF%2BYWf0lvOm3ulVOt%2BStsT6puwM5ugyrlC16Dle5qzoD7NS5ji%2FZYQJfv%2FUp6jTA2C6wVVJnZiZOVKSvwdYUb8c3e6l7PSwSupyNOPDuckkPuXljh%2FdCocIVQagYmCtG2pZBKJf3YVXFPE6i0x%2FmiRa6G0%2B4N0FkPCA480dMgB3WWwTya90IsDYol4xxQjqqqCc51Cjc86jNkAWWYi3HJ9jyiWNiINul8nbA74DXOsGPa2b7onCMPFfIQLnfaXsMzzQaRFQPqY6JzLZ7sYWOD6o%2B6lzl4s0f5uRGsJuO7sa%2B0dWNUZ2x3r9TvlgkE89IQSTq7obCVR3rm6w9m4HYDTxpas4JcO0WMIXAyL4GOqUBEx2l89LiLA55BuUfnWjezGotryTe%2FxKfIx3ThARfCadeI7FKmnq0RHn%2FGdM9bPFN8M6W2ZztX1gKOG6wY6gyZX6ExJ5yD9QVAeimJmZkp6ZzquMddNTSqbfX7x82IEjdiwn0wR%2FKfPETOjdqXdWUtNisiXYc68DxIujweW%2FKkruEmrhNqUo%2FJo647b2Pxm%2BQA7vtlzDxnGK8QblRA6wHD2jqSA3J&X-Amz-Signature=31697b5ab5441db637474737d57231b1e9dadc2d815837827ad67ece27921114&X-Amz-SignedHeaders=host&x-id=GetObject)

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
