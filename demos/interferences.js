/**
 * Visualisation intuitive du principe d'interférences
 * 
 * Lien : https://www.khanacademy.org/computer-programming/interfrences/6432342133030912
 */

/** AMPLITUDES (en pixels) **/
var A1 = 10;
var A2 = 10;

/** LONGUEURS D'ONDES (en pixels) **/
var L1 = 50;
var L2 = 50;

/** VITESSES (en pixels / frame) **/
var V1 = 0.5;
var V2 = 0.5;

var Source = function(x, y, amplitude, lambda, speed, col) {
    this.x = x;
    this.y = y;
    this.amplitude = amplitude;
    this.lambda = lambda;
    this.speed = speed;
    this.color = col;
    this.time = 0;
    
    this.signal = function(d, v) {
        if (v !== undefined) {
            d = dist(this.x, this.y, d, v);
        }
        
        return this.amplitude * sin(360 * d / this.lambda - this.time * 360 * this.speed / this.lambda);
    };
    
    this.draw = function() {
        strokeWeight(1);
        stroke(this.color, 25);
        noFill();
        for (var k = 1; k <= dist(0, 0, width, height) / this.lambda; k += 1) {
            ellipse(this.x, this.y, 2 * k * this.lambda, 2 * k * this.lambda);
        }
        
        var d = dist(this.x, this.y, mouseX, mouseY);
        
        pushMatrix();
        translate(this.x, this.y);
        rotate(atan2(mouseY - this.y, mouseX - this.x));
        
        stroke(204, 204, 204);
        line(0, 0, d, 1);
        
        stroke(this.color);
        fill(this.color);
        ellipse(0, 0, 10, 10);
        
        noFill();
        beginShape();
        vertex(0, 0);
        vertex(0, 0);
        for (var x = 0; x <= d; x += 4) {
            curveVertex(x, this.signal(x));
        }
        endShape();
        
        popMatrix();
        
        this.time += 1;
    };
};

var s1 = new Source(50, 50, A1, L1, V1, color(255, 0, 0));
var s2 = new Source(50, 350, A2, L2, V2, color(4, 0, 255));

draw = function() {
    cursor("none");
    
    background(255, 255, 255);
    s1.draw();
    s2.draw();
    
    var v = map(
        s1.signal(mouseX, mouseY) + s2.signal(mouseX, mouseY),
        - (A1 + A2), A1 + A2,
        0, 80
    );
    
    strokeWeight(2);
    noFill();
    stroke(0, 0, 0);
    line(380, 20, 380, 100);
    
    stroke(234, 0, 255);
    line(370, 20 + v, 390, 20 + v);
};