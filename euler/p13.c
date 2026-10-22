#include <stdio.h>
#include <stdlib.h>

void affiche(int* n, int len) {
  for (int i = 0; i < len; i++) {
    printf("%d", n[len - 1 - i]);
  }
  printf("\n");

}

int* read_line(char* line) {
  int* digits = malloc(50 * sizeof(int));

  // On écrit les nombres à partir de la fin
  for (int i = 0; i < 50; i++) {
    digits[49 - i] = line[i] - '0';
  }

  return digits;
}

int** read_file() {
  FILE* file = fopen("p13.txt", "r");
  int** lines = malloc(100 * sizeof(int*));

  char* line = NULL;
  size_t len = 0;

  for (int i = 0; i < 100; i++) {
    getline(&line, &len, file);
    lines[i] = read_line(line);
  }

  return lines;
}

// Additionne b à a
// Retour en primaire !
void add(int* a, int* b, int len) {
  int retenue = 0;

  for (int i = 0; i < len; i++) {
    int unite = (a[i] + b[i] + retenue) % 10;
    int dizaine = (a[i] + b[i] + retenue - unite) / 10;

    a[i] = unite;
    retenue = dizaine;
  }

  int i = len;
  while (retenue != 0) {
    int unite = (a[i] + retenue) % 10;
    int dizaine = (a[i] + retenue - unite) / 10;

    a[i] = unite;
    retenue = dizaine;

    i++;
  }
}

int main() {
  int** digits = read_file();
  int* somme = calloc(54, sizeof(int));

  for (int i = 0; i < 100; i++) {
    add(somme, digits[i], 50);
  }

  affiche(somme, 54);
}
