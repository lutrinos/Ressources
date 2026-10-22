/**
 * Un moteur de rendu 3D basique, fait-main.
 * 
 * Les projetés sont recalculés à chaque fois car cette version affiche une fonction dépendant du temps !
 * 
 * Lien : https://www.khanacademy.org/computer-programming/3d-graphics-f-r3-r/5369745620975616
**/

// Peut prendre les valeurs "ligneY", "ligneX", "cercle", "point" (plus lent)
var mode = "cercle";

// Fonctions
var fonctions = {
    nappe: function(x, y, t) {
        return sin(4 * t) * (x * sin(x) + y * sin(y)) / 2;
    },
    harmonique: function(x, y, t) {
        return 20 * cos(x + y - 4 * t);
    },
    funky: function(x, y, t) {
        return sin(t) * atan(x) * y * y / 20000;
    },
    drop: function(x, y, t) {
        return 10 * sin(- 2*t + (x*x + y*y) / 100);
    }
};

var f = fonctions.funky;

// Rotation autour des différents axes
var a = {
    x: 20,
    y: 20,
    z: 20
};

// Pour accéler un peu les calculs
// Permet d'avoir 2x plus de points !
var cache = [];

var feedCache = function() {
    cache[0] = cos(a.x) * cos(a.z);
    cache[1] = sin(a.x) * cos(a.y);
    cache[2] = sin(a.z) * cos(a.y);
    cache[3] = cos(a.x) * cos(a.y);
    cache[4] = sin(a.x) * cos(a.z);
    cache[5] = sin(a.y) * cos(a.z);
};

feedCache();

// Changement de base (x', y', z') -> (x, y, z) puis projection dans (x, y)
var coordinates = function(x, y, z) {
    
    // La projection est linéaire !
    // Formules fait-maison, en principe c'est correct :)
    //var y2 = y * cos(a.x) * cos(a.z) - z * sin(a.x) * cos(a.y) + x * sin(a.z) * cos(a.y);
    //var z2 = z * cos(a.x) * cos(a.y) + y * sin(a.x) * cos(a.z) - x * sin(a.y) * cos(a.z);
    var y2 = y * cache[0] - z * cache[1] + x * cache[2];
    var z2 = z * cache[3] + y * cache[4] - x * cache[5];
    
    // Changement dans la bonne base au passage
    return [y2, - z2];
};

var drawPoint = function(x, y, z) {
    var y2 = y * cache[0] - z * cache[1] + x * cache[2];
    var z2 = z * cache[3] + y * cache[4] - x * cache[5];
    
    point(y2, - z2);
};

var drawVertex = function(x, y, z) {
    var y2 = y * cache[0] - z * cache[1] + x * cache[2];
    var z2 = z * cache[3] + y * cache[4] - x * cache[5];
    
    vertex(y2, - z2);
};

var n  = 80;
var time = 0;


noFill();
draw = function() {
    background(255, 255, 255);
    
    pushMatrix();
    translate(250, 250);
    
    // Axes
    strokeWeight(1);
    var c11 = coordinates(-200, 0, 0);
    var c12 = coordinates(200, 0, 0);
    var c21 = coordinates(0, -200, 0);
    var c22 = coordinates(0, 200, 0);
    var c31 = coordinates(0, 0, -200);
    var c32 = coordinates(0, 0, 200);
    
    stroke(0, 68, 255);
    line(c11[0], c11[1], c12[0], c12[1]);
    
    stroke(94, 255, 0);
    line(c21[0], c21[1], c22[0], c22[1]);
    
    stroke(255, 0, 0);
    line(c31[0], c31[1], c32[0], c32[1]);
    
    // Courbe
    if (mode === "point") {
        strokeWeight(2);
        stroke(255, 0, 255);
        for (var x = -200; x <= 200; x += 400 / n) {
            for (var y = -200; y <= 200; y += 400 / n) {
                drawPoint(x, y, f(x, y, time));
            }
        }
    } else if (mode === "ligneY") {
        strokeWeight(1);
        stroke(255, 0, 255);
        noFill();
        for (var x = -200; x <= 200; x += 400 /n) {
            beginShape();
            for (var y = -200; y <= 200; y += 400 / n) {
                var p = coordinates(x, y, f(x, y, time));
                vertex(p[0], p[1]);
            }
            endShape();
        }
    } else if (mode === "ligneX") {
        strokeWeight(1);
        stroke(255, 0, 255);
        noFill();
        for (var y = -200; y <= 200; y += 400 / n) {
            beginShape();
            for (var x = -200; x <= 200; x += 400 / n) {
                drawVertex(x, y, f(x, y, time));
            }
            endShape();
        }
    } else  if (mode === "cercle") {
        strokeWeight(1);
        stroke(255, 0, 255);
        noFill();
        
        for (var r = 1; r <= 300; r += 300 / n) {
            var x;
            var y;
            beginShape();
            for (var theta = 0; theta <= 360; theta += 360 / n) {
                x = r * cos(theta);
                y = r * sin(theta);
                
                drawVertex(x, y, f(x, y, time));
            }
            endShape();
        }
    }
    
    popMatrix();
    
    time += 1;
    
    fill(255, 0, 0);
    text(this.__frameRate, 10, 20);
};

mouseDragged = function() {
    //a.z += pmouseX - mouseX;
    //a.y += pmouseY - mouseY;
    
    a.z += mouseX - pmouseX;
    a.y += mouseY - pmouseY;
    
    feedCache();
};
