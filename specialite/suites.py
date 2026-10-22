
ARITHMETIQUE = "arithmetique"
GEOMETRIQUE = "geometrique"

class Suite:

  def __init__(self, t, premier_terme, raison):
    self.type = t
    self.premier_terme = premier_terme
    self.raison = raison
  
  def somme(self, n):
    if self.type == ARITHMETIQUE:
      return (n + 1) * (self.terme(0) + self.terme(n)) / 2
    elif self.type == GEOMETRIQUE:
      return self.terme(0) * (1 - pow(self.raison, n + 1)) / (1 - self.raison)
    
  def terme(self, n):
    if self.type == ARITHMETIQUE:
      return self.premier_terme + self.raison * n
    elif self.type == GEOMETRIQUE:
      return self.premier_terme * pow(self.raison, n)

geo = Suite(GEOMETRIQUE, premier_terme=10, raison=2)
print(geo.terme(2))
print(geo.somme(2))

print("- - - - -")

ari = Suite(ARITHMETIQUE, premier_terme=10, raison=2)
print(ari.terme(2))
print(ari.somme(2))