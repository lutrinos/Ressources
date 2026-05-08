
/**
 *  _____  _____  _   _   __   __   _____  _____  _   _ 
 * |_   _||  ___|| \ | |  \ \ / /  |_   _||  ___|| \ | |
 *   | |  | |__  |  \| |   \ V /     | |  | |__  |  \| |
 *   | |  |  __| | . ` |   /   \     | |  |  __| | . ` |
 *   | |  | |___ | |\  |  / /^\ \    | |  | |___ | |\  |
 *   \_/  \____/ \_| \_/  \/   \/    \_/  \____/ \_| \_/
 * 
 * Welcome to Ten x Ten, a strategy puzzle game similar to Tetris!
 * 
 * @RULES {
 *      The game board is a 10×10 grid. You’ll be given shapes made of blocks. Place the tiles anywhere on the board.
 * 
 *      Just remember: no overlapping!
 * 
 *      If you completely fill a row or a column, it will disappear, making space for more tiles.
 * 
 *      The game ends when you can’t fit any of the shapes on the grid.
 * }
 * 
 * @HOWTOPLAY (mobile) {
 *      Click on the place where you want to place the tile.
 * 
 *      Press the arrow button on the top to rotate the block.
 * }
 * 
 * @HOWTOPLAY (desktop) {
 *      Move the block with your mouse or with the keyboard (UP/RIGHT/BOTTOM/LEFT arrows).
 * 
 *      Tiles are bordered with a green frame if the position is valid, with a red frame if it isn't.
 * 
 *      Click or press <SPACE> to place the block where it is.
 * 
 *      Click on the arrow or press R to rotate the block.
 * }
 * 
 * Enjoy and good luck!
**/

smooth();
rectMode(CENTER);

var mouseIsMoved = false;
var Scenes = {
    Home: 0,
    Game: 1,
    Logo: 2
};
var scene = Scenes.Home;

var randint2 = function(w) {
    var r = random();
    var i = 0;
    while (r > w[i] && i < w.length - 1) {
        r -= w[i];
        i += 1;
    }
    return i;
};

var Transition = function() {
    this.duration = 100;
    this.duration2 = this.duration >> 1;
    this.step = this.duration;
    this.img = get();
    
    this.draw = function() {
        if (this.step === this.duration2) {
            this.img = null;
            return false;
        }
        
        if (this.step < this.duration) {
            image(this.img, 0, 0, width, height);
            
            if (this.step < this.duration2) {
                fill(255, 255, 255, this.step * 255 / this.duration2);
            } else {
                fill(255, 255, 255, (this.duration - this.step) * 255 / this.duration2);
            }
            
            rect(width/2, height/2, width, height);
            
            this.step++;
            return true;
        }
        
        return false;
    };
    
    this.callback = function() {
        if (this.step === this.duration2 && this.img === null) {
            this.img = get();
            this.step++;
            this.draw();
        }
    };
    
    this.start = function() {
        this.img = get();
        this.step = 0;
    };
};

var transition = new Transition();

