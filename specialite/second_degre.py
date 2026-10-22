from math import sqrt

def resoudre(a, b, c):
  delta = pow(b, 2) - 4 * a * c

  # Si delta < 0, il y a 2 racines complexes, mais aucune réelle
  if delta < 0:
    return None
  elif delta == 0:
    return - b / (2 * a)
  else:
    return (
      (- b - sqrt(delta)) / (2 * a),
      (- b + sqrt(delta)) / (2 * a)
    )