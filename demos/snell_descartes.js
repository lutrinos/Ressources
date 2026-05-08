noFill();

var midHeight = height / 2;
var midWidth = width / 2;
var rayon = floor(sqrt(sq(midWidth) + sq(midHeight)));

/**
* Quelques indices de réfraction
* air: 1
* eau: 1.333
* verre: 1.5
* diamant: 2.42
* glace: 1.31
**/
var n1 = 1;
var n2 = 1.333;

var angle = 64;
var refractedAngle;
var selected = '';
var limite = floor(asin(sin(90) * n1 / n2) * 100) / 100;

function arrondi (n) {
    return round(n * 100) / 100;
}
function Coordinates (radius) {
    this.radius = radius;
    
    this.findX = function (a) {
        return sin(a) * this.radius;
    };
    
    this.findY = function (a) {
        return sin(90 - a) * this.radius;
    };
}

var rayCircle = new Coordinates(
    floor(sqrt(sq(midWidth) + sq(midHeight)))
);

var labelCircle = new Coordinates(200);

function drawLabel(a, offset, col) {
    var label = a + 'º';
    var w = textWidth(label);
    var x = midWidth - labelCircle.findX(a + offset) - w / 2;
    var y = midHeight - labelCircle.findY(a + offset);
    
    fill(255, 255, 255);
    rect(x - 4, y - 14, w + 8, 16);
    
    fill(col);
    text(label, x, y);
}
function getAngle (ra) {
    return ra >= limite ? 90 : asin(sin(ra) * n2 / n1) || 0;
}

function updateCanvas () {
    background(255, 255, 255);
    
    angle = arrondi(constrain(angle, 0, 90));
    
    if (angle === 0) {
        refractedAngle = 0;
    } else {
        refractedAngle = arrondi(asin(sin(angle) * n1 / n2)) || 90;
    }
    
    noFill();
    stroke(237, 237, 237);
    line(midWidth, 0, midWidth, height);
    line(0, midHeight, width, midHeight);
    
    
    stroke(255, 0, 0);
    arc(midWidth, midHeight, 40, 40, 270 - angle, 270);
    line(
        midWidth - rayCircle.findX(angle),
        midHeight - rayCircle.findY(angle),
        midWidth,
        midHeight
    );
    
    stroke(0, 0, 255);
    arc(midWidth, midHeight, 40, 40, -90, angle - 90);
    line(
        midWidth - rayCircle.findX(-angle),
        midHeight - rayCircle.findY(-angle),
        midWidth,
        midHeight
    );
    
    stroke(0, 255, 0);
    arc(midWidth, midHeight, 40, 40, 90 - refractedAngle, 90);
    line(
        midWidth + rayCircle.findX(refractedAngle),
        midHeight + rayCircle.findY(refractedAngle),
        midWidth,
        midHeight
    );
    
    noStroke();
    drawLabel(angle, 0, color(255, 0, 0));
    drawLabel(angle, -2 * angle, color(0, 0, 255));
    drawLabel(refractedAngle, 180, color(0, 255, 0));
}
function updateAngles () {
    selected = '';
    if (
        mouseX <= midWidth && mouseY <= midHeight || 
        pmouseX < midWidth && pmouseY < midHeight
    ) {
        selected = 'incident';
        angle = atan(
            (midWidth - constrain(mouseX, 0, midWidth)) / 
            (midHeight - constrain(mouseY, 0, midHeight))
        );
        updateCanvas();
    } else if (
        mouseX > midWidth && mouseY <= midHeight ||
        pmouseX > midWidth && pmouseY <= midHeight
    ) {
        selected = 'reflechi';
        angle = atan(
            (constrain(mouseX, midWidth, width) - midWidth) / 
            (midHeight - constrain(mouseY, 0, midHeight))
        );
        updateCanvas();
    } else if (
        mouseX > midWidth && mouseY > midHeight ||
        pmouseX > midWidth && pmouseY > midHeight
    ) {
        selected = 'refracte';
        angle = getAngle(atan(
                    (constrain(mouseX, midWidth, width) - midWidth) / 
                    (constrain(mouseY, midHeight, height) - midHeight)
                ));
        updateCanvas();
    }
}

updateCanvas();

mouseDragged = updateAngles;
mouseClicked = updateAngles;

keyPressed = function () {
    
    if (selected === 'incident' || selected === 'reflechi') {
        var offset = 0;
        
        if (
            keyCode === UP ||
            keyCode === LEFT && selected === 'reflechi' ||
            keyCode === RIGHT && selected === 'incident'
        ) {
            offset = -0.1;
        } else if (
            keyCode === DOWN ||
            keyCode === RIGHT && selected === 'reflechi' ||
            keyCode === LEFT && selected === 'incident'
        ) {
            offset = 0.1;
        }
        
        angle = arrondi(angle + offset);
        updateCanvas();
    } else if (selected === 'refracte') {
        if (keyCode === UP || keyCode === RIGHT) {
            refractedAngle = arrondi(refractedAngle + 0.1);
        } else if (keyCode === DOWN || keyCode === LEFT) {
            refractedAngle = arrondi(refractedAngle - 0.1);
        }
        
        angle = getAngle(refractedAngle);
        updateCanvas();
    }
};