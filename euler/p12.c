#include <stdio.h>
#include <stdint.h>

typedef uint64_t nb;

int factors(nb a) {
  int n = 0;
  int i = 1;
  while (i * i < a) {
    if (a % i == 0) n += 2;
    i++;
  }

  if (i * i == a) n++;
  
  return n;
}

int main() {
  nb n = 0;
  nb i = 1;

  while (factors(n) <= 500) {
    n += i;
    i += 1;
  }

  printf("Nombre: %lu\n", n);
}
