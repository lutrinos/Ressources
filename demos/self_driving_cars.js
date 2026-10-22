// https://www.khanacademy.org/computer-programming/self-driving-cars/5424976789356544

/**
 * A naive implementation of a genetic algorithm, which is used to drive autonomous cars on a tiny car track.
 * 
 * I did it as a kind of "proof of concept", even though I'm quite proud of the result :P
 * 
 * The score is computed thanks to some algebra related to distances in pre-Hilbert spaces, and I think it was the most interesting part of this project.
 * 
 * After many generations, it can start glitching because of an unknown bug... I suppose it is something related to the garbage collector. I'm interested if you have any clues!
 * 
 * Press
 * - R to how/hide the road
 * - C to show/hide the cars' captors
 * - S to print/not print stats
 * - K to skip to next generation
 * - UP/DOWN key to increase/decrease the mutation probability
 * - LEFT/RIGHT key to decrease/increase the mutation importance (the offset with be greater)
 * 
 * Have fun!
**/

var wide = 16;
var radius = 5;
var sensors = 7;

var params = {
    acceleration: 1,
    rotation: PI / 8,
    maxSpeed: 6,
    minSpeed:1,
};

var probability = 0.1;
var poffset = 0.2;

smooth();

var show = {
    sensors: false,
    road: true,
    stats: false
};
var weight = {
    offset: 5,
    score: 20,
    steps: 1
};

var n = 50;

angleMode = "radians";
strokeJoin(ROUND);

/**
 * Many functions
 * - sigmoid
 * - isTrue returning true with a p probability
 * - mergeArray merges two arrays with the same length by randomly picking elements
 * - randint2 to pick and element from a list according to an array of probabilities
**/
var sigmoid = function(x) {
    return 1 / (1 + exp(-x));
    //return 2 / (1 + exp(-x)) - 1;
};
var isTrue =  function(p) {
    if (typeof p !== "number") {
        p = 0.1;
    }
    return random() <= p;
};
var mergeArray = function(a, b) {
    return a.map(function(x, i) {
        if (isTrue()) {
            return b[i];
        }
        return x;
    });
};
var randint2 = function(w) {
    var r = random();
    var i = 0;
    while (r > w[i] && i < w.length - 1) {
        r -= w[i];
        i += 1;
    }
    return i;
};

/**
 * Naive implementation of some matrix operations
**/
var Matrix = function(n, p) {
    this.n = n;
    this.p = p;
    
    this.matrix = Array(this.n * this.p);
};
Matrix.prototype.override = function(arr) {
        if (arr.length !== this.n *  this.p) {
            throw Error("Taille invalide.");
        }
        this.matrix = arr;
    };
Matrix.prototype.fill = function(x) {
        for (var i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = (2 * random()) - 1;
            //2 * noise(x, i / this.matrix.length) - 1;
        }
    };
Matrix.prototype.index = function(i, j) {
        if (i < 0 || j < 0 || i >= this.n || j >= this.p) {
            throw Error("Mauvaise position !");
        }
        return i * this.p + j;
    };
Matrix.prototype.set = function(i, j, v) {
        this.matrix[this.index(i, j)] = v;
    };
Matrix.prototype.get = function(i, j) {
        return this.matrix[this.index(i, j)];
    };
Matrix.prototype.multiply = function(m) {
    if (this.p !== m.n) {
        throw Error("Incompatibilité des dimensions");
    }
    
    var result = new Matrix(this.n, m.p);
    
    for (var i = 0; i < result.n; i++) {
        for (var j = 0; j < result.p; j++) {
            var value =  0;
            
            for (var k = 0; k < this.p; k++) {
                value += this.get(i, k) * m.get(k, j);
            }
            
            result.set(i, j, value);
        }
    }
    
    return result;
};
Matrix.prototype.add = function(m) {
    if (this.n !== m.n || this.p !== m.p) {
        throw Error("Dimensions invalides");
    }
    
    for (var i = 0; i < this.matrix.length; i++) {
        this.matrix[i] += m.matrix[i];
    }

};
Matrix.prototype.factor = function(alpha) {
        var result = new Matrix(this.n, this.p);
        
        for (var i = 0; i < this.matrix.length; i++) {
            this.matrix[i] *= alpha;
        }
        
        return result;
    };
