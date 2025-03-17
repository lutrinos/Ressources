#include <stdint.h>
#include <stdio.h>

typedef uint64_t nb;

nb modulo(nb n) {
    return n % 741321;
}

void check(char* name, nb expected, nb value) {
    if (expected == value) {
        printf("- [x] : %s\n", name);
    } else {
        printf("- [ ] : %s\n        Valeur : %ld\n", name, value);
    }
}