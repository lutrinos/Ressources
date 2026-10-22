# Ressources

Quelques ressources personnelles. Sont inclus des programmes publiés sur la [khanacademy](https://www.khanacademy.org/profile/kaid_1091820158849429237197523/projects), des bouts de code implémentant certains algorithmes et quelques solutions au [projet Euler](https://projecteuler.net/).

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
- **Démos: des simulations, propositions d'implémentation...**
  - [Calcul de racine carrée (approximation)](/demos/racine.py)
  - [Calcule du sinus d'un angle](/demos/sinus.py)
  - [Algorithme pour trouver les nombres premiers de 0 à n](/demos/premiers.py)
  - [Suite de Syracuse](/demos/syracuse.py)
  - [Calcul de pi](/demos/pi.py)
  - [Structure Union-find](/demos/union_find.py)
  - [Traducteur de code Morse](/demos/morse.py)
  - [Surcharge d'opérateurs en python](/demos/operators.py)
  - [Dépassement d'entier](/demos/overflow.c)
  - [Rendu 3D de fonctions de R^3 dans R](./demos/3d_graphics.js) (la troisième dimension est la dépendance au temps) et [visualisation](https://www.khanacademy.org/computer-programming/3d-graphics-f-r3-r/5369745620975616)
  - [Interférences de deux sources cohérentes](/demos/interferences.js) et [visualisation](https://www.khanacademy.org/computer-programming/interfrences/6432342133030912)
  - [OPPH](./demos/opph.js)
  - [Onde 1D](./demos/onde_1d.js) et [visualisation](https://www.khanacademy.org/computer-programming/onde-1d/5778482964054016)
  - [Voitures autonomes apprenant à conduire](https://www.khanacademy.org/computer-programming/self-driving-cars/5424976789356544) avec des réseaux de neurones et un algorithme génétique, et [simulation](https://www.khanacademy.org/computer-programming/self-driving-cars/5424976789356544)
  - [Descente de gradient](./demos/descente_gradient.js) et [visualisation](https://www.khanacademy.org/computer-programming/descente-de-gradient/5011044381605888)
  - [Collisions élastiques](./demos/collision.js) et [visualisation](https://www.khanacademy.org/computer-programming/collisions-one-dimension/4873815556014080)
  - [Jolies fonctions mathématiques](./demos/math_art.js) et [visualisation](https://www.khanacademy.org/computer-programming/math-art/5199950501429248)
  - [Visualisation de l'algorithme A*](./demos/a_star.js) sur une grille et [visualisation](https://www.khanacademy.org/computer-programming/a/6346280991899648)
  - [Visualisation de l'algorithme de Dijkstra](./demos/dijsktra_europe.js) sur la carte de l'Europe et [lien](https://www.khanacademy.org/computer-programming/dijkstra-algorithm/5030266773094400)
  - [Visualisation de l'algorithme de Dijsktra](./demos/dijsktra_grille.js) sur une grille et [lien](https://www.khanacademy.org/computer-programming/dijkstra-grid/4852658400313344)
  - [Traducteur Latin-Morse](./demos/latin_morse.html) et [lien](https://www.khanacademy.org/computer-programming/morse-encoder/6188517804523520)
  - [Horloge](./demos/horloge.js) et [lien](https://www.khanacademy.org/computer-programming/clock/4559323251654656)
  - [Trigonométrie](./demos/trigo.js) et [lien](https://www.khanacademy.org/computer-programming/trigonomtrie/4627356361998336)
  - [Ray tracing](./demos/ray_tracing.js) sur une grille, et [lien](https://www.khanacademy.org/computer-programming/ray/6567971158343680)
  - [Lignes avec bruit de Perlin](./demos/perlin_lines.js) et [lien](https://www.khanacademy.org/computer-programming/perlin-lines/4532196550033408)
  - [Visualisation de l'algorithme d'Euclide](./demos/euclide.js) et [visualisation](https://www.khanacademy.org/computer-programming/euclide/5541978721927168)
  - [Lunette astronomique](./demos/lunette_astronomique.js) avec tracé des rayons la traversant, [lien](https://www.khanacademy.org/computer-programming/lunette-astronomique-avanc/6350980982685696)
  - [Visualisation des rayons réfléchis et réfractés sur une surface](./demos/snell_descartes.js) et [lien](https://www.khanacademy.org/computer-programming/snell-descartes/6272407137730560)
  - [Résolveur de sudoku](./demos/sudoku_solver_v1.js) première version, [lien](https://www.khanacademy.org/computer-programming/sudoku-solver/6298463441305600)
- **Jeux**
  - Knife Hit, [code](./jeux/knife_hit.js) et [version en ligne](https://www.khanacademy.org/computer-programming/knife-hit-final-version/5900784483287040)
  - Ten x Ten, [code](./jeux/ten_x_ten.js) et [version en ligne](https://www.khanacademy.org/computer-programming/game-ten-x-ten/5646441056944128)
  - Illusion d'optique, [code](./jeux/illusion_optique.js) et [lien](https://www.khanacademy.org/computer-programming/optical-illusion/6097738971529216)

## Project Euler

Quelques solutions au Project Euler réalisées par-ci par-là. Elles ne sont pas nécessairement optimisées le plus possible, mais renvoient le résultat en un temps raisonnable, avec des explications associées éventuellement.

Si vous n'avez pas la solution d'un problème, il ne sert à rien de juste regarder le code et l'exécuter,... car on n'apprend jamais mieux qu'en trouvant une solution par soi-même, ce qui est au passage beaucoup gratifiant.

Conformément aux [règles du Project Euler](https://projecteuler.net/about#publish), les extraits de code ne seront partagés que pour les 100 premiers problèmes.

[>> Index des programmes](./euler/INDEX.md)

## TODO

Quelques idées, qui peuvent être intéressantes à réaliser si jamais le manque d'inspiration se faisait ressentir.

[>> To-do List](./TODO.md)
