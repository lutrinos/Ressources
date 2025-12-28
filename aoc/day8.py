from math import sqrt, pow

def dist(a, b):
    x, y, z = a
    u, v, w  = b
    return sqrt(pow(x - u, 2) + pow(y - v, 2) + pow(z - w, 2))

def parse_line(line: str):
    coor = line.split(',')
    return (int(coor[0]), int(coor[1]), int(coor[2]))

class UnionFind:

    def __init__(self, length):
        self.length = length
        self.parent = [i for i in range(length)]
        self.sizes = [1] * length
    
    def get(self, a):
        if self.parent[a] == a:
            return a
        return self.get(self.parent[a])

    def same(self, a, b):
        return self.get(a) == self.get(b)
    
    def join(self, a, b):
        a2, b2 = self.get(a), self.get(b)
        if a2 != b2:
            a2, b2 = min(a2, b2), max(a2, b2)# Pas essentiel, plus pratique
            self.sizes[self.get(a2)] += self.size(b2)
            self.sizes[self.get(b2)] = 0
            self.parent[b2] = a2
    
    def size(self, a):
        return self.sizes[self.get(a)]


with open("day8.txt", "r") as f:
    boxes = [parse_line(line) for line in f.readlines()]

    # Nombre de relations
    limit = len(boxes) * (len(boxes) - 1) // 2

    # (distance, a, b)
    distances = []
    
    print("- Ajout des distances")
    for i, a in enumerate(boxes):
        for j, b in enumerate(boxes[:i]):
            if i != j:
                distances.append((dist(a, b), j, i))
    

    print("- Tri des sommets")
    distances.sort()

    print("- Jointure des sommets")
    last1, last2 = 0, 0
    union = UnionFind(len(boxes))
    i = 0
    for _, a, b in distances[:limit]:
        if not union.same(a, b):
            last1 = a
            last2 = b
        union.join(a, b)
    
    print("- Calcul des composantes")
    a, b, c = 0, 0, 0
    box_a, box_b, box_c = None, None, None
    for s in range(len(boxes)):
        t = union.get(s)
        if t == box_c or t == box_b or t == box_a:
            continue

        if union.size(t) > c:
            if union.size(t) > b:
                if union.size(t) > a:
                    box_a, box_b, box_c = t, box_a, box_b
                    a, b, c = union.size(t), a, b
                else:
                    box_b, box_c = t, box_b
                    b, c = union.size(t), b
            else:
                box_c = t
                c = union.size(t)

    
    print("Résultat", a, '*', b, '*', c, '=', a*b*c)
    print("Dernières composantes ajoutées", last1, last2, "| Produit", boxes[last1][0] * boxes[last2][0])