Matrix.prototype.print = function() {
        for (var i = 0; i < this.n; i++) {
            println(
                "| " +
                this.matrix
                .slice(this.index(i, 0), this.index(i, this.p))
                .join(", ") +
                " |"
            );
        }
    };
Matrix.prototype.merge = function(a, b) {
        this.matrix = mergeArray(a.matrix, b.matrix);
    };
Matrix.prototype.mutate = function(a, b) {
        for (var i = 0; i < this.matrix.length; i++) {
            if (isTrue(probability)) {
                this.matrix[i] += map(random(), 0, 1, a, b);
            }
        }
    };

/**
 * Basic implementation of a neural network
 * 
 * Notes : All the matrixes are fed with deterministic values
**/
var Network = function(layers) {
    this.weights = [];
    this.biases = [];
    
    for (var i = 1; i < layers.length; i++) {
        var w = new Matrix(layers[i], layers[i-1]);
        var b = new Matrix(layers[i], 1);
        
        w.fill(i);
        b.fill(i);
        
        this.weights.push(w);
        this.biases.push(b);
    }
    
    this.propagate = function(m) {
        for (var i = 0; i < this.weights.length; i++) {
            m = this.weights[i].multiply(m);
            m.add(this.biases[i]);
            
            for (var j = 0; j < m.matrix.length; j++) {
                m.matrix[j] = sigmoid(m.matrix[j]);
            }
        }
        return m;
    };
};

/**
 * Draw the path and computes the scores
**/
var Arc = function(x1, y1, x2, y2, x3, y3) {
    this.point = new PVector(x3, y3);
    this.center = new PVector(x2, y2);
    this.radius = dist(x1, y1, x2, y2);
    
    this.trigonometric = true;
    this.start = 0;
    this.stop = 0;
    
    this.draw = function() {
        endShape();
        arc(
            this.center.x,
            this.center.y,
            this.radius * 2,
            this.radius * 2,
            this.start,
            this.stop
        );
        
        if (!show.road) {
            noStroke();
            fill(255, 0, 0);
            ellipse(x1, y1, 5, 5);
            ellipse(x2, y2, 5, 5);
            ellipse(x3, y3, 5, 5);
            noFill();
            stroke(255, 255, 255);
        }
        
        beginShape();
        vertex(x3, y3);
    };
    
    this.between = function(x, y) {
        return (x - x1) * (y3 - y1) - (y - y1) * (x3 - x1) < 0 === this.trigonometric;
    };
    this.max = function() {
        return this.radius * (this.stop - this.start);
    };
    this.score = function(position) {
        if (this.between(position.x, position.y)) {
            var vec = PVector.sub(position, this.center);
            var h = vec.heading();
            var d = dist(
                vec.x, vec.y,
                this.radius * vec.x / vec.mag(),
                this.radius * vec.y / vec.mag()
            );
            
            if (d <= wide) {
                // TODO: a > 180º
                var a = PVector.angleBetween(
                    PVector.sub(
                        new PVector(x1, y1),
                        this.center
                    ),
                    vec
                );
                
                return [
                    this.radius * a,
                    d
                ];
            }
        }
        
        return [-1, 0];
    };
    
    this.compute = function() {
        
        // We compute the media of the AB and BC segments
        var m1 = new PVector(
            (x1 + x2) / 2,
            (y1 + y2) / 2
        );
        var m2 = new PVector(
            (x2 + x3) / 2,
            (y2 + y3) / 2
        );
        
        // Then the some vectors (idk their names in english, ce sont les vecteurs directeurs des médiatrices en français)
        var v1 = new PVector(x2 - x1, y2 - y1);
        var v2 = new PVector(x3 - x2, y3 - y2);
        v1.rotate(PI / 2);
        v2.rotate(PI / 2);
        
        // Thanks to that, we got the circle's center coordinates
        this.center.x = (m1.x * v1.y / v1.x - m2.x * v2.y / v2.x + m2.y - m1.y) / (v1.y / v1.x - v2.y / v2.x);
        this.center.y = v1.y * (this.center.x - m1.x) / v1.x + m1.y;   
        
        // We find wether rotation is in the trigonometric sens with the determinant of the matrix
        this.trigonometric = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) < 0;
        
        // We compute the points' angles
        var a = new PVector(
            x1 - this.center.x,
            y1 - this.center.y
        );
        var b = new PVector(
            x2 - this.center.x,
            y2 - this.center.y
        );
        var c = new PVector(
            x3 - this.center.x,
            y3 - this.center.y
        );
        
        this.start = a.heading();
        this.stop = c.heading();
        this.radius = a.mag();
        
        if (this.trigonometric) {
            var temp = this.start;
            this.start = this.stop;
            this.stop = temp;
        }
        
        if (this.between(0, this.center.y)) {
            this.stop += 2 * PI;
        }
    };
    
    this.compute();
};
var Path = function() {
    this.origin = new PVector(0, 0);
    this.dir = new PVector(0, 0);
    
    this.points = [];
    this.maxScore = 0;
};
Path.prototype.draw = function() {
        noFill();
        stroke(255, 255, 255);
        
        if (show.road) {
            strokeWeight(wide * 2);
        } else {
            strokeWeight(1);
        }
        
        beginShape();
        var p;
        for (var i = 0; i < this.points.length; i++) {
            p = this.points[i];
            
            if (p.constructor.name === "PVector") {
                vertex(this.points[i].x, this.points[i].y);
            } else {
                p.draw();
            }
        }
        endShape();
        
        if (!show.road) {
            noStroke();
            fill(255, 0, 0);
            for (var i = 0; i < this.points.length; i++) {
                p = this.points[i];
            
                if (p.constructor.name === "PVector") {
                    ellipse(this.points[i].x, this.points[i].y, 5, 5);
                }
            }
        }
    };
