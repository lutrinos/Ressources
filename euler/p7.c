#include <stdio.h>
#include <stdlib.h>

int main() {
  int n = 10001;
  int* primes = (int*)malloc(n * sizeof(int));
  primes[0] = 2;
  int len = 1;

  int p = 3;
  while  (len < n) {
    for (int i = 0; i < len; i++) {
      if (p % primes[i] == 0) break;
      if (i == len - 1) {
        primes[len] = p;
        len++;
        break;
      }
    }
    p += 1;
  }

  printf("%d\n", primes[len - 1]);
  return 0;
}
