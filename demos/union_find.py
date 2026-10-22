
class UnionFind:

  def __init__(self, *noeuds):
    self.precesseurs = { i: i for i in noeuds }
    self.tailles = { i: 1 for i in noeuds }
  
  def joindre(self, noeud1, noeud2):
    noeud1 = self.racine(noeud1)
    noeud2 = self.racine(noeud2)

    if noeud1 == noeud2:
      return
    
    # On réordonne tout ça
    noeud1, noeud2 = (noeud1, noeud2) if self.taille(noeud1) > self.taille(noeud2) else (noeud2, noeud1)

    self.tailles[noeud1] += self.taille(noeud2)
    self.precesseurs[noeud2] = noeud1
  
  def ajouter(self, noeud):
    self.precesseurs[noeud] = noeud
    self.tailles[noeud] = 1

  def racine(self, noeud):
    while noeud in self.precesseurs and noeud != self.precesseurs[noeud]:
      noeud = self.precesseurs[noeud]
    return noeud
  
  def taille(self, noeud):
    noeud = self.racine(noeud)

    if noeud in self.tailles:
      return self.tailles[noeud]
    return None

union = UnionFind('John', 'Johnny', 'Luke', 'Ben')

print(union.racine("Johnny"))

union.joindre("John", "Johnny")
union.joindre("Johnny", "Luke")

print(union.racine("Johnny"))
print(union.taille("Johnny"))
print(union.taille("Ben"))