var Game = function(n) {
    this.n = n;
    
    this.infinity = true;
    this.score = 0;
    this.step = 0;
    this.duration = 60;
    this.time = 0;
    
    this.current = {
        x: -1,
        y: -1,
        tile: 0,
        index: 0,
        color: 0
    };
    
    this.map = [];
    this.bucket = [];
    this.animations = [];
    this.bits = Array(2 * this.n).fill(0);
    
    // [focus, ...tiles]
    this.tiles = [
        // 1 tile
        [
            [0, 0]
        ],
        
        // 2 tiles
        [
            [1, 0, 1],
            [5, 0, 5]
        ],
        
        // 3 tiles
        [
            [0, 0, 1, 5],
            [5, 0, 5, 6],
            [6, 1, 5, 6],
            [1, 0, 1, 6]
        ],
        
        [
            [5, 0, 5, 10],
            [1, 0, 1, 2]
        ],
        
        // 4  tiles
        [
            [10, 0, 5, 10, 15],
            [2, 0, 1, 2, 3],
            [6, 0, 1, 5, 6]
        ],
        
        [
            [6, 0, 1, 2, 6],
            [6, 2, 6, 7, 12],
            [6, 6, 10, 11, 12],
            [6, 0, 5, 6, 10]
        ],
        
        [
            [6, 1, 5, 6, 10],
            [6, 0, 1, 6, 7]
        ],
        
        // 5 tiles
        [
            [6, 1, 5, 6, 7, 11]
        ],
        
        [
            [2, 0, 1, 2, 3, 4],
            [10, 0, 5, 10, 15, 20]
        ],
        
        [
            [2, 0, 1, 2, 7, 12],
            [12, 2, 7, 10, 11, 12],
            [10, 0,  5, 10, 11, 12],
            [0, 0, 1, 2, 5, 10]
        ],
        
        [
            [5, 0, 1, 5, 10, 11],
            [1, 0, 1, 2, 5, 7],
            [7, 1, 2, 7, 11, 12],
            [11, 5, 7, 10, 11, 12]
        ],
        
        [
            [6, 0, 1, 2, 6, 11],
            [6, 2, 5, 6, 7, 12],
            [6, 1, 6, 10, 11, 12],
            [6, 0, 5, 6, 7, 10]
        ],
        
        // 6 tiles
        [
            [6, 0, 1, 2, 5, 6, 7],
            [6, 0, 1, 5, 6, 10, 11]
        ],
        
        // 7 tiles
        [
            [6, 0, 2, 5, 6, 7, 10, 12],
            [6, 0, 1, 2, 6, 10, 11, 12]
        ],
        
        // 9 tiles
        [
            [6, 0, 1, 2, 5, 6, 7, 10, 11, 12]
        ]
    ];
    this.colors = [
        color(73, 213, 175),
        color(221, 100, 85),
        color(92, 191, 228),
        color(252, 198, 62),
        color(237, 148, 75),
        color(151, 219, 85),
        color(230, 106, 128),
        color(125, 141, 211),
    ];
    
    this.weights = [];
    
    
    this.clear(true);
    this.computeWeights();
};
Game.prototype.isLower = function(v, m) {
    return 0 <= v && v < m;
};
Game.prototype.isValidPosition = function(x, y) {
    return this.isLower(x, this.n) && this.isLower(y, this.n);
};
Game.prototype.isValid = function(x, y, tile, index) {
    if (this.isLower(tile, this.tiles.length)) {
        var tile = this.tiles[tile][index];
        var x2, y2;
        
        for (var i = 1; i < tile.length; i++) {
            x2 = tile[i] % 5;
            y2 = (tile[i] - x2) / 5;
            x2 += x;
            y2 += y;
            
            if (!this.isValidPosition(x2, y2)) {
                return false;
            }
            
            if (this.bits[x2] & (1 << y2)) {
                return false;
            }
        }
        
        return true;
    }
    
    return false;
};
Game.prototype.put = function(x, y, tile, index, col) {
    var x2, y2;
    tile = this.tiles[tile][index];
        
    for (var i = 1; i < tile.length; i++) {
        x2 = tile[i] % 5;
        y2 = (tile[i] - x2) / 5;
        
        this.createAnimation(x+ x2, y + y2, 4, col);
        
        this.bits[x + x2] |= 1 << (y + y2);
        this.bits[y + y2 + this.n] |= 1 << (x + x2);
        
        this.score += 1;
    }
};
Game.prototype.fill = function(x, y, col) {
    if (
        x === constrain(x, 0, this.n - 1) &&
        y === constrain(y, 0, this.n - 1) &&
        col === constrain(col, -1, this.colors.length - 1)
    ) {
        this.map[y][x] = col;
    }
};
Game.prototype.clear = function(create) {
    this.animations = [];
    this.bucket = [];
    this.score = 0;
    this.step = 0;
    this.duration = 60;
    this.time = 0;
    
    for (var i = 0; i < this.n; i++) {
        if (create) {
            this.map.push(Array(this.n).fill(-1));
        }
        for (var j = 0; j < this.n; j++) {
            this.map[i][j] = -1;
        }
    }
    
    for (var i = 0; i < this.bits.length; i++) {
        this.bits[i] = 0;
    }
    
    this.fillBucket();
    this.current.tile = this.bucket[0][0];
    this.current.color = this.bucket[0][1];
};
Game.prototype.fillBucket = function() {
    while (this.bucket.length < 3) {
        this.bucket.push(
            [
                randint2(this.weights),
                floor(random() * this.colors.length)
            ]
        );
    }
};
Game.prototype.drawTile = function(left, top, w, gap, tile, col, center) {
    tile = this.tiles[tile][0];
    
    noStroke();
    fill(this.colors[col]);
    
    if (center) {
        var maxX = 0;
        var maxY = 0;
        
        for (var i = 1; i < tile.length; i++) {
            maxX = max(maxX, tile[i] % 5);
            maxY = max(maxY, (tile[i] - (tile[i] % 5)) / 5);
        }
        
        left -= (w + maxX*w) / 2;
        top  -= (w + maxY*w) / 2;
    } else {
        left -= w/2 + (tile[0] % 5) * w;
        top -= w/2 + (tile[0] - (tile[0] % 5)) * w / 5;
    }
    
    for (var i = 1; i < tile.length; i++) {
        var x = tile[i] % 5;
        var y = (tile[i] - x) / 5;
        
        rect(
            left + w/2 + w * x,
            top + w/2 + w  * y,
            w - gap,
            w - gap,
            8
        );
    }
};
Game.prototype.drawGrid = function(l, t, wi, he) {
    var w = (wi - 4) / this.n;
    var h = (he - 4) / this.n;
    
    if (
        mouseIsMoved &&
        l <= mouseX && mouseX <= l + wi &&
        t <= mouseY && mouseY <= t + he
    ) {
        this.current.x = floor((mouseX - l) / w);
        this.current.y = floor((mouseY - t) / h);
    }
    
    t += 2 + (w >> 1);
    l += 2 + (h >> 1);
    
    noStroke();
    
    var tile = this.tiles[this.current.tile][this.current.index];
    var offsetX = tile[0] % 5;
    var offsetY = (tile[0] - offsetX) / 5;
    
    if (
        this.isValid(
            this.current.x - offsetX,
            this.current.y - offsetY,
            this.current.tile,
            this.current.index
        )    
    ) {
        fill(32, 199, 143);
    } else {
        fill(240, 70, 163);
    }
    
    for (var i = 1;  i < tile.length; i++) {
        var x = this.current.x - offsetX + tile[i] % 5;
        var y = this.current.y - offsetY + (tile[i] - tile[i] % 5) / 5;
        
        if (this.isValidPosition(x, y)) {
            rect(l + x*w, t + y*h, w, h, 10);
        }
    }
    
    for (var x = 0; x < this.n; x++) {
        for (var y = 0; y < this.n; y++) {
            
            if (this.map[y][x] === -1) {
                fill(235, 235, 235);
            } else {
                fill(this.colors[this.map[y][x]]);
            }
            
            rect(l + x * w, t + y * h, w - 4, h - 4, 8);
        }
    }
    
    var a, stop;
    for (var i = 0; i < this.animations.length; i++) {
        a = this.animations[i];
        stop = false;
        
        if (a[3] > 0 && a[2] >= 100) {
            this.map[a[1]][a[0]] = a[4];
            stop = true;
        }
        
        if (a[3] < 0 && a[2] <= 0) {
            this.map[a[1]][a[0]] = -1;
            stop = true;
        }
        
        var tw = (1/(1+exp(5-a[2]/10))) * (w-4);
        
        fill(this.colors[a[4]]);
        rect(l + a[0] * w, t + a[1] * h, tw,tw, 8);
        
        this.animations[i][2] += a[3];
        
        if (stop) {
            this.animations.splice(i, 1);
            i--;
        }
    }
};
Game.prototype.draw = function() {
    var len = this.animations.length;
    
    this.drawGrid(10, 90, 400, 400);
    
    // Score
    textAlign(RIGHT, BASELINE);
    fill(this.colors[0]);
    rect(300, 45, 222, 80, 20);
    fill(255, 255, 255);
    textSize(60);
    text(this.score, 390, 65);
    
    // Clock
    if (!this.infinity) {
        noStroke();
        fill(this.colors[0]);
        ellipse(500, 50, 60, 60);
        fill(255, 255, 255);
        arc(500, 50, 50, 50, -90, -90 + this.time * 360 / this.duration);
        
        if (this.time >= this.duration) {
            scene = Scenes.Home;
            transition.start();
        }
        
        this.time += 0.1;
    }
    
    // Buttons
    fill(this.colors[0]);
    rect(50, 45, 80, 80, 20);
    rect(140, 45, 80, 80, 20);
    
    fill(255, 255, 255);
    rect(50, 50, 40, 40, 10);
    triangle(20, 40, 50, 20, 80, 40);
    triangle(120, 28, 130, 45, 110, 45);
    
    noFill();
    stroke(255, 255, 255);
    strokeWeight(4);
    arc(140, 45, 40, 40, -45, 180);
    
    // Bucket
    noFill();
    stroke(this.colors[0]);
    rect(500, 170, 150, 150, 20);
    
    for (var i = 0; i < this.bucket.length; i++) {
        this.drawTile(505, 170 + i * 120, 30, 2, this.bucket[i][0], this.bucket[i][1], true);
    }

    
    if (this.animations.length !== len && this.animations.length === 0) {
        this.check();
    }
    
};
Game.prototype.computeWeights = function() {
    var total = 0;
    
    for (var i = 0; i < this.tiles.length; i++) {
        total += 10 - this.tiles[i][0].length;
    }
    
    for (var i = 0; i < this.tiles.length; i++) {
        this.weights.push(
            ((10 - this.tiles[i][0].length) / total).toFixed(2)
        );
    }
};
Game.prototype.putCurrent = function() {
    var focus = this.tiles[this.current.tile][this.current.index][0];
    
    var x = this.current.x - focus % 5;
    var y = this.current.y - (focus - focus % 5) / 5;
    
    if (
        mouseX === constrain(mouseX, 10, 410) &&
        mouseY === constrain(mouseY, 90, 490) &&
        this.isValid(x, y, this.current.tile, this.current.index)
    ) {
        this.put(x,  y, this.current.tile, this.current.index, this.current.color);
        this.bucket.shift();
        this.fillBucket();
        
        this.current.index = 0;
        this.current.tile = this.bucket[0][0];
        this.current.color = this.bucket[0][1];
        
        this.step += 1;
        this.time = 0;
        this.duration = floor(40 * exp(-x/21) + 20);
    }
};
Game.prototype.check = function() {
    var v = (1 << (this.n)) - 1;
    
    var remove = [];
    
    for (var i = 0; i < this.bits.length; i++) {
        if (this.bits[i] === v) {
            var isRow = i >= this.n;
            
            for (var j = 0; j < this.n; j++) {
                if (isRow) {
                    this.createAnimation(j, i - this.n, -4, this.map[i - this.n][j]);
                    this.map[i - this.n][j] = -1;
                    remove.push([j, 1 << (i - this.n)]);
                } else {
                    this.createAnimation(i, j, -4, this.map[j][i]);
                    this.map[j][i] = -1;
                    remove.push([this.n + j, 1 << i]);
                }
            }
            
            remove.push(i);
        }
    }
    
    for (var i = 0; i < remove.length; i++) {
        if (Array.isArray(remove[i])) {
            this.bits[remove[i][0]] &= ~ remove[i][1];
        } else {
            this.bits[remove[i]] = 0;
        }
    }
};
Game.prototype.rotate = function() {
    this.current.index = (this.current.index + 1) % this.tiles[this.current.tile].length;
};
Game.prototype.createAnimation = function(x, y, speed, col) {
    this.animations.push([x, y, speed > 0 ? 0 : 100, speed, col]);
};
Game.prototype.logo = function(x, y, w) {
    
    pushMatrix();
    translate(x, y);
    rotate(-10);
    
    noStroke();
    var col = this.colors[0];
    
    textSize(w * 0.6);
    textAlign(CENTER);
    
    ["T", "E", "N"].forEach(function(c, i) {
        fill(col);
        rect(i*w - w, -w, w * 0.9, w * 0.9, w*0.1);
        fill(255, 255, 255);
        text(c, i*w-w, - w * 0.8);
    });
    
    ["T", "E", "N"].forEach(function(c, i) {
        fill(col);
        rect(- w, w * (i - 1), w * 0.9, w * 0.9, w*0.1);
        fill(255, 255, 255);
        text(c, -w, w*i - w * 0.8);
    });
    
    fill(this.colors[3]);
    rect(w, 0, w*0.9, w*0.9, w*0.1);
    rect(0, w, w*0.9, w*0.9, w*0.1);
    
    fill(this.colors[6]);
    rect(0, 0, w*0.9, w*0.9, w*0.1);
    rect(w, w, w*0.9, w*0.9, w*0.1);
    
    popMatrix();
};
Game.prototype.home = function() {
    this.logo(300, 130, 50);
    
    textSize(25);
    
    fill(this.colors[0]);
    rect(150, 400, 200, 50, 8);
    rect(450, 400, 200, 50, 8);
    
    fill(255, 255, 255);
    text("Classical", 150, 410);
    text("Infinity", 450, 410);
    
    if (this.step !== 0) {
        fill(this.colors[6]);
        textSize(24);
        text("Well done! You scored " + this.score + " points.", 300, 300);
        textSize(14);
        text("Will you be able to improve it?", 300, 325);
    }
};

