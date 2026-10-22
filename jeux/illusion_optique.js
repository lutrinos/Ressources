
// there are only lines :P

smooth();

background(255, 255, 255);

function drawShape(x, y, w, h, offset) {
    pushMatrix();
    
    translate(x, y);
    stroke(0, 0, 0);
    
    for (var i = offset; i < w; i += offset) {
        line(i, 0, w, i);
        line(0, i, i, w);
        
        line(0, h - i, i, 0);
        line(w, i, w - i, h);
    }
    
    fill(255, 255, 255);
    beginShape();
    vertex(0, 0);
    vertex(offset, h / 2);
    vertex(0, h);
    endShape();
    
    beginShape();
    vertex(0, 0);
    vertex(w / 2, offset);
    vertex(w, 0);
    endShape();
    
    beginShape();
    vertex(w, 0);
    vertex(w - offset, h / 2);
    vertex(w, h);
    endShape();
    
    beginShape();
    vertex(w, h);
    vertex(w / 2, h - offset);
    vertex(0, h);
    endShape();
    
    popMatrix();
}

drawShape(0, 0, width, height, 30);
drawShape(100, 100, width / 2, height / 2, 8);

/*
draw = function() {
    background(255, 255, 255);
    
    for (var i = 0; i < width; i += 30) {
        line(i, 0, width, i);
        line(0, i, i, width);
        
        line(0, height - i, i, 0);
        line(width, i, width - i, height);
    }
    
    fill(255, 255, 255);
    beginShape();
    vertex(0, 0);
    vertex(30, height / 2);
    vertex(0, height);
    endShape();
    
    beginShape();
    vertex(0, 0);
    vertex(width / 2, 30);
    vertex(width, 0);
    endShape();
    
    beginShape();
    vertex(width, 0);
    vertex(width - 30, height / 2);
    vertex(width, height);
    endShape();
    
    beginShape();
    vertex(width, height);
    vertex(width / 2, height - 30);
    vertex(0, height);
    endShape();
};
*/