
from outils.statistiques import *


def test_arithmetique():
  assert moyenne([0, 5, 10]) == 5
  assert moyenne([18, 19, 17, 18]) == 18
  assert moyenne([3, 6, 21]) == 10

def test_arithmetique_ponderee():
  assert moyenne([
    (0, 10),
    (5, 10),
    (10, 10)
  ]) == 5
  assert moyenne([
    0,
    (5, 2),
    (10, 2)
  ]) == 6
  assert moyenne([
    0,
    (100, 9)
  ]) == 90

def test_geometrique():
  assert moyenne([10, 0], categorie=GEOMETRIQUE) == 0
  assert round(moyenne([10_000, 100_000], categorie=GEOMETRIQUE) * 10) / 10 == 31622.8

def test_geometrique_ponderee():
  assert round(moyenne([100, (100, 9)], categorie=GEOMETRIQUE)) == 100
  assert moyenne([(5, 1), (12, 2)], categorie=GEOMETRIQUE) == 8.962809493114328

def test_harmonique():
  assert moyenne([2, 2, 4, 4, 4, 4], categorie=HARMONIQUE) == 3
  assert moyenne([10, 10, 10, 1, 1, 1], categorie=HARMONIQUE) == 1.8181818181818183

def test_harmonique_ponderee():
  assert moyenne([(10, 10), (10, 10), (10, 10), 1, 1, 1], categorie=HARMONIQUE) == 5.5