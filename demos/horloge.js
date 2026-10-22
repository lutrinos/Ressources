
textAlign(CENTER, CENTER);
var midWidth = width / 2;
var midHeight = height / 2;
var radius = midWidth - 20;

function Pointer (radius, value, weight, offset) {
    this.radius = radius;
    this.weight = weight;
    this.offset = offset;
    
    this.update(value);
}
Pointer.prototype.update = function(value) {
    this.angle = value *  - this.offset - 180;
};
Pointer.prototype.draw = function() {
    strokeWeight(this.weight);
    stroke(0, 0, 0);
    line(midWidth, midHeight, midWidth + sin(this.angle) * this.radius, midHeight + sin(90 - this.angle) * this.radius);
};

var hours = new Pointer(radius * 0.4, hour(), 5, 30);
var minutes = new Pointer(radius * 0.6, minute(), 2, 6);
var seconds = new Pointer(radius * 0.9, second(), 1, 6);

var labels = [];
var scalings = [];

for (var i = 1; i < 13; i++) {
    labels.push([
        i,
        midWidth + sin(30 * i) * (radius - 20),
        midHeight + sin(i * 30 + 270) * (radius - 20)
    ]);
}

for (var i = 0; i < 60; i++) {
    scalings.push([
        midWidth + sin(i * 6) * radius,
        midHeight + sin(i * 6 + 90) * radius,
        midWidth + sin(i * 6) * (radius - 4),
        midHeight + sin(i * 6 + 90) * (radius - 4)
    ]);
}

frameRate(1);

draw = function() {
    background(255, 255, 255);
    
    // we draw the center of the clock
    strokeWeight(1);
    stroke(0, 0, 0);
    fill(0, 0, 0);
    ellipse(midWidth, midHeight, 12, 12);
    
    // we draw the clock
    noFill();
    ellipse(midWidth, midHeight, radius * 2, radius * 2);
    
    // we draw the numbers
    textSize(24);
    for (var i = 0; i < labels.length; i++) {
        text(labels[i][0], labels[i][1], labels[i][2]);
    }
    
    // we draw the scalings
    for (var i = 0; i < scalings.length; i++) {
        line(scalings[i][0], scalings[i][1], scalings[i][2], scalings[i][3]);
    }
    
    // we show the current day
    textSize(16);
    text(year() + ' / ' + month() + ' / ' + day(), midWidth, midHeight + 50);
    
    // we update the pointers
    hours.update(hour() + minute() / 60);
    minutes.update(minute() + second() / 60);
    seconds.update(second());
    
    // we draw the pointers
    hours.draw();
    minutes.draw();
    seconds.draw();
};