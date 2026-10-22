from math import sqrt

class Vecteur:

  def __init__(self, x, y, z):
    self.x = x
    self.y = y
    self.z = z
  
  # Calcule la norme du vecteur
  def norme(self):
    return sqrt(pow(self.x, 2) + pow(self.y, 2) + pow(self.z, 2))

  # Vérifie qu'une variable est une instance d'un vecteur  
  def __check(self, v):
    return isinstance(v, Vecteur)
  
  # Retourne les coordonnées du vecteur
  def __call__(self):
    return (self.x, self.y, self.z)

  # Somme de vecteurs
  def __add__(self, vec):
    if self.__check(vec):
      return Vecteur(self.x + vec.x, self.y + vec.y, self.z + vec.z)
  
  def __sub__(self, vec):
    if self.__check(vec):
      return Vecteur(self.x - vec.x, self.y - vec.y, self.z - vec.z)
  
  # Produit scalaire, ou le produit d'un vecteur et d'un nombre
  def __mul__(self, vec):
    if self.__check(vec):
      return self.x * vec.x + self.y * vec.y + self.z * vec.z
    elif type(vec) is int or type(vec) is float:
      return Vecteur(self.x * vec, self.y * vec, self.z * vec)
  
  def __truediv__(self, vec):
    if type(vec) is int:
      return self.__mul__(1 / vec)
  
  # Produit vectoriel
  def __pow__(self, vec):
    if self.__check(vec):
      return Vecteur(
        self.y * vec.y - self.z * vec.y,
        self.z * vec.x - self.x * vec.z,
        self.x * vec.y - self.y * vec.x
      )
  
  # "Inversion" du vecteur (changement de sens)
  def __invert__(self):
    return Vecteur(- self.x, - self.y, - self.z)
  