/**
 * Visualisation d'une onde à une dimension
 * 
 * Lien : https://www.khanacademy.org/computer-programming/onde-1d/5778482964054016
 */

var hist = [];
var colors = {
    background: color(255, 255, 255),
    node: color(255, 0, 242),
    edge: color(0, 0, 0),
};

// Signal
var s = function(x, t) {
    return 75 * cos(5*t - 3*x) * sin(t);
};


draw = function() {
    background(colors.background);
    
    stroke(colors.edge);
    line(0, 0.5 * height, width, 0.5 * height);
    line(0.5 * width, 0, 0.5 * width, height);
    
    noFill();
    stroke(colors.node);
    beginShape();
    for (var x = 0; x <= width; x++) {
        curveVertex(x, 0.5 * height - s(x, frameCount));
    }
    endShape();
    
    fill(0, 255, 43);
    var v = s(0.5 * width, frameCount);
    hist.push(v);
    ellipse(0.5 * width, 0.5 * height - v, 10, 10);
    
    fill(colors.background);
    stroke(232, 232, 232);
    rect(0.5 * width, 0, 0.5 * width - 1, 0.25 * height);
    stroke(colors.edge);
    line(0.5 * width, 0.125 * height, width, 0.125 * height);
    
    noStroke();
    fill(colors.node);
    for (var i = 0; i < hist.length; i++) {
        ellipse(0.5 * width + hist.length - i, 0.125 * height - 0.25 * hist[i], 1, 2);
    }
    fill(0, 255, 43);
    ellipse(0.5 * width, 0.125 * height - v * 0.25, 4, 4);
    
    if (hist.length > 0.5 * width) {
        hist.shift();
    }
    
};