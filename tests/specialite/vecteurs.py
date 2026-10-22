from specialite.vecteurs import *

def test_coordonnees():
  assert Vecteur(1, 2, 3)() == (1, 2, 3)

def test_somme():
  vec = Vecteur(1, 1, 1)
  somme = vec + vec

  assert vec() == (1, 1, 1) and somme() == (2, 2, 2)

def test_soustraction():
  vec = Vecteur(2, 2, 2)
  somme = vec - Vecteur(1, 1, 1)

  assert vec() == (2, 2, 2) and somme() == (1, 1, 1)

def test_len():
  vec = Vecteur(2, 4, 4)

  assert vec.norme() == 6

def test_produit():
  vec = Vecteur(1, 1, 1) * 2

  assert vec() == (2, 2, 2)
  
def test_produit_scalaire():
  assert Vecteur(1, 1, 1) * Vecteur(1, 1, 1) == 3

def test_produit_vectoriel():
  produit = Vecteur(1, 0, 0) ** Vecteur(0, 0, 1)
  
  assert produit() == (0, 1, 0) or produit() == (0, -1, 0)
  
def test_division():
  vec = Vecteur(2, 2, 2) / 2

  assert vec() == (1, 1, 1)