
Observer pattern is used when there is one-to-many relationship between objects such as if one object is modified, its dependent objects are to be notified automatically. Observer pattern falls under behavioral pattern category.


Observer pattern uses three actor classes. Subject, Observer and Client. Subject is an object having methods to attach and detach observers to a client object. We have created an abstract class _Observer_ and a concrete class _Subject_ that is extending class _Observer_.


```python
subscribers = dict()

def subscribe(event_type: str, fn):
		if not event_type in subscribers:
				subscribers[event_list] = []
		subscribers[event_type].append(fn)

def post_event(event_type: str, data):
		if not event_type in subscribers:
				return
		for fn in subscribers[event_type]:
				fn(data)

```


```python
from .event import subscribe

def handle_slack_registered_event(user):
		print('new user has registered', user)

def handle_email_registered_event(user):
		print('send welcome email to user', user)

def handle_slack_forgot_password(user):
		print('user has forgotten password', user)

def setup_slack_event_handlers():
		subscribe('user_registered', handle_slack_registered_event)
		subscribe('user_registered', handle_email_registered_event)
		subscribe('forgot_password', handle_slack_forgot_password)

```


```python
from .listeners import setup_slack_event_handler

# initialize handlers
setup_slack_event_handlers()

def forgot_password(user):
		# this just posts to an event and then event handlers do bunch of things
		post('forgot_password', user)

def register_user(user):
		# this just posts to an event and then event handlers do bunch of things
		post('register_user', user)


register_user()
forgot_password()
```

