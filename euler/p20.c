#include <stdio.h>
#include <stdlib.h>

int* multiply(int* a, int b, int len) {
  int retenue = 0;

  for (int i = 0; i < len; i++) {
    int unite = (a[i] * b + retenue) % 10;
    int reste = (a[i] * b +  retenue - unite) / 10;

    a[i] = unite;
    retenue = reste;
  }

  // En principe la retenue  vaut 0 maintenant
  return a;
}

int main() {
  int n = 100;

  // 1000 comme longueur en base 10 de 100! paraît raisonnable
  int* chiffre = calloc(1000, sizeof(int));
  chiffre[0] = 1;

  for (int i = 2; i <= n; i++) {
    multiply(chiffre, i, 1000);
  }

  int somme = 0;
  for (int i = 0; i < 1000; i++) somme += chiffre[i];
  printf("Somme : %d\n", somme);
}
