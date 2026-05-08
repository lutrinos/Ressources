/**
* Fonction f: ligne 162
* Fonction dérivée de la fonction f: ligne 168
**/


var midWidth = width / 2;
var midHeight = height / 2;
var canvasHeight = height - 100;
var mouseDown = false;

smooth();
strokeWeight(2);
textAlign(LEFT, TOP);
angleMode = "degrees";

function isHover (x, y, w, h) {
    return (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) || (pmouseX >= x && pmouseX <= x + w && pmouseY >= y && pmouseY <= y + h);
}
function getRound (n, c) {
    return round(n * pow(10, c)) / pow(10, c);
}
function closest (val, step, min, max) {
    val = getRound(val, 1);
    if (val % step !== 0) {
        val = round(val / step) * step;
    }
    return constrain(val, min, max);
}

var Dragger = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.width = args.width;
    this.height = args.height;
    this.min = args.min;
    this.max = args.max;
    this.range = args.max - args.min;
    this.barHeight = 10;
    this.val = (args.min + args.max) / 2;
    this.label = args.label || '';
    this.step = args.step || 0.1;
    this.onchange = function(){};
};
Dragger.prototype.draw = function(c) {
    noStroke();
    this.val = constrain(this.val, this.min, this.max);
    
    var lw = textWidth(this.label + round(this.val)) + 40;
    var cl = this.x + map(this.val, this.min, this.max, 5, this.width - 5);
    
    if (isHover(this.x, this.y, this.width, this.height)) {
        cursor('pointer');
        
        if (mouseDown) {
            this.val = closest(map(mouseX - this.x, 5, this.width - 5, this.min, this.max), this.step, this.min, this.max);
            this.onchange(this.val);
        }
        
        if (isHover(this.x + 5, this.y + this.height / 2 - this.barHeight / 2 - 2, this.width - 10, this.barHeight + 4)) {
            fill(0, 0, 0);
            rect(cl - lw / 2, this.y - 10, lw, 24, 4);
            triangle(cl - 6, this.y + 14, cl + 6, this.y + 14, cl, this.y + 17);
            fill(255, 255, 255);
            text(this.label + round(this.val), cl - lw / 2 + 20, this.y - 5);
        }
        
    }
    
    
    fill(c, 40);
    rect(this.x + 5, this.y + this.height / 2 - this.barHeight / 2, this.width - 10, this.barHeight, 4);
    
    fill(c);
    ellipse(cl, this.y + this.height / 2, 15, 15);
};

var Converter = function () {
    this.top = function(y) {
        return -1 * y;
    };
};
var convert = new Converter();

var Config = function () {
    this.fonction = function(){};
    this.derivee = function(){};
    this.prev = {
        x: 0,
        y: 0
    };
    this.tangente = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    };
    this.a = 0;
    this.h = 10;
    this.offset = 60;
    this.scale = 1;
};
Config.prototype.getPrev = function () {
    return this.prev;
};
Config.prototype.getY = function (x) {
    return convert.top(this.fonction(x));
};
Config.prototype.getCurrentY = function () {
    return convert.top(this.fonction(this.a));
};
Config.prototype.getCurrentYWithOffset = function () {
    return convert.top(this.fonction(this.a + this.h));
};
Config.prototype.getDerivee = function () {
    return this.derivee(this.a);
};
Config.prototype.getTangenteY = function (x) {
    return convert.top(
        (this.derivee(this.a) * (x - this.a)) + this.fonction(this.a)
    );
};
Config.prototype.setA = function (a) {
    this.a = a;
};
Config.prototype.setH = function (h) {
    this.h = h;
};
Config.prototype.setPrev = function (x, y) {
    this.prev = {
        x: x,
        y: y
    };
};
Config.prototype.setTangente = function () {
    var t = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    };
    
    // nous calculons l'angle (en degrés)
    var angle = atan(this.getDerivee());
    this.angle = angle;
    
    // nous calculons la différence d'abscisse des points pour dessiner la tangente afin qu'elle ne soit pas trop longue
    var diff = cos(angle) * this.offset;
    

    t.x1 = this.a - diff;
    t.y1 = this.getTangenteY(t.x1);
    
    t.x2 = this.a + diff;
    t.y2 = this.getTangenteY(t.x2);
    
    this.tangente = t;
};

var config = new Config();

config.fonction = function (x) {
    // return x * abs(x) / 100;
    return sq(x) / 100;
    // return sq(x); // <= fonction carré
};

config.derivee = function (x) {
    // return cos(x) * 100;
    return 0.02 * x;
    // return 2*x; // <= fonction dérivée de la fonction carré
};

var dragA = new Dragger({
    x: 0,
    y: canvasHeight,
    width: midWidth - 50,
    height: 50, 
    min: - midWidth,
    max: midWidth,
    label: 'a = '
});
var dragH = new Dragger({
    x: midWidth + 50,
    y: canvasHeight,
    width: midWidth - 50,
    height: 50, 
    min: 1,
    max: 200,
    label: 'h = ',
    step: 1
});
var dragOffset = new Dragger({
    x: 0,
    y: canvasHeight + 50,
    width: midWidth - 50,
    height: 50,
    min: 1,
    max: 200,
    label: 'tangente = ',
    step: 1
});
var dragScale = new Dragger({
    x: midWidth + 50,
    y: canvasHeight + 50,
    width: midWidth - 50,
    height: 50,
    min: 0.5,
    max: 10,
    label: 'zoom = ',
    step: 0.5
});

