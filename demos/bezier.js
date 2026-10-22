


function  Bezier(tags) {
    this.tags = tags;
    this.points  = [];
    
    
    this.lines = function(points) {
        noFill();
        stroke(214, 214, 214);
        strokeWeight(2);
        strokeJoin(ROUND);
        
        beginShape();
        
        for (var i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1]);
        }
        
        endShape();
    };
    
    this.draw = function(percent, record) {
        var points = this.tags;
        
        while (points.length > 1) {
            this.lines(points);
            
            var nPoints = [];
            var p1 = points[0];
            
            for (var i = 1; i < points.length; i++) {
                var p2 = points[i];
                nPoints.push([
                    p1[0] + (p2[0] - p1[0]) * percent,
                    p1[1] + (p2[1] - p1[1]) * percent
                ]);
                p1 = p2;
            }
            
            points = nPoints;
        }
        
        if (record && points.length === 1) {
            this.points.push([
                points[0][0],
                points[0][1],
                lerp(color(255, 0, 0), color(255, 234, 0), percent)
            ]);
        }
        
        noStroke();
        for (var i = 0; i < this.points.length; i++) {
            fill(this.points[i][2]);
            ellipse(this.points[i][0], this.points[i][1], 4, 4);
        }
        
        if (points.length === 1) {
            fill(0, 0, 0);
            ellipse(points[0][0], points[0][1], 4, 4);
        }
    };
}

var t = 0;

var b = new Bezier([
    [80, 350],
    [20, 50],
    [360, 50],
    [320, 350]
]);


frameRate(200);
draw = function() {
    background(255, 255, 255);
    b.draw(t, t !== 1);
    
    t = constrain(t + 0.001, 0, 1);
};