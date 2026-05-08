// Lien : https://www.khanacademy.org/computer-programming/dijkstra-algorithm/5030266773094400

/**
 * Image loading funtion: https://www.khanacademy.org/computer-programming/i/6266740477837312
 * Distances: https://www.distancecalculator.net/
**/
var imageLoad = (function(url) {
    var allImages = {}; // NB: cache grows without bounds!
    var usurpedImg; // a gotten getImage() that we munge
    var usurpedUrl = null; // a string when usurpedImg is in use
    var failedImg = getImage("cute/EnemyBug");
    var recoveryUrl = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/cute/EnemyBug.png";
    
    /* Private function returns a duplicate of img. */
    function dupImage(img) {
        var dup = createGraphics(img.width, img.height, JAVA2D);
        dup.background(1, 2, 3, 0); // transparent
        dup.image(img, 0, 0);
        return dup;
    }
    
    /*
     * Called by the browser once it successfully loaded this image.
     * Convert the usurpedImg to a stable one in the allImages cache.
     */
    function loadedEvent() {
        if (this.src === usurpedUrl) {
            usurpedImg.width = this.naturalWidth;
            usurpedImg.height = this.naturalHeight;
            allImages[usurpedUrl] = dupImage(usurpedImg);
            usurpedUrl = null; // free at last!
        }
    }
    
    /*
     * Called by the browser for any kind of (fatal) image loading
     * error.  Substitude a "guaranteed good URL" for the browser
     * to load, and give the user the failedImg image.
     * 
     */
    function errorEvent(event) {
        if (imageLoad.printlnOnError) {
            println("imageLoad: Cannot load URL '" + event.srcElement.src + "'!");
        }
        event.srcElement.src = recoveryUrl; // use an URL that will work
        event.srcElement.onerror = null; // but, no more failing!
        allImages[usurpedUrl] = dupImage(failedImg); // user gets this image instead
        usurpedUrl = null; // free at last!
        return true; // browser should try again with failedUrl?
    }

    /*
     * Return an image associated with the url string.
     * Can and will return null until we successfully
     * conjure the desired image.
     */
    function imageLoad(url) {
        url = url.toString();
        var img = allImages[url] || null;
        if ((!img) && (url !== usurpedUrl)) {
            /*
             * Inspired by scientist2023's program at
             * khanacademy.org/cs/wi/6716637946626048 ,
             * and H.M. Wogglebug T.E. comments re. onload.
             */
            usurpedImg = getImage("cute/None");
            usurpedImg.sourceImg.src = usurpedUrl = url;
            usurpedImg.sourceImg.onerror = errorEvent;
            usurpedImg.sourceImg.onload = loadedEvent;
        }
        return img;
    }
    
    imageLoad.allImages = allImages; // share with the user
    imageLoad.printlnOnError = false; // change to true for verbose complaints
    return imageLoad;
})();

// An approximative scale
var mapScale = sqrt(pow(176, 2) + pow(10, 2)) / 900.71;

