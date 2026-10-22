
from option.bezout import *


def test_bezout():
  u, v = bezout(150, 145)
  assert u * 150 + v * 145 == 5

def test_bezout_premier():
  u, v = bezout(17, 3)
  assert 17 * u + v * 3 == 1

def test_bezout_non_premier():
  u, v = bezout(150, 25)
  assert u * 150 + v * 25 == 25

def test_bezout_negatif():
  u, v = bezout(-150, 25)
  assert u * -150 + v * 25 == 25

def test_bezout_negatif2():
  u, v = bezout(150, -25)
  assert u * 150 + v * -25 == 25

def test_bezout_negatif3():
  u, v = bezout(-150, -25)
  assert u * -150 + v * -25 == 25