// https://www.khanacademy.org/computer-programming/onde-plane-progressive-harmonique/4876064172654592

/**
* A wave going from top left to top right
**/

var tile = 8;
var fps = 20;

/** THE WAVE'S ORIENTATION **/
var k = new PVector(2, 2);
var w = 2 * PI;

var t = 0;
frameRate(fps);
draw = function() {
    noStroke();
    
    var OM = new PVector();
    for (var x = tile / 2; x < width; x += tile) {
        OM.x = x;
        for (var y = tile / 2; y < height; y += tile) {
            OM.y = y;
            var v = cos(w*t - k.dot(OM));
            fill(
                lerp(0, 255, v),
                10,
                58
            );
            rect(x - tile*0.5, y - tile*0.5, tile, tile);
        }
    }
    
    t += 0.4;
};