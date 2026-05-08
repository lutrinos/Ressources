/**
 * Implémentation triviale de l'algorithme d'Euclide, avec une petite animation pour le plaisir :P
 * 
 * Saisissez les deux nombres dont vous voulez le PGCD (peu importe l'ordre, le programme fait une vérification par lui-même)
 * 
 * Vous pouvez changer la vitesse de l'animation avec la variable animationDuration. Plus elle est grande, plus l'animation sera lente.
 * 
 * Fait le 28/01/2024 en 50 minutes
**/
var a = 1015;
var b = 716;
var animationDuration = 50;

// On vérifie que a > b
if (b > a) {
    var prev = a, a = b, b = prev;
}

// Définition dynamique des variables constantes :)
var lineHeight = 26, ended = false, frames = 1;
var colWidth = width / 3, list = [[a, b, a % b]];

textFont(createFont("monospace", 16));
textAlign(CENTER, CENTER);

function textLeft(col) {
    return colWidth * col + (colWidth >> 1);
}
function textTop(line) {
    return lineHeight * line + (lineHeight >> 1);
}

var animationDurationStep = animationDuration / 3;
var vector1 = new PVector(textLeft(1), textTop(1));
var vector2 = new PVector(textLeft(2), textTop(1));
var vectorToAdd = new PVector((-colWidth * 3) / animationDuration, (lineHeight * 3) / animationDuration);

function drawCanvas() {
    fill(0, 0, 0);
    
    // Les colonnes
    stroke(224, 224, 224);
    line(colWidth, 0, colWidth, height);
    line(colWidth * 2, 0, colWidth * 2, height);
    line(0, lineHeight, width, lineHeight);
    
    // Les titres de colonne
    text("a", textLeft(0), textTop(0));
    text("b", textLeft(1), textTop(0));
    text("reste", textLeft(2), textTop(0));
    
    // Les valeurs
    for (var i = 0; i < list.length; i++) {
        var line = list[i];
        
        text(line[0], textLeft(0), textTop(i + 1));
        text(line[1], textLeft(1), textTop(i + 1));
        text(line[2], textLeft(2), textTop(i + 1));
    }
    
    if (ended) {
        fill(255, 0, 0, 20);
        noStroke();
        rect(colWidth * 2, lineHeight * (list.length - 1), colWidth, lineHeight);
    }
}

draw = function() {
    background(255, 255, 255);
    drawCanvas();
    
    var lineIndex = list.length - 1;
    var line = list[lineIndex];
    var modulo = frames % animationDuration;
    
    if (line[2] !== 0) {
        if (modulo === 0) {
            list.push([line[1], line[2], line[1] % line[2]]);
            vector1.set(textLeft(1), textTop(lineIndex + 2));
            vector2.set(textLeft(2), textTop(lineIndex + 2));
            
            if (line[1] % line[2] === 0) {
                ended = true;
            }
        } else {
            fill(255, 0, 0);
            
            if (modulo > animationDurationStep && modulo < animationDurationStep * 2) {
                vector1.add(vectorToAdd);
                vector2.add(vectorToAdd);
            }
            
            text(line[1], vector1.x, vector1.y);
            text(line[2], vector2.x, vector2.y);
        }
    }
    
    frames += 1;
};
// 99 lignes plus tard :)