
function Vecteur (norme, angle, couleur) {
    this.norme = norme;
    this.couleur = couleur;
    this.angle = angle;
}
Vecteur.prototype.dessine = function() {
    stroke(this.couleur);
    fill(this.couleur);
    
    pushMatrix();
    translate(width / 2, height / 2);
    rotate(this.angle);
    
    line(0, 0, this.norme - 10, 0);
    
    noStroke();
    triangle(this.norme - 10, - 6, this.norme - 10, 6, this.norme, 0);
    
    popMatrix();
};
Vecteur.prototype.change = function (x, y) {
    this.norme = round(dist(width / 2, height / 2, x, y));
    this.angle = round(atan((height / 2 - y) / (width / 2 - x)) + (x > width / 2 ? 0 : 180));
};

var vecteur1 = new Vecteur(100, 0, color(255, 0, 0));
var vecteur2 = new Vecteur(100, 90, color(0, 0, 255));

function dessine () {
    background(255, 255, 255);
    
    stroke(237, 237, 237);
    strokeWeight(1);
    for (var i = 0; i <= width; i += 50) {
        line(i, 0, i, height);
        
        for (var j = 0; j <= height; j += 50) {
            line(0, j, i, j);
        }
    }
    
    strokeWeight(2);
    vecteur1.dessine();
    vecteur2.dessine();
    
    noStroke();
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, 8, 8);
    
    fill(255, 255, 255);
    rect(0, 0, width, 40);
    
    fill(0, 0, 0);
    text(vecteur1.norme / 50 + ' x ' + vecteur2.norme / 50 + ' x cos( ' + (vecteur1.angle - vecteur2.angle) + 'º ) = ' + vecteur1.norme * vecteur2.norme / 2500 * cos(vecteur1.angle - vecteur2.angle), 10, 25);
}

dessine();

mouseClicked = function () {
    vecteur2.change(mouseX, mouseY);
    dessine();
};
mouseDragged = function () {
    vecteur2.change(mouseX, mouseY);
    dessine();
};






