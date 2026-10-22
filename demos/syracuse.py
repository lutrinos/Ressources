
def syracuse(n):
  liste = [n]

  while n != 1:
    if n % 2 == 0:
      n //= 2
    else:
      n = 3 * n + 1
    liste.append(n)

  return liste

tests = [13, 17, 73, 99, 100]

for t in tests:
  print(t, syracuse(t), end="\n\n")