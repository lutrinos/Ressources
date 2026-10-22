#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint64_t nb;

int pos(int x, int y) {
  return x + y * 30;
}

nb recursive(nb* cache, int x, int y) {
  if (cache[pos(x, y)] != 0) {
    return cache[pos(x, y)];
  }

  nb value = 0;

  if (x < 20) {
    value += recursive(cache, x + 1, y);
  }

  if (y < 20) {
    value += recursive(cache, x, y + 1);
  }

  cache[pos(x, y)] = value;
  return value;
}

int main() {
  nb* cache = calloc(41 * 41, sizeof(nb));
  cache[pos(20, 20)] = 1;

  printf("Nombre de chemins %lu\n", recursive(cache, 0, 0));
}
