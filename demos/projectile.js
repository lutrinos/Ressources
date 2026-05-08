
/**
 * Allez au lien suivant pour agrandir l'animation: https://www.khanacademy.org/computer-programming/physique-chute-libre/6093678011662336?width=780&height=600
 * 
 * Un simulateur de chute libre. Pour commencer l'animation, cliquer n'importe où sur l'animation. Faites glisser la souris pour positionner la système en fonction du temps correspondant au pointeur.
 * 
 * Les variables suivantes doivent être définies à l'initialisation
 * 
 * masse: masse du système, en kg
 * 
 * vitesse: vitesse initiale du système en m/s
 * 
 * angle: angle initial, en degrés
 * 
 * g: valeur normale de l'accélération de la pesanteur, em N/kg
 * 
 * hauteur: hauteur initiale du système, en mètres
 * 
 * duree: durée totale de l'animation, en secondes
 * 
 * arret: temps au bout duquel l'animation doit s'arrêter, en secondes
 * 
 * afficherAcceleration: booléen, afin d'afficher ou non le vecteur accélération (si oui, l'échelle sera calculée automatiquement et le vecteur sera affiché en rouge)
 * 
 * afficherVitesse: booléen, afin d'afficher ou non le vecteur vitesse (si oui, l'échelle sera calculée automatiquement et le vecteur sera affiché en bleu)
 * 
 * afficherTrajectoire: booléen, afin d'afficher ou non la trajectoire que va suivre le système
 * 
 * afficherPosition: booléen, afin d'afficher ou non la position du système sur l'axe des abscisses et des ordonnées
 * 
 * arretAuSommet: booléen, afin d'arrêter ou non le système lorsqu'il atteint le sommet
 * 
 * 
 * Note: l'échelle du graphe des énergies n'est pas optimale, il se peut que la courbe dépasse du cadre
 *  
**/
var masse = 0.6;
var vitesse = 10;
var angle = 45;
var g = 9.81;
var hauteur = 2;
var duree = Infinity;
var arret = Infinity;
var afficherAcceleration = true;
var afficherVitesse = true;
var afficherTrajectoire = true;
var afficherPosition = true;
var arretAuSommet = false;












/**
 * Le code de la simulation
**/
// {

var duree = duree === Infinity ? (2 * vitesse / g).toFixed(2) : duree;

angleMode = "degrees";
textAlign(CENTER, CENTER);

// Quelques variables utiles
var time = 0;
var playing = false;

// La position de l'écran d'animation
var animationWidth = width - 20;
var animationHeight = height - 130;
var animationLeft = 10;
var animationTop = 120;

// La position du graphique
var graphWidth = width - 80;
var graphHeight = 100;
var graphLeft = 70;
var graphTop = 10;

if (afficherPosition) {
    animationLeft += 60;
    animationWidth -= 60;
    animationHeight -= 20;
}

// On détermine les coefficients de l'équation du second degré correspondant à y(t)
var a = -0.5 * g;
var b = vitesse * sin(angle);
var c = hauteur;

// On détermine le temps maximal
var delta = pow(b, 2) - 4 * a * c;
var timeLimit = 0;

if (delta >= 0) {
    timeLimit = min(- b - sqrt(delta), - b + sqrt(delta)) / (2 * a);
    arret = min(arret, timeLimit);
} else {
    println("Δ < 0, il y a sans doute une erreur dans les paramètres");
}

// On redétermine la trame
frameRate(60);
var trame = arret / (duree * 60);

// On détermine la flèche de la parabole
var timeMax = - b / (2 * a);
var yMax = a * pow(timeMax, 2) + b * timeMax + c;

// On détermine sa portée
var xMax = vitesse * cos(angle) * timeLimit;

// On détermine les échelles
var animationScale = min(animationWidth / xMax, animationHeight / yMax);
var accelerationScale = g / 2;
var speedScale = (cos(angle) + accelerationScale) * g / vitesse;

// On détermine des valeurs énergétique (on ne prend pas en compte les frottements ici)
var Em = (0.5 * masse * pow(vitesse, 2)) + (masse * g * hauteur);


// Quelques fonctions utiles
function getX(t) {
    return vitesse * cos(angle) * t;
}
function getY(t) {
    return  a * pow(t, 2) + b * t + c;
}
function getSpeed (t) {
    return sqrt(pow(vitesse * cos(angle), 2) + pow(-g * t + vitesse * sin(angle), 2));
}
function getEpp(t) {
    return masse * g * getY(t);
}
function getEc(t) {
    return 0.5 * masse * pow(getSpeed(t), 2);
}
function getGraphX(x) {
    return map(x, 0, timeLimit, graphLeft, graphLeft + graphWidth);
}
function getGraphY(y) {
    return map(y, 0, Em, graphTop + graphHeight, graphTop);
}
function scaleX(x) {
    return animationLeft + x * animationScale;
}
function scaleY(y) {
    return animationTop + animationHeight - y * animationScale;
}
function arrow(x, y, vx, vy, col) {
    vy = - vy;
    
    // On calcule la norme et l'angle de la flèche
    var norme = sqrt(vx * vx + vy * vy);
    var a = atan2(vy, vx);
    
    pushMatrix();
    translate(x, y);
    rotate(a);
    
    stroke(col);
    fill(col);
    
    line(0, 0, norme, 0);
    triangle(norme, 0, norme - 10, 4, norme - 10, - 4);
    
    popMatrix();
    
    /*
    // On calcule la position de la "fin" de la pointe
    var headEnd = norme - arrowHead;
    var headX = cos(a) * headEnd;
    var headY = sin(a) * headEnd;
    
    var x1 = headX + ;
    var y1 = 0;
    
    stroke(col);
    line(x, y, x + vx, y + vy);
    
    noStroke();
    fill(255, 0, 0);
    triangle(x + vx, y + vy, x + headX, y + headY, 100, 10);*/
}

