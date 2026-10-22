
from algorithms.dijkstra import *

def test_dijkstra_avec_arrivee():
  chemin, distance = dijkstra({
    1: [(2, 1)],
    2: [(3, 1)],
    3: []
  }, 1, 3)

  assert chemin == [1, 2, 3]
  assert distance == {
    1: 0,
    2: 1,
    3: 2
  }

def test_dijkstra_sans_arrivee():
  chemin, distance = dijkstra({
    1: [(2, 1)],
    2: [(3, 1)],
    3: []
  }, 1)

  assert chemin == []
  assert distance == {
    1: 0,
    2: 1,
    3: 2
  }

def test_dijkstra_complexe():
  chemin, distance = dijkstra({
    1: [(3, 1)],
    2: [(10, 3), (9, 1)],
    3: [(1, 1), (4, 1), (5, 2)],
    4: [(3, 1), (6, 1)],
    5: [(3, 2), (8, 1), (9, 6)],
    6: [(4, 1), (7, 1)],
    7: [(6, 1), (8, 1)],
    8: [(7, 1), (10, 4), (5, 1)],
    9: [(5, 6), (11, 2), (2, 1)],
    10: [(8, 4), (2, 3)],
    11: [(9, 2)]
  }, 1, 2)

  assert chemin == [1, 3, 5, 9, 2]
  assert distance == {
    1: 0,
    2: 10,
    3: 1,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 9,
    10: 8,
    11: 11
  }
