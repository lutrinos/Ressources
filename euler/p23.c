#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint64_t nb;
typedef uint8_t b;

int main() {
  nb somme = 0;
  nb n = 28124;

  // On calcule la somme des diviseurs de chaque nombre en O(n + des poussières)
  // Ainsi que les nombres abondants pour le même prix
  nb* divisors = calloc(n, sizeof(nb));
  b* abundant = calloc(n, sizeof(b));

  for (nb i = 1; i < n; i++) {
    if (divisors[i] > i) abundant[i] = 1;
    for (nb j = 2; i * j < n ; j++) {
      divisors[i * j] += i;
    }
  }

  // On calcule les nombres se décomposant comme deux nombres abondants
  // Ce qui donne une complexité de O(n^2)
  for (nb i = 1; i < n; i++) {
    somme += i;
    
    for (nb j = 12; j < i; j++) {
      if (abundant[j] == 1 && abundant[i - j] == 1) {
        somme -= i;
        break;
      }
    }
  }

  printf("Somme : %lu\n", somme);
}
