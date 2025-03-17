#include <stdlib.h>
#include "utils.c"

/**
 * Project Euler 117
 * Compte les combinaisons de tuiles pour remplir un ligne de longueur n
 */
nb tiles_aux(nb* cache, nb n) {
    if (cache[n] != 0) {
        return cache[n];
    }

    nb v = 0;

    for (int i = 1; i <= 4; i++) {
        if (n >= i) {
            v = modulo(v + tiles_aux(cache, n - i));
        }
    }

    cache[n] = v;
    return v;
}

nb tiles(nb n) {
    nb* cache = calloc((n + 1), sizeof(nb));
    cache[0] = 1;
    return tiles_aux(cache, n);
}

int main() {

    // Project Euler 117
    check("Project Euler 5", 15, tiles(5));
    check("Project Euler 100", 614202, tiles(50));

    return 0;
}
