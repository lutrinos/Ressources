#include <stdio.h>
#include <stdlib.h>

void swap(int* arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Recherche binaire du plus petit entier plus grand que n dans un tableau trié par ordre croissant
int binary(int* arr, int a, int b, int n) {
    int m = (a + b) / 2;

    if (arr[m] == n + 1 || a == b) {
        return m;
    } else if (arr[m] > n) {
        return binary(arr, a, m, n);
    }  else {
        return binary(arr, m + 1, b, n);
    }
}

/**
 * Si on a le nombre a_0 a_1 ... a_n, on peut le parcourir à partir de la droite
 * Tant que a_(i-1) > a_i on ne peut pas directement augmenter le nombre
 * Mais si a_(i-1) < a_i, il suffit d'inverser a_(i-1) avec le minimum déjà parcouru plus grand que a_(i-1) pour augmenter le nombre le moins possible
 * Ensuite nous devons minimiser au maximum la séquence finale a_i ... a_n, ce qui revient à l'inverser en plaçant a_n (l'ancien a_(i-1)) au bon endroit pour qu'elle soit dans l'ordre croissant
 * 
 * Note : on ne se soucie pas des nombres devant car on souhaite garder l'ordre lexicographique, qui est plus influencé par les premiers nombres. Intuitivement, on commence par regarder la fin d'un nombre pour l'augmenter ou le diminuer, ici c'est pareil.
 */
void update(int* arr, int len) {
    for (int i = len - 1; i > 0; i--) {
        if (arr[i - 1] < arr[i]) {

            // On re-ordonne le suffixe
            for (int j = 0; j < (len - i) / 2; j++) {
                swap(arr, i + j, len - 1 - j);
            }

            // On échange les éléments du tableau, qui est à présent dans l'ordre croissant (et le restera)
            swap(arr, i-1, binary(arr, i, len - 1, arr[i-1]));
            break;
        }
    }
}

int main() {
    int n;
    int* array = malloc(10 * sizeof(int));

    // 999999 pour avoir le 1000000ème nombre
    printf("Nombre d'itérations : ");
    scanf("%d", &n);

    for (int i = 0; i < 10; i++) {
        array[i] = i;
    }

    for (int i = 0; i < n; i++) {
        update(array, 10);
    }

    for (int i = 0; i < 10; i++) {
        printf("%d", array[i]);
    }
    printf("\n");
}
