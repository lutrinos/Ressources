// https://www.khanacademy.org/computer-programming/math-art/5199950501429248

/**
 * 11 shapes drawed with maths (function graphs & polar graphs).
 * 
 * Inspired by https://www.youtube.com/watch?v=nMcCgYHcDww
 * 
 * 
 * Enjoy!
 * 
 * 
 * 
 * Made on November 1, 2023
 */


angleMode = "radians";
textAlign(CENTER);


var transition = 0;
var transitionDuration = 100;

var Shape = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.r = args.r;
    
    this.title = args.title;
    this.scale = args.scale;
    this.duration = args.duration;
    this.limit = args.limit;
    this.color = args.color;
    
    this.scaleWidth = floor(width / (6 * this.scale));
    this.scaleTop = height / 2 - 10;
    this.scaleLeft = - (width / 2) + 10;
    
    this.points = [];
    this.time = 0;
    this.drawing = false;
};
Shape.prototype.begin = function () {
    this.drawing = true;
};
Shape.prototype.draw = function() {
    noFill();
    
    pushMatrix();
    translate(width / 2, height / 2);
    
    strokeWeight(1);
    stroke(255, 255, 255, 100);
    fill(255, 255, 255, 100);
    line(- width, 0, width, 0);
    line(0, - height, 0, height);
    
    textSize(16);
    line(this.scaleLeft, this.scaleTop, this.scaleLeft + this.scaleWidth * this.scale, this.scaleTop);
    text(this.scaleWidth, this.scaleLeft + (this.scaleWidth * this.scale) / 2, this.scaleTop - 6);
    
    stroke(this.color);
    strokeWeight(3);
    noFill();
    
    beginShape();
    
    for (var i = 0; i < this.points.length; i++) {
        curveVertex(this.points[i][0] * this.scale, this.points[i][1] * this.scale);
    }
    
    endShape();
    
    
    
    popMatrix();
    
    textSize(50);
    
    fill(22, 32, 66);
    noStroke();
    rect(width / 2 - textWidth(this.title) / 2 - 10, 0, textWidth(this.title) + 20, 60);
    
    fill(this.color);
    
    text(this.title, width / 2, 50);
    
    if (this.drawing) {
        this.time += 0.1;
        
        if (this.time < this.limit) {
            if (this.r) {
                var result = this.r(this.time);
                this.points.push([cos(this.time) * result, - sin(this.time) * result]);
            } else {
                this.points.push([this.x(this.time), - this.y(this.time)]);
            }
        }
    }
};
Shape.prototype.isFinished = function () {
    return this.time >= this.duration;
};
Shape.prototype.isDrawing = function () {
    return this.drawing;
};

var shapes = [
    {
        title: "Star",
        scale: 20,
        duration: 25, // frameCount
        limit: 20, // frameCount
        color: color(255, 230, 0),
        x: function (t) {
            return 2 * cos(t) + 5 * cos(2 * t / 3);
        },
        y: function (t) {
            return 2 * sin(t) - 5 * sin(2 * t / 3);
        }
    },
    {
        title: "Rose",
        scale: 10,
        duration: 25,
        limit: 20,
        color: color(238, 0, 255),
        x: function (t) {
            return 8 * cos(t) - 6 * cos(8 * t / 3);
        },
        y: function (t) {
            return 8 * sin(t) - 6 * sin(8 * t / 3);
        }
    },
    {
        title: "Spiral",
        scale: 5,
        duration: 50,
        limit: 45,
        color: color(0, 204, 255),
        r: function (t) {
            return exp(t / 9);
        }
    },
    {
        title: "Butterfly",
        scale: 40,
        duration: 30,
        limit: 20,
        color: color(0, 255, 47),
        r: function (t) {
            return exp(sin(t)) - 2 * cos(4 * t) + pow(sin((4*t - PI) / 24), 5);
        }
    },
    {
        title: "Linked circles",
        scale: 40,
        duration: 30,
        limit: 20,
        color: color(255, 0, 208),
        r: function (t) {
            return 4 * sin(0.5 * t);
        },
    },
    {
        title: "Rosette",
        scale: 40,
        duration: 54,
        limit: 44,
        color: color(0, 234, 255),
        r: function (t) {
            return 4 * sin(0.8 * t);
        },
    },
    {
        title: "Giant Sungold",
        scale: 40,
        duration: 70,
        limit: 64,
        color: color(242, 255, 0),
        r: function (t) {
            return 4 * sin(0.9 * t);
        },
    },
    {
        title: "Flower",
        scale: 55,
        duration: 20,
        limit: 10,
        color: color(119, 255, 0),
        r: function (t) {
            return 2 * sin(5 * t);
        },
    },
    {
        title: "Lissajous curve",
        scale: 55,
        duration: 20,
        limit: 20,
        color: color(166, 0, 255),
        x: function (t) {
            return 2 * sin(2 * t);
        },
        y: function (t) {
            return 2 * cos(3 * t);
        },
    },
    {
        title: "Curves",
        scale: 55,
        duration: 50,
        limit: 100,
        color: color(0, 255, 251),
        x: function (t) {
            return 2 * sin(t) + 0.6 * cos(2.8 * t);
        },
        y: function (t) {
            return 2 * cos(t);
        },
    },
    {
        title: "Straight curves",
        scale: 55,
        duration: 50,
        limit: 64,
        color: color(255, 0, 213),
        r: function (t) {
            return tan(2 * t / 5);
        },
    },
];

var currentShapeIndex = 0;
var currentShape = new Shape(shapes[currentShapeIndex]);

draw = function() {
    background(22, 32, 66);
    
    if (transition > 0 && transition <= transitionDuration) {
        if (transition === transitionDuration / 2) {
            currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
            currentShape = new Shape(shapes[currentShapeIndex]);
        }
        
        
        currentShape.draw();
        
        fill(22, 32, 66, sin(map(transition, 0, transitionDuration, 0, Math.PI)) * 1000);
        noStroke();
        rect(0, 0, width, height);
        
        transition += 1;
        
    } else {
        transition = 0;
        
        currentShape.draw();
        
        if (!currentShape.isDrawing()) {
            currentShape.begin();
        }
    
        if (currentShape.isFinished()) {
            transition = 1;
        }
    }
};
