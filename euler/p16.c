#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// Peu importe la complexité ici, ça passe (on aurait pu faire de l'exponentiation rapide éventuellement)
void doublify(int* digits, int len) {
  int retenue = 0;

  for (int i = 0; i < len; i++) {
    int product = digits[i] * 2 + retenue;
    digits[i] = product % 10;
    retenue = (product - product % 10) / 10;
  }
}

int main() {
  int* digits = calloc(1000, sizeof(int));
  digits[0] = 1;

  for (int i = 0; i < 1000; i++) {
    doublify(digits, 1000);
  }

  uint64_t sum = 0;
  for (int i = 0; i < 1000; i++) sum += digits[i];
  printf("Somme : %lu\n", sum);
}
