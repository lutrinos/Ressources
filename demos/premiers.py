
# Un algorithme pour trouver tous les nombres premiers de 0 à n, uniquement avec des additions
# Inspiré par le crible d'Ératosthène
# Est efficace jusqu'à n = 10.000.000 environ
def premiers(n):
  possible = [True for i in range(n)]

  # Ni 0 ni 1 sont des nombres premiers
  possible[0] = False
  possible[1] = False

  a = 0

  valeurs = []

  for i in range(2, n):
    somme = i + i

    if possible[i] == False:
      continue
    
    valeurs.append(i)
    
    while somme < n:
        possible[somme] = False
        somme += i

        a += 1
  
  print(a, 'itérations')

  return valeurs

def valider(n):
  for i in range(2, n):
    if n % i == 0:
      return False
  return True

nombres = premiers(1_000_000)
print(', '.join(str(i) for i in nombres))
print(len(nombres), 'nombres premiers trouvés.')