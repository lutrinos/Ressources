#include <stdio.h>
#include <stdbool.h>

int digit(int n, int i) {
    if (i == 0) {
        return n % 10;
    }
    return digit((n - n %  10) / 10, i - 1);
}

bool est_palindrome(int n) {
    return digit(n, 0) == digit(n, 5) && digit(n, 1) == digit(n, 4) && digit(n, 2) == digit(n, 3);
}

int main() {
    int n = 999;
    int max = 0;

    // Il y aura des duplicatas, mais compte tenu de la complexité ça va
    for  (int i = n; i >= 1; i--) {
        for (int j = n; j >= i; j--) {
            if (est_palindrome(i * j)) {
                if (i * j >= max) {
                    printf("%d\n", i * j);
                    max = i * j;
                }
            }
        }
    }

    printf("%d\n", max);
}
