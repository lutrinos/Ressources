
# Implémentation de l'algorithme d'euclide
def pgcd(a, b):
  a, b = (a, b) if a > b else (b, a)

  if a % b == 0:
    return b

  return pgcd(b, a % b)

print(pgcd(1015, 716))
print(pgcd(20, 5))