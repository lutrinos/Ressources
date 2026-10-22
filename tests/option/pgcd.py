from option.pgcd import *

def test_pgcd_nombre_premier():
  assert pgcd(1015, 716) == 1

def test_pgcd_multiple():
  assert pgcd(20, 5) == 5

def test_pgcd_pair():
  assert pgcd(30, 32) == 2