Path.prototype.compute = function() {
        var p = this.points[this.points.length - 1];
        
        if (p.constructor.name === "PVector") {
            this.maxScore = this.score(p)[0];
        } else {
            this.maxScore = this.score(p.point)[0];
        }
    };
Path.prototype.score = function(position) {
    // To compute the score of a position
    // The score is -1 if the position is out of the path
    // It is the length of the path travelled otherwise
        var score = 0;
        
        for (var i = 0; i < this.points.length - 1; i++) {
            var a = this.points[i];
            var b = this.points[i + 1];
            var isArcAfter = i < this.points.length - 2 && this.points[i + 2].constructor.name !== "PVector";
            
            // Si c'est un arc
            if (b.constructor.name !== "PVector") {
                var res = b.score(position);
                
                if (res[0] !== -1) {
                    return [score + res[0], res[1]];
                }
                score += b.max();
                continue;
            }
            
            if (a.constructor.name !== "PVector") {
                a = a.point;
            }
            
            // On calcule le vecteur directeur du segment [AB]
            var droite = PVector.sub(b, a);
            
            // On prend avec A comme origine
            var vec = PVector.sub(position, a);
            
            // On calcule le projeté sur la droite AB
            var factor = droite.dot(vec) / pow(droite.mag(), 2);
            var projete = PVector.mult(droite, factor);
            
            // On vérifie que la position est sur la route
            if (
                factor >= 0 - wide / droite.mag() &&
                factor <= 1 + (isArcAfter ? wide / droite.mag() : 0) &&
                projete.dist(vec) <= wide
            ) {
                return [
                    score +  factor * droite.mag(),
                    projete.dist(vec)
                ];
            }
            
            // On augmente le score !
            score += droite.mag();
        }
        
        return [-1, 0];
    };
Path.prototype.arc = function(x1, y1, x2, y2) {
        var p = this.points[this.points.length - 1];
        
        if (p.constructor.name !== "PVector") {
            p = p.point;
        }
        
        this.points.push(
            new Arc(p.x, p.y, x1, y1, x2, y2)
        );
        this.compute();
    };
Path.prototype.point = function(x, y) {
        this.points.push(
            new PVector(x, y)
        );
        
        if (this.points.length === 1) {
            this.origin = this.points[0].get();
        } else if (this.points.length === 2) {
            this.dir = PVector.sub(this.points[1], this.points[0]);
            this.dir.normalize();
        }
        this.compute();
    };

