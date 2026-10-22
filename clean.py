import os, shutil

dossiers = ["demos", "option", "outils", "specialite", "tests"]

def clean(repertoire):
  for fichier in os.listdir(repertoire):
    try:
      chemin = os.path.join(repertoire, fichier)

      if os.path.isdir(chemin):
        if fichier == "__pycache__":
          shutil.rmtree(chemin)
        else:
          clean(chemin)
    except Exception as e:
      print('Failed to delete %s. Reason: %s' % (file_path, e))

for dossier in dossiers:
  clean(os.path.join('.', dossier))

print("Tous les dossiers '__pycache__' ont été supprimés.")
  