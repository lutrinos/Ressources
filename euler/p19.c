#include <stdio.h>

int main() {
  int n_days[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

  int compte = 0;

  int day_of_the_week = 1;// modulo 7

  for (int year = 1901; year <= 2000; year++) {
    for (int month = 1; month <= 12; month++) {
      int nb_days = n_days[month - 1];

      if (year % 4 == 0 && month == 2) nb_days = 29;

      for (int day = 1; day <= nb_days; day++) {
        if (day == 1 && day_of_the_week == 6) compte++;
        day_of_the_week = (day_of_the_week + 1) % 7;
      }
    }
  }

  printf("Compte : %d\n", compte);
}
