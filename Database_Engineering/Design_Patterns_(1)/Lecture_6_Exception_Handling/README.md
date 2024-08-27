
```python
from fastapi import FastAPI

class NotFoundError(Exception):
		pass
		

app = FastAPI()

blogs = {"1": "A", "2": "B"}

def get_blog_by_id(id):
		try:
				return blog[id]
		except KeyError as e:
				return NotFoundError("Blog not found")


@app.get('/')
def hello_world():
		return "hello world"

@app.get('/blogs')
def get_blogs():
		return blogs

@app.get('/blogs/{id}')
def get_blog_by_id(id):
		try:
			return blogs[id]
		except NotFoundError as e:
			raise HTTPException(status_code=404, detail="Item not found")
```

