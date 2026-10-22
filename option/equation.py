# Un solveur permettant de résoudre des systèmes linéaires (matrices)

# Systèmes à deux inconnues
def resoudre(eq1, eq2):
  (a, b, e) = eq1
  (c, d, f) = eq2

  # On calcule le déterminant
  det = a*d - b*c

  # La matrice n'est pas inversible si det = 0
  if det == 0:
    return None

  inv_det = 1 / det
  
  # On inverse les valeurs, et donc la matrice de facto
  a, b, c, d = d * inv_det, - b * inv_det, - c * inv_det, a * inv_det

  # On fait le produit matriciel
  x = a*e + b*f
  y = c*e + d*f

  return (x, y)


# Système à trois inconnues (https://fr.wikipedia.org/wiki/Matrice_inversible#Inversion)
def resoudre_3(eq1, eq2, eq3):
  (a, b, c, j) = eq1
  (d, e, f, k) = eq2
  (g, h, i, l) = eq3

  # On calcule le déterminant
  det = a*e*i + b*f*g + c*d*h - c*e*g - f*h*a - i*b*d

  # La matrice n'est pas inversible si det = 0
  if det == 0:
    return None

  inv_det = 1 / det
  
  # On inverse les valeurs
  a, b, c, d, e, f, g, h, i = e*i - f*h, f*g - d*i, d*h - e*g, c*h - b*i, a*i - c*g, b*g - a*h, b*f - c*e, c*d - a*f, a*e - b*d
  a, b, c, d, e, f, g, h, i = [inv_det * v for v in (a, b, c, d, e, f, g, h, i)]

  # On fait le produit matriciel
  x = a*j + c*k + c*l
  y = d*j + e*k + f*l
  z = g*j + h*k + i*l

  return (x, y, z)

print(
  resoudre(
    (2, -3, 1),
    (5, 7, -3)
  )
)

print(
  resoudre_3(
    (2, 1, 1, 7),
    (1, -1, 1, 2),
    (1, 1, -1, 0)
  )
)