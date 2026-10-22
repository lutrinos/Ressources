"""
import sys
import os

# Récupère le chemin absolu du dossier parent (la racine du projet)
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))

print(os.path.join(ROOT_DIR, 'specialite'))

# Ajoute le chemin vers le dossier "special" à la variable sys.path
sys.path.append(os.path.join(ROOT_DIR, 'specialite'))
"""
import sys
import os

# Ajoutez le chemin vers la racine de votre projet au chemin Python
#ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
#sys.path.append(ROOT_DIR)

from test.test_suites import *

# print(test.test_suites())