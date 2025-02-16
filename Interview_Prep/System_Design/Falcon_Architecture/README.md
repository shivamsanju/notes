# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676RVNUKT%2F20250216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250216T005506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQC2ZsO2WeK7E0e6XPv9XPfa11gVN4Yvt9EqT%2FGLAUGRmQIgJDNGXZampG86LntvVypfBdL3f0fOVp407B5fpm0PDKEq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDEs%2FSp%2BWnXeh837T%2FSrcA6zzMq8ZJotJW%2FB0i72WJt%2BGbSBZ%2Ba0NYfLyUnu2kU3%2FUcx49FMcaQFEmKJNeLkV9HwxfZ%2BO5wyuDtmbmqaoisWq%2F%2BZgfyVy%2BZqveFuyhw9WcENhGAAyEz5iq8ZfhqawMIIiNW%2FdvW%2B5g2hMk6gldlXhQDmgviFyFWDCb%2Bt39gUscQ3EGl5iZ7kDb6%2B2G8%2FDewrQeF1qZz40AKNLvCzYopapnhOfLkjc2TvajalORF3cFltvGwQrgNn%2FbYtEDrxugnYVUQ5lEv8cNAuuI%2F6HXQ6h%2BOKhLjwcTRv2ThxnxEOyHyfiCcr19Gxsam4YcW79yfsxbD6GL0XX3tmxpJHfLMmIRiAP%2BjrKjdTWndtG3DbsrSTd6Q8VNOFK0kdXiHqZJz%2FUV0oghAaQNxBEzn330fkIToNZoTGBNbDkgtcaOAcZk2QbOSxmVka32D6%2FiVwR8gnCpGzRsP4zxS0Fgox92G1oTsswF2jnA%2FV79A9wl0DQF45BsuRl%2B%2FppwUg5eLhi8N06uD6Nxgh5hMZ%2FU2eVnPE0bO6Qb5cFOIbPf07X41xVk0gLBMjlt7wTmkqTPiySJWiJnqVcWF%2BFGpa3gyBQ4iDI5ZdScALuH7Hv2QsGkMYw8EaywIRiuzoxD2GiMMzkxL0GOqUBPTnCdtkP55cAZnoEGYBlbgEs5WSpK2IqAf2i5hjicPlFOHV4%2FblCZ8IfYXX9Vc9JZNP3CsM68sfTyUUhQ1h3MS5hqNavCdf2LBxMZ44oQVktQqklgLirQ8ipF9LGjZM5it61%2FMprpxORB3f55elwuT665xYtMgkt%2ByVHcR1Vrx8VzBsclhg0ii3oToC%2BDjFaJK3WJs8fveMRkOdyIZ7zJkLmbSR6&X-Amz-Signature=bf35b873206a69c98849577d427892f67bbc76f7adb1e75f207e0227ec26a06a&X-Amz-SignedHeaders=host&x-id=GetObject)

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
