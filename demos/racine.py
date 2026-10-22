
# Méthode de Héron
# https://fr.wikipedia.org/wiki/Extraction_de_racine_carr%C3%A9e#M%C3%A9thode_de_H%C3%A9ron
def racine(nombre, approximation=None, tours=5):
  if nombre <= 1:
    return None

  # Une approximation initiale assez bonne pour des nombres pas trop grands
  y = approximation if approximation is not None else round(nombre) >> len(str(nombre))
  n = 0
  precision = 0

  while n < tours:
    y = (y + nombre / y) / 2
    n += 1
  
  return y

print(racine(2))
print(racine(37))# 6.08276253
print(racine(900))# 30

print(racine(3987))#63.14269554
print(racine(3987, approximation=60))
print(racine(3987, tours=10))