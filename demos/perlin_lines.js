
// (function(){return this;})().LoopProtector.prototype.leave=function(){};

smooth();

var Shape = function() {
    var args = arguments[0] || {};
    
    this.points = [[random() * width, random() * height]];
    this.offset = args.offset || 0;
    this.speed = args.speed || 0.001;
    this.color = args.color || color(102, 255, 0);
    this.weight = args.weight || 2;
    this.length = args.length || 100;
    
    this.generate = function() {
        this.offset += this.speed;
        
        var last = this.points[this.points.length - 1];
        var angle = map(noise(this.offset), 0, 1, 0, 1000);
        
        return [
            (last[0] + cos(angle) + width) % width,
            (last[1] + sin(angle) + height) % height
        ];
    };
    
    this.push = function() {
        this.points.push(this.generate());
    };
    
    this.draw = function() {
        stroke(this.color);
        strokeWeight(this.weight);
        noFill();
        
        var prev = [0, 0];
        
        beginShape();
    
        for (var i = 0; i < this.points.length; i++) {
            var p = this.points[i];
            
            if (dist(prev[0], prev[1], p[0], p[1]) > 100) {
                endShape();
                beginShape();
            }
            
            curveVertex(this.points[i][0],  this.points[i][1]);
            prev = p;
        }
    
        endShape();
        
        this.points.shift();
        this.push();
    };
    
    for (var i = 0; i < this.length; i++) {
        this.push();
    }
};

var shapes = [
    new Shape(),
    new Shape({
        offset: 100,
        color: color(255, 140, 240),
        weight: 1,
        length: 200,
        speed: 0.001
    }),
    new Shape({
        offset: 1000,
        color: color(255, 225, 0),
        weight: 4,
        length: 30
    }),
    new Shape({
        offset: 10,
        color: color(255, 145, 0),
        length: 40,
        speed: 0.01
    }),
    new Shape({
        offset: 160,
        color: color(170, 255, 0),
        weight: 4,
        length: 80
    })
];

var time = 0;
draw = function() {
    background(14, 30, 64);
    
    for (var i = 0; i < shapes.length; i++) {
        shapes[i].draw();
    }
};