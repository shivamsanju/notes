
## Singleton

- Singleton is an anti pattern
- Inheritance is an issue
- Multithreading leads to race around condition

## Object Pool

- Manage  multiple instances of the same object
- When object creation is expensive and we need them for a short time, we can use object pool

```python
from typing import List

class Reusable:
		def test(self):
				print(f"Using object {id(self)}")

class ReusablePool:
		def __init__(self, size):
				self.size = size
				self.free = [] # list of objects that are free
				self.in_use = [] # list of objects in use
				for i in range(size):
						self.free.append(Reusable())
		
		def acquire(self) -> Reusable:
				if len(self.free) <= 0:
						raise Exception("No More objects are availaible")
				r = self.free[0]
				self.free.remove(r)
				self.in_use.append(r)
				return r

		def release(self, r: Reusable):
				self.in_use.remove(r)
				self.free.append(r)


pool = ReusablePool(2)
r  = pool.acquire()
r2 = pool.acquire()
r.test()
r2.test()
pool.release(r2)
r3 = pool.acquire()
r3.test()

```


## Object Pool with Context Manager

- context manager automatically acquires and releases objects

```python
class PoolManager:
		def __init__(self, pool):
				self.pool = pool
		
		def __enter__(self):
				self.obj = self.pool.acquire()
				return self.obj
		
		def __exit__(self, type, value, traceback):
				self.pool.release(self.obj)

with PoolManager(pool) as r:
		r.test()

with PoolManager(pool) as r:
		r.test()

with PoolManager(pool) as r:
		r.test()
```

