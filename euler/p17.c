#include <stdio.h>
#include <stdint.h>

uint64_t chars(int n) {
  // zero one two three four five six seven eight nine
  int unites[10] = {0, 3, 3, 5, 4, 4, 3, 5, 5, 4};

  // zero ten twenty thirty fourty fifty sixty seventy eighty ninety
  int dizaines[10] = {0, 3, 6, 6, 6, 5, 5, 7, 6, 6};

  // ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen
  int sadique[10] = {3, 6, 6, 8, 8, 7, 7, 9, 8, 8};

  uint64_t count = 0;
  
  int unite = n % 10;
  int dizaine = ((n - unite) / 10) % 10;
  int centaine = ((n - dizaine * 10 - unite) / 100) % 100;

  if (centaine != 0) {
    // "hundred"
    count += unites[centaine] + 7;

    // "and"
    if (dizaine != 0 || unite != 0) {
      count += 3;
    }
  }

  if (dizaine == 1) {
    count += sadique[dizaine];
  } else {
    count += dizaines[dizaine] + unites[unite];
  }
  
  return count;
}

int main() {
  uint64_t count = 0;

  for (int i = 1; i < 1000; i++) {
    count += chars(i);
  }

  // one thousand
  count += 11;

  printf("Compte: %lu\n", count);
}
