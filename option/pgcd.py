
# Implémentation de l'algorithme d'euclide
def pgcd(a, b):
  a, b = (a, b) if a > b else (b, a)

  if a % b == 0:
    return b

  return pgcd(b, a % b)

