
It helps in situations where we have multiple different strategies that a function has to choose based on the input.


In Strategy pattern, a class behavior or its algorithm can be changed at run time. This type of design pattern comes under behavior pattern.


In Strategy pattern, we create objects which represent various strategies and a context object whose behavior varies as per its strategy object. The strategy object changes the executing algorithm of the context object.


```python
from abc import ABC, abstractmethod

# creating the abstract class - interface
class TicketOrderingStratedy(ABC):
		@abstractmethod
		def create_ordering(self, list: List[SupportTicket]) -> List[SupportTicket]:
				pass

class SupportTicket:
		id: str

class FIFOOrderingStrategy(TicketOrderingStrategy):
		def create_ordering(self, list: List[SupportTicket]) -> List[SupportTicket]:
				return list.copy()

class FILOOrderingStrategy(TicketOrderingStrategy):
		def create_ordering(self, list: List[SupportTicket]) -> List[SupportTicket]:
				list_copy = list.copy()
				list_copy.reverse()
				return list_copy


class CustomerSupport:
		tickets: List[SupportTicket] = []
		
		def create_ticket(self, customer, issue):
				self.tickets.append(SupportTicket(customer, issue))

		def process_tickets(self, processing_strategy: TicketOrderingStrategy):
				if len(self.tickets) == 0:
						print('there are no more tickets')
		
				ticket_list = processing_strategy.create_ordering(self.tickets)
				for ticket ticket_list:
						self.process_ticket(ticket)

		def process_ticket(self, ticket: SupportTicket):
				print('=================')
				print('ticket processed')
				print('=================')

app = CustomerSupport()

app.create_ticket('a', 'b')

app.process_tickets(FILOOrderingStrategy())
```


### A more functional approach 


```python
from typing import Callable

class SupportTicket:
		id: str

def fifo_ordering_strategy(list: List[SupportTicket]) -> List[SupportTicket]:
				return list.copy()


def filo_ordering_strategy(list: List[SupportTicket]) -> List[SupportTicket]:
				list_copy = list.copy()
				list_copy.reverse()
				return list_copy


class CustomerSupport:
		tickets: List[SupportTicket] = []
		
		def create_ticket(self, customer, issue):
				self.tickets.append(SupportTicket(customer, issue))

		def process_tickets(self, processing_strategy_fn: Callable[[[List[SupportTicket]], List[SupportTicket]]):
				if len(self.tickets) == 0:
						print('there are no more tickets')
		
				ticket_list = processing_strategy_fn(self.tickets)
				for ticket ticket_list:
						self.process_ticket(ticket)

		def process_ticket(self, ticket: SupportTicket):
				print('=================')
				print('ticket processed')
				print('=================')

app = CustomerSupport()

app.create_ticket('a', 'b')

app.process_tickets(filo_ordering_strategy)
```