var Graph = function () {
    this.vertices = {};
    this.edges = {};
};
Graph.prototype.push = function (name, vertex) {
    this.vertices[name] = vertex;
    this.edges[name] = [];
};
Graph.prototype.link = function (vertex1, vertex2, weight) {
    this.edges[vertex1].push([vertex2, weight || 1]);
    this.edges[vertex2].push([vertex1, weight || 1]);
};
Graph.prototype.draw = function() {
    
    // the edges
    stroke(0, 0, 0);
    strokeWeight(0.5);
    for (var key in this.vertices) {
        var vertex = this.vertices[key];
        var edges = this.edges[key];
        
        
        for (var i = 0; i < edges.length; i++) {
            var vertex2 = this.vertices[edges[i][0]];
            
            line(vertex.x, vertex.y, vertex2.x, vertex2.y);
        }
    }
    
    // the vertices
    noStroke();
    fill(255, 0, 0);
    for (var key in this.vertices) {
        var value = this.vertices[key];
        
        ellipse(value.x, value.y, 4, 4);
    }
};
Graph.prototype.getVertex = function (name) {
    return this.vertices[name];
};
Graph.prototype.findPath = function (from, to) {
    
    var target = from;
    var distances = {};
    var previous = {};
    var visited = {};
    
    for (var key in this.vertices) {
        distances[key] = Infinity;
        previous[key] = undefined;
    }
    
    distances[from] = 0;
    
    while (target !== null) {
        visited[target] = true;
        var distance = distances[target];
        var adjacent = this.edges[target];
        
        for (var i = 0; i < adjacent.length; i++) {
            var updatedDistance = distance + adjacent[i][1];
            
            if (updatedDistance < distances[adjacent[i][0]]) {
                distances[adjacent[i][0]] = updatedDistance;
                previous[adjacent[i][0]] = target;
            }
        }
        
        var minimum = null;
        
        for (var key in distances) {
            if (
                visited[key] !== true &&
                (minimum === null || distances[key] < distances[minimum])
            ) {
                minimum = key;
            }
        }
        
        if (minimum === to) {
            target = null;
        } else {
            target = minimum;
        }
    }
    
    var vertices = [];
    target = to;
    
    var distance = distances[to];
    
    while (target) {
        var vertex = this.vertices[target];
        
        vertices.push({
            name: target,
            x: vertex.x,
            y: vertex.y,
            distance: (distance - distances[previous[target]]) || 0
        });
        
        distance = distances[previous[target]];
        
        target = previous[target];
    }
    
    return vertices.reverse();
};

var Car = function (x, y, speed) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    
    this.stack = [];
    this.travelling = false;
    this.moving = false;
    
    this.from = [x, y];
    this.to = [x, y];
    
    this.duration = 0;
    this.distance = 0;
};
Car.prototype.update = function () {
    if (this.moving && this.travelling) {
        
        var angle = atan2(
            this.to[1] - this.from[1],
            this.to[0] - this.from[0]
        );
        
        
        var hypothenuse = ((this.distance / this.duration) * mapScale) / 60;
        
        this.x += hypothenuse * cos(angle);
        this.y += hypothenuse * sin(angle);
        
        if (
            dist(this.x, this.y, this.to[0], this.to[1]) < 0.5
        ) {
            this.moving = false;
            this.travelling = false;
            this.x = this.to[0];
            this.y = this.to[1];
        }
    }
    
    if (this.stack.length > 0 && this.travelling === false) {
        
        var to = this.stack[0];
        
        this.from = [this.x, this.y];
        this.to = [to[0], to[1]];
        this.distance = to[2];
        this.duration = to[2] / this.speed;
        this.moving = true;
        this.travelling = true;
        this.stack.shift();
    }
};
Car.prototype.draw = function() {
    fill(251, 0, 255);
    noStroke();
    
    ellipse(this.x, this.y, 10, 10);
};
Car.prototype.clear = function () {
    this.stack = [];
};
Car.prototype.moveTo = function (x, y, distance) {
    this.stack.push([x, y, distance]);
};
Car.prototype.stop = function (x, y) {
    this.current.to = null;
};
Car.prototype.pushPath = function (path) {
    for (var i = 1; i < path.length; i++) {
        this.moveTo(path[i].x, path[i].y, path[i].distance);
    }
};

var graph = new Graph();

// In Paris
var car = new Car(240, 230, 200);

