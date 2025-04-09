#include <stdio.h>

int main() {

  // On prend de la marge sur les itérations puis on croise les doigts
  for (int a = 1; a <= 1000; a++) {
    for (int b = 1; b <= 1000; b++) {
      int c = 1000 - a - b;

      if (a*a + b*b == c*c) {
        printf("%d^2 + %d^2 = %d^2 - %d\n", a, b, c, a*b*c);
        return 0;
      }
    }
  }
}
