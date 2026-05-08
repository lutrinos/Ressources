/**
 * 
 * ====================================
 * ====================================
 * ||    ▌ ▌   ▗ ▗▀▖    ▌ ▌▜▘▀▛▘     ||
 * ||    ▙▞ ▛▀▖▄ ▐  ▞▀▖ ▙▄▌▐  ▌      ||
 * ||    ▌▝▖▌ ▌▐ ▜▀ ▛▀  ▌ ▌▐  ▌      ||
 * ||    ▘ ▘▘ ▘▀▘▐  ▝▀▘ ▘ ▘▀▘ ▘      ||
 * ====================================
 * ====================================
 * 
 * To quote its fandom,
 * 
 * "Knife Hit is a game developped by Ketchapp and Estoty. The goal is to throw as much knives as possible against rotating logs."
 * 
 * As of now there are 8 levels, and an infinite level generator
 * 
 * Have fun!
 * 
 * @LEVELS There are currently 8 common levels, and the game creates the others as you go along. Press "p" to print the current level. I will be pleased to accept new levels!
 * 
 * @GRAPHICS I used Gemini to create the draft for some knife/target graphics (a little over two-thirds of them) which I then adapted for my need
 * 
 * https://www.khanacademy.org/computer-programming/knife-hit-final-version/5900784483287040
**/

var hard = false;

/**
 * Drawings
**/
// {
var drawing = {
    wood: [],
    knife: [],
    fruit: {},
    misc: {}
};

function createDrawing(fn, w, h) {
    background(0, 0, 0, 0);
    
    pushMatrix();
    translate(width * 0.5, height * 0.5);
    fn();
    popMatrix();
    
    return get((width - w) * 0.5, (height - h) * 0.5, w, h);
}