// The cities
// {
graph.push("Paris", {
    x: 240,
    y: 230
});
graph.push("Rennes", {
    x: 175,
    y: 235
});
graph.push("Le Mans", {
    x: 205,
    y: 238
});
graph.push("Brest", {
    x: 140,
    y: 225
});
graph.push("Tours", {
    x: 216,
    y: 250
});
graph.push("Angers", {
    x: 190,
    y: 248
});
graph.push("Nantes", {
    x: 172,
    y: 252
});
graph.push("Poitiers", {
    x: 200,
    y: 270
});
graph.push("Limoges", {
    x: 216,
    y: 286
});
graph.push("Bordeaux", {
    x: 182,
    y: 306
});
graph.push("Toulouse", {
    x: 206,
    y: 340
});
graph.push("Clermont-Ferrand", {
    x: 240,
    y: 296
});
graph.push("Lyon", {
    x: 262,
    y: 298
});
graph.push("Marseille", {
    x: 271,
    y: 343
});
graph.push("Dijon", {
    x: 267,
    y: 267
});
graph.push("Bayonne", {
    x: 164,
    y: 329
});
graph.push("Saint-Sébastien", {
    x: 154,
    y: 333
});
graph.push("Bilbao", {
    x: 142,
    y: 332
});
graph.push("Santander", {
    x: 125,
    y: 326
});
graph.push("Saragosse", {
    x: 180,
    y: 373
});
graph.push("Burgos", {
    x: 131,
    y: 353
});
graph.push("Madrid", {
    x: 130,
    y: 389
});
graph.push("Grenade", {
    x: 121,
    y: 454
});
graph.push("Londres", {
    x: 204,
    y: 170
});
graph.push("Douvres", {
    x: 225,
    y: 179
});
graph.push("Calais", {
    x: 232,
    y: 184
});
graph.push("Amiens", {
    x: 236,
    y: 207
});
graph.push("Birmingham", {
    x: 189,
    y: 144
});
graph.push("Manchester", {
    x: 184,
    y: 123
});

graph.link("Paris", "Le Mans", 185);
graph.link("Le Mans", "Rennes", 140);
graph.link("Le Mans", "Angers", 82);
graph.link("Le Mans", "Tours", 78);
graph.link("Rennes", "Brest", 210);
graph.link("Angers", "Nantes", 80);
graph.link("Nantes", "Poitiers", 161);
graph.link("Tours", "Poitiers", 94);
graph.link("Poitiers", "Limoges", 110);
graph.link("Poitiers", "Bordeaux", 206);
graph.link("Bordeaux", "Limoges", 181);
graph.link("Bordeaux", "Toulouse", 211);
graph.link("Toulouse", "Limoges", 248);
graph.link("Clermont-Ferrand", "Bordeaux", 305);
graph.link("Clermont-Ferrand", "Limoges", 141);
graph.link("Clermont-Ferrand", "Lyon", 136);
graph.link("Nantes", "Brest", 255);
graph.link("Lyon", "Marseille", 278);
graph.link("Lyon", "Dijon", 174);
graph.link("Paris", "Dijon", 263);
graph.link("Bordeaux", "Bayonne", 166);
graph.link("Bayonne", "Saint-Sébastien", 45);
graph.link("Bilbao", "Saint-Sébastien", 76);
graph.link("Bilbao", "Santander", 75);
graph.link("Bilbao", "Saragosse", 244);
graph.link("Bilbao", "Burgos", 120);
graph.link("Burgos", "Madrid", 214);
graph.link("Madrid", "Saragosse", 274);
graph.link("Madrid", "Grenade", 360);
graph.link("Amiens", "Paris", 115);
graph.link("Amiens", "Calais", 122);
graph.link("Calais", "Douvres", 42);
graph.link("Douvres", "Londres", 108);
graph.link("Birmingham", "Londres", 163);
graph.link("Birmingham", "Manchester", 113);

// }

var backgroundImage;

car.pushPath(graph.findPath("Paris", "Manchester"));
car.pushPath(graph.findPath("Manchester", "Brest"));
car.pushPath(graph.findPath("Brest", "Grenade"));
car.pushPath(graph.findPath("Grenade", "Marseille"));
car.pushPath(graph.findPath("Marseille", "Paris"));
//car.pushPath(graph.findPath("Marseille", "Londres"));


var draw = function() {
    
    if (!backgroundImage) {
        backgroundImage = imageLoad("https://upload.wikimedia.org/wikipedia/commons/0/00/Western_Europe_location_map.png");
    }
    
    if (backgroundImage) {
        image(backgroundImage, 0, 0, width, height);
    }
    
    graph.draw();
    
    car.update();
    car.draw();
};


frameRate(60);