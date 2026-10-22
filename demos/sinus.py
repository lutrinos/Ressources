from math import sin, floor, ceil, radians, factorial

# Approximation du sinus avec l'approximation de Bhāskara (angle en degré)
# https://en.wikipedia.org/wiki/Bh%C4%81skara_I%27s_sine_approximation_formula
def bhaskara(angle):
  return (4 * angle * (180 - angle)) / (40500 - angle * (180 - angle))

# Approximation du sinus (angle en radian)
# Pour avoir une précision plus exacte, augmenter la variable `precision`
# https://math.stackexchange.com/questions/4378919/algorithm-behind-sin-function
def formula(angle):
  somme = 0
  precision = 5
  for n in range(0, precision):
    somme += pow(-1, n) * pow(angle, 2*n + 1) / factorial(2*n + 1)
  return somme

taille = 20
angles = [10, 20, 30, 40, 50, 60, 70, 80, 90]

# Fonction pour mettre en forme les résultat
def format(a, b, c):
  log = [a, b, c]

  for i, v in enumerate(log):
    v = v if type(v) is str else "%.4f" % v
    restant = (taille - len(v)) / 2
    log[i] = "%s%s%s" % (ceil(restant) * ' ', v, floor(restant) * ' ')
  
  print("{} | {} | {}".format(*log))


format('Natif', 'Bhaskara',  'Autre')

for a in angles:
  format(sin(radians(a)), bhaskara(a), formula(radians(a)))