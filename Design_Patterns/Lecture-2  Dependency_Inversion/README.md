- Dependency Inversion is an important part of SOLID Principles
- The key ingredient of dependency inversion is **abstraction**
- ABC (Abstract Base Class) helps in implementing abstraction. Python also has type hints.

[bookmark](https://blog.bitsrc.io/solid-principles-in-typescript-153e6923ffdb)


### Python Example


```python
from abc import ABC, abstractmethod


# we can't create instances of this class - it's an interface
class Switchable(ABC):
		@abstractmethod
	  def turn_on(self):
			  pass
	  
		@abstractmethod
		def turn_off(self):
				pass


# now LightBulb needs to have turn_on and turn_off methods
class LightBulb(Switchable):
		def turn_on(self):
				print("Light Turned On")
		
		def turn_off(self):
				print("Light Turned Off")


class ElectricSwitch:
		def __init__(self, c: Switchable):
				self.client = c
				self.on = False
		
		def press(self):
				if self.on:
						self.client.turn_off()
						self.on = False
				else:
						self.client.turn_on()
						self.on = True

l = LightBulb()
switch = ElectricSwitch(l)
switch.press()
switch.press()
```


### TypeScript Example


```typescript
interface Developer {
  develop(): void;
}

class FrontendDeveloper implements Developer {
  public develop(): void {
    this.writeHtmlCode();
  }

  private writeHtmlCode(): void {
    // some method
  }
}

class BackendDeveloper implements Developer {
  public develop(): void {
    this.writeTypeScriptCode();
  }

  private writeTypeScriptCode(): void {
    // some method
  }
}

class SoftwareProject {
  public developers: Developer[];

  public createProject(): void {
    this.developers.forEach((developer: Developer) => {
      developer.develop();
    });
  }
}
```

