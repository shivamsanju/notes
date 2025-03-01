# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSDL4US7%2F20250301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250301T005710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCICtmGlQA0lQe8yrw4gcwttFp4hKIowdyf76ns4xK7kqUAiAG1VLbtLfetcGq4i2kM5z8AXFuffN1Ix57%2BQx2a2O7iSqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMTqlZcvydlfeTkD2KtwDoX3hjzxmClNnjIBpwSmwwj2e3J0O1d7XP%2BNUL2xOujpbp8ETxKnyzUb6Gf0tFC0uSEGwmDRzyAyfCujcdkFNkQ9tiOD0V1uhfPdmLya46YIKDhMBAV8q29mQpaci3VUHRgPfVTdAYV3Qe6Yf5hlRYfd66H%2B6TwA%2F7ysTAFUhn72ROEf7GwOKmFonAumL5%2F9z221M4z1S%2F8HiXjVCN0uKDfZozKczdqBtHbbiQUH2873J4n8DkzzsFEbqVEPYzY%2FNUzPCrfXiMnqwQy7ktgjXZX6PshBsaCx7fUC3l4b33qeFU%2BKCwDdfge16W%2F4hwu2bL%2Fpv0Pz%2F0%2FThzSBfmDUdf0H0s%2FtqsAHG3SJUdVuV%2FuwL9t2CoqSzW9IWGHN%2B1%2FmiqDD%2B0PfyDNRGr2YGLJR12FAylwfT8r3vIl7Hfm5SJ7OVNA5T%2Fg3XsVBND8f30evJG9QW1dUM%2B2r%2FUTurFRY1%2By2Zpy8K%2BMmLYeYiz5CqAYL715NO5tfgHw4By6hFdj6DJOu3V%2Bwgprh6XtNNwkyztY0tknZm7M0r7b%2FT8D95XmyHeiapVI5PTASbdwfdlowdyJ80uU9RYLuACrabVMllKjcHckSEephuw3awFaDLwFF6BPkzTgo7Tdmtcf4wgLSJvgY6pgFHTBZoQhXkJV3vK9k0SWC5ypp3diiDFPPMIq893meVj1C7eyIA3Ch9Gvspb2SpgeFVC4Z8KKraK8Wl7noRRHruXrh6NZE%2FeItkfm%2FRs28%2Bk1HCABmEPQ%2FaliwtZ21rWK%2FEzehDo9IREWmac%2FUpBXvhUk4sjbljajrK0sLjGkTF%2BuIJz1x8RwpJEfTHMK1NFX3U9nqSiNXKLk4Hb7gTZVPtYQ54su12&X-Amz-Signature=062d04daa49f72a48d6c2fb3b18ccc4be780ce2885cf3f75a3d6daf7de24eeb1&X-Amz-SignedHeaders=host&x-id=GetObject)

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
