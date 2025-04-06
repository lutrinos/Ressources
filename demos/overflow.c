#include <stdint.h>
#include <stdio.h>

typedef uint16_t nb;

int main() {
  nb i = 1;
  nb a = 0;
  nb diviseur = 100;

  while (i > 0) {
    if (i % diviseur == 0) {
      printf(" - %d\n", i / diviseur);
    }
    a = i;
    i++;
  }

  printf("Nombre final %d\n", a);
}
