
"""
import specialite



print("- - - - -")

ari = Suite(ARITHMETIQUE, premier_terme=10, raison=2)
print(ari.terme(2))
print(ari.somme(2))
"""

#import sys
#sys.dont_write_bytecode = True

from specialite.suites import *

geo = Suite(GEOMETRIQUE, premier_terme=10, raison=2)
ari = Suite(ARITHMETIQUE, premier_terme=10, raison=2)

def test_suite_geometrique_terme():
  assert geo.terme(10) == 10240

def suite_geometrique_somme():
  assert geo.somme(10) == 20470