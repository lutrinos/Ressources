
from algorithms.levenshtein import *

def test_distance():
  assert distance("love", "movie") == 2

def test_distance2():
  assert distance("saturday", "sunday") == 3

def test_distance3():
  assert distance("moi", "toi") == 1

def test_distance4():
  assert distance("toi", "toit") == 1

def test_distance5():
  assert distance("crumble", "cake") == 5

def test_distance6():
  assert distance("pizza", "mozza") == 2