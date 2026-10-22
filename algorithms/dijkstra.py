from math import inf
from queue import PriorityQueue

def dijkstra(graph, depart, arrivee=None):
  distance = { sommet: inf for sommet in graph }
  precedent = { sommet: None for sommet in graph }
  visite = {}
  queue = PriorityQueue()

  # On initialise la queue et les distances
  distance[depart] = 0
  queue.put((0, depart))

  while queue.empty() == False:
    _, sommet = queue.get()
    d = distance[sommet]

    if sommet in visite:
      continue
    visite[sommet] = True

    if sommet == arrivee:
      break

    for poids, adjacent in graph[sommet]:
      nouveau_poids = d + poids
      queue.put((nouveau_poids, adjacent))

      if nouveau_poids < distance[adjacent]:
        precedent[adjacent] = sommet
        distance[adjacent] = nouveau_poids
  
  chemin = []

  if arrivee is not None and arrivee in precedent and precedent[arrivee] is not None:
    chemin.append(arrivee)

    while precedent[chemin[-1]] != depart:
      chemin.append(precedent[chemin[-1]])
    
    chemin.append(depart)
    chemin.reverse()

  return chemin, distance