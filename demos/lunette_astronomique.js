
/**
 * Pour avoir une meilleure vue, allez à l'adresse suivante:
 * https://www.khanacademy.org/computer-programming/lunette-astronomique-avanc/6350980982685696?width=1200&height=600&editor=no
**/

var img = getImage("space/star");
var cibleY = 180;

/**
 * Implémentation des lentilles
**/
function Systeme(x, y, distances) {
    this.x = x;
    this.y = y;
    this.lentilles = [];
    
    var offset = 0;
    for (var i = 0; i < distances.length; i++) {
        /*var distance = typeof distance === 'object' ? ({
            x: offset,
            f: distances[i].f,
            offset: distances[i].offset || 0,
            w: distances[i].f
        }) : ({
            x: offset,
            f: distances[i],
            offset: 0,
            w: distances[i].f
        });
        
        if (i > 0 && distance.offset !== 0) {
            this.lentilles[this.lentilles.length - 1].w += distance.offset;
        }
        
        this.lentilles.push(distance);
        
        offset += 2 * distance.f + distance.offset;*/
        
        
        
        if (i > 0) {
            offset += distances[i - 1] + distances[i];
        }
            this.lentilles.push(
                {
                    x: this.x + offset,
                    f: distances[i],
                    w: distances[i].f
                }
            );
            offset += distances[i] * 2;
        
    }
    
    println(this.lentilles[1].x);
    
    this.draw = function() {
        
        stroke(107, 107, 107);
        line(this.x, this.y, this.x + offset, this.y);
        
        for (var i = 0; i < this.lentilles.length; i++) {
            var lentille = this.lentilles[i];
            
            var x = lentille.x - 1;
            var y = this.y - 100 / 2;
        
            // La lentille
            noStroke();
            fill(31, 31, 31);
            rect(x, y, 2, 100);
        
            // Les foyers
            fill(255, 0, 0);
            rect(x - lentille.f, this.y - 5, 1, 10);
            rect(x + lentille.f, this.y - 5, 1, 10);
            ellipse(this.x, this.y, 5, 5);
        }
    };
    
    this.incident = function(x, y, targetY, col) {
        x = x - this.x;
        y = y - this.y;
        targetY = targetY - this.y;
        
        stroke(col);
        
        var coeff1 = 0;
        var coeff2 = (y - targetY) / x;
        
        for (var i = 0; i < this.lentilles.length; i++) {
            var lentille = this.lentilles[i];
            
            if (i > 0) {
                targetY = y + coeff2 * lentille.f;
            }
            
            coeff1 = coeff2;
            coeff2 = coeff1 + (abs(targetY) / lentille.f) * (targetY > 0 ? -1 : 1);
            
            var newY = this.y + targetY + coeff2 * lentille.f;
            
            line(
                this.x + x, this.y + y,
                lentille.x, this.y + targetY
            );
            line(
                lentille.x, this.y + targetY,
                lentille.x + lentille.f, newY
            );
            
            x = lentille.x + lentille.f - this.x;
            y = newY - this.y;
        }
        
        return [
            this.x + x,
            this.y + y,
            atan(coeff2)
        ];
    };
}

var sys = new Systeme(200, 150, [100, 50, 50, 50]);
/*var lunette = new Systeme(200, 300, [120, {
    f: 30,
    offset: 0
}, 30, 30]);*/

function canvas() {
    background(255, 255, 255);
    cibleY = round(constrain(cibleY, 100, 200));
    
    sys.draw();
    
    var colors = [
        color(255, 0, 0),
        color(255, 255, 0),
        color(81, 255, 0),
        color(0, 55, 255),
        color(77, 0, 255),
    ];
    
    var offset = 10;
    var result = [0, 0];
    
    for (var i = 0; i < 5; i++) {
        var y = cibleY - 2 * offset + i * 10;
        result = sys.incident(100, y, sys.y - 20 + i * offset, colors[i]);
    }
    
    var rayonIncident = atan((sys.y - cibleY) / sys.lentilles[0].f);
    
    fill(0, 0, 0);
    text('Rayon incident ' + rayonIncident.toFixed(2) + 'º', 10, 20);
    text('Rayon réfracté ' + result[2].toFixed(2) + 'º', 10, 40);
    text('Grossissement ' + (result[2] / rayonIncident).toFixed(2), 10, 80);
    text('Origine ' + (sys.y - cibleY) + 'px (rayon central)', 10, 60);
    
    //lunette.draw();
    //lunette.incident(100, 280, lunette.y, color(163, 0, 163));
    //lunette.incident(100, 280, 280, color(163, 0, 163));
}

canvas();

mouseDragged = function() {
    cibleY = mouseY;
    
    canvas();
};

keyPressed = function() {
    
    switch (keyCode) {
        case UP:
            cibleY -= 1;
            break;
        case DOWN:
            cibleY += 1;
            break;
    }
    
    canvas();
};