#include <stdio.h>
#include <stdint.h>
#include<stdbool.h>
#include <math.h>

typedef uint64_t nb;

nb largest(nb n, bool stop) {
    for (int i = floor(sqrt(n)); i >= 1; i--) {
        if (n % i == 0) {
            if (stop) {
                return i;
            }
            if (largest(i, true) == 1) {
                return i;
            }
        }
    }
    return 1;
}

int main() {
    nb n = 600851475143;
    
    printf("Diviseur %lu\n", largest(n, false));
}