/**
 * Cell implementation
**/
var Cell = function(pos) {
    this.pos = pos;
    this.dir = new PVector(0, -1);
    this.speed = params.minSpeed;
    this.alive = true;
    
    this.data = {
        score: 0,
        offset: 0,
        steps: 0
    };
    
    this.sensors = Array(sensors);
    this.network = new Network([
        2 * sensors, 2
    ]);
    
    for (var i = 0; i < sensors; i++) {
        var alpha = floor((i+1)/2)*pow(-1,i)*PI/sensors;
        var rad = radius*0.75 + 4*radius*exp(-pow(alpha, 2));
        //var x = floor(i / 2) * radius * 2;
        //var y = (i % 2) * 2*radius - radius;
        
        this.sensors[i] = new PVector(
                rad * cos(alpha),
                rad * sin(alpha)
        );
    }
    
    this.draw = function(path) {
        
        // On dessine la voiture / cellule
        pushMatrix();
        
        translate(this.pos.x, this.pos.y);
        rotate(this.dir.heading());
        noStroke();
        var w = 4 * radius;
        var h  = 2 * radius;

        noStroke();
        fill(0, 0, 0);
        rect(-0.4*w, - 0.6 * h, 0.25 * w, 1.2 * h, 100);
        rect(0.1*w, - 0.6 * h, 0.25 * w, 1.2 * h, 100);

        fill(255, 0, 0);
        rect(- 0.5 * w, - 0.5 * h, w, h, 100);
        
        fill(163, 238, 255, 200);
        rect(0.1*w, -0.4*h, 0.25*w, 0.8*h, 60);
        rect(-0.4*w, -0.4*h, 0.46*w, 0.8*h, 40);
        
        popMatrix();
        
        // On dessine et met à jour les capteurs
        var input = new Matrix(2 * sensors, 1);
        
        for (var i = 0; i < sensors; i++) {
            
            var r = PVector.rotate(
                this.sensors[i],
                this.dir.heading()
            );
            
            var _ = path.score(
                PVector.add(this.pos, r)
            );
            
            var score = _[0];
            var offset = _[1];
            
            input.set(2*i, 0, sigmoid(score / path.maxScore));
            input.set((2*i)+1, 0, offset / wide);
            
            if (show.sensors) {
                fill(238, 0, 255);
                if (score === -1) {
                    fill(255, 111, 0);
                }
            
                ellipse(
                    this.pos.x + r.x,
                    this.pos.y + r.y,
                    radius / 2, radius / 2
                );
            }
        }
        
        // On met à jour la position
        var out = this.network.propagate(input);
        
        this.dir.rotate(
            map(out.get(0, 0), 0, 1, -1, 1) * params.rotation
        );
        this.speed = map(out.get(1, 0), 0, 1, params.minSpeed, params.maxSpeed);
        /*this.speed += map(out.get(1, 0), 0, 1, 1, - 0.5) * params.acceleration;
        this.speed = constrain(
            this.speed,
            params.minSpeed,
            params.maxSpeed
        );*/
        
        this.pos.add(PVector.mult(this.dir, this.speed));
        
        // On met à jour les données
        var res = path.score(this.pos, true);
        this.data.steps += 1;
        this.data.offset += res[1];
        
        
        // Vérifie si la voiture est toujours sur la route dans le bon sens
        if (this.dead(path)) {
            this.alive = false;
        } else {
            this.data.score = res[0];
            //max(this.data.score, res[0]);
        }
    };
    
    this.dead = function(path) {
        var c1 = path.score(this.pos)[0];
        return c1 === -1 || (path.maxScore - c1) <= wide;
    };
    
    this.mutate = function() {
        for (var i = 0; i < this.network.weights.length; i++) {
            this.network.weights[i].mutate(- poffset, poffset);
            this.network.biases[i].mutate(-poffset, poffset);
        }
    };
    
    this.merge = function(a, b) {
        for (var i = 0; i < this.network.weights.length; i++) {
            this.network.weights[i].merge(
                a.network.weights[i],
                b.network.weights[i]
            );
            this.network.biases[i].merge(
                a.network.biases[i],
                b.network.biases[i]
            );
        }
    };
};

