from collections import deque

# Classe UnionFind, importée de demos/union_find.py
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


def kruskal(graphe):
  aretes = {
    (sommet, adjacent[0], adjacent[1])
      if sommet < adjacent[0] else
        (adjacent[0], sommet, adjacent[1])
          for sommet in graphe
            for adjacent in graphe[sommet]
  }

  aretes = list(aretes)
  aretes.sort(key=lambda arete: arete[2])
  aretes = deque(aretes)

  # Permet de garder le compte de composants indépendants de l'arbre en cours de construction
  compte = len(graphe)
  union = UnionFind(*graphe.keys())

  graphe = { i: [] for i in graphe }

  while compte > 1 and len(aretes) > 0:
    (a, b, poids) = aretes.popleft()

    if union.racine(a) != union.racine(b):
      union.joindre(a, b)
      graphe[a].append(b)
      graphe[b].append(a)
      compte -= 1
  
  return graphe