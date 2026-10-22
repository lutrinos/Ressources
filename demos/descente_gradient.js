// https://www.khanacademy.org/computer-programming/descente-de-gradient/5011044381605888

var X = random() * width - 200;
var step = 0.1;
var precision = 0.1;

var f = function(x) {
  return x * sin(4*x) / 2;  
};

var getX = function(x) {
    return x + 200;
};

var getY = function(y) {
    return 200 - y;
};

draw = function() {
    background(255, 255, 255);
    
    // Axis
    stroke(0, 0, 0);
    line(0, 200, 400, 200);
    line(200, 0, 200, 400);
    
    // Function's  curve
    noFill();
    stroke(0, 0, 255);
    beginShape();
    for (var x = - 200; x <= 200; x++) {
        curveVertex(getX(x), getY(f(x)));
    }
    endShape();
    
    // Function's tangent in x
    var derivative = (f(X + precision) - f(X - precision)) / (2 * precision);
    
    stroke(0, 255, 17);
    line(
        getX(200),  getY(f(X) + derivative * (200 - X)),
        getX(-200), getY(f(X) + derivative * (-200 - X))
    );
    
    // Function point in X
    fill(255, 0, 0);
    noStroke();
    ellipse(getX(X), getY(f(X)), 4, 4);
    
    X = X - step * derivative;
};