// Knives
// {

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(220, 230, 230);
    beginShape();
    vertex(-6, 0);
    vertex(6, 0);
    vertex(6, -50);
    vertex(0, -60);
    vertex(-6, -50);
    endShape();

    // shadow
    fill(180, 190, 190, 150);
    beginShape();
    vertex(0, -60);
    vertex(6, -50);
    vertex(6, 0);
    vertex(1, -25);
    endShape(CLOSE);

    fill(255, 255, 255, 180);
    beginShape();
    vertex(-6, 0);
    vertex(-6, -50);
    vertex(-5, -45);
    vertex(-5, -5);
    endShape(CLOSE);

    // handle
    fill(160, 82, 45);
    rect(-6.5, 0, 13, 35, 8); 

    fill(210, 105, 30, 100);
    rect(-5, 3, 4, 29, 4);

    fill(100, 50, 20, 120);
    rect(1, 3, 4, 29, 4);

    fill(218, 165, 32); 
    rect(-8, -2, 16, 5, 2);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(40);
    beginShape();
    vertex(-7, 0);
    vertex(7, 0);
    vertex(7, -55);
    vertex(-2, -65);
    vertex(-7, -40);
    vertex(-6, -35);
    vertex(-7, -30);
    vertex(-6, -25);
    vertex(-7, -20);
    endShape();

    fill(80);
    beginShape();
    vertex(7, 0);
    vertex(7, -55);
    vertex(-2, -65);
    vertex(5, -20);
    endShape();

    // Handle
    fill(30); 
    rect(-7, 0, 14, 40, 4);

    fill(60, 65, 60);
    rect(-5.5, 3, 11, 8, 2);
    rect(-5.5, 14, 11, 8, 2);
    rect(-5.5, 25, 11, 8, 2);

    fill(255, 255, 255, 30);
    rect(-6, 2, 2, 36, 1);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(200); 
    beginShape();
    vertex(-5, 0);
    vertex(5, 0);
    vertex(5, -55);
    vertex(0, -68);
    vertex(-5, -55);
    endShape();

    fill(150, 150, 160, 100);
    for (var i = 0; i < 6; i++) {
        ellipse(random(-3,3), -10 - i*8, random(3,6), 2);
    }

    fill(255, 255, 255, 200);
    rect(-0.5, -60, 1, 60);

    // Handle
    fill(230, 190, 50); 
    beginShape();
    vertex(-6, 0); vertex(6, 0);
    vertex(8, 30); vertex(0, 38);
    vertex(-8, 30);
    endShape();

    fill(180, 0, 0);
    ellipse(0, 15, 6, 8);
    fill(255, 100, 100, 200);
    ellipse(-1, 14, 2, 3);

    fill(255, 215, 0);
    ellipse(0, 0, 18, 6);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(235, 240, 240); 
    beginShape();
    vertex(-1.5, 0);
    vertex(1.5, 0);
    vertex(12, 0);
    vertex(8, -65);
    vertex(0, -75);
    endShape(CLOSE);

    fill(255, 255, 255, 200);
    beginShape();
    vertex(8, -65);
    vertex(0, -75);
    vertex(2, -40);
    vertex(9, -20);
    endShape();

    fill(100, 100, 110, 30);
    rect(-1.5, -20, 10, 20);

    // Handle
    fill(20); 
    beginShape();
    vertex(-2, 0);
    vertex(2, 0);
    vertex(2, 40);
    vertex(-2, 40);
    endShape();

    fill(200);
    ellipse(0, 8, 3, 3);
    ellipse(0, 20, 3, 3);
    ellipse(0, 32, 3, 3);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Main blade
    fill(160, 165, 170); 
    beginShape();
    vertex(-4, 25);
    vertex(4, 25);
    vertex(3, 0);
    vertex(5, -5);
    vertex(4, -40);
    vertex(0, -60);
    vertex(-4, -40);
    vertex(-5, -5);
    vertex(-3, 0);
    endShape();

    // Blade too
    fill(220, 225, 230);
    beginShape();
    vertex(0, -60);
    vertex(4, -40);
    vertex(5, -5);
    vertex(0, -10);
    vertex(-5, -5);
    vertex(-4, -40);
    endShape();

    // Holes
    fill(30, 30, 30, 150);
    ellipse(0, -20, 4, 4);
    ellipse(0, -32, 3, 3);
    
    // Handle
    ellipse(0, 20, 5, 5);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(130, 135, 140);
    beginShape();
    vertex(-3, 0);
    vertex(3, 0);
    vertex(20, -10);
    vertex(18, -60);
    vertex(-8, -50);
    endShape();

    fill(240, 245, 245);
    beginShape();
    vertex(20, -10);
    vertex(18, -60);
    vertex(15, -55);
    vertex(16, -15);
    endShape(CLOSE);

    // Texture
    fill(80, 80, 85, 80);
    for (var i = 0; i < 8; i++) {
        ellipse(random(-5, 15), random(-45, -5), 3, 2);
    }

    // Handle
    fill(120, 70, 40);
    rect(-4, 0, 8, 38, 3); 

    fill(220, 180, 60);
    ellipse(0, 10, 4, 4);
    ellipse(0, 28, 4, 4);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(60, 60, 70);
    beginShape();
    vertex(-6, 0);
    vertex(6, 0);
    vertex(15, -20);
    vertex(10, -50);
    vertex(0, -65);
    vertex(-5, -45);
    vertex(-6, -20);
    endShape();

    fill(180, 180, 195);
    beginShape();
    vertex(0, -65);
    vertex(-5, -45);
    vertex(-6, -20);
    vertex(-1, -40);
    endShape(CLOSE);

    // Handle
    fill(25); 
    beginShape();
    vertex(-7, 0);
    vertex(7, 0);
    vertex(10, 20);
    vertex(12, 35);
    vertex(0, 45);
    vertex(-8, 35);
    vertex(-5, 15);
    endShape();

    // Security
    stroke(25);
    strokeWeight(4);
    noFill();
    ellipse(0, 45, 18, 18);
    noStroke();

    fill(60);
    ellipse(-1, 20, 10, 6);
    ellipse(1, 30, 10, 6);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(190, 200, 210); 
    beginShape();
    vertex(-6, 0);
    bezierVertex(10,-10,  0,-20,   8,-30);
    bezierVertex(0,-40,   6,-50,   0,-65);
    bezierVertex(-6,-50,  0,-40,  -8,-30);
    bezierVertex(0,-20, -10,-10,  -6, 0);
    endShape(CLOSE);

    fill(255, 255, 255, 150);
    beginShape();
    vertex(0, -65);
    bezierVertex(4,-50, -2,-40, 6,-30);
    vertex(3,-30);
    bezierVertex(-3,-40, 2,-50, 0,-60);
    endShape();

    // Handle
    fill(100, 60, 30); 
    beginShape();
    vertex(-7, 0);
    vertex(7, 0);
    vertex(9, 10);
    vertex(4, 30);
    vertex(-2, 35);
    vertex(-6, 20);
    endShape();

    fill(180, 150, 50);
    beginShape();
    vertex(-10, -3);
    vertex(10, -3);
    vertex(12, 3);
    vertex(0, 6);
    vertex(-12, 3);
    endShape();
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Blade
    fill(100, 220, 255, 180);
    beginShape();
    vertex(-5, 0);
    vertex(5, 0);
    vertex(7, -50);
    vertex(0, -70);
    vertex(-7, -50);
    endShape();

    fill(200, 255, 255, 150); 
    beginShape();
    vertex(0, -70);
    vertex(7, -50);
    vertex(0, -45);
    endShape();

    fill(255, 255, 255, 210); 
    beginShape();
    vertex(0, -70);
    vertex(-7, -50);
    vertex(0, -55);
    endShape();

    // Handle
    fill(180, 185, 190); 
    rect(-5, 0, 10, 35, 2); 

    fill(220, 225, 230);
    triangle(0, -2, -15, -10, -5, 2);
    triangle(0, -2, 15, -10, 5, 2);
    
    fill(100, 220, 255);
    ellipse(0, 35, 8, 10);
}, 40, 150));

