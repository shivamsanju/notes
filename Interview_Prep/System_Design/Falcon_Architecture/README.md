# 🚀 Falcon Architecture


![falcon-architechture-exc.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2218d451-9074-449a-9e14-4ae157871206/1c5c9930-f6f6-4a85-9a15-81a64569ec14/falcon-architechture-exc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LNE3HPI%2F20250129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250129T004851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQChDf2jn9qxRgZ9XFDv%2BOd0UV4eSiX0VnPBY0ub2WLr7gIhAJyYPyx42%2BnGvhKo0n3VwZ%2BEF0uUJAuO3kiWuya2lSb6KogECIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzfAlbZ3Iyi%2FLuWxFwq3AOcT8BcUMwYIJ%2BuYq0%2F%2BG0Wq%2FIkZ74Yi21jDMgDZYRCE2hZe5nuLeezHU5pOVaydxuN9nSpNEsPpR7S83GjNDZOuHy2hzTDuhAbe8OT2%2BVXfvvtiURw7Oy4Q9NTKl2OSK2Di7x6RIKKqQDRfXstC1xE8tnTvXs94sdpmMXh8KKOZBdV6IaATU68DTkw9eBXRSR6VaJBmiEQFJeAIuElVVZ9yAFAKHeax1vlbFU0wfJMrVawnlhCWanJwaSVtdF%2FWZUwmP86IlcGf0tRmncAgUIec%2FjQ5RZAU62uIOT%2BvQ7ZjR1pvMmOwk%2FDRqYrZGBSrj%2FRI8zkJi24bjyV%2Fzpb%2FjCHRcoGMyWjK%2B3PQnXgpGausRzpkPy627KX3TkayJB9owjsNXM23fofGz3Bkl4w47x7uJisUPd2dP3iqWQ4ePXVXtnNkRDVycCZuyd2MtYB%2BnmixnCdnD8Lww5q7%2BB5O%2BkpvvgDyENnnJ092dVCNlM%2FVaKYrb3DJmu8TfyDtcvbbpQUshlQZOdyaXwzl5Iinyvwcsl47JDcx8oL0WPF3AmloiTzaGXTweZg7Eg3CiDJEhr5svHLbu9tEidzkRPQk72bI1E%2BJwws2Yw60lg1jPhlmrHDd0sPteNOwTZ7cTCY6OW8BjqkAUT%2BPL9nqawidofbQVwkG%2FxL0XAlkAI65WumK%2Bq7cwd8rMADRwrxgLzJxAPdKPA5UjAk6NqCbTr1cob0z1%2B%2FoZlx93MC9cfuorsHnhx%2FLiGEmhHdVkjmSEOqhmJ7fYTQBYbY0y4mW9wg%2FA5cGH5%2FJSNvQeevtJJ%2FzMOEL7hth4YIkzDzv9FFSamWHWC5ovucCQVAQ1E%2Bv%2BLYGOaUsiP4fFiYbfXH&X-Amz-Signature=e3548e8c5c1ca30bd2accef783d57ee6cb950deb2c2871a4f41b6ce8521e8af8&X-Amz-SignedHeaders=host&x-id=GetObject)

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
