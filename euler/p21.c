#include <stdio.h>
#include <stdlib.h>

int main() {
  int n = 10000;
  int offset = 30;
  int* cache = calloc(n * offset, sizeof(int));
  int* amicable = calloc(n, sizeof(int));

  // On construit le cache du nombre de diviseur de chaque nombre
  for (int i = 1; i < n; i++) {
    for (int j = 2; j * i < n * offset; j++) {
      cache[j * i] += i;
    }
  }

  printf("%d\n", cache[1]);

  // On repère tous les nombres amicaux
  for (int a = 2; a < n; a++) {
    int b = cache[a];

    if (b > n * offset) {
      printf("Impossible de vérifier si %d amical car d(%d) = %d\n", a, a, b);
    }

    if (cache[b] == a && a != b) {
      amicable[a] = 1;
    }
  }

  int somme = 0;
  for (int i = 0; i < n; i++) somme += amicable[i] * i;
  printf("Somme : %d\n", somme);
}
