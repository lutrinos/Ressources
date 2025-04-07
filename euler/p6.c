#include <stdio.h>

int main() {
  int a = 0;
  int b = 0;

  for (int i = 0; i <= 100; i++) {
    a += i*i;
    b += i;
  }
  b *= b;

  printf("%d\n", b - a);
}