var game = new Game(10);

draw = function() {
    cursor("none");
    background(255, 255, 255);
    
    if (scene === Scenes.Logo) {
        pushMatrix();
        translate(300, 250);
        scale(1, 5/6);
        game.logo(0, 0, 120);
        popMatrix();
        return;
    }
    
    var t = transition.draw();
    
    if (!t) {
        if (scene === Scenes.Home) {
            game.home();
        } else  if (scene === Scenes.Game) {
            game.draw();
        }
    }
    
    transition.callback();
    
    
    fill(game.colors[0]);
    stroke(255, 255, 255);
    strokeWeight(1);
    pushMatrix();
    translate(mouseX, mouseY);
    rotate(-22);
    
    quad(
        0, 0,
        10, 25,
        0, 20,
        -10, 25
    );
    
    popMatrix();
    
    mouseIsMoved = false;
};

var codes = {
    r: 82,
    up: 38,
    right: 39,
    down: 40,
    left: 37,
    space: 32,
    logo: 59
};

keyPressed = function() {
    //println(keyCode);
    
    switch (keyCode) {
        case codes.r:
            game.rotate();
            break;
        case codes.up:
            game.current.y--;
            break;
        case codes.right:
            game.current.x++;
            break;
        case codes.down:
            game.current.y++;
            break;
        case codes.left:
            game.current.x--;
            break;
        case codes.space:
            game.putCurrent();
            break;
        case codes.logo:
            scene = Scenes.Logo;
            break;
    }
    
    game.current.x = constrain(game.current.x, 0, game.n - 1);
    game.current.y = constrain(game.current.y, 0, game.n - 1);
};
mouseMoved = function() {
    mouseIsMoved = true;
};
mouseClicked = function() {
    switch (scene) {
        case Scenes.Game:
            game.putCurrent();
            if (mouseY === constrain(mouseY, 5, 85)) {
                if (mouseX === constrain(mouseX, 10, 90)) {
                    scene = Scenes.Home;
                    transition.start();
                } else if (mouseX === constrain(mouseX, 100, 180)) {
                    game.rotate();
                }
            }
            break;
        case Scenes.Home:
            if (mouseY >= 375 && mouseY <= 425) {
                if (mouseX === constrain(mouseX, 50, 250)) {
                    scene = Scenes.Game;
                    game.infinity = false;
                    game.clear(false);
                    transition.start();
                } else if (mouseX === constrain(mouseX, 350, 550)) {
                    scene = Scenes.Game;
                    game.infinity = true;
                    game.clear(false);
                    transition.start();
                }
            }
            break;
    }
};
