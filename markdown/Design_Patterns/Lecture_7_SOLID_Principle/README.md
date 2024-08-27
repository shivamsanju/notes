
S - SINGLE RESPONSIBILITY


O - OPEN CLOSED


L - LISKOV SUBSTITUTION


I - INTERFACE SEGREGATION


D - DEPENDENCY INVERSION


## Single Responsibility

- classes and functions should have single responsibility
- that means, they should have high cohesion

```python
# responsible for handling order
class Order:
		items = []
		quantities = []
    prices = []
    status = "open"

		def add_item(self, name, quantity, price):
				self.items.append(name)
				self.quantities.append(quantity)
				self.prices.append(price)

		def total_price(self):
				total = 0
        for i in range(len(self.prices)):
						total += self.quantities[i] * self.prices[i]
        return total


# responsible for managing payment
class PaymentProcessor:
		def pay_debit(self, order):
				print('Payment done by debit')
				order.status = 'paid

		def pay_credit(self, order):
				print('Payment done by credit')
				order.status = 'paid
```


## Open / Closed

- code should be open for extension but closed for modification
- in the above case we have to modify payment processor if we want to add a new payment

```python
from abc import ABC, abstractmethod

class Order:
		items = []
		quantities = []
    prices = []
    status = "open"

		def add_item(self, name, quantity, price):
				self.items.append(name)
				self.quantities.append(quantity)
				self.prices.append(price)

		def total_price(self):
				total = 0
        for i in range(len(self.prices)):
						total += self.quantities[i] * self.prices[i]
        return total


class PaymentProcessor(ABC):
		@abstractmethod
		def pay(self, order):
				pass


class DebitPaymentProcessor(PaymentProcessor):
		def pay(self, order):
				print('Payment done by debit')
				order.status = 'paid

class CreditPaymentProcessor(PaymentProcessor):
		def pay(self, order):
				print('Payment done by credit')
				order.status = 'paid
```


## Liskov Substitution


We should be able to substitute the objects with the instances of their subclasses or subtypes without altering the correctness of the code


```python

```


## Interface Segregation


Several specific interfaces are better than one general purpose interface


```python
from abc import ABC, abstractmethod

class Order:
		items = []
		quantities = []
    prices = []
    status = "open"

		def add_item(self, name, quantity, price):
				self.items.append(name)
				self.quantities.append(quantity)
				self.prices.append(price)

		def total_price(self):
				total = 0
        for i in range(len(self.prices)):
						total += self.quantities[i] * self.prices[i]
        return total


# instead of using one interface we create another one with auth_sms
class PaymentProcessor(ABC):
		@abstractmethod
		def pay(self, order):
				pass

class PaymentProcessorWithSms(PaymentProcessor):
		@abstractmethod
		def auth_sms(self, code):
				pass



class DebitPaymentProcessor(PaymentProcessorWithSms):
		def pay(self, order):
				print('Payment done by debit')
				order.status = 'paid

		def auth_sms(self, code):
			print("Verified code: ", code)

class CreditPaymentProcessor(PaymentProcessor):
		def pay(self, order):
				print('Payment done by credit')
				order.status = 'paid
```

