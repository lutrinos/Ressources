
from specialite.second_degre import *

def test_aucune_racine_reelle():
  assert resoudre(1, 1, 1) == None

def test_une_racine_reelle():
  assert resoudre(1, - 2, 1) == 1

def test_deux_racines_reelles():
  r1, r2 = resoudre(3, 18, 15)
  s1 = - 1
  s2 = - 5

  assert (r1 == s1 and r2 == s2) or (r1 == s2 and r2 == s1)