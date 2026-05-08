
// l'angle (en radians !)
var angle = 0 * PI;

/**
* La vitesse de rotation:
* Plus la vitesse est proche de 1 plus l'angle augmentera rapidement
* Plus la vitesse augmente mois l'angle augmente rapidement
* 
* Si la vitesse est égale à 0, l'angle n'augmentera pas.
**/
var speed = 2;

var midWidth = width / 2;
var midHeight = height / 2;
var radius = 100;

var colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255)
];

angleMode = 'radians';

draw = function() {
    background(255, 255, 255);
    noFill();
    
    // les axes
    strokeWeight(1);
    stroke(237, 237, 237);
    line(midWidth, 0, midWidth, height);
    line(0, midHeight, width, midHeight);
    
    strokeWeight(2);
    
    // le cercle trigonométrique
    stroke(0, 0, 0);
    ellipse(midWidth, midHeight, radius * 2, radius * 2);
    ellipse(midWidth, midHeight, 1, 1);
    
    // l'échelle
    fill(0, 0, 0);
    text('1', width - 4 - (radius / 2), height - 14);
    line(width - radius - 4, height - 4, width - 4, height - 4);
    
    // l'arc de cercle
    var cosinus = sin(angle + PI / 2) ;
    var sinus = cos(angle + PI / 2);
    
    var x = midWidth + cosinus * radius;
    var y = midHeight + sinus * radius;
    
    fill(255, 0, 0);
    stroke(255, 0, 0);
    text('sinus = ' + (-sinus).toFixed(2), 4, height - 4);
    line(x, y, x, midHeight);
    
    fill(0, 0, 255);
    stroke(0, 0, 255);
    text('cosinus = ' + cosinus.toFixed(2), 4, height - 18);
    line(midWidth, midHeight, x, midHeight);
    
    stroke(0, 0, 0);
    line(midWidth, midHeight, x, y);
    
    noFill();
    stroke(255, 0, 0);
    var offset = 0;
    for (var i = 0; i < angle / PI; i ++) {
        stroke(colors[i % colors.length]);
        arc(midWidth, midHeight, radius * 2 + i * 8, radius * 2 + i * 8, - (angle - (i * 2 * PI)), 0);
    }
    
    if (frameCount % speed === 0) {
        angle = ((angle / PI) + 0.01) * PI;
    }
    
    // pour pas que ce soit trop grand :)
    if (angle > 40 * PI) {
        angle = 0;
    }
};
