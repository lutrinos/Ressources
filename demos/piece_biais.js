
/**
 * Notes:
 * - les dimensions sont celles d'une pièce de 50 centimes (https://fr.wikipedia.org/wiki/Pi%C3%A8ce_de_50_centimes_d%27euro)
 * - ce modèle est loin d'être parfait :)
 * - les graphiques n'ont pas la même échelle
 * 
 * Le graphe fushia représente la hauteur de la pièce (tranche visible)
 * Le graphe vert représente la largeur de la pièce (non visible sur le schéma)
 * Le graphe orange représente l'intensité du poids estimée sur la "tranche"
 * 
 * Faites bouger la souris pour obtenir des valeurs précises
**/

var Piece = function(config) {
    // La position du centre de la pièce
    this.x = 200;
    this.y = 200;

    // L'angle d'inclinaison (en º, compris entre 90 et -90)
    this.angle = 50;
    
    // La largeur de la pièce (en m)
    this.height = 2.38 * 0.001;

    // Le rayon de la pièce (en m)
    this.radius = 24.25 * 0.001 / 2;

    // La masse de la pièce (en kg)
    this.mass = 7.8 * 0.001;

    // Le volume de la pièce (en m^3)
    this.volume = PI * pow(this.radius, 2) * this.height;

    // La masse volumique de la pièce (en kg.m^-3)
    this.volumetricMass = this.mass / this.volume;

    // L'échelle (en px/m)
    this.scale = 1000 / 0.1;
    
    // Des variables pour stocker des données
    this.corners = [];
};

// Fonction pour dessiner la pièce
Piece.prototype.draw = function() {
    pushMatrix();
    
    translate(this.x, this.y);
    rotate(- this.angle + 90);
    
    fill(255, 247, 0);
    stroke(217, 210, 0);
    rect(- this.scale * this.height / 2, - this.scale * this.radius, this.scale * this.height, this.scale * this.radius * 2);
    popMatrix();
};

// Fonctions pour estimer la hauteur de la pièce par intersections de segments
Piece.prototype.initHeight = function() {
    // On calcule des coordonnées utiles
    var p1 = [
        this.x - (sin(this.angle) * this.height * this.scale / 2),
        this.y - (cos(this.angle) * this.height * this.scale / 2)
    ];
    
    var p2 = [
        this.x + (sin(this.angle) * this.height * this.scale / 2),
        this.y + (cos(this.angle) * this.height * this.scale / 2)
    ];
    
    // On calcule les coordonnées des quatres coins
    var offsetX = (cos(this.angle) * this.radius * this.scale);
    var offsetY = (sin(this.angle) * this.radius * this.scale);
    
    this.corners.push([
        p1[0] + offsetX,
        p1[1] - offsetY
    ]);
    
    this.corners.push([
        p2[0] + offsetX,
        p2[1] - offsetY
    ]);
    
    this.corners.push([
        p2[0] - offsetX,
        p2[1] + offsetY
    ]);
    
    this.corners.push([
        p1[0] - offsetX,
        p1[1] + offsetY
    ]);
    
    // On rajoute le premier point
    this.corners.push(this.corners[0]);
};
Piece.prototype.getHeight = function(x, show) {
    var intersections = [];
        
    for (var i = 0; i < this.corners.length - 1; i++) {
        var c1 = this.corners[i];
        var c2 = this.corners[i + 1];
        
        // On met les coins dans l'ordre
        if (c1[0] > c2[0]) {
            var a = c1;
            c1 = c2;
            c2 = a;
        }
        
        var x1 = c1[0];
        var x2 = c2[0];
        var y1 = c1[1];
        var y2 = c2[1];
        
        var coefficient = (y2 - y1) / (x2 - x1);
        var offset = x - x1;
        
        if (constrain(x, x1, x2) === x) {
            var intersectionY = y1 + offset * coefficient;
            
            if (show === true) {
                fill(0, 0, 255);
                stroke(0, 0, 255);
            
                ellipse(x, intersectionY, 5, 5);
                line(x, intersectionY, x + 10, y1 + (offset + 10) * coefficient);
            }
            
            intersections.push(intersectionY);
        }
    }
    
    if (intersections.length >= 2) {
        // On doit convertir la valeur en m
        return abs(intersections[0] - intersections[1]) / this.scale;
    }
    return 0;
};

