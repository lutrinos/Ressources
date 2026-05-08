
/**
 * :)
 * 
 * Notes:
 * 
 * Toutes les distances sont en mètres
 * Toutes les vitesses sont en mètres par secondes
**/

var fps = 60;

// L'échelle de temps, en secondes / frame
var timeScale = 1 / fps;

// L'échelle de distance mètres / pixel
var lengthScale = 1000 / 100;


frameRate(fps);

var Onde = function (x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.frames = 0;
    
    this.draw = function() {
        var rayon = (this.frames * timeScale * this.v) / lengthScale;
        
        noFill();
        stroke(255, 0, 0);
        ellipse(this.x, this.y, rayon * 2, rayon * 2);
        
        noStroke();
        fill(0, 0, 0);
        ellipse(this.x, this.y, 2, 2);
    };
    
    this.update = function () {
        this.frames += 1;
    };
};


var ondes = [];
var x = 0;

draw = function() {
    background(255, 255, 255);
    
    noStroke();
    fill(0, 255, 26);
    ellipse(x, 200, 6, 6);
    
    for (var i = 0; i < ondes.length; i++) {
        ondes[i].draw();
        ondes[i].update();
        
        if (ondes[i].frames > 2000) {
            ondes.shift();
        }
    }
    
    if (frameCount % 100 === 0) {
        
        if (x < 400) {
            ondes.push(new Onde(x, 200, 200));
        }
        
        if (x > 600) {
            x = -200;
            ondes = [];
        }
    }
    
    x += 0.2;
};