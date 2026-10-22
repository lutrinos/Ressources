
from specialite.suites import *

geo = Suite(GEOMETRIQUE, premier_terme=10, raison=2)
ari = Suite(ARITHMETIQUE, premier_terme=10, raison=2)

def test_suite_geometrique_terme():
  assert geo.terme(10) == 10240

def test_suite_geometrique_somme():
  assert geo.somme(10) == 20470

def test_suite_arithmetique_terme():
  assert ari.terme(10) == 30

def test_suite_arithmetique_somme():
  assert ari.somme(10) == 220