/**
 * Genetic algorithm implementation
**/
var Genetic = function(n) {
    this.count = 0;
    this.cells = [];
    this.n = n;
    
    this.fill = function(v) {
        this.cells = Array(this.n);
        
        for (var i = 0; i < this.n; i++) {
            this.cells[i] = new Cell(v.get());
        }
    };
    
    this.draw = function(path) {
        var next = true;
    
        for (var i = 0; i < this.cells.length; i++) {
            var c = this.cells[i];
            
            if (c.alive) {
                c.draw(path);
                next = false;
            }
        }
        
        if (next) {
            this.forward(path);
        }
    };
    
    this.forward = function(path) {
        // We compute some values
        var m = ceil(0.1 * n);
        var maxSteps = 0;
        var maxScore = 0;
        var totalScore = 0;
        
        var repartition = Array(this.n);
        var cells = this.cells;
        this.cells = Array(this.n);
        
        for (var i = 0; i < this.n; i++) {
            var c = cells[i];
            
            maxSteps = max(maxSteps, c.data.steps);
            maxScore = max(maxScore, c.data.score);
        }
        
        for (var i = 0; i < this.n; i++) {
            var c = cells[i];
            
            c.score = (
                weight.steps * (maxSteps - c.data.steps) / maxSteps +
                weight.score * c.data.score +
                weight.offset * c.data.offset / (c.data.steps * wide)
            );
            
            if (c.alive) {
                c.score = 0;
            }
            
            totalScore += c.score;
        }
        
        for (var i = 0; i < this.n; i++) {
            repartition[i] = cells[i].score / totalScore;
        }
        
        // We sort cells
        cells.sort(function (a, b) {
            return b.score - a.score;
        });
        
        if (show.stats) {
            var averageScore = 0;
            var averageTime = 0;
        
            for (var i = 0; i < m; i++) {
                averageScore += cells[i].data.score / m;
                averageTime += cells[i].data.steps / m;
            }
            
            println("-\nAverage score : " + averageScore.toFixed(1));
            println("Average time : " + averageTime.toFixed(1));
        }
        
        // We add first cells
        for (var i = 0; i < m; i++) {
            var c = new Cell(path.origin.get());
            c.network = cells[i].network;
            this.cells[i] = c;
        }
        
        // We "reproduce" cells
        for (var i = m; i < this.n; i++) {
            var a = cells[randint2(repartition)];
            var c = new Cell(path.origin.get());
            
            c.merge(a, a);
            c.mutate();
            
            this.cells[i] = c;
        }
        
        this.count++;
    };
};

var path = new Path();

path.point(300, 260);
path.point(300, 120);
path.arc(340, 80, 380, 120);
path.point(380, 240);
path.arc(420, 280, 460, 240);
path.point(460, 100);
path.point(520, 100);
path.point(520, 500);
path.arc(506, 546, 440, 580);
path.point(300, 580);
path.arc(200, 500, 300, 400);
path.point(300, 460);
path.arc(310, 500, 340, 520);
path.point(390, 520);
path.arc(468, 430, 390, 340);
path.point(140, 340);
path.point(140, 500);
path.arc(100, 560, 20, 500);
path.point(20, 100);
path.arc(60, 60, 100, 100);
path.point(100, 200);
path.arc(140, 240, 180, 200);
path.point(180, 140);
path.arc(210, 60, 283, 20);
path.point(580, 20);
path.point(580, 560);

var genetic = new Genetic(n);
genetic.fill(path.origin, path.dir);

frameRate(60);

draw = function() {
    
    background(187, 232, 116);
    path.draw();
    genetic.draw(path);
    
    fill(123, 255, 0);
    noStroke();
    ellipse(path.origin.x, path.origin.y, wide, wide);
    
    fill(0, 0, 0);
    text(this.__frameRate.toFixed(1) + " FPS", 2, 12);
    text("Gen #" + genetic.count, 2, 24);
    text(round(probability * 100)  + "% mutation", 2, 36);
    text(poffset.toFixed(1) + " offset", 2, 48);
    
    var s = "Score " + round(path.score(new  PVector(mouseX, mouseY))[0]);
    var w = textWidth(s);
    fill(48, 145, 0);
    rect(max(0, mouseX - w - 5), max(mouseY - 16, 0), w + 10, 16);
    fill(255, 255, 255);
    text(s, max(mouseX - w, 0), max(mouseY - 3, 13));
    
};

var codes = {
    s: 83,
    r: 82,
    n: 78,
    k: 75,
    c: 67,
};
keyPressed = function() {
    //println(keyCode);
    switch (keyCode) {
        case codes.c:
            show.sensors = !show.sensors;
            break;
        case codes.r:
            show.road = !show.road;
            break;
        case codes.s:
            show.stats = !show.stats;
            break;
        case codes.k:
            genetic.forward(path);
            break;
        case codes.n:
            break;
        case UP:
            probability += 0.01;
            break;
        case DOWN:
            probability -= 0.01;
            break;
        case LEFT:
            poffset -= 0.1;
            break;
        case RIGHT:
            poffset += 0.1;
            break;
    }
    
    probability = constrain(probability, 0, 1);
    poffset = max(poffset, 0);
};