function showScreen () {
    // On détermine les coordonnées réelles
    var systemX = getX(time);
    var systemY = getY(time);
    
    // On détermine les coordonnées par rapport à l'animation
    var positionX = scaleX(systemX);
    var positionY = scaleY(systemY);
    
    // On dessine la trajectoire, avec 20 points répartis sur la courbe
    if (afficherTrajectoire) {
        
        noFill();
        stroke(255, 222, 254);
        
        beginShape();
        curveVertex(scaleX(getX(0)),  scaleY(getY(0)));

        for (var i = 0; i <= timeLimit; i += timeLimit / 20) {
            curveVertex(
                scaleX(getX(i)),
                scaleY(getY(i))
            );
        }
        
        curveVertex(scaleX(getX(timeLimit)), scaleY(getY(timeLimit)));
        curveVertex(scaleX(getX(timeLimit)), scaleY(getY(timeLimit)));
        endShape();
    }
    
    // On dessine la position
    if (afficherPosition) {
        fill(0, 0, 0);
        
        text(systemY.toFixed(2) + "m", animationLeft / 2, positionY);
        text(systemX.toFixed(2) + "m", positionX, height - 10);
        
        stroke(255, 166, 255);
        line(animationLeft, positionY, positionX, positionY);
        line(positionX, positionY, positionX, animationTop + animationHeight);
    }
    
    // On dessine le vecteur accélération
    if (afficherAcceleration) {
        arrow(positionX, positionY, 0, - g * accelerationScale, color(255, 0, 0));
        
    }
    
    // On dessine le vecteur vitesse
    if (afficherVitesse) {
        arrow(
            positionX,
            positionY,
            (vitesse * cos(angle)) * speedScale,
            (- g * time + vitesse * sin(angle)) * speedScale,
            color(0, 0, 255)
        );
    }
    
    // On dessine les axes
    stroke(0, 0, 0);
    line(
        animationLeft,
        animationTop,
        animationLeft,
        animationTop + animationHeight
    );
    line(
        animationLeft,
        animationTop + animationHeight,
        animationLeft + animationWidth,
        animationTop + animationHeight
    );
    
    // On dessine le système
    noStroke();
    fill(238, 0, 255);
    ellipse(positionX, positionY, 10, 10);
}
function showEnergies () {
    noFill();
    
    // On dessine la courbe de l'énergie mécanique
    stroke(0, 255, 0);
    line(graphLeft, graphTop, graphLeft + graphWidth, graphTop);
    
    // On dessine la courbe de l'énergie potentielle de pesanteur
    stroke(0, 0, 255);
    beginShape();
    curveVertex(graphLeft, getGraphY(getEpp(0)));
    for (var i = 0; i <= timeLimit; i += timeLimit / 20) {
        curveVertex(
            getGraphX(i),
            getGraphY(getEpp(i))
        );
    }
    curveVertex(graphLeft + graphWidth, getGraphY(getEpp(timeLimit)));
    endShape();
    
    // On dessine la courbe de l'énergie cinétique
    stroke(255, 0, 0);
    beginShape();
    curveVertex(graphLeft, getGraphY(getEc(0)));
    for (var i = 0; i <= timeLimit; i += timeLimit / 20) {
        curveVertex(
            getGraphX(i),
            getGraphY(getEc(i))
        );
    }
    curveVertex(graphLeft + graphWidth, getGraphY(getEc(timeLimit)));
    endShape();
    
    // On dessine l'instant actuel
    stroke(0, 0, 0);
    line(getGraphX(time), graphTop - 6, getGraphX(time), graphTop + graphHeight);
    
    fill(0, 0, 0);
    text("J", graphLeft - 10, graphTop);
    
    // On montre les valeurs actuelles
    text("Em = " + Em.toFixed(1), graphLeft / 2, graphTop + 20);
    text("Epp = " + getEpp(time).toFixed(1), graphLeft / 2, graphTop + 35);
    text("Ec = " + getEc(time).toFixed(1), graphLeft / 2, graphTop + 50);
    
    
        
    // On dessine les axes
    stroke(0, 0, 0);
    line(
        graphLeft,
        graphTop - 6,
        graphLeft,
        graphTop + graphHeight);
    line(
        graphLeft,
        graphTop + graphHeight,
        graphLeft + graphWidth,
        graphTop + graphHeight
    );
}

var draw = function() {
    background(255, 255, 255);
    
    time = min(time, arret);
    
    showScreen();
    showEnergies();
    
    if (playing) {
        if (time >= arret) {
            playing = false;
        } else if (arretAuSommet && abs(time - timeMax) < trame) {
            playing = false;
            time = timeMax;
        } else {
            time += trame;
        }
    }
};

mouseDragged = function () {
    playing = false;
    
    var x = (mouseX - animationLeft) / animationScale;
    var t = x / (vitesse * cos(angle));
    
    time = constrain(t, 0, timeLimit);
};

mouseClicked = function () {
    if (playing === false && time === arret) {
        time = 0;
    }
    
    if (arretAuSommet && time === timeMax && playing === false) {
        time = 0;
        
        // On évite un potentiel décalage
        while (time < timeMax || abs(time - timeMax) < trame) {
            time += trame;
        }
    }
    playing = !playing;
};

// }





