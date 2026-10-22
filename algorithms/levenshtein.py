
# Implémentation naïve
# Inspirée de https://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_full_matrix
def distance(a, b):
  matrice = [
    [i] + [0] * len(a) for i in range(len(b) + 1)
  ]
  matrice[0] = [i for i in range(len(a) + 1)]

  for j in range(1, len(b) + 1):
    for i in range(1, len(a) + 1):
      matrice[j][i] = min(
        matrice[j - 1][i] + 1,
        matrice[j][i - 1] + 1,
        matrice[j - 1][i - 1] + (0 if a[i - 1] == b[j - 1] else 1)
      )
  
  return matrice[len(b)][len(a)]