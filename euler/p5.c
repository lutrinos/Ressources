#include <stdio.h>

int main() {
  for (int n = 2520;; n+=10) {
    for (int i = 2; i <= 20; i++) {
      
      if (n % i != 0) {
        break;
      }

      if (i == 20) {
        printf("%d\n", n);
        return 0;
      }
    }
  }
}
