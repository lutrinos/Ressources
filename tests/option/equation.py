
from option.equation import *

def test_resolution_deux_inconnues():
  (x, y) = resoudre(
    (2, 4, 6),
    (8, 10, 12)
  )
  assert x == -1
  assert y == 2

def test_resolution_trois_inconnues():
  (x, y, z) = resoudre_3(
    (2, -1, 3, 1),
    (3, 2, -2, -4),
    (-1, -4, 6, 22)
  )
  
  assert x == 10
  assert y == -35
  assert z == -18