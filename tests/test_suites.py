
"""
import specialite

geo = Suite(GEOMETRIQUE, premier_terme=10, raison=2)
print(geo.terme(2))
print(geo.somme(2))

print("- - - - -")

ari = Suite(ARITHMETIQUE, premier_terme=10, raison=2)
print(ari.terme(2))
print(ari.somme(2))
"""

#import sys
#sys.dont_write_bytecode = True

from specialite import suites

def test_one():
  s = suites.Suite(suites.ARITHMETIQUE, raison=2, premier_terme=10)
  print(s.terme(10))
  print("hello world!")
  #print(os.environ["PYTHONDONTWRITEBYTECODE"])
  #print(os.environ["PYTHONPYCACHEPREFIX"])
  assert 1 == 1