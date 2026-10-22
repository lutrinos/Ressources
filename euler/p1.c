#include <stdio.h>

// Solution très naïve certes - mais qui fonctionne
int main() {
    int n = 1000;
    int sum = 0;

    for (int i = 1; i < 1000; i++) {
        if (i % 5 == 0 || i % 3 == 0) {
            sum += i;
        }
    }

    printf("%d\n", sum);
}