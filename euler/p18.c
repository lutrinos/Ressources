#include <stdio.h>
#include <stdlib.h>

int max(int a, int b) {
  return a > b ? a : b;
}

int* read_line(char* line, int len) {
  int* data = malloc(len * sizeof(int));

  int offset = 0;
  for (int i = 0; i < len; i++) {
    sscanf(line, "%d%n", &data[i], &offset);
    line += offset;
  }

  return data;
}

int** read_file(int n) {
  FILE* file = fopen("p18.txt", "r");
  int** data = malloc(n * sizeof(int*));
  
  ssize_t len = 0;
  char* line = NULL;

  for (int i = 0; i < n; i++) {
    getline(&line, &len, file);
    data[i] = read_line(line, i + 1);
  }

  return data;
}

int recursive(int** data, int x, int y, int len) {
  if (x < 0 || x > y || y >= len) return 0;

  return data[y][x] + max(recursive(data, x, y + 1, len), recursive(data, x + 1, y + 1, len));
}

int main() {
  int** data = read_file(15);

  printf("Route maximale %d\n", recursive(data, 0, 0, 15));
}
