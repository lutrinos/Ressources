
# Le théorème de Bachet-Bézout prouve l'existence de solutions à l'équation diophantienne linéaire : ax + by = pgcd(a, b)
# Source: https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_de_Bachet-B%C3%A9zout#Deux_th%C3%A9or%C3%A8mes

def bezout(a, b):

  # Petite technique si l'un des deux nombres est négatif...
  if a < 0 or b < 0:
    u, v = bezout(abs(a), abs(b))
    return (
      u * (1 if a > 0 else -1),
      v * (1 if b > 0 else -1)
    )

  a, b, renverse = (a, b, False) if a > b else (b, a, True)

  u = (1, 0)
  v = (0, 1)

  if a % b == 0:
    u = (0, 1)
    v = (0, 1 - a // b)

  while a % b != 0:
    reste = a % b
    diviseur = (a - reste) / b
    u1, u2 = u
    v1, v2 = v
    
    u = (u2, u1 - u2 * diviseur)
    v = (v2, v1 - v2 * diviseur)
    a, b = b, reste

  return (v[1], u[1]) if renverse else (u[1], v[1])

