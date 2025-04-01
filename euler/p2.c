#include <stdio.h>

int main() {
    int somme = 0;

    int a = 1;
    int b = 2;

    while (b <= 4000000) {
        if (b % 2 == 0) {
            somme += b;
        }

        int temp = a;
        a = b;
        b += temp;

    }

    printf("Somme %d\n", somme);
}