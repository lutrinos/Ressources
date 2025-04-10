#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>

typedef uint64_t somme;
typedef uint32_t nb;

int main() {
  somme s = 0;
  nb* nombres = calloc(2000001, sizeof(nb));

  // On pourrait s'arrranger pour faire i += 2
  for (nb i = 2; i < 2000000; i++) {
    if (nombres[i] == 0) {
      s += i;
      for (int j = 1; j <= 2000000 / i; j++) {
        nombres[j * i] = 1;
      }
    }
  }

  printf("Somme: %lu\n", s);
}
