import os, shutil

dossiers = ["option", "outils", "specialite", "tests"]

for dossier in dossiers:
  for fichier in os.listdir(os.path.join('.', dossier)):    
    try:
      if fichier == "__pycache__":
        chemin = os.path.join('.', dossier, fichier)
      
        if os.path.isdir(chemin):
          shutil.rmtree(chemin)
    except Exception as e:
      print('Failed to delete %s. Reason: %s' % (file_path, e))

print("Tous les dossiers '__pycache__' ont été supprimés.")
  