dragA.onchange = function (val) {
    config.setA(val);
    config.setTangente();
    config.setPrev(config.a, config.getCurrentY());
};
dragH.onchange = function (val) {
    config.setH(val);
};
dragOffset.onchange = function (val) {
    config.offset = val;
    config.setTangente();
};
dragScale.onchange = function (val) {
    config.scale = val;
};

config.setA(0);
config.setH(50);
config.setPrev(0, 0);
dragOffset.val = config.offset;
dragH.val = config.h;
dragA.val = config.a;
dragScale.val = config.scale;

config.setTangente();

var drawBoard = function () {
    var weight = 2 / config.scale;
    var diametre = 6 / config.scale;
    var offsetX = midWidth - (config.scale > 1 ? config.a * config.scale : 0);
    var offsetY = midHeight - (config.scale > 1 ? config.getCurrentY() * config.scale : 0);
    
    pushMatrix();
    translate(offsetX, offsetY);
    scale(config.scale);
    strokeWeight(2 /  config.scale);
    
    // l'abscisse et l'ordonnée
    stroke(0, 0, 0);
    line(-midWidth * offsetX, 0, midWidth * offsetX, 0);
    line(0, -midHeight * offsetY, 0, (canvasHeight - midHeight)*offsetY);
    
    // la courbe
    noFill();
    stroke(255, 0, 0);
    beginShape();
    for (var x = -midWidth; x <= midWidth; x++) {
        curveVertex(x, config.getY(x));
    }
    endShape();
    
    // la tangente
    stroke(0, 60, 255);
    line(config.tangente.x1, config.tangente.y1, config.tangente.x2, config.tangente.y2);
    
    noStroke();
    
    // les deux point de l'arrondi de la tangente
    fill(17, 255, 0);
    ellipse(config.a, config.getCurrentY(), diametre, diametre);
    ellipse(config.a + config.h, config.getCurrentYWithOffset(), diametre, diametre);
    
    // a + h
    stroke(255, 166, 0);
    line(config.a, config.getCurrentY(), config.a + config.h, config.getCurrentYWithOffset());
    
    // pour sélectionner un point de la courbe
    fill(255, 0, 0);
    noStroke();
    ellipse(config.getPrev().x, config.getPrev().y, diametre, diametre);
    
    popMatrix();
};

var draw = function() {
    background(255, 255, 255);
    cursor('default');
    
    // l'échelle
    strokeWeight(1);
    stroke(237, 237, 237);
    var w = getRound(100 / config.scale, -1);
    var offset = (midWidth - (config.scale > 1 ? config.a * config.scale : 0)) % w;
    
    for (var i = 0; i <= width / w; i++) {
        line(offset + i * w * config.scale, 0, offset + i * w * config.scale, canvasHeight);
    }
    
    drawBoard();
    
    // on met à jour quelques variables
    fill(0, 0, 0);
    stroke(0, 0, 0);
    strokeWeight(2);
    textSize(12);
    line(0, canvasHeight, width, canvasHeight);
    
    text(w, width - 10 - textWidth(w), canvasHeight - 28);
    stroke(0, 0, 0);
    line(width - 10, canvasHeight - 10, width - 10 - config.scale * w, canvasHeight - 10);
    
    // le carré blanc en bas
    noStroke();
    fill(255, 255, 255);
    rect(0, canvasHeight, width, height - canvasHeight);
    
    // la légende
    fill(255, 255, 255);
    stroke(230, 230, 230);
    rect(0, canvasHeight - 72, 224, 70);
    fill(0, 0, 0);
    text('a = ' + getRound(config.a, 2) + ', f (a) = ' + getRound(config.getCurrentY(), 2) + ', h = ' + getRound(config.h, 2) , 10, canvasHeight - 60);
    text('Coefficient directeur\nde la tangente à la courbe en a: ' + getRound(config.getDerivee(), 2), 10, canvasHeight -42);
    // text('Angle de la tangente: ' + getRound(config.angle, 2), 10, canvasHeight - 72);
    
    // on dessine les 'sliders'
    dragA.draw(color(255, 0, 0));
    dragH.draw(color(255, 191, 0));
    dragOffset.draw(color(34, 0, 255));
    dragScale.draw(color(0, 0, 0));
};

var mousePressed = function () {
    mouseDown = true;
};
var mouseMoved = function () {
    if (isHover(0, 0, width, canvasHeight)) {
        config.setPrev(
            mouseX - midWidth,
            config.getY(mouseX - midWidth)
        );
    }
};
var mouseDragged = function () {
    if (isHover(0, 0, width, canvasHeight) && mouseDown) {
        config.setA(mouseX - midWidth);
        config.setTangente();
        dragA.val = config.a;
    }
    mouseMoved();
};
var mouseOut = function () {
    mouseDown = false;
};
var mouseReleased = function () {
    mouseDown = false;
};




