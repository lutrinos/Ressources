#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

struct Name {
  int* arr;
  int len;
  int score;
};

typedef struct Name name;

name* compute_name(char* str, int len) {
  name* n = malloc(sizeof(name));
  n->arr = malloc(len * sizeof(int));
  n->len = len;
  n->score = 0;

  for (int i = 0; i < len; i++) {
    n->arr[i] = 1 + str[i] - 'A';
    n->score += n->arr[i];
  }

  return n;
}

name** read_file(int n) {
  FILE* file = fopen("p22.txt", "r");
  name** names = calloc(n, sizeof(name*));

  char* line = NULL;
  size_t length = 0;

  getline(&line, &length, file);

  int i = 0;
  char* match;

  while ((match = strtok(i == 0 ? line : NULL, ",")) != NULL) {
    match++;
    int len = strlen(match);

    // On supprime les guillemets
    while (match[len - 1] == '"' || match[len - 1] == '\n') {
      match[len - 1] = 0;
      len--;
    }
   
    // printf("#%d %s\n", i, match);
    names[i] = compute_name(match, len);
    i++;
  }

  for (int j = i; j < n; j++) names[j] = NULL;//compute_name();

  return names;
}

int compare(const void* a, const void* b) {
  name* name_a = *(name**)a;
  name* name_b = *(name**)b;

  if (name_a == NULL && name_b == NULL) return 0;
  if (name_a == NULL) return 1;
  if (name_b == NULL) return -1;

  for (int i = 0; i < name_a->len && i < name_b->len; i++) {
    if (name_a->arr[i] != name_b->arr[i]) {
      return name_a->arr[i] - name_b->arr[i];
    }
  }

  return name_a->len - name_b->len;
}

int main() {
  int n = 10000;
  name** names = read_file(n);

  qsort(names, n, sizeof(name*), compare);
  
  uint64_t somme = 0;

  for (int i = 0; names[i] != NULL; i++) {
    somme += names[i]->score * (i  + 1);
  }

  printf("Somme : %lu\n", somme);
}
