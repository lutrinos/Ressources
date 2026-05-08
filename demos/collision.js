
/**
 * It will be a bit tricky to write all the calculations, but this wikipedia page more or less explains the reasoning.
 * 
 * https://en.wikipedia.org/wiki/Elastic_collision
 * 
 * Made on 06/04/2024 (DD/MM/YYY)
 * 
 * https://www.khanacademy.org/computer-programming/collisions-one-dimension/4873815556014080
**/

// image/seconde
var ratio = 300 / 1;

frameRate(ratio);

var calculateSpeed = function(Va, Ma, Vb, Mb) {
    return ((2 * Mb * Vb) + (Va * (Ma - Mb))) / (Ma + Mb);
};

var Sphere = function(args) {
    // px
    this.x = args.x;
    this.y = args.y;
    
    this.newX = this.x;
    
    // px
    this.radius = args.radius;
    
    // px/s
    this.speed = args.speed;
    this.color = args.color;
    
    // g (approximate)
    this.mass = 0.1 * PI * pow(this.radius, 3) * 4 / 3;
    
    var m = millis();
    
    this.draw = function() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

        this.prevX = this.x;
        this.x += this.speed / ratio;
        
        if (this.x + this.radius >= width || this.x <= this.radius) {
            this.speed *= -1;
            this.x = constrain(this.x, this.radius, width - this.radius);
        }
    };
    
    this.check = function(sphere) {
        var distance = dist(this.x, this.y, sphere.x, sphere.y);
        if (distance < this.radius + sphere.radius) {
            var Va = this.speed;
            var Vb = sphere.speed;
            
            this.speed = calculateSpeed(Va, this.mass, Vb, sphere.mass);
            sphere.speed = calculateSpeed(Vb, sphere.mass, Va, this.mass);
            
            // If the 2 spheres are partially overlapping
            var diff = (this.radius + sphere.radius - distance) / 2;
            if (this.prevX > sphere.prevX) {
                this.x += diff;
                sphere.x -= diff;
            } else {
                sphere.x += diff;
                this.x -= diff;
            }
        }
    };
};

var l1 = 50;
var l2 = 150;
var l3 = 250;
var l4 = 350;

var spheres = [
    
    /* First line */
    new Sphere({
        x: 10,
        y: l1,
        radius: 10,
        speed: 100,
        color: color(255, 0, 0)
    }),
    new Sphere({
        x: 100,
        y: l1,
        radius: 20,
        speed: 50,
        color: color(0, 0, 255)
    }),
    new Sphere({
        x: 200,
        y: l1,
        radius: 5,
        speed: 100,
        color: color(0, 255, 119)
    }),
    
    /* Second line */
    new Sphere({
        x: 200,
        y: l2,
        radius: 10,
        speed: 0,
        color: color(255, 0, 0)
    }),
    new Sphere({
        x: 100,
        y: l2,
        radius: 20,
        speed: 50,
        color: color(0, 0, 255)
    }),
    new Sphere({
        x: 340,
        y: l2,
        radius: 20,
        speed: - 50,
        color: color(0, 0, 255)
    }),
    
    /* Third line */
    new Sphere({
        x: 100,
        y: l3,
        radius: 20,
        speed: 50,
        color: color(0, 0, 255)
    }),
    new Sphere({
        x: 250,
        y: l3,
        radius: 5,
        speed: 100,
        color: color(0, 255, 119)
    }),
    new Sphere({
        x: 50,
        y: l3,
        radius: 5,
        speed: 100,
        color: color(0, 255, 119)
    }),
    new Sphere({
        x: 200,
        y: l3,
        radius: 5,
        speed: 100,
        color: color(0, 255, 119)
    }),
    new Sphere({
        x: 300,
        y: l3,
        radius: 5,
        speed: 100,
        color: color(0, 255, 119)
    }),
    
    /* Fourth line */
    new Sphere({
        x: 120,
        y: l4,
        radius: 10,
        speed: 100,
        color: color(255, 0, 0)
    }),
    new Sphere({
        x: 160,
        y: l4,
        radius: 10,
        speed: 0,
        color: color(255, 0, 0)
    }),
    new Sphere({
        x: 200,
        y: l4,
        radius: 10,
        speed: 0,
        color: color(255, 0, 0)
    }),
    new Sphere({
        x: 240,
        y: l4,
        radius: 10,
        speed: 0,
        color: color(255, 0, 0)
    }),
    new Sphere({
        x: 280,
        y: l4,
        radius: 10,
        speed: 0,
        color: color(255, 0, 0)
    }),
];

draw = function() {
    background(255, 255, 255);
    
    for (var i = 0; i < spheres.length; i++) {
        spheres[i].draw();
    }
    
    for (var i = 0; i < spheres.length; i++) {
        for (var j = i + 1; j < spheres.length; j++) {
            spheres[i].check(spheres[j]);
        }
    }
};
