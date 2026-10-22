

class Value:

  def __init__(self, val):
    self.value = val

  def __str__(self):
    return self.value
  
  def  __len__(self):
    return len(self.value)

  def __call__(self):
    print(self.value)
  
  def __add__(self, a):
    self.value += a
    return self
  
  def __sub__(self, a):
    self.value -= a
    return self
  
  def __mul__(self, a):
    self.value *= a
    return self
  
  def __pow__(self, a):
    self.value **= a
    return self
  
  def __truediv__(self, a):
    self.value /= a
    return self
  
  def __floordiv__(self, a):
    self.value //= a
    return self
  
  def __mod__(self, a):
    self.value %= a
    return self
  
  def __lshift__(self, a):
    self.value <<= a
    return self

  def __rshift__(self, a):
    self.value >>= a
    return self
  
  def __and__(self, a):
    self.value &= a
    return self

  def __or__(self, a):
    self.value |= a
    return self

  def __xor__(self, a):
    self.value ^= a
    return self
    
  def __invert__(self):
    self.value = ~self.value
    return self

v = Value(1)

# 1
((((((((((((~v + 1) - 1) * 1) << 1) >> 1) % 1) & 1) ^ 1) | 1) / 1) // 1) ** 1)()