drawing.knife.push(createDrawing(function() {
    noStroke();

    // Handle
    fill(90, 95, 100); 
    rect(-6, 0, 12, 40, 2);

    fill(130, 135, 140);
    rect(-5, 5, 10, 4);
    rect(-5, 15, 10, 10, 1);
    rect(-5, 31, 10, 4);

    fill(255, 50, 50);
    ellipse(0, 20, 4, 4);

    fill(160, 165, 170);
    rect(-7, -5, 14, 5, 1);
    
    // Blade (biggest outside)
    fill(255, 0, 0, 50); 
    rect(-6, -75, 12, 70, 6);
    ellipse(0, -75, 12, 12);

    // Blade (outside)
    fill(255, 100, 100, 100);
    rect(-4, -73, 8, 68, 4);
    ellipse(0, -73, 8, 8);

    // Blade (inside)
    fill(255, 220, 220, 230); 
    rect(-2, -71, 4, 66, 2);
    ellipse(0, -71, 4, 4);
}, 40, 160));

// }

// Wood
// {

drawing.wood.push(createDrawing(function () {
    noStroke();

    fill(245, 230, 180);
    ellipse(0, 0, 150, 150);

    fill(180, 130, 80);
    ellipse(0, 0, 100, 100);

    noFill();
    stroke(120, 80, 50);
    strokeWeight(12);
    ellipse(0, 0, 150, 150);

    stroke(160, 110, 70);
    strokeWeight(4);
    ellipse(0, 0, 142, 142);

    stroke(180, 130, 80, 100);
    strokeWeight(1.5);
    for (var i = 15; i < 70; i += 8) {
        ellipse(0, 0, i * 2, i * 2);
    }
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    // yellow background
    noStroke();
    fill(255, 244,117);
    ellipse(0, 0, 150, 150);
    
    // bark
    noFill();
    strokeWeight(10);
    stroke(208, 125, 75);
    ellipse(0, 0, 150, 150);
    
    stroke(255, 211, 102);
    strokeWeight(5);
    
    beginShape();
    curveVertex(60, 0);
    curveVertex(0, 60);
    curveVertex(-60, 0);
    curveVertex(0, -60);
    curveVertex(60, 0);
    curveVertex(0, 60);
    curveVertex(-60, 0);
    endShape();
    
    beginShape();
    curveVertex(30, 30);
    curveVertex(-30, 30);
    curveVertex(-30, -30);
    curveVertex(30, -30);
    curveVertex(30, 30);
    curveVertex(-30, 30);
    curveVertex(-30, -30);
    endShape();
    
    beginShape();
    curveVertex(20, 0);
    curveVertex(0, 20);
    curveVertex(-20, 0);
    curveVertex(0, -20);
    curveVertex(20, 0);
    curveVertex(0, 20);
    curveVertex(-20, 0);
    endShape();
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();

    strokeWeight(4);
    for (var r = 150; r > 0; r -= 10) {
        fill(220 - r/5, 190 - r/5, 100);
        stroke(180, 150, 80);
        ellipse(0, 0, r, r);
    }
    
    noFill();
    strokeWeight(12);
    stroke(40, 40, 40, 200); ellipse(0, 0, 100, 100);
    stroke(200, 50, 50, 200); ellipse(0, 0, 50, 50);
    // Ropes
    stroke(100, 80, 40, 150);
    strokeWeight(2);
    for(var a = 0; a < 360; a += 45) {
        line(0, 0, cos(a)*75, sin(a)*75);
    }
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();

    fill(230, 60, 60);
    ellipse(0, 0, 150, 150);

    noFill();
    stroke(180, 130, 90);
    strokeWeight(10);
    ellipse(0, 0, 150, 150);

    noFill();
    stroke(240, 210, 170);
    strokeWeight(5);
    for (var r = 10; r < 50; r += 12) {
        ellipse(0, 0, r * 2, r * 2);
    }
    
    noStroke();
    fill(255);
    ellipse(30, 30, 20, 20);
    ellipse(-40, -10, 25, 25);
    ellipse(10, -40, 18, 18);
    ellipse(-20, 40, 22, 22);
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();
    
    fill(50);
    for (var a = 0; a < 360; a += 30) {
        pushMatrix();
        rotate(a);
        rect(55, -12, 25, 24, 4);
        popMatrix();
    }
    
    fill(80);
    ellipse(0, 0, 130, 130);
    fill(120);
    ellipse(0, 0, 115, 115);
    
    fill(60);
    ellipse(0, 0, 60, 60);
    fill(200, 180, 100);
    for(var b = 45; b < 405; b += 90) {
        ellipse(cos(b)*20, sin(b)*20, 8, 8);
    }
    
    noFill();
    stroke(0, 100);
    strokeWeight(5);
    ellipse(0, 0, 115, 115);

    fill(120, 125, 130);
    ellipse(0, 0, 100, 100);
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();
    fill(20, 20, 25);
    ellipse(0, 0, 150, 150);
    
    stroke(218, 165, 32);
    strokeWeight(2.5);
    noFill();
    beginShape();
    vertex(-70, -20);
    bezierVertex(-30, 0, 20, -40, 70, 10);
    endShape();
    
    noFill();
    stroke(180, 160, 100);
    strokeWeight(8);
    ellipse(0, 0, 150, 150);
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();

    fill(180, 160, 140);
    ellipse(0, 0, 150, 150);

    noFill();
    stroke(120, 100, 80);
    strokeWeight(12);
    ellipse(0, 0, 150, 150);

    noStroke();
    fill(140, 120, 100, 100);
    for (var i = 0; i < 30; i++) {
        ellipse(random(-60, 60), random(-60, 60), random(4, 8), random(4, 8));
    }

    noFill();
    stroke(100, 80, 60);
    strokeWeight(4);
    for (var r = 20; r < 70; r += 20) {
        ellipse(0, 0, r * 2, r * 2);
    }
    
    fill(100, 80, 60, 50);
    ellipse(0, 0, 30, 30);
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();

    fill(140, 80, 40);
    ellipse(0, 0, 150, 150);

    stroke(100, 60, 30);
    strokeWeight(4);
    line(-75, -20, 75, -20);
    line(-75, 20, 75, 20);

    noFill();
    stroke(180, 185, 190);
    strokeWeight(10);
    ellipse(0, 0, 150, 150);

    noStroke();
    fill(130, 135, 140);
    ellipse(0, 0, 80, 80);
    
    fill(160, 165, 170);
    ellipse(-15, -15, 30, 30);
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();
    
    fill(40, 42, 45);
    ellipse(0, 0, 150, 150);
    
    fill(70, 75, 85);
    for(var a = 0; a < 360; a += 90) {
        pushMatrix();
        rotate(a);
        rect(50, -20, 25, 40, 5);
        fill(100, 200, 255, 150);
        rect(65, -15, 5, 30);
        popMatrix();
    }
    
    for(var r = 100; r > 0; r -= 10) {
        fill(0, 255, 255, 20);
        ellipse(0, 0, r, r);
    }
    
    fill(255);
    ellipse(0, 0, 40, 40);
    fill(0, 255, 255, 150);
    ellipse(0, 0, 50, 50);
}, 160, 160));

