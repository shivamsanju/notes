# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4O2ZTK2%2F20250130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250130T004748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1ylzm4BRauL3auaz%2BdrpQ0MpSgm42SPaKejCrNzG%2FegIgZrEPwbW%2BOTjlbBDHaii%2FQXt4Hc9Y1QEqZdwIrvxqNt0qiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGfc4Zx6Ppgrh0tzbyrcAxb7vL4e5yqHavdLjj6NbE4RzA4L5TQbBlQRaAt0uecPXBwvKmkvgJ2U9BJSOI42fihouzDfOcmOa91%2FBBSO83r6hDdVPzhWc39tVeKGr8aII5D%2FztbTzCVEWkQoLCjh9DzZeKe141i6oydIAHEIFFVD%2FcRRhGB0n%2F7492mtNtoddLAIe6q%2B28cq9LqOBtOIEO6vT%2FX%2FAYYwo89Abfmh%2Ft%2BYtVhKz50yITz2BTMAdxzIBMmvnLnioRzFSAMzfEnzOJsmlstGAP5OYc0UeytIHcD22mYOrXN01Qtp7WPlhtrzSfggpk%2BCyIjyHOGera0Nfws1HrC%2BeAfQq0ZhURg%2FfuJilFGqv0bYnJaD6GWj%2BORfde9wn4hZrConryXjAxbtMul%2BwUIlDVsGypqEptJys2r%2BqyKgBI7YEWoTpvOqA28ro8JVG%2FoE7XtTrXD457ra%2BLJjGBSQdOZs0ehm0IZrzflAjR6DnruvoCUyUHhbQ6l0Jw9ITi9nejVvM9IRQdtYaOOqJX8FNOYDxAI30drpSCz3ex%2FvlgfdV2Y8MO98ybKpknHSX3Hxm862c9d0Xi04mRYJSXFq16pygXqlPwZ0bpZhM2%2BMGIMSsuV8jnF%2FK0zNaRXexwVbgKGXW32sMMmW67wGOqUBo8dTWD6wIpKijOdUlEmbcLSz%2BNYNrZ4Pl4%2Bz4AY4IbEg0TTo2mH9JVhrnycBjmGgYBnzvkakhqR9H%2FMtuYN5k2L8US%2BFXWKEy0%2BH5TC138DrVaadoN9SDnSHuQgKoSNfNmw4%2FWyfqR%2FayjaB9Y3h9uEL3%2F1oTIS9zGheed6QPSx4Afe8hpjPNkUum7ViXFBWdM4%2BVSXQcd0wSPXf%2FJX%2BbWy%2BIK3K&X-Amz-Signature=92068fd5976fea3224ee2dbcf8a178049a571a9b316eca7e5f47f63fc09a61ce&X-Amz-SignedHeaders=host&x-id=GetObject)

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
