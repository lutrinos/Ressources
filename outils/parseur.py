# Une implémentation basique d'un parseur d'expressions mathámatiques

# États du parseur
ATTENTE = 0
LECTURE_NOMBRE = 1
LECTURE_VARIABLE = 2
LECTURE_OPERATION = 3
LECTURE_GROUPE = 4

# Types de noeuds d'AST
NOMBRE = 0
VARIABLE = 1
OPERATION = 2
GROUPE = 3

def parse(string):
  ast = []

  etat = ATTENTE
  precedent = -1

  tampon = ""
  meta_tampon = 0

  def vide_tampon():
    nonlocal etat
    nonlocal tampon

    if etat == LECTURE_NOMBRE:
      precedent = NOMBRE
      ast.append((NOMBRE, int(tampon)))
    elif etat == LECTURE_VARIABLE:
      precedent = VARIABLE
      ast.append((VARIABLE, tampon[0]))
    elif etat == LECTURE_OPERATION:
      precedent = OPERATION
      ast.append((OPERATION, tampon[0]))
    
    etat = ATTENTE
    tampon = ""

  for char in string:
    if etat == LECTURE_GROUPE:
      if char == '(':
        meta_tampon += 1
      elif char == ')':
        meta_tampon -= 1
      
      if meta_tampon == 0:
        ast.append((GROUPE, parse(tampon)))
        etat = ATTENTE
        tampon = ""
      else:
        tampon += char
      continue

    if char.isdigit():
      etat = LECTURE_NOMBRE
      tampon += char
    elif char == '(':
      vide_tampon()

      etat = LECTURE_GROUPE
      tampon = ""
      meta_tampon = 1
    else:
      vide_tampon()
      
      if char.isalpha():
        etat = LECTURE_VARIABLE
        tampon += char
      elif char in ['+', '-', '*', '/', '^']:
        etat = LECTURE_OPERATION
        tampon += char
      
      vide_tampon()
  
  vide_tampon()
  
  return ast

#print(parse("3 + 2 / 3"))
#print(parse("3 * (10 + (2)) / 2 + 4"))
#print(parse("3 * (10 + (2)) / 2 + 4 = 17"))