drawing.wood.push(createDrawing(function () {
    noStroke();
    
    fill(50, 35, 20);
    beginShape();
    for (var a = 0; a < 360; a += 10) {
        var r = 73 + sin(a * 4) * 4; 
        vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    
    fill(210, 170, 110);
    ellipse(0, 0, 135, 135);
    
    noFill();
    stroke(160, 120, 70, 120);
    strokeWeight(1.5);
    for (var d = 30; d < 130; d += 15) {
        ellipse(0, 0, d, d);
    }
    
    noStroke();
    fill(50, 200, 80, 230);
    for (var m = 0; m < 360; m += 45) {
        var angM = m + 22;
        var mx = cos(angM) * 65;
        var my = sin(angM) * 65;
        ellipse(mx, my, 30, 20);
        fill(180, 230, 50, 200);
        ellipse(mx + 4, my - 3, 12, 8);
        fill(50, 200, 80, 230);
    }
    
    for (var f = 0; f < 3; f++) {
        pushMatrix();
        var angF = f * 120;
        rotate(angF);
        translate(55, 0);
        
        fill(0, 230, 255);
        for(var s = 0; s < 360; s += 72) {
            pushMatrix();
            rotate(s);
            beginShape();
            vertex(0,0);
            vertex(12, -4);
            vertex(18, 0);
            vertex(12, 4);
            endShape();
            popMatrix();
        }
        
        fill(255, 0, 150);
        for(var p = 0; p < 360; p += 72) {
            pushMatrix();
            rotate(p + 36);
            ellipse(10, 0, 14, 7);
            popMatrix();
        }
        
        stroke(255, 255, 0);
        strokeWeight(1);
        for(var c = 0; c < 360; c += 30) {
            var cx = cos(c) * 6;
            var cy = sin(c) * 6;
            line(0, 0, cx, cy);
        }
        
        noStroke();
        fill(255);
        ellipse(0, 0, 7, 7);
        
        popMatrix();
    }
    
    noStroke();
    fill(255, 255, 150, 180);
    ellipse(0, 0, 20, 20);
    fill(255);
    ellipse(0, 0, 8, 8);
}, 160, 160));

// }

// Fruits
// {

drawing.fruit.apple = createDrawing(function () {
    noStroke();
    
    // Oops wrong direction
    pushMatrix();
    rotate(180);
    scale(0.8);

    fill(230, 50, 50);
    ellipse(0, 5, 38, 36);

    fill(255, 200, 200, 180);
    ellipse(-10, 0, 15, 20);
    fill(255);
    ellipse(-12, -2, 5, 8);

    fill(100, 70, 40);
    rect(-2, -20, 4, 15, 2);

    fill(50, 200, 80);
    pushMatrix();
    translate(2, -17);
    rotate(radians(30));
    beginShape();
    vertex(0, 0);
    bezierVertex(10, -5, 15, 5, 0, 10);
    bezierVertex(-5, 5, 0, 0, 0, 0);
    endShape();
    popMatrix();
    
    popMatrix();
}, 30, 30);

drawing.fruit.halfApple = createDrawing(function() {
    noStroke();
    
    pushMatrix();
    
    rotate(180);
    scale(0.8);

    fill(230, 50, 50);
    ellipse(0, 5, 38, 36);

    fill(255, 253, 230);
    ellipse(0, 5, 34, 32);

    fill(235, 220, 180, 150);
    ellipse(0, 5, 12, 18);

    fill(80, 50, 30);
    pushMatrix();
    translate(-2, 3);
    rotate(15);
    ellipse(0, 0, 4, 7);
    popMatrix();
    
    pushMatrix();
    translate(2, 3);
    rotate(-15);
    ellipse(0, 0, 4, 7);
    popMatrix();

    fill(100, 70, 40);
    rect(-2, -20, 4, 15, 2);

    fill(50, 200, 80);
    
    pushMatrix();
    translate(2, -17);
    rotate(radians(30));
    beginShape();
    vertex(0, 0);
    bezierVertex(10, -5, 15, 5, 0, 10);
    bezierVertex(-5, 5, 0, 0, 0, 0);
    endShape();
    popMatrix();
    
    popMatrix();
}, 30, 30);

drawing.fruit.lemon = createDrawing(function() {
    noStroke();
    
    fill(255, 220, 50);
    ellipse(0, 0, 20, 26);
    
    ellipse(0, -13, 7, 7);
    ellipse(0, 13, 7, 7);
    
    fill(255, 255, 200, 180);
    ellipse(-4, -5, 6, 12);
    fill(255);
    ellipse(-5, -7, 3, 5);
}, 30, 30);

drawing.fruit.halfLemon = createDrawing(function() {
    noStroke();
    fill(255, 220, 50);
    ellipse(0, 0, 20, 26);
    
    fill(255, 250, 200);
    ellipse(0, 0, 17, 23);
    
    fill(255);
    ellipse(0, 0, 15, 21);
    fill(255, 240, 150);
    for(var i = 0; i < 360; i += 45) {
        pushMatrix();
        rotate(i);
        arc(0, 0, 14, 20, 5, 40);
        popMatrix();
    }
    fill(255);
    ellipse(0, 0, 3, 3);
    
    popMatrix();
}, 30, 30);

drawing.fruit.pineapple = createDrawing(function() {
    pushMatrix();
    rotate(180);
    
    noStroke();
    fill(34, 139, 34);
    triangle(-6, -6, 0, -18, 6, -6);
    triangle(-9, -4, -4, -14, 0, -4);
    triangle(9, -4, 4, -14, 0, -4);
    
    fill(218, 165, 32);
    ellipse(0, 5, 20, 25);
    
    stroke(180, 140, 60);
    line(-5, 0, 5, 12);
    line(5, 0, -5, 12);
    noStroke();
    
    fill(255, 255, 255, 100);
    ellipse(-3, 3, 5, 10);
    
    popMatrix();
}, 30, 30);

drawing.fruit.halfPineapple = createDrawing(function() {
    pushMatrix();
    rotate(180);
    
    noStroke();
    fill(218, 165, 32);
    ellipse(0, 5, 20, 25);
    
    fill(255, 230, 80);
    ellipse(0, 5, 17, 22);
    
    fill(255, 250, 200);
    rect(-2, -5, 4, 18, 1);
    
    fill(34, 139, 34);
    triangle(-6, -6, 0, -18, 6, -6);
    triangle(-9, -4, -4, -14, 0, -4);
    triangle(9, -4, 4, -14, 0, -4);
    
    popMatrix();
}, 30, 30);


// }

// Miscellanous
// {

drawing.misc.fragment = createDrawing(function(){
    noStroke();
    fill(23, 120, 105);
    ellipse(0, 0, 10, 10);
}, 10, 10);

// }

// }

/**
 * Sounds
**/
// {

var sounds = [
    getSound("rpg/hit-thud"),
    getSound("rpg/hit-clop"),
    getSound("rpg/metal-chime"),
    getSound("rpg/metal-clink"),
    getSound("rpg/battle-swing"),
    getSound("rpg/step-heavy"),
    getSound("rpg/hit-whack"),
    getSound("retro/jump1"),
    getSound("retro/whistle2"),
    getSound("retro/laser2")
];

// }

/**
 * Speeds
**/
// {

// https://www.desmos.com/calculator
var speeds = [
    function() {
        return 1;
    },
    function() {
        return -1;
    },
    function() {
        return 2;
    },
    function() {
        return -2;
    },
    function() {
        return -3;
    },
    function() {
        return 3;
    },
    function() {
        return 2 * sin(frameCount / 4);
    },
    function() {
        return 3 * sin(frameCount / 4);
    },
    function() {
        return 3 * pow(sin(frameCount / 4), 2) - 3 * cos(frameCount / 4);
    },
    function() {
        return exp(cos(frameCount / 4));
    },
    function() {
        return - exp(cos(frameCount / 4));
    },
    function() {
        return 10 * sin(frameCount / 4);
    },
    function() {
        return 4 * (frameCount*0.01 - floor(frameCount * 0.01));
    },
    function() {
        return 10 * (frameCount*0.01 - floor(frameCount * 0.01));
    },
    function() {
        return - 4 * (frameCount*0.01 - floor(frameCount * 0.01));
    },
    function() {
        return - 10 * (frameCount*0.01 - floor(frameCount * 0.01));
    },
    function() {
        return 10 * (frameCount*0.001 - floor(frameCount * 0.001) - 0.5);
    },
    function() {
        return 20 * (frameCount*0.001 - floor(frameCount * 0.001) - 0.5);
    },
];

// }

/**
 * Levels
**/
// {

var currentLevel = 0;
var levels = [
    {
        knife: 0,
        wood: 1,
        fruits: [],
        knives: [],
        speed: speeds.length-1,
        remaining: 1
    },
    {
        knife: 0,
        wood: 0,
        remaining: 10,
        fruits: [0, 90, 180, 270],
        knives: [],
        speed: 0
    },
    {
        knife: 1,
        wood: 1,
        fruits: [45, 135, 225, 315],
        knives: [0, 90, 180, 270],
        remaining: 4,
        speed: 3
    },
    {
        knife: 2,
        wood: 2,
        fruits: [0, 45, 90, 135, 180,225, 270, 315],
        knives: [],
        remaining: 20,
        speed: 6
    },
    {
        knife: 8,
        wood: 8,
        fruits: [0, 10, 20],
        knives: [],
        speed: 7,
        remaining: 15
    },
    {
        knife: 6,
        wood: 7,
        fruits: [],
        knives: [0, 10, 20, 180, 190, 200],
        speed: 7,
        remaining: 10
    },
];

var generateLevel = function() {
    var knives = Array.from(Array(floor(random(0, 5))).keys());
    
    levels.push({
        knife: floor(random(0, 10)),
        wood: floor(random(0, 10)),
        remaining: floor(random(2, 15)),
        speed: floor(random(0, speeds.length)),
        fruits: Array.from(Array(floor(random(5, 10)))).map(function() {
            return floor(random(0, 360));
        }),
        knives: knives.map(function(i) {
            return floor(random(i * 360 / knives.length, (i + 1) * 360 / knives.length));
        })
    });
};


// }

/**
 * Game
**/
// {

var scene = "start";
imageMode(CENTER);
textAlign(CENTER, CENTER);

// Switch scene logic
// {
var switchScreenshot;
var switchNewScene;
var switchTime = 0;

var switchScene = function(newScene) {
    switchScreenshot = get(0, 0, width, height);
    switchNewScene = newScene;
    scene = "switch";
    switchTime = 0;
};
// }

// Start scene
// {

var Button = function(x, y, txt) {
    this.x = x;
    this.y = y;
    this.text = txt;
    this.offset = 0;
    
    this.font = createFont("Regular Bold", 30);
    
    this.draw = function() {
        this.hover = constrain(mouseY, this.y - 30, this.y + 30) === mouseY;
        
        pushMatrix();
        translate(0, this.y - 30);
        
        fill(
            lerpColor(
                color(30, 150, 132),
                color(40, 160, 142),
                this.offset / 30
            )
        );
        rect(0, 0, width, 60);
        
        rotate(90);
        image(drawing.knife[0], 30, - 60 - this.offset);
        
        popMatrix();
        
        textFont(this.font);
        fill(255);
        text(this.text, this.x, this.y);
        
        if (!this.hover) {
            this.offset  = max(0, this.offset - 5);
        } else {
            this.offset = min(30, this.offset + 5);
        }
    };
};

var startFont = createFont("Regular Italic", 33);
var playBtn = new Button(200, 400, "Play");
var rulesBtn = new Button(200, 460, "Rules");
var leadBtn = new Button(200, 520, "Lead");

var drawStart = function() {
    background(30, 150, 132);
    image(drawing.wood[0], 200, 100);
            
    pushMatrix();
    translate(200, 280);
    rotate(45);
    image(drawing.knife[2], -20, 0, 65, 300);
    rotate(-90);
    image(drawing.knife[2], 20, 0, 65, 300);
    popMatrix();
    
    fill(245, 230, 180);
    textFont(startFont);
    text("Knife", 200, 80);
    text("HIT", 200, 118);
    
    playBtn.draw();
    rulesBtn.draw();
    // leadBtn.draw();
};

// }

// Lost scene
// {
var retryBtn = new Button(200, 500, "Retry");

var drawLost = function() {
    background(30, 150, 132);
    
    image(drawing.wood[0], 200, 100);
            
    pushMatrix();
    translate(200, 280);
    rotate(45);
    image(drawing.knife[2], -20, 0, 65, 300);
    rotate(-90);
    image(drawing.knife[2], 20, 0, 65, 300);
    popMatrix();
    
    fill(245, 230, 180);
    textFont(startFont);
    text("Knife", 200, 80);
    text("HIT", 200, 118);
    
    text("Shame on you!", 200, 400);
    
    retryBtn.draw();
};

// }


// Rules scene
// {
var playBtn2 = new Button(200, height - 50, "Play");

var rulesFont = createFont("Regular Italic", 20);
var drawRules = function() {
    background(30, 150, 132);
    
    image(drawing.wood[0], 200, 100);
            
    pushMatrix();
    translate(200, 280);
    rotate(45);
    image(drawing.knife[2], -20, 0, 65, 300);
    rotate(-90);
    image(drawing.knife[2], 20, 0, 65, 300);
    popMatrix();
    
    fill(245, 230, 180);
    textFont(startFont);
    text("Knife", 200, 80);
    text("HIT", 200, 118);
    
    textFont(rulesFont);
    text("Press [SPACE] or click to throw the knives\nThrow all the knives without touching \n another one\nPress [H] to toogle the Hard mode\n\nGood luck!", 200, 425);
    
    playBtn2.draw();
};

// }

// Play scene
// {
var Particle = function(x, y, img, w, h) {
    this.pos = new PVector(x, y);
    this.dir = new PVector(
        (random() - 0.5) * 10,
        (random() - 0.5) * 10
    );
    this.img = img;
    this.w = w;
    this.h = h;
    
    // returns true if the particle should continue to be drawn
    this.draw = function() {
        image(this.img, this.pos.x, this.pos.y, this.w, this.h);
        
        this.pos.add(this.dir);
        this.dir.y += max(5, this.dir.mag()) * 0.1;
        
        return this.pos.y - this.h < height;
    };
};
var createFragment = function(x, y) {
    var w = 5 + random() * 5;
    return new Particle(x, y, drawing.misc.fragment, w, w);
};
var createHalfFruit = function(x, y, type) {
    
    var p;
    
    switch (type) {
        case 1:
            p = new Particle(x, y, drawing.fruit.halfLemon, 30, 30);
            break;
        case 2:
            p = new Particle(x, y, drawing.fruit.halfPineapple, 30, 30);
            break;
        default:
            p = new Particle(x, y, drawing.fruit.halfApple, 30, 30);
            break;
    }
    
    p.dir.y = - 5;
    
    return p;
};
var createFinalFragments = function() {
    var a = new Particle(
        100, 100, get(0, 0, 200, 200), 200, 200
    );
    var b = new Particle(
        300, 100, get(200, 0, 200, 200), 200, 200
    );
    var c = new Particle(
        100, 300, get(0, 200, 200, 200), 200, 200
    );
    var d = new Particle(
        300, 300, get(200, 200, 200, 200), 200, 200
    );
    
    a.dir = new PVector(-2, -2);
    b.dir = new PVector(2, -2);
    c.dir = new PVector(-2, 2);
    d.dir = new PVector(2, 2);
    
    return [a, b, c, d];
};

var Game = function(level) {
    this.throwingY = 500;
    this.offsetY = 0;
    this.targetY = 200;
    this.score = 0;
    this.angle = 0;
    this.speed = level.speed;
    
    this.wood = level.wood;
    this.knife = level.knife;
    
    this.knives = level.knives.slice();
    this.fruits = level.fruits.slice();
    this.fruitsType = this.fruits.map(function() {
        return floor(random(0, 3));
    });
    this.particles = [];
    
    this.remaining = level.remaining;
    this.won = false;
    this.lost = false;
    this.throwing = false;
    this.hit = false;
    
    this.font = createFont("monospace", 125);
    
    this.draw = function() {
        
        textFont(this.font);
        fill(255, 210, 101, 100);
        text(currentLevel + 1, 200, 350);
        
        // Remaining knives
        pushMatrix();
        translate(30, height - 20);
        rotate(-45);
        scale(0.4);
        for (var i = 0; i < this.remaining - 1; i++) {
            image(drawing.knife[this.knife], 0, 0);
            translate(30, -30);
        }
        
        popMatrix();
        
        // The throwed knife
        if (!this.won) {
            image(drawing.knife[this.knife], 200, this.throwingY);
        }

        if (!this.won) {
            pushMatrix();
            translate(width / 2, this.targetY);
            rotate(this.angle);
            
            // The knives
            for (var i = 0; i < this.knives.length; i++) {
                rotate(this.knives[i]);
                image(drawing.knife[this.knife], 0, 100);
                rotate(-this.knives[i]);
            }
            
            // The wood
            image(drawing.wood[this.wood], 0, 0);
            
            // The fruits
            for (var i = 0; i < this.fruits.length; i++) {
                rotate(this.fruits[i]);
                switch (this.fruitsType[i]) {
                    case 1:
                        image(drawing.fruit.lemon, 0, 94);
                        break;
                    case 2:
                        image(drawing.fruit.pineapple, 0, 94);
                        break;
                    default:
                        image(drawing.fruit.apple, 0, 94);
                        break;
                        
                }
                rotate(-this.fruits[i]);
            }
            
            popMatrix();
        }
        
        // Particles
        for (var i = 0; i < this.particles.length; i++) {
            if (!this.particles[i].draw()) {
                this.particles.splice(i, 1);
            }
        }
    };
    
    this.update = function() {
        this.angle = (this.angle + speeds[this.speed]());
        
        if (this.angle > 360) {
            this.angle -= 360;
        }
        
        if (this.angle < 0) {
            this.angle += 360;
        }
        
        if (this.throwing) {
            this.throwingY -= 30;
        } else if (this.throwingY > 500) {
            this.throwingY -= 10;
        }
    
        if (this.throwingY <= 300) {
            var a = - this.angle;
        
            // Look for knives
            for (var i = 0; i < this.knives.length; i++) {
                var b = this.knives[i];
                var d2 = pow(160*cos(a) - 160*cos(b), 2) + pow(160*sin(a) - 160*sin(b), 2);
            
                if (d2 <= 200) {
                    this.lost = true;
                    return;
                }
            }
            
            // Look for fruits
            for (var i = 0; i < this.fruits.length; i++) {
                var b = this.fruits[i];
                var d2 = pow(160*cos(a) - 160*cos(b), 2) + pow(160*sin(a) - 160*sin(b), 2);
            
                if (d2 <= 1044) {
                    
                    this.particles.push(createHalfFruit(200, 300, this.fruitsType[i]));
                    this.particles.push(createHalfFruit(200, 300, this.fruitsType[i]));
                    
                    this.fruits.splice(i, 1);
                    this.fruitsType.splice(i, 1);
                    i--;
                    return;
                }
            }
        
            this.throwingY = 700;
            this.throwing = false;
            this.hit = true;
            this.knives.push(a);
            
            
            playSound(sounds[this.knife]);
            
            this.score += 1;
            
            while (
                this.particles.length <= 5 ||
                random() <= 0.8
            ) {
                this.particles.push(createFragment(200, 300));
            }
            
            if (this.remaining <= 0) {
                this.won = true;
                
                var arr = createFinalFragments();
                
                for (var i = 0; i < arr.length; i++) {
                    this.particles.push(arr[i]);
                }
            }
        }
    
        // Hit stuff
        if (this.hit) {
            this.targetY += this.offsetY < 5 ? -3 : 3;
            this.offsetY += 1;
        }
    
        if (this.offsetY >= 10) {
            this.hit = false;
            this.offsetY = 0;
        }
    };
    
    this.throw = function() {
        if (this.remaining > 0 && !this.throwing) {
            this.throwing = true;
            this.remaining -= 1;
        }
    };
    
    this.feed = function() {
        this.fruits.push(round(random() * 360));
        this.fruitsType.push(floor(random() * 3));
    };
};

var game = new Game(levels[currentLevel]);

var drawPlay = function(skip) {
    background(30, 150, 132);
    
    game.draw();
    game.update();
    
    if (game.lost) {
        switchScene("lost");
        return;
    }
    
    if (game.won && game.particles.length === 0) {
        switchScene("play");
        
        currentLevel += 1;
        
        while (currentLevel >= levels.length - 1) {
            generateLevel();
        }
        
        game = new Game(levels[currentLevel]);
    }
};
// }

// Switch scene bis
// {

var drawSwitch = function() {
    image(switchScreenshot, width / 2,height / 2);
    
    if (switchTime < 255) {
        fill(0, 0, 0, switchTime);
        rect(0, 0, width, height);
    } else {
        var oldScene = scene;
        scene = switchNewScene;
        
        draw();
        
        scene = oldScene;
        
        fill(0, 0, 0, 2*255 - switchTime);
        rect(0, 0, width, height);
    }
    
    if (switchTime >= 2*255) {
        scene = switchNewScene;
    }
    
    
    switchTime += 5;
};

// }


var hardFont = createFont("Regulard Italic", 15);
draw = function() {
    
    switch (scene) {
        case "start":
            drawStart();
            break;
        case "switch":
            drawSwitch();
            break;
        case "play":
            drawPlay();
            break;
        case "rules":
            drawRules();
            break;
        case "lost":
            drawLost();
            break;
    }
    
    if (scene !== "switch" && hard) {
        textFont(hardFont);
        fill(255, 0, 0);
        text("hard", 200, 20);
    } 
    
    // playBtn.draw();
};

// }

/**
 * Events
**/
// {

var keyHasBeenReleased = true;
mouseClicked = function() {
    if (scene === "start") {
        if (playBtn.hover) {
            switchScene("play");
        } else if (rulesBtn.hover) {
            switchScene("rules");
        } else if (leadBtn.hover) {
            switchScene("lead");
        }
    } else if (scene === "rules") {
        if (playBtn2.hover) {
            switchScene("play");
        }
    } else if (scene === "play") {
        if (!game.lost) {
            game.throw();
        }
    } else if (scene === "lost") {
        if (retryBtn.hover) {
            if (hard) {
                currentLevel = 0;
            }
            game = new Game(levels[currentLevel]);
            switchScene("play");
        }
    }
};

keyPressed = function() {
    if (keyCode === 32 && keyHasBeenReleased) {
        mouseClicked();
        keyHasBeenReleased = false;
    }
};
keyReleased = function() {
    if (keyCode === 32) {
        keyHasBeenReleased = true;
    }
    keyHasBeenReleased = true;
    
    if (keyCode === 72) {
        hard = !hard;
    }
    
    if (keyCode === 80 && game) {
        println(
            "[" +
            [
                game.knife,
                game.wood,
                "[" + game.fruits.join(",") + "]",
                "[" + game.knives.join(",") + "]",
                game.speed,
                game.remaining
            ].join(",") + "]"
        );
    }
};

// }
