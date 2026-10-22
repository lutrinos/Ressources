// On importe la librairie permettant d'afficher du texte via la fonction printf
#include <stdio.h>

// La fonction main est la fonction principale, exécutée directement par le programme
// Elle renvoie usuellement un entier (0 si tout se passe bien) mais il  n'est pas obligatoire de rajouter explicitement "return 0;"
int main() {

  // On crée une variable n avec pour valeur la borne supérieure de l'énoncé (ici 1000)
  int n = 1000;

  // La variable sum permettra de garder en mémoire la somme des entiers multiples de 3 ou 5
  int sum = 0;

  // On parcourt tous les entiers de 1 à n, en le rajoutant à la somme si ce sont des multiples de 3 ou 5
  // Pour le savoir, on utilise le modulo (symbole %) qui permet de calculer le reste de la division euclidienne de a par b (avec a % b)
  for (int i = 1; i < n; i++) {
    if (i % 5 == 0 || i % 3 == 0) {
      sum += i;
    }
  }

  // On affiche le résultat enfin
  // On utilise "%d"  pour indiquer qu'on affiche un entier (ici sum)
  // Puis le symbole "\n" pour faire un retour à la ligne ensuite
  printf("%d\n", sum);
}
