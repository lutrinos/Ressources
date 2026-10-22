
var w = 40;
var pos = {
    x: 200 + w / 2,
    y: 200 + w / 2
};

var blocs = [
    '          ',
    '          ',
    '          ',
    '     bbb  ',
    '       b  ',
    '       b  ',
    '          ',
    '          ',
    ' b        ',
    '          '
];

var ray = function(posX, posY) {
    noStroke();
    
    var dx = posX - pos.x;
    var dy = posY - pos.y;
    
    var stepX = dx > 0 ? 1 : -1;
    var stepY = dy > 0 ? 1 : -1;
    
    var ddX = dx === 0 ? Infinity : abs(1 / dx);
    var ddY = dy === 0 ? Infinity : abs(1 / dy);
    
    var mapX = floor(pos.x / w);
    var mapY = floor(pos.y / w);
    
    var sideX, sideY;
    
    if (dx > 0) {
        sideX = ((mapX + 1) - pos.x / w) * ddX;
    } else {
        sideX = (pos.x / w - mapX) * ddX;
    }
    
    if (dy > 0) {
        sideY = ((mapY + 1) - pos.y / w) * ddY;
    } else {
        sideY = (pos.y / w - mapY) * ddY;
    }
    
    fill(0, 255, 204);
    rect(mapX * w, mapY * w, w, w);
    
    if (abs(dx) <= w / 2 && abs(dy) <= w / 2) {
        return;
    }
    
    while (true) {
        
        if (abs(sideX - sideY) < 0.00001) {
            if (blocs[mapY][mapX] === 'b') {
                break;
            }
            rect(mapX * w, (mapY + stepY) * w, w, w);
            sideX += ddX;
            mapX += stepX;
        } else if (sideX < sideY) {
            sideX += ddX;
            mapX += stepX;
        } else {
            sideY += ddY;
            mapY += stepY;
        }
        
        if (blocs[mapY][mapX] === 'b') {
            break;
        }
        
        rect(mapX * w, mapY * w, w, w);
        
        if (mapX === floor(posX / w) && mapY === floor(posY / w)) {
            break;
        }
        
        if (
            mapX > width / w ||
            mapY  > height / w ||
            mapX < 0 ||
            mapY < 0
        ) {
            break;
        }
    }
    
    stroke(255, 0, 0);
    line(
        pos.x, pos.y,
        posX, posY
    );
};

draw  = function() {
    background(255, 255, 255);
    
    stroke(227, 227, 227);
    for (var x = 0; x < width; x += w) {
        line(x, 0, x, width);
        line(0, x, height, x);
    }
    
    fill(0, 0, 0);
    noStroke();
    for (var y = 0; y < blocs.length; y++) {
        for (var x = 0; x < blocs[y].length; x++) {
            if (blocs[y][x] === 'b') {
                rect(x * w, y * w, w, w);
            }
        }
    }
    
    //ray(mouseX, mouseY);
    var posX = mouseX;
    var posY = mouseY;
    ray(posX, posY);
    
    //stroke(255, 0, 0);
    //line(pos.x, pos.y, posX, posY);
};
