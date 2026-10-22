from math import sqrt, floor

primes = [2]
s = 2

# Test à propos d'une approcher différente
for i in range(3, 2000000):

    if i % 100000 == 0:
        print(" -", i)

    mid = floor(sqrt(i))
    for p in primes:
        if i % p == 0:
            break
        if p == primes[-1] or p > mid:
            s += i
            primes.append(i)
            break

print(s)
