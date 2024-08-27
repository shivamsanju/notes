
# Template Method

- Helps you standardize the process

```python
from abc import ABC, abstractmethod

# template class
class TradingBot(ABC):
		def connect(self):
				print(f"connecting to crypto exchange...")

		def get_market_data(self, coin):
				return [10,12,18,14]
		
		@abstractmethod
		def should_buy(self, prices):
				pass
		
		@abstractmethod
		def should_sell(self, prices):
				pass

		def check_prices(self, coin):
				self.connect()
				prices = self.get_market_data(coin)
				should_buy = self.should_buy(prices)
				should_sell = self.should_sell(prices)
				if should_buy:
						print('You should buy ', coin)
				elif should_sell:
						print('You should sell ', coin)
				else:
						print('No action needed for ', coin)
				


# class based on template
class AverageTrader(TradingBot):
		def list_average(self, l):
				return sum(l) / len(l)

		def should_buy(self, prices):
				return prices[-1] < self.list_average(prices)
		
		def should_sell(self, prices):
				return prices[-1] > self.list_average(prices)


# class based on template
class MinMaxTrader(TradingBot):

		def should_buy(self, prices):
				return prices[-1]  == min(prices)
		
		def should_sell(self, prices):
				return prices[-1] == max(prices)


application = MinMaxTrader()
application.check_prices('BTC')
```


# Bridge Pattern


```python
from abc import ABC, abstractmethod


class Exchange(ABC):
		@abstractmethod
		def connect(self):
				pass

		@abstractmethod
		def get_market_data(self, coin):
				pass

class BinanceExchange(Exchange):
		def connect(self):
				print(f"connecting to binance exchange...")

		def get_market_data(self, coin):
				return [10,12,18,14]

class CoinBaseExchange(Exchange):
		def connect(self):
				print(f"connecting to coinbase exchange...")

		def get_market_data(self, coin):
				return [10,15,9,14]

# template class
class TradingBot(ABC):
		def __init__(self, exchange: Exchange):
				self.exchange = exchange

		@abstractmethod
		def should_buy(self, prices):
				pass
		
		@abstractmethod
		def should_sell(self, prices):
				pass

		def check_prices(self, coin):
				self.connect()
				prices = self.exchange.get_market_data(coin)
				should_buy = self.exchange.should_buy(prices)
				should_sell = self.should_sell(prices)
				if should_buy:
						print('You should buy ', coin)
				elif should_sell:
						print('You should sell ', coin)
				else:
						print('No action needed for ', coin)
				


# class based on template
class AverageTrader(TradingBot):
		def list_average(self, l):
				return sum(l) / len(l)

		def should_buy(self, prices):
				return prices[-1] < self.list_average(prices)
		
		def should_sell(self, prices):
				return prices[-1] > self.list_average(prices)


# class based on template
class MinMaxTrader(TradingBot):

		def should_buy(self, prices):
				return prices[-1]  == min(prices)
		
		def should_sell(self, prices):
				return prices[-1] == max(prices)


application = MinMaxTrader(BinanceExchange)
application.check_prices('BTC')
```

