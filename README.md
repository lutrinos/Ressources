# Ressources

Quelques ressources personnelles.

## Commandes

- Cloner le dépôt de code

```console
git clone https://github.com/ntillier/Ressources
```

- Installer les dépendences (pytest)

```console
pip install -r requirements.txt
```

- Exécuter les tests

```console
pytest
```

- Nettoyer le répertoire (les dossiers `__pycache__`, c'est purement esthétique et personnel !)

```console
py clean.py
```

## Liste des catégories

- **Option: Option Mathématiques expertes**
  - [Résolveur d'équations](/option/equation.py)
  - [PGCD](/option/pgcd.py)
  - [Trouver les coefficients de Bezout de deux nombres](/option/bezout.py)
- **Spécialité: Mathématiques spécialité**
  - [Suites arithmétiques et géométriques](/specialite/suites.py)
  - [Résolveur d'équations du second degré](/specialite/second_degre.py)
  - [Calculs de vecteurs](/specialite/vecteurs.py)
- **Algorithmes: des implémentations d'algorithmes, toujours en python**
  - [Recherche du plus court chemin - Dijkstra](/algorithms/dijkstra.py)
  - [Distance de d'édition entre deux mots - Levenshtein](/algorithms/levenshtein.py)
  - [Recherche d'un arbre couvrant minimum - Kruskal](/algorithms/kruskal.py)
- **Outils: Ressources diverses et variées**
  - [Parseur d'expressions mathématiques (à améliorer)](/outils/parseur.py)
  - [Fonctions liées aux statistiques](/outils/statistiques.py)
- **Démos: le reste !**
  - [Calcul de racine carrée (approximation)](/demos/racine.py)
  - [Calcule du sinus d'un angle](/demos/sinus.py)
  - [Algorithme pour trouver les nombres premiers de 0 à n](/demos/premiers.py)
  - [Suite de Syracuse](/demos/syracuse.py)
  - [Calcul de pi](/demos/pi.py)
  - [Structure Union-find](/demos/union_find.py)
  - [Traducteur de code Morse](/demos/morse.py)
  - [Surcharge d'opérateurs en python](/demos/operators.py)
  - [Dépassement d'entier](/demos/overflow.c)

## Project Euler

Quelques solutions au Project Euler réalisées par-ci par-là. Elles ne sont pas nécessairement optimisées le plus possible, mais renvoient le résultat en un temps raisonnable, avec des explications associées éventuellement.

Si vous n'avez pas la solution d'un problème, il ne sert à rien de juste regarder le code et l'exécuter,... car on n'apprend jamais mieux qu'en trouvant une solution par soi-même, ce qui est au passage beaucoup gratifiant.

Conformément aux [règles du Project Euler](https://projecteuler.net/about#publish), les extraits de code ne seront partagés que pour les 100 premiers problèmes.

[>> Index des programmes](./euler/INDEX.md)

## TODO

Quelques idées, qui peuvent être intéressantes à réaliser si jamais le manque d'inspiration se faisait ressentir.

[>> To-do List](./TODO.md)