// Fonction pour calculer la "longueur" de la pièce (au milieu)
Piece.prototype.getWidth = function(x) {
    var upperPoint = [
        (this.corners[0][0] + this.corners[1][0]) / 2,
        (this.corners[0][1] + this.corners[1][1]) / 2
    ];
    var bottomPoint = [
        (this.corners[2][0] + this.corners[3][0]) / 2,
        (this.corners[2][1] + this.corners[3][1]) / 2
    ];
    if (constrain(x, bottomPoint[0], upperPoint[0]) === x) {
        var offset = - this.radius + ((x - bottomPoint[0]) / cos(this.angle)) / this.scale;
        
        return 2 * sqrt(pow(this.radius, 2) - pow(offset, 2));
    }
    return 0;
};

// Fonction pour calculer l'intensité de la pesanteur sur une "tranche" de la pièce
Piece.prototype.getWeight = function(x) {
    var volume = (this.getHeight(x) || 0) * (this.getWidth(x) || 0) / this.scale;
    
    if (volume === 0) {
        return 0;
    }
    
    var mass = this.volumetricMass * volume;
    
    return mass * 9.81;
};

// Fonctions pour dessiner un graphe
var Graph = function(x, w, h, col) {
    this.x = x;
    this.width = w;
    this.height = h;
    this.color = col;
    this.max = undefined;
    this.points = [];
};
Graph.prototype.push = function(point) {
    this.points.push(point);
    this.max = max(point, this.max);
};
Graph.prototype.draw = function() {
    if (this.points.length === 0) {
        return;
    }
    noFill();
    stroke(this.color);
    beginShape();
    
    var scaleY = this.height / this.max;
    var scaleX = this.width / this.points.length;
    
    for (var i = 0; i < this.points.length; i++) {
        vertex(i * scaleX, this.x - this.points[i] * scaleY);
    }
    
    endShape();
    
    fill(this.color);
    var index = round(mouseX / scaleX);
    ellipse(index * scaleX, this.x - this.points[index] * scaleY, 5, 5);
};

var piece = new Piece();
piece.initHeight();

var colors = {
    hauteur: color(247, 0, 255),
    largeur: color(0, 158, 11),
    poids: color(255, 170, 0)
};

// Les hauteurs de la pièce (en mm)
var hauteurs = new Graph(400, width, 50, colors.hauteur);

// Les largeurs de la pièce (en mm)
var largeurs = new Graph(400, width, 50, colors.largeur);

// Les "intensités de pesanteur" (en N ou m/s)
var poids = new Graph(400, width, 100, colors.poids);

for (var i = 0; i < width; i++) {
    hauteurs.push(piece.getHeight(i) * 1000);
    largeurs.push(piece.getWidth(i) * 1000);
    poids.push(piece.getWeight(i));
}

var s = 0;
for (var i = 0; i < poids.points.length; i++) {
    s += poids.points[i];
}

println("\nSomme des poids: (N/kg) " + s);
println("Poids estimé: (N/kg) " + 9.81 * piece.mass);

draw = function() {
    background(255, 255, 255);
    
    // La ligne rouge
    noFill();
    stroke(255, 0, 0);
    line(mouseX, 0, mouseX, height);
    
    // On dessine la pièce
    piece.draw();
    
    // Les inscriptions
    var h = (piece.getHeight(mouseX, true) * 1000).toFixed(2);
    fill(colors.hauteur);
    text("Hauteur: " + h + ' mm', 10, 20);
    
    fill(colors.largeur);
    text("Largeur: " + (piece.getWidth(mouseX) * 1000).toFixed(2) + ' mm', 10, 40);
    
    fill(colors.poids);
    text("Poids: " + (piece.getWeight(mouseX) * 1000).toFixed(2) + ' N/kg (x1000)', 10, 60);
    
    hauteurs.draw();
    largeurs.draw();
    poids.draw();
};