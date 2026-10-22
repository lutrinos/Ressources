from math import sqrt, factorial

# Implémentation d'une approximation de pi
# Chaque itération apporte 8 décimales supplémentaires
# Source: https://fr.wikipedia.org/wiki/Srinivasa_Ramanujan#S%C3%A9ries_pour_%CF%80
def ramanujan(iterations = 1):
  somme = 0

  for n in range(0, iterations):
    somme += (factorial(4 * n) * (1103 + 26390*n)) / (pow(factorial(n), 4) * pow(396, 4 * n))

  return pow(somme, -1) * 9801 / (2 * sqrt(2))

# Implémentation de l'algorithme de Chudnovsky
# Chaque itération ajoute 14 décimales
# Source: https://en.wikipedia.org/wiki/Chudnovsky_algorithm#Algorithm
def chudnovsky(iterations = 1):
  somme = 0

  for n in range(0, iterations):
    somme += (pow(-1, n) * factorial(6 * n) * (13591409 + 545140134 * n)) / (factorial(3 * n) * pow(factorial(n), 3) * pow(640320, 3 * n + 3 / 2))

  return pow(12 * somme, -1)

print("Première approximation")
print(ramanujan())
print(chudnovsky())

print("\nSeconde approximation")
print(ramanujan(2))
print(chudnovsky(2))