#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int max(int a, int b) {
  return a > b ? a : b;
}

int* read_line(char* line) {
  int* data = malloc(20 * sizeof(int));

  int i = 0;
  int offset = 0;
  int value = 0;

  while(i < 20 && sscanf(line, "%d%n", &data[i], &offset)) {
    line += offset;
    i++;
  }

  return data;
}

int** read_data() {
  FILE* file = fopen("p11.txt", "r");
  int** data = malloc(20 * sizeof(int*));

  char* line = NULL;
  size_t len = 0;

  for (int i = 0; i < 20; i++) {
    getline(&line, &len, file);
    data[i] = read_line(line);
  }

  return data;
}

int main() {
  int** grid = read_data();
  int m = 0;

  for (int y = 0; y < 16; y++) {
    for (int x = 0; x < 16; x++) {
      int a = 1;
      int b = 1;
      int c = 1;
      int d = 1;

      for (int k = 0; k < 4; k++) {
        a *= grid[x][y + k];
        b *= grid[x + k][y];
        c *= grid[x + k][y + k];
        d *= grid[x + k][y + 4 - k];
      }

      m = max(m, max(a, max(b, max(c, d))));
    }
  }

  printf("Maximum %lu\n", m);
}
