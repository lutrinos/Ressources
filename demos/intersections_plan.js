
function segmentSegment(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Les vecteurs directeurs des deux droites, pour les équations paramétriques
    var v1 = new PVector(x2 - x1, y2 - y1);
    var v2 = new PVector(x4 - x3, y4 - y3);
    
    // Des deux facteurs pour résoudre le système et aboutir à l'égalité souhaitée
    var f1 = v2.y;
    var f2 = - v2.x;
    
    // Factorisé pour diminuer le nombre de multiplications (vraiment utile ?)
    var numerator = f1 * (x3 - x1) + f2 * (y3 - y1);
    var denominator = v1.x * f1 + v1.y * f2;
    
    var intersect, x, y;
    
    if (denominator === 0) {
        intersect = false;
    } else {
        
        var t = numerator / denominator;
    
        // Coordonnées du point d'intersection des deux droites
        x = t * v1.x + x1;
        y = t * v1.y + y1;
        
        // Il y a intersection si t est compris entre 0 et 1 (d'où l'intérêt de calculer la différence exacte pour les coefficients) et les points sont dans le bon "ordre" en termes de distance
        var d1 = dist(x3, y3, x, y);
        var d2 = dist(x3, y3, x4, y4);
        var d3 = dist(x, y, x4, y4);
        intersect = 0 <= t && t <= 1 && d1 <= d2 && d3 <= d2;
    }
    
    
    return [intersect, x, y];
}

var originX = 200;
var originY = 200;
var lines = [
    [100, 100, 300, 100],
    [300, 100, 380, 200],
    [380, 200, 300, 300],
    [300, 300, 100, 300],
    [50, 350, 350, 350],
    [50, 350, 50, 100]
];

draw = function() {
    background(255, 255, 255);
    strokeWeight(2);
    
    stroke(0, 0, 0);
    line(originX, originY, mouseX, mouseY);
    
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        var result = segmentSegment(l[0], l[1], l[2], l[3], originX, originY, mouseX, mouseY);
    
        if (result[0]) {
            stroke(255, 0, 0);
        } else {
            stroke(0, 0, 0);
        }
        
        line(l[0], l[1], l[2], l[3]);
    
        if (result[0]) {
            noStroke();
            fill(0, 255, 21);
            ellipse(result[1], result[2], 10, 10);
        }
    }
};