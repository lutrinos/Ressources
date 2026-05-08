/**
 * An implementation of the A* algorithm
 * Click one time to select the source point (the beginning), and a second time to select the target point (the end)
 * 
 * Design inspired by https://www.khanacademy.org/cs/-/5400302231142400
 * 
 * 
**/


// The speed of the animation
var speed = 100;

// The probability to have a wall
var wallProba = 0.3;

// The width and height of a single tile
var tileWidth = 10;

// The debug mode
var debugMode = false;









// We fill the board
var board = [];
for (var y = 0; y < height; y += tileWidth) {
    var stage = [];
    
    for (var x = 0; x < width; x += tileWidth) {
        stage.push(random() <= wallProba ? 1 : 0);
    }
    
    board.push(stage);
}

cursor("crosshair");

// Priority Queue implementation thanks to https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript
var ev=eval;
var PriorityQueue = ev("(function(){const top=0,parent=c=>(c+1>>>1)-1,left=c=>(c<<1)+1,right=c=>c+1<<1;class PriorityQueue{constructor(c=(d,e)=>d>e){this._heap=[],this._comparator=c}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[top]}push(...c){return c.forEach(d=>{this._heap.push(d),this._siftUp()}),this.size()}pop(){const c=this.peek(),d=this.size()-1;return d>top&&this._swap(top,d),this._heap.pop(),this._siftDown(),c}replace(c){const d=this.peek();return this._heap[top]=c,this._siftDown(),d}_greater(c,d){return this._comparator(this._heap[c],this._heap[d])}_swap(c,d){[this._heap[c],this._heap[d]]=[this._heap[d],this._heap[c]]}_siftUp(){for(let c=this.size()-1;c>top&&this._greater(c,parent(c));)this._swap(c,parent(c)),c=parent(c)}_siftDown(){for(let d,c=top;left(c)<this.size()&&this._greater(left(c),c)||right(c)<this.size()&&this._greater(right(c),c);)d=right(c)<this.size()&&this._greater(right(c),left(c))?right(c):left(c),this._swap(c,d),c=d}}return (a) => new PriorityQueue(a)})()");

frameRate(constrain(round(speed), 1, 300));

// The states
var SELECT_SOURCE = 0;
var SELECT_TARGET = 1;
var SEARCHING = 2;
var FOUND = 3;
var NOT_FOUND = 4;

var colorScale = round(width * height / (4 * pow(tileWidth, 2.5)));

var state = SELECT_SOURCE;

// The utility arrays
var distances = [];
var previous = [];

var queue = PriorityQueue(function (a, b) {
    // println(a.cost + ' - ' + b.cost);
    return a.cost < b.cost;
});


var sourceX = null;
var sourceY = null;
var targetX = null;
var targetY = null;

function heuristic(x, y) {
    //return dist(targetX, targetY, x, y);
    return abs(targetX - x) + abs(targetY - y);
}

function adjacent(x, y, fn) {
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (node) {
        var newX = x + node[0];
        var newY = y + node[1];
        
        // We check if the node exists
        if (
            newY === constrain(newY, 0, board.length - 1) &&
            newX === constrain(newX, 0, board[newY].length - 1)
        ) {
            fn(newX, newY);
        }
    });
}

draw = function() {
    background(255, 255, 255);
    
    // We draw the board
    noStroke();
    fill(130, 0, 130);
    for (var j = 0; j < board.length; j++) {
        for (var i = 0; i < board[j].length; i++) {
            if (board[j][i] === 1) {
                rect(i * tileWidth, j * tileWidth, tileWidth, tileWidth);
            }
        }
    }
    
    if (state === SEARCHING) {
        
        if (!queue.isEmpty()) {
            var item = queue.pop();

            if (item.x === targetX && item.y === targetY) {
                state = FOUND;
            } else {
                // We add the adjacent nodes to the queue (if it's not a wall and it hadn't been visited)
                adjacent(item.x, item.y, function (x, y) {
                    if (board[y][x] === 0) {
                        if (distances[y][x] === null /*|| item.distance + 1 < distances[y][x]*/) {
                            distances[y][x] = item.distance + 1;
                            previous[y][x] = [item.x, item.y].slice();
                            
                            queue.push({
                                x: x,
                                y: y,
                                distance: item.distance + 1,
                                cost: item.distance + 1 + heuristic(x, y)
                            });
                        }
                    }
                });
            }
        } else {
            state = NOT_FOUND;
            println("No path found.");
        }
    }
    
    if (state >= SEARCHING) {
        for (var j = 0; j < distances.length; j++) {
            for (var i = 0; i < distances[j].length; i++) {
                var d = distances[j][i];
                if (d !== null) {
                    fill(map(d, 0, colorScale, 255, 0), 255, 0);
                    rect(i * tileWidth, j * tileWidth, tileWidth, tileWidth);
                }
            }
        }
    }
    
    if (state === FOUND) {
        var posX = targetX;
        var posY = targetY;
        var midTile = tileWidth / 2;
        
        
        noFill();
        stroke(0, 132, 255);
        strokeWeight(midTile);
        
        beginShape();
        vertex(targetX * tileWidth + midTile, targetY * tileWidth + midTile);
        
        
        while (posX !== sourceX || posY !== sourceY) {
            var newPosition = previous[posY][posX];
            
            if (newPosition === null) {
                break;
            }
            
            posX = newPosition[0];
            posY = newPosition[1];
            
            vertex(posX * tileWidth + midTile, posY * tileWidth + midTile);
        }
        
        endShape();
    }
    
    noStroke();
    if (state > SELECT_SOURCE) {
        fill(255, 0, 0);
        rect(sourceX * tileWidth, sourceY * tileWidth, tileWidth, tileWidth);
    }
    
    if (state > SELECT_TARGET) {
        fill(255, 0, 0);
        rect(targetX * tileWidth, targetY * tileWidth, tileWidth, tileWidth);
    }
    
    if (debugMode) {
        fill(230, 230, 230);
        rect(0, 0, 40, 20);
        
        fill(255, 0, 0);
        text(this.__frameRate.toFixed(1), 4, 14);
    }
};

keyPressed = function() {
    if (keyCode === 68) {
        debugMode = !debugMode;
    }
};

function check(x, y) {
    return board[y][x] === 0;
}

mouseClicked = function() {
    switch (state) {
        case SELECT_SOURCE:
            sourceX = floor(mouseX / tileWidth);
            sourceY = floor(mouseY / tileWidth);
            
            if (!check(sourceX, sourceY)) {
                return;
            }
            
            // We fill the arrays
            for (var y = 0; y < height; y += tileWidth) {
                var stage = [];
    
                for (var x = 0; x < width; x += tileWidth) {
                    stage.push(null);
                }
    
                distances.push(stage.slice());
                previous.push(stage);
            }

            state = SELECT_TARGET;
            break;
        case SELECT_TARGET:
            
            targetX = floor(mouseX / tileWidth);
            targetY = floor(mouseY / tileWidth);
            
            if (!check(targetX, targetY)) {
                return;
            }
            
            queue.push({
                x: sourceX,
                y: sourceY,
                distance: 0,
                cost: 0
            });
            state = SEARCHING;
            break;
        case SEARCHING:
            break;
        case FOUND:
        case NOT_FOUND:
            state = SELECT_SOURCE;
            distances = [];
            previous = [];
            
            while (!queue.isEmpty()) {
                queue.pop();
            }
            
            mouseClicked();
            break;
    }
};