#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint64_t nb;

int main() {
  nb maximum = 0;
  nb maximum_seed = 1;


  for (nb i = 2; i < 1000000; i++) {
    nb n = i;
    nb count = 0;

    while (n != 1) {
      if (n % 2 == 0) n /= 2;
      else n = 3 * n + 1;
      count++;
    }

    if (count > maximum) {
      maximum = count;
      maximum_seed = i;
    }
  }

  printf("Le maximum est pour %lu avec %lu itérations.\n", maximum_seed, maximum);
}
