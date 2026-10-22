from math import sqrt

ARITMETIQUE = 1
GEOMETRIQUE = 2
HARMONIQUE = 3

# Moyenne pondérée
def moyenne(valeurs, categorie = ARITMETIQUE):
  resultat = None
  diviseur = None

  somme_fn = None

  if categorie == ARITMETIQUE:
    resultat = 0
    diviseur = 0
    somme_fn = lambda prec, val, coeff: prec + val * coeff
  elif categorie == GEOMETRIQUE:
    resultat = 1
    diviseur = 0
    somme_fn = lambda prec, val, coeff: prec * pow(val, coeff)
  elif categorie == HARMONIQUE:
    resultat = 0
    diviseur = 0
    somme_fn = lambda prec, val, coeff: prec + coeff / val

  if resultat is None or diviseur is None or somme_fn is None:
    return None

  for valeur in valeurs:
    if type(valeur) is tuple:
      val, coeff = valeur
      diviseur += coeff
      resultat = somme_fn(resultat, val, coeff)
    elif type(valeur) is int or float:
      diviseur += 1
      resultat = somme_fn(resultat, valeur, 1)

  if categorie == ARITMETIQUE:
    return resultat / diviseur
  elif categorie == GEOMETRIQUE:
    return resultat ** (1. / diviseur)
  elif categorie == HARMONIQUE:
    return diviseur / resultat