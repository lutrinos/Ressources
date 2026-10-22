/**
 * 🅃🄾🅆🄴🅁🅂
 * 
 * Hey everyone, as you can see, this is a game ;D
 * 
 * 
 * @play {
 *      It's not very complicate... just click play, place towers  *      to pop the balloons, and upgrade them, their speed and    *      their damages.
 *      You win some money at the end of each wave, so go in the  *      shop to improve the power ot your towers
 * }
 * 
 * @subscribe {
 * - https://www.khanacademy.org/cs/-/5221002251386880
 * }
 * 
 * @create {
 *      Go to this link to create waves. Then, post it in the     *      Tips & Thanks. I will give the credits in the comments
 *      Link: 
 *      - https://www.khanacademy.org/cs/-/6390102587654144
 * }
 * 
 * @creditsForTheWaves {
 *      nathanTiPrograming (me)
 * 
 *      -- your username will come here if you create a wave --
 * }
 * 
 * 
 * @cheat {
 *      There is a way to win money without doing waves... but it's a secret... try to discover it...
 * }
**/


smooth();
strokeJoin(ROUND);
textFont(createFont("monospace"));


var mode = "lang";

// some variables
//{
var mouseIsReleased = false;
var ennemies = [];
var towers = [];
var bullets = [];
var destroys = [];
var smokes = [];
var toRemove = [];
var particles = [];
var crazyTexts = [];
var currentTower = null;
var money = 500;
var otherMoney = 0;
var wave = -1;
var wave_part = 0;
var part_index = 1;
var waveIsFinished = false;
var loadThePanel = true;
var loadTheShop = false;
var transition_left = 0;
var transition_do = false;
var transition_to = "";

var moneyToWin = 50;
var moneyToStart = 1000;
var speedBullet = 1;
var damageBullet = 1;
var health = 5;
var myStatus = "loose";
var initialize = true;

var myCursor = "default";
var onMouse = false;
//}

// the infos for the different waves
//{
var maps = [[[0, 0], [378, 50], [100, 100], [287, 150], [50, 300], [50, 381], [150, 323], [420, 265]], [[0, 0], [100, 100], [200, 50], [350, 50], [350, 350], [250, 350], [250, 150], [-20, 300]], [[200,200], [175,215], [153,196], [152,168], [167,151], [204,148], [233,163], [241,189], [241,215], [234,229], [214,240], [177,244], [119,240], [97,207], [95,164], [98,116], [138,83], [204,76], [252,94], [291,151], [301,212], [300,287], [276,324], [223,344], [150,337], [84,306], [59,253], [51,202], [44,158], [46,108], [54,65], [90,47], [136,32], [197,28], [280,51], [332,53], [367,127], [396,204]], [[-20,-20], [281,68], [294,29], [340,30], [344,130], [222,96], [215,209], [331,276], [327,363], [103,295], [103,68], [1,33]], [[-20,-20], [420,420]], [[-20,-20], [120,343], [158,43], [232,338], [255,65], [320,325], [352,141], [377,146], [330,369], [299,371], [286,319], [267,371], [197,375], [166,259], [151,374], [91,379], [0,270]], [[-20,-20], [287,343], [37,357], [106,133], [285,340], [246,89], [108,133], [284,339], [396,397]]];


var list = [[4], [10, 0, 0, 5], [20, 2], [20, 0, 1, 10], [0, 0, 0, 50, 0, 0, 25], [0, 5, 0, 5], [0, 0, 10, 1, 3]];
var frequency = [[100], [60, 10, 10, 20], [22, 87], [40, 306, 129, 55], [10, 10, 300, 23, 10, 10, 55], [10, 77, 10, 10], [100, 10, 36, 20, 20]];
var speeds = [[0.5], [2, 0, 0, 1], [1.8, 1], [1.5, 2, 1, 1], [10, 10, 10, 2, 0, 0, 5], [0, 1, 0, 4], [0, 0, 1, 2, 2]];
var healths = [10, 15, 25, 25, 30, 40, 45];
//}



// some tools
//{

// normalize fill, color, rectMode...
var normalize = function() {
    noFill();
    strokeWeight(1);
    rectMode(CORNER);
    noStroke();
    textSize(12);
    fill(0, 0, 0);
    textAlign(LEFT, TOP);
    imageMode(CORNER);
};

// get the angle with two coordinates
var getAngle = function(x1, y1, x2, y2) {
    var x = x2 - x1;
    var y = y2 - y1;
    return -(Math.atan2(x, y) * 180 / 3.14);
};

// return a value turn into money
var getMoney = function(m) {
    var t = m >= 10000 ? m/10000+"K" : m;
    return t + "$";
};

// choose a price to buy some things...
var getPrice = function(what, t) {
    switch (what) {
        case "damage":
            return t.damage*15;
        case "speed":
            return t.spd*12;
        case "tower":
            var nb = towers.length === 0 ? 1 : towers.length+1;
            return nb*150;
        case "upgrade":
            return t.level*120;
        case "money_win":
            return moneyToWin*3.5;
        case "money_start":
            return moneyToStart*0.5;
        case "money_damage":
            return damageBullet*250;
        case "money_speed":
            return speedBullet*200;
    }
};

// do the particles
var smoke = function(x, y, colr){
    this.x = x;
    this.y = y;
    this.state = 0;
    this.color = colr;
    
    this.draw = function(index) {
        normalize();
        var dif = cos(this.state)*10;
        fill(this.color);
        ellipse(this.x, this.y, dif, dif);
        this.state += 10;
        if (this.state >= 200) {
            toRemove.push({
                array:"smoke",
                index: index
            });
        }
        
    };
};
var particle = function() {
    var colors = [color(255, 0, 255), color(255, 0, 0), color(255, 230, 0), color(0, 47, 255), color(0, 255, 166), color(250, 176, 5)];
    this.x = random(0, width);
    this.y = -20;
    this.spd = random(1.2, 2);
    this.rotate = random(-20, 20);
    this.dif = round(random(0, 300));
    this.color = colors[round(random(0, colors.length-1))];
    
    this.draw = function(index) {
        normalize();
        fill(this.color);
        stroke(0, 0, 0);
        pushMatrix();
        translate(this.x, this.y);
        rotate(this.rotate+cos(frameCount+this.dif)*30);
        beginShape();
        vertex(0, 0);
        bezierVertex(2, 2, 8, 2, 20, 0);
        bezierVertex(20, 2, 20, 8, 20, 10);
        bezierVertex(8, 12, 2, 12, 0, 10);
        bezierVertex(0, 8, 0, 2, 0, 0);
        endShape();
        popMatrix();
        
        this.y += abs(cos(frameCount+this.dif)*1.2)*this.spd;
        this.x += sin(frameCount+this.dif)*1.2;
        
        if (this.y >= height+20) {
            particles.splice(index, 1);
        }
    };
};

// for the cursor
function showCursor() {
    normalize();
    switch (myCursor) {
        case "default":
            fill(255, 128, 0);
            stroke(0, 0, 0);
            triangle(mouseX, mouseY, mouseX+15, mouseY+15, mouseX, mouseY+20);
            break;
        case "pointer":
            fill(255, 128, 0);
            strokeWeight(1);
            stroke(0, 0, 0);
            pushMatrix();
            translate(mouseX, mouseY);
            beginShape();
            // first
            vertex(3, 0);
            vertex(6, 0);
            vertex(6, 10);
            //second
            vertex(7, 6);
            vertex(9, 6);
            vertex(9, 10);
            // third
            vertex(10, 8);
            vertex(12, 8);
            vertex(12, 12);
            // four
            vertex(12, 10);
            vertex(14, 10);
            vertex(14, 14);
            
            //last
            vertex(14, 16);
            
            // bottom
            vertex(13, 20);
            vertex(10, 22);
            vertex(5, 22);
            
            // left
            vertex(2, 19);
            vertex(-2, 10);
            vertex(-2, 8);
            vertex(1, 8);
            vertex(3, 10);
            vertex(3, 0);
            endShape();
            popMatrix();
            
    }
    
    myCursor = "default";
}

// for the special text
var newText = function (txt) {
    this.curt = "";
    this.newt = txt;
    
    this.getText = function() {
        return this.curt;
    };
    
    this.add = function () {
        if (frameCount%5 === 0) {
            if (this.curt.length < this.newt.length) {
                this.curt += this.newt[this.curt.length];
            }
        }
    };
};

// the images
var img = {
    ennemy: function(args) {
        normalize();
        var x = args.x;
        var y = args.y;
        var type = args.type;
        var colr = args.color;
        var tox = args.toX;
        var toy = args.toY;
        var life = args.life;
        var totalLife = args.total_life;
        
        if (type === 1) {
            fill(colr);
            ellipse(x, y-5, 15, 20);
            fill(255, 255, 255, 200);
            beginShape();
            vertex(x, y-15);
            bezierVertex(x+5, y-12, x+8, y, x+3, y);
            bezierVertex(x+5, y, x+2, y-12, x, y-15);
            endShape();
            noFill();
            stroke(0, 0, 0);
            strokeWeight(1);
            beginShape();
            curveVertex(x, y);
            curveVertex(x, y+5);
            curveVertex(x, y+10);
            curveVertex(x+20, y+15);
            endShape();
        } else if (type === 2 || type === 3) {
            var w = type === 2 ? 70 : 90;
            var w2 = type === 2 ? 35 : 55;
            var w3 = w/2;
            var w4 = w2/4;
            pushMatrix();
                translate(x, y);
                rotate(getAngle(x, y, tox, toy));
                fill(colr);
                stroke(0, 0, 0);
                if (life === "none") {stroke(0, 0, 0, transition_left);}
                ellipse(0, 0, w2, w);
                noFill();
                beginShape();
                vertex(0, -w3);
                bezierVertex(w4, -10, w4, 20, 0, w3);
                bezierVertex(-w4, 20, -w4, -10, 0, -w3);
                endShape();
                fill(colr);
                rect(-15, -w3-(w/10), 30, w/10, 5);
            popMatrix();
        }
        
        // health
        //{
        if (life !== "none") {
            noStroke();
            fill(255, 0, 0);
            rect(x-10, y-20, 20, 5);
            fill(0, 255, 0);
            rect(x-10, y-20, (life/totalLife*20), 5);
        }
        //}
    },
    tower: function(x, y, radius, showRadius, angle, level) {
        normalize();
        
        
        pushMatrix();
        rectMode(CENTER);
        translate(x, y);
        rotate(angle);
        if (level === 1) {
            fill(194, 194, 194);
            ellipse(0, 0, 20, 20);
            fill(255, 102, 0);
            ellipse(8, -5, 10, 10);
            ellipse(-8, -5, 10, 10);
            stroke(0, 0, 0);
            ellipse(0, -10, 15, 15);
            noFill();
            beginShape();
            vertex(-10, -5);
            bezierVertex(-2, 8, 2, 8, 10, -5);
            endShape();
            noStroke();
            fill(138, 55, 0);
            rect(0, 8, 2, 20, 5, 5, 0, 0);
            fill(194, 194, 194);
            triangle(0, 20, -2, 16, 2, 16);
        } else if (level === 2) {
            fill(194, 194, 194);
            ellipse(0, 0, 20, 20);
            fill(36, 179, 0);
            ellipse(8, -5, 10, 10);
            ellipse(-8, -5, 10, 10);
            stroke(0, 0, 0);
            fill(0, 82, 0);
            ellipse(0, -10, 15, 15);
            fill(99, 99, 99);
            noStroke();
            rect(0, 7, 4, 20, 5, 5, 0, 0);
        } else if (level === 3) {
            fill(255, 255, 255);
            stroke(0, 0, 0);
            strokeWeight(2);
            ellipse(0, 0, 20, 20);
            fill(0, 0, 0);
            ellipse(8, -5, 10, 10);
            ellipse(-8, -5, 10, 10);
            noFill();
            strokeWeight(3);
            triangle(10, -2, -10, -2, 0, 17);
            strokeWeight(1);
            fill(255, 255, 255);
            ellipse(0, -10, 15, 15);
            fill(0, 0, 0);
            rect(-0.5, -12, 2, 10, 5);
            noStroke();
            rect(0, 7, 4, 20, 5, 5, 0, 0);
        } else if (level === 4) {
            fill(163, 163, 163);
            stroke(0, 0, 0);
            strokeWeight(2);
            ellipse(0, 0, 20, 20);
            fill(0, 0, 0);
            ellipse(8, -5, 10, 10);
            ellipse(-8, -5, 10, 10);
            noFill();
            strokeWeight(3);
            triangle(10, -2, -10, -2, 0, 17);
            strokeWeight(1);
            fill(255, 255, 255);
            ellipse(0, -10, 15, 15);
            fill(0, 0, 0);
            rect(0, -12, 15, 4, 5);
            noStroke();
            rect(0, 15, 4, 10, 5, 5, 0, 0);
        } else if (level === 5) {
            fill(255, 255, 255);
            stroke(0, 0, 0);
            strokeWeight(2);
            ellipse(0, 0, 20, 20);
            fill(0, 0, 0);
            noStroke();
            rect(0, 3, 6, 25, 5, 5, 0, 0);
            fill(255, 255, 255);
            stroke(0, 0, 0);
            beginShape();
            vertex(0, 10);
            bezierVertex(0, 10, -10, 10, -15, -10);
            bezierVertex(0, 0, 0, 0, 15, -10);
            bezierVertex(10, 10, 0, 10, 0, 10);
            endShape();
        } else if (level >= 6) {
            var cols = [
                [color(245, 5, 45), color(245, 12, 98)],
                [color(142, 16, 232), color(86, 20, 219)],
                [color(6, 112, 16), color(15, 207, 12)],
                [color(247, 196, 10), color(195, 247, 5)]];
            fill(cols[min(level-6, 3)][0]);
            ellipse(0, 0, 25, 25);
            stroke(0, 0, 0);
            strokeWeight(3);
            fill(cols[min(level-6, 3)][1]);
            ellipse(0, 0, 8, 10);
        }
        
        popMatrix();
        
        if (showRadius) {
            fill(255, 0, 0, 50);
            ellipse(x, y, radius*2, radius*2);
        }
    },
    bullet: function(x, y, angle, type) {
        normalize();
        if (type === 1) {
            pushMatrix();
            translate(x, y);
            rotate(angle);
            fill(138, 55, 0);
            rect(0, -20, 2, 20, 5, 5, 0, 0);
            fill(194, 194, 194);
            triangle(0, 0, -2, -4, 2, -4);
            popMatrix();
        } else if (type === 2) {
            fill(117, 117, 117);
            ellipse(x, y, 5, 5);
        } else if (type === 3) {
            pushMatrix();
            translate(x, y);
            rotate(angle);
            fill(5, 5, 41);
            ellipse(0, 0, 5, 10);
            popMatrix();
        } else if (type === 4) {
            pushMatrix();
            translate(x, y);
            rotate(angle);
            fill(60, 201, 0);
            rect(0, 0, 5, 10, 3);
            popMatrix();
        } else if (type === 5) {
            pushMatrix();
            translate(x, y);
            rotate(angle);
            fill(255, 0, 0);
            rect(0, 0, 5, 10, 3);
            popMatrix();
        } else if (type === 6) {
            pushMatrix();
            translate(x, y);
            rotate(angle);
            fill(0, 171, 100);
            rect(0, 0, 5, 10, 3);
            popMatrix();
        } else if (type >= 7) {
            var c = [
                color(245, 12, 98),
                color(86, 20, 219),
                color(15, 207, 12),
                color(195, 247, 5)
            ];
            var n = new smoke(x, y, c[min(type-7, 3)]);
            smokes.push(n);
        }
    },
    road: function(x1, y1, x2, y2) {
        normalize();
        stroke(235, 235, 235);
        strokeWeight(10);
        line(x1, y1, x2, y2);
        /*pushMatrix();
        translate(x1, y1);
        rotate(getAngle(x1, y1, x2, y2)+90);
        image(getImage("cute/GrassBlock"), 0, -10, dist(x1, y1, x2, y2), 20);
        popMatrix();*/
    }
};


// transition
var transition = function() {
    normalize();
    
    pushMatrix();
    translate(300, 200);
    scale(cos(transition_left/100));
    rotate(frameCount%360);
    
    var x1 = transition_left;
    var x2 = x1-x1/3;
    
    var pos = [[x2, x2], [x1, 0], [x2, -x2], [0, -x1], [-x2, -x2], [-x1, 0], [-x2, x2], [0, x1]];
    
    
    beginShape();
    for (var i = 0; i < pos.length; i++) {
        vertex(pos[i][0], pos[i][1]);
    }
    noStroke();
    fill(255, 0, 0, transition_left);
    endShape();
    for (var i = 0; i < pos.length; i++) {
        img.ennemy({
            x: pos[i][0],
            y: pos[i][1],
            life: "none",
            color: color(255, 0, 0, 100),
            toX: pos[i][0]*2,
            toY: pos[i][1]*2,
            type:3
        });
    }
    popMatrix();
    
    if (mode !== transition_to) {
        transition_left += 7.5;
    } else {
        transition_left -= 7.5;
    }
    if (transition_left <= 0) {
        transition_do = false;
        transition_left = 0;
    } else if (transition_left >= 400) {
        mode = transition_to;
        if (mode === "shop") {loadTheShop = true;}
        transition_left = 400;
        crazyTexts = [];
        initialize = true;
    }
};
var startTransition = function(to) {
    if (!transition_do) {
        transition_do = true;
        transition_to = to;
    }
};
//}

// for the languages
//{
var lang = "en";
var texts = {
    home: {
        "t": {
            en: "Towers",
            fr: "Tours"
        }
    },
    transition: {
        "#1": {
            fr: "Vague",
            en: "Wave"
        },
        "#win": {
            en: "Nice job, try to continue like that",
            fr: "Super, continue comme ça"
        },
        "#loose": {
            en: "try to be better next time ¿º ^ º¿",
            fr: "essaie de mieux faire plus tard ¿º ^ º¿"
        }
    },
    game: {
        "st": {
            en: "Tower #",
            fr: "Tour #"
        },
        "m": {
            en: "Money: ",
            fr: "Argent:"
        },
        "d": {
            en: "Damage: ",
            fr: "Dégats: "
        },
        "s": {
            en: "Speed: ",
            fr: "Vitesse: "
        },
        "sat": {
            en: "Select a tower",
            fr: "Prends une tour"
        },
        "t": {
            fr: "Tour ",
            en: "Tower "
        },
        "w": {
            en: "Health: ",
            fr: "Santé: "
        },
        "u": {
            en: "Upgrade: ",
            fr: "Améliorer "
        },
        "se": {
            en: "Sell",
            fr: "Vendre",
        }
    },
    shop: {
        shop: {
            en: "Shop",
            fr: "Boutique"
        },
        m: {
            en: "Money: ",
            fr: "Monnaie: "
        },
        win1: {
            en: "Increase gains for\neach balloon you\npop (",
            fr: "Augmente les gains\nde chaque ballon\néclaté ("
        },
        win2: {
            en: " now)\nCost: ",
            fr: ")\nCoût: "
        },
        start1: {
            en: "Increase the money you\nhave at the beginning\nof a wave (",
            fr: "Augmente l'argent que\nvous avez au début\nde la vague ("
        },
        start2: {
            en: " now)\nCost: ",
            fr: ").\n Coût: "
        },
        damage1: {
            en: "Multiply bullet's\ndamages by ",
            fr: "Multiplie les dommages\n des boulets par "
        },
        damage2: {
            en: "\nWant more?\nCost: ",
            fr: "\nC'est pas assez?\nCoût :"
        },
        speed1: {
            fr: "Multiplie la vitesse\n des tours par ",
            en: "Multiply towers'\nspeed by "
        },
        speed2: {
            fr: "\nC'est pas assez?\nCoût: ",
            en: "\nWant more?\nCost: "
        },
    },
    end: {
        "#end": {
            en: "u win all the waves\nnice job ;D\nyou deserve all\nmy appreciation\n🥳\n🤩\n😜",
            fr: "Tu as remporté toutes\nles vagues...\nsuper boulot\ntu mérites\ntoute ma gratitude\n🥳\n🤩\n😜"
        }
    },
    how: {
        "#how": {
            en: "Imagine you are a children.\nYou don't know what you can do...\nYou become bored-ridden. You take refuge in sleep.\nIn your dream, you are a strategist. You have to\npop all the ballons that you see.\nFor that, you can build tower, and increase their\nlevels. But be careful, if a balloon finished the\ncourse, your health will decrease...\nGood luck\n-\nand an advice:\nat the end of each wave, you can increase some\nthings such as \n\n* error - code 19876 *\n\n in the shop...",
            fr: "Imagine que tu es un enfant.\nTu ne sais pas quoi faire...\nTu es gagné par l'ennui. Tu prends refuge dans le\nsommeil. Dans ton rêve, tu es un stratège. Tu dois\néclater tous les ballons que tu vois.\nPour cela, tu peux construire des tours, et\naugmenter leurs niveaux. Mais soit prudent, si\nun ballon finit le parcours, ta santé va faiblir...\nBonne chance\n-\net un conseil\nà la fin de chaque vague, tu améliorer quelques\nchoses comme \n\n* error - code 19876 *\n\n dans la boutique..."
        }
    }
};

var TXT = function(name) {
    return texts[mode][name][lang];
};
//}

// the game engine
//{
var unselectAllTowers = function() {
    towers.forEach(function(item) {
        item.select = false;
    });
};
var nextWave = function() {
    // if it's not the last wave, it's the next wave
    if (wave < list.length-1) {wave += 1;}
    bullets = [];
    towers = [];
    ennemies = [];
    money = moneyToStart;
    
    // show the game's part
    startTransition("game");
};
var destroy = function(x, y, colr) {
    this.x = x;
    this.y = y;
    this.color = colr;
    this.width = 40;
    this.index = null;
    
    this.remove = function() {
        toRemove.push({
            index: this.index,
            array: "destroy"
        });
    };
    
    this.draw = function(index) {
        this.index = index;
        var r1 = this.width/4;
        var r2 = r1*3;
        var r3 = this.width/3;
        var r4 = r3*2;
        
        normalize();
        fill(this.color);
        stroke(0, 0, 0);
        strokeWeight(2);
        pushMatrix();
        translate(this.x+20-this.width, this.y+20-this.width);
        beginShape();
        vertex(0, 0);
        bezierVertex(r3, r1, r4, r1, this.width,0);
        bezierVertex(r2, r3, r2, r4, this.width, this.width);
        bezierVertex(r4, r2, r3, r2, 0, this.width);
        bezierVertex(r1, r4, r1, r3, 0, 0);
        endShape();
        popMatrix();
        
        this.width -= 2;
        if (this.width <= 0) {
            this.remove();
        }
    };
};
var ennemy = function(args) {
    var colors = [color(255, 0, 255), color(255, 0, 0), color(255, 230, 0), color(0, 47, 255), color(0, 255, 166), color(250, 176, 5)];
    this.pos = args.pos || new PVector(maps[wave][0][0],maps[wave][0][1]);
    this.toCoor = args.toCoor || new PVector(0, 0);
    this.color = colors[round(random(0, colors.length-1))];
    this.point = args.point || 0;
    this.index = null;
    this.health = args.health || 100;
    this.total_life = this.health;
    this.type = args.type || 1;
    this.spd = args.spd || 5/this.type;
    
    // remove the bullet
    this.remove = function(withMoney) {
        toRemove.push({
            array: "ennemy",
            index: this.index
        });
        if (withMoney === true) {
            money += moneyToWin;
        }
        loadThePanel = true;
        for (var b = 0; b < bullets.length; b++) {
            if (bullets[b].ennemy === this.index) {
                bullets.splice(bullets[b].index, 1);
            }else if (bullets[b].ennemy > this.index) {
                bullets[b].ennemy = max(bullets[b].ennemy-1, 0);
            }
        }
        
        destroys.push(new destroy(this.pos.x-5, this.pos.y-10, this.color));
        
        if (this.type === 3) {
            ennemies.push(new ennemy({
                type: this.type-1,
                pos: this.pos,
                toCorr: this.toCoor,
                point: this.point-1,
                spd: 1
            }));
            ennemies.push(new ennemy({
                type: this.type-1, 
                pos: new PVector(maps[wave][this.point-1][0], maps[wave][this.point-1][1]), 
                toCoor: this.toCoor, 
                point: this.point -1,
                spd: 1
            }));
        }
    };
    
    // update the vector
    this.updateVector = function() {
        if (this.point < maps[wave].length-1) {
            this.point += 1;
            this.toCoor = new PVector(maps[wave][this.point][0], maps[wave][this.point][1]);
        } else {
            this.remove(false);
            health -= this.type;
        }
    };
    
    // move the ennemy
    this.move = function() {
        
        var norm = new PVector(this.toCoor.x, this.toCoor.y);
        var dir = PVector.sub(norm, this.pos);
        dir.normalize();
        dir.mult(min(PVector.dist(this.pos, this.toCoor), this.spd));
        this.pos.add(dir);
        
        if (PVector.dist(this.pos, this.toCoor) < this.spd) {
            this.updateVector();
        }
    };
    
    // draw the ennemy
    this.draw = function(index) {
        this.index = index;
        this.move();
        
        img.ennemy({
            x: this.pos.x, 
            y: this.pos.y, 
            toX: this.toCoor.x, 
            toY: this.toCoor.y,
            life: this.health, 
            color: this.color, 
            type: this.type,
            total_life: this.total_life
        });
        
        if (this.health <= 0) {
            this.remove(true);
        }
    };
    this.updateVector();
};
var bullet = function(from, to, ennemy, damage, level) {
    this.pos = new PVector(from.x, from.y);
    this.to = to;
    this.level = level;
    this.spd = ennemies[ennemy].spd*1.5 < 5 ? 5 : ennemies[ennemy].spd*1.5;
    this.index = bullets.length-1;
    this.ennemy = ennemy;
    this.damage = damage;
    
    // remove the bullet
    this.remove = function() {
        toRemove.push({
            index:this.index,
            array: "bullet"
        });
    };
    
    // move the bullet
    this.move = function() {
        var norm = this.to;
        var dir = PVector.sub(norm, this.pos);
        dir.normalize();
        dir.mult(min(PVector.dist(this.pos, this.to), this.spd));
        this.pos.add(dir);
    };
    
    // draw the bullet
    this.draw = function(index) {
        this.index = index;
        if(this.ennemy > ennemies.length-1) {
            this.remove();
            return;
        }
        if (PVector.dist(this.pos, this.to) < this.spd) {
            this.remove();
            ennemies[this.ennemy].health -= this.damage*damageBullet;
        } else {
            this.move();
            img.bullet(this.pos.x, this.pos.y, 
            getAngle(this.pos.x, this.pos.y, this.to.x, this.to.y),
        this.level);
        }
    };
};
var tower = function(x, y) {
    this.pos = new PVector(x, y);
    this.spd = 1;
    this.damage = 5;
    this.radius = 100;
    this.target = new PVector(0, 0);
    this.select = false;
    this.move = true;
    this.level = 1;
    
    this.check = function() {
        if (frameCount % round((50-this.spd)/speedBullet) === 0) {
            for (var e = 0; e < ennemies.length; e++) {
                if (PVector.dist(this.pos, ennemies[e].pos) < this.radius) {
                    this.target = ennemies[e].pos;
                    bullets.push(new bullet(this.pos, ennemies[e].pos, e, this.damage, this.level));
                    break;
                }
            }
        }
    };
    
    this.upgrade = function() {
        this.level += 1;
    };
    
    this.draw = function(index) {
        this.index = index;
        var angle = getAngle(this.pos.x, this.pos.y, this.target.x, this.target.y);
        
        if (this.move) {
            img.tower(this.pos.x, this.pos.y, this.radius, true, angle, this.level);
            this.pos.x = constrain(mouseX, 0, 400);
            this.pos.y = mouseY;
            if (mouseIsReleased) {
                this.move = false;
                unselectAllTowers();
                this.select = true;
                currentTower = this.index;
            }
        } else {
            this.check();
            img.tower(this.pos.x, this.pos.y, this.radius, false, angle, this.level);
            if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < 30) {
                if (mouseIsReleased) {
                    unselectAllTowers();
                    this.select = true;
                    currentTower = this.index;
                    loadThePanel = true;
                }
            }
        }
        if (this.select) {
            img.tower(this.pos.x, this.pos.y, this.radius, true, angle, this.level);
        }
        
    };
};
var removeAll = function() {
    toRemove.forEach(function (item, index) {
        switch (item.array) {
            case "ennemy":
                ennemies.splice(item.index, 1);
                break;
            case "tower":
                towers.splice(item.index, 1);
                break;
            case "bullet":
                bullets.splice(item.index, 1);
                break;
            case "destroy":
                destroys.splice(item.index, 1);
                break;
            case "smoke":
                smokes.splice(item.index, 1);
                break;
        }
    });
    toRemove = [];
};
//}

// for contents
//{
var css = {
    "button_newTower": {
        left: 420,
        top: 360,
        width: 160,
        content: "New Tower",
        background: color(194, 78, 0, 100),
        color: color(0, 0, 0),
        fontSize: 22,
        height: 30,
        radius: 10,
        hover: color(194, 78, 0, 200),
        cursor: HAND,
        click: function() {
            var price = towers.length === 0 ? 100 : towers.length*100;
            if (money >= price) {
                towers.push(new tower(mouseX, mouseY));
                money -= price;
            }
            loadThePanel = true;
        }
    },
    "play_part": {
        left: 0,
        top: 0,
        width: 400,
        height: height,
        content:"",
        background: color(255, 0, 255, 0),
        hover: color(255, 0, 0, 0),
        
        click:function() {
            unselectAllTowers();
            currentTower = null;
            loadThePanel = true;
        }
    },
    "button_upgrade": {
        left: 480,
        top: 205,
        width: 100,
        height: 55,
        content: "Upgrade",
        background: color(255, 200, 0, 100),
        hover: color(255, 200, 0, 150),
        radius: 10,
        cursor: HAND,
        fontSize: 10,
        click:function() {
            var price = getPrice("upgrade", towers[currentTower]);
            if (currentTower !== null && towers[currentTower].level < 10 && money >= price) {
                towers[currentTower].upgrade();
                money -= price;
            }
            loadThePanel = true;
        }
    },
    "button_sell": {
        background: color(255, 0, 0, 100),
        width: 57,
        height: 55,
        left: 416,
        top: 204,
        radius: 17,
        content: "Sell",
        hover: color(255, 0, 0, 150),
        cursor: HAND,
        click: function() {
            if (currentTower !== null) {
                toRemove.push({
                    index: currentTower, 
                    array: "tower"
                });
                otherMoney += towers[currentTower].level*100;
                currentTower = null;
                loadThePanel = true;
            }
        }
    },
    "inform_money": {
        content: "Money: 200",
        left: 420,
        top: 290,
        fontSize: 22,
        width: 160,
        height: 30,
        background: color(255, 200, 0, 50),
        radius: 10
        
    },
    "inform_wave": {
        content: "Wave 1/10",
        left: 420,
        top: 325,
        fontSize: 22,
        width: 160,
        height: 30,
        background: color(255, 0, 0, 50),
        radius: 10
        
    },
    "button_damage": {
        content: "Damage: 10",
        left: 420,
        top: 140,
        width: 160,
        height: 54,
        radius: 10,
        cursor: "pointer",
        background: color(189, 255, 195, 80),
        hover: color(189, 255, 195, 60),
        click: function() {
            var price = getPrice("damage", towers[currentTower]);
            if (currentTower !== null && towers[currentTower].level*10 !== towers[currentTower].damage && money >= price) {
                towers[currentTower].damage += 5;
                money -= price;
            }
            loadThePanel = true;
        }
    },
    "button_speed": {
        content: "+",
        left: 529,
        top: 75,
        fontSize: 15,
        background: color(0, 251, 255, 35),
        hover: color(0, 251, 255, 25),
        cursor: "pointer",
        width: 51, 
        height: 56,
        radius: 14,
        click: function() {
            var price = getPrice("speed", towers[currentTower]);
            if (currentTower !== null && money >= price) {
                if (towers[currentTower].spd < (towers[currentTower].level*5)-1) {
                    if (towers[currentTower].spd === 1) {
                        towers[currentTower].spd = 4;
                    }else{
                        towers[currentTower].spd += 5;
                    }
                    money -= price;
                }
                loadThePanel = true;
            }
        }
    },
    "inform_speed": {
        top: 75,
        left: 421,
        width: 100,
        height: 55,
        content: "Speed: 10",
        background: color(0, 251, 255, 20),
        radius: 10,
    },
    "inform_tower": {
        content: "Tower #1",
        left: 420,
        top: 10,
        width: 160,
        height: 54,
        radius: 10,
        fontSize: 18,
        background: color(189, 255, 195, 0),
    },
    "inform_win": {
        content: "win",
        left: 50,
        top: 120,
        width: 200,
        height: 80,
        background: color(255, 183, 0, 150)
    },
    "inform_start": {
        content: "start",
        left: 350,
        top: 120,
        width: 200,
        height: 80,
        background: color(255, 183, 0, 150)
    },
    "inform_more_damage": {
        content: "damage",
        left: 350,
        top: 260,
        width: 200,
        height: 80,
        background: color(255, 183, 0, 150)
    },
    "inform_more_speed": {
        content: "speed",
        left: 50,
        top: 260,
        width: 200,
        height: 80,
        background: color(255, 183, 0, 150)
    },
    "more": {
        top: {
            win: 200,
            start: 200,
            speed: 340,
            damage: 340
        },
        left: {
            win: 50,
            start: 350,
            speed: 50,
            damage: 350
        },
        content: "+",
        background: color(56, 209, 0),
        hover: color(18, 122, 0),
        width: 200,
        height: 40,
        cursor: HAND,
        radius: 4,
        fontSize: 40,
        click: {
            win: function() {
                if (otherMoney >= getPrice("money_win")) {
                    otherMoney -= getPrice("money_win");
                    moneyToWin += 50;
                    loadTheShop = true;
                }
            },
            start: function () {
                if (otherMoney >= getPrice("money_start")) {
                    otherMoney -= getPrice("money_start");
                    moneyToStart += 200;
                    loadTheShop = true;
                }
            },
            speed: function() {
                if (otherMoney >= getPrice("money_speed")) {
                    otherMoney -= getPrice("money_speed");
                    speedBullet = round((speedBullet+0.2)*10)/10;
                    loadTheShop = true;
                }
            },
            damage: function() {
                if (otherMoney >= getPrice("money_damage")) {
                    otherMoney -= getPrice("money_damage");
                    damageBullet = round((damageBullet+0.2)*10)/10;
                    loadTheShop = true;
                }
            }
        }
    },
    "inform_othermoney": {
        content: "Money: 1000$",
        background: color(48, 191, 0, 150),
        width: 150,
        height: 25,
        radius: 10,
        left: 225,
        top: 75,
        click: function () {
            if (mouseX<230) {
                otherMoney += 100;
            }
        }
    },
    "less": {
        top: {
            gains: 214
        },
        left: {
            gains: 100
        },
        content: "+",
        background: color(255, 122, 122),
        hover: color(255, 56, 56),
        width: 40,
        height: 40,
        cursor: HAND,
        radius: 4,
        fontSize: 40,
        click: {
            
        }
    }
};
var buttons = {
    next_wave: {
        left: {
            transition:300
        },
        top: {
            transition: 200
        },
        label: ">>",
        fontSize: 50,
        click: function() {
            nextWave();
        }
    },
    home: {
        left: {
            transition: 375,
            shop: 60,
            how: 50
        },
        top: {
            shop: 60,
            transition: 300,
            how: 350
        },
        label: "🏠",
        fontSize: 50,
        click: function() {
            startTransition("home");
        }
    },
    shop: {
        label: "🛒",
        fontSize: 50,
        left: {
            transition: 225,
            home: 225
        },
        top: {
            home: 300,
            transition: 300
        },
        click: function() {
            startTransition("shop");
        }
    },
    play: {
        left: {
            home: 300,
            shop: 540,
            how: 550
        },
        top: {
            home: 200,
            shop: 60,
            how: 350
        },
        label: "▶",
        fontSize: 60,
        click: function() {
            nextWave();
        }
    },
    how: {
        label: "?",
        fontSize: 100,
        left: {
            home: 375
        },
        top: {
            home: 300
        }
    },
    en: {
        left: {
            lang: 150,
        },
        top: {
            lang: 200
        },
        label: "🇬🇧",
        fontSize: 60,
        click: function() {
            lang = "en";
            startTransition("home");
        }
    },
    us: {
        left: {
            lang: 300,
        },
        top: {
            lang: 200
        },
        label: "🇺🇸",
        fontSize: 60,
        click: function() {
            lang = "en";
            startTransition("home");
        }
    },
    fr: {
        left: {
            lang: 450,
        },
        top: {
            lang: 200
        },
        label: "🇫🇷",
        fontSize: 60,
        click: function() {
            lang = "fr";
            startTransition("home");
        }
    },
};
var dom = function(id, precise) {
    normalize();
    this.p = css[id];
    var defaultColor = color(255, 255, 255);
    var defaultFunction = function(){};
    var back = this.p.background || defaultColor;
    var left = precise ? this.p.left[precise] || 0 : this.p.left || 0;
    var top = precise ? this.p.top[precise] || 0 : this.p.top || 0;
    var height = this.p.height || 0;
    var hover = this.p.hover || back;
    var click = this.p.click || function() {};
    var click = precise ? this.p.click[precise] || defaultFunction : this.p.click || defaultFunction;
    var fontSize = this.p.fontSize || 15;
    var content = this.p.content || "";
    var radius = this.p.radius || 0;
    var thisCursor = this.p.cursor || "";
    
    textSize(fontSize);
    var width = this.p.width || textWidth(this.p.content) + 20;
    
    
    fill(back);
    
    if (mouseX > left && mouseX < left + width &&
        mouseY > top && mouseY < top + height) {
        fill(hover);
        myCursor = !thisCursor ? "default" : thisCursor;
        if (mouseIsReleased) {
            click();
        }
    }
    rect(left, top, width, height, radius);
    
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(content, left+width/2, top+height/2);
};
var button = function(name) {
    normalize();
    this.b = buttons[name];
    var left = this.b.left[mode] || 0;
    var top = this.b.top[mode] || 0;
    var fontSize = this.b.fontSize || 20;
    var label = this.b.label || "";
    var click = this.b.click || function(){};
    textSize(fontSize);
    var width = textWidth(label)*1.5;
    
    if (!buttons[name].hover) {buttons[name].hover=0;}
    
    if (dist(mouseX, mouseY, left, top) < (width/2)+10) {
        myCursor = "pointer";
        if (buttons[name].hover < 180) {
            buttons[name].hover += 5;
        }
        if (mouseIsReleased) {
            click();
        }
    } else if (buttons[name].hover > 0) {
        buttons[name].hover -= 5;
    }
    
    strokeWeight(6);
    stroke(255, 191, 0);
    noFill();
    arc(left, top, width+10, width+10, 0, buttons[name].hover);
    arc(left, top, width+10, width+10, 180, 176+buttons[name].hover);
    
    fill(255, 191, 0, 150);
    strokeWeight(1);
    ellipse(left, top, width, width);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    pushMatrix();
    translate(left, top);
    rotate(-(buttons[name].hover*2));
    text(label, 0, 0);
    popMatrix();
};
//}

// some functions for the game
//{
var drawMap = function() {
    background(5, 102, 0);
    normalize();
    noFill();
    stroke(219, 219, 219);
    strokeWeight(10);
    
    beginShape();
    vertex(maps[wave][0][0], maps[wave][0][1]);
    for (var i = 1; i < maps[wave].length; i++) {
        vertex(maps[wave][i][0], maps[wave][i][1]);
        //img.road(maps[wave][i-1][0], maps[wave][i-1][1], maps[wave][i][0], maps[wave][i][1]);
    }
    endShape();
};

var drawPanel = function() {
    normalize();
    image(getImage("cute/RampSouth"), 400, -120, 200, 400);
    image(getImage("cute/WoodBlock"), 400, 230, 200, 170);
    dom("button_newTower");
    dom("inform_money");
    dom("inform_wave");
    dom("inform_tower");
    if (currentTower !== null) {
        dom("button_upgrade");
        dom("button_sell");
        dom("button_damage");
        dom("button_speed");
        dom("inform_speed");
    }
};
var loadPanel = function() {
    var after = getMoney(money);
    css.inform_money.content = TXT("m") + after;
    css.button_newTower.content = TXT("t") + getMoney(getPrice("tower"));
    css.inform_wave.content = TXT("w") + health;
    css.button_sell.content = TXT("se");
    if (currentTower !== null) {
        var t = towers[currentTower];
        
        css.button_upgrade.content = TXT("u") + getMoney(getPrice("upgrade", t));
        css.inform_speed.content = TXT("s") + (t.spd+1);
        css.inform_tower.content = TXT("st") + (currentTower+1);
        
        // button speed
        if (t.spd === 49 || t.spd > (t.level*5)-2) {
            css.button_speed.content = "Max";
        } else {
            css.button_speed.content = getMoney(getPrice("speed", t));
        }
        
        // button damage
        if (t.level*10 === t.damage) {
            css.button_damage.content = TXT("d") + t.damage + " - max";
        } else {
            css.button_damage.content = TXT("d") + t.damage + " - "+getMoney(getPrice("damage", t));
        }
    } else {
            css.inform_tower.content = TXT("sat");
        }
};
//}

// different scenes
//{

// the game
var drawGame = function() {
    dom("play_part");
    drawMap();
    
    if (initialize) {
        loadPanel();
    }
    
    towers.forEach(function(item, index) {
        item.draw(index);
    });
    bullets.forEach(function(item, index) {
        item.draw(index);
    });
    ennemies.forEach(function(item, index) {
        item.draw(index);
    });
    destroys.forEach(function(item, index) {
        item.draw(index);
    });
    smokes.forEach(function(item, index) {
        item.draw(index);
    });
    removeAll();
    drawPanel();
    
    // for the waves
    //{
    if (frameCount % frequency[wave][wave_part] === 0 && waveIsFinished === false) {
        // get the type of the ennemies (1, 2 or 3)
        var type = (wave_part % 3)+1;
        
        if (list[wave][wave_part] === 0) {
            wave_part += 1;
            return 0;
        }
        // push an ennemy
        ennemies.push(new ennemy({
            color: color(255, 0, 255),
            health: healths[wave]*type,
            type: type,
            spd: speeds[wave][wave_part],
        }));
        if (part_index === list[wave][wave_part]) {
            wave_part +=1;
            part_index = 1;
        } else {
            part_index ++;
        }
        if (wave_part === list[wave].length) {
            waveIsFinished = true;
        }
    }
    
    if (waveIsFinished&&ennemies.length === 0/* && wave !== list.length-1*/) {
        myStatus = "win";
        if (wave === 0) {
            otherMoney = 250;
            startTransition("transition");
        } else if (wave === list.length-1) {
            startTransition("end");
        } else {
            startTransition("transition");
        }
    }
    //}
    
    if (health <= 0) {
        myStatus = "loose";
        startTransition("transition");
    }
    
    if (loadThePanel) {loadPanel();}
};

// the scene after each wave
var drawTransition = function() {
    normalize();
    background(248, 255, 199);
    
    if (initialize) {
        crazyTexts.push(new newText(TXT("#"+myStatus)));
        wave_part = 0;
        part_index = 1;
        waveIsFinished = false;
        towers = [];
        bullets = [];
        ennemies = [];
        destroys = [];
        smokes = [];
        toRemove = [];
        currentTower = null;
        health = 5;
        if (myStatus === "win") {
            otherMoney += wave*300;
        } else {
            otherMoney += wave*100 || 20;
            wave -= 1;
        }
    }
    
    fill(0, 0, 0);
    textSize(40);
    textAlign(CENTER, TOP);
    text(TXT("#1")+" "+wave+"/"+list.length, 300, 25);
    textSize(25);
    text(crazyTexts[0].getText(), 300, 105);
    button("next_wave");
    button("shop");
    button("home");
    
    crazyTexts.forEach(function (item, index) {
        item.add();
    });
    
    if (myStatus === "win") {
        if (frameCount%20 === 0) {
            particles.push(new particle());
        }
        particles.forEach(function (item, index) {
            item.draw(index);
        });
    }
};

// the end
var drawEnd = function() {
    background(255, 224, 140);
    if (initialize) {
        crazyTexts.push(new newText(TXT("#end")));
    }
    
    if (frameCount%20 === 0) {
        particles.push(new particle());
    }
    
    particles.forEach(function (item, index) {
        item.draw(index);
    });
    crazyTexts.forEach(function (item, index) {
        item.add();
    });
    
    textSize(40);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(crazyTexts[0].getText(), 300, 200);
};

// the 'how' scene
var start = 0;
var drawHow = function() {
    background(255, 237, 173);
    normalize();
    if (initialize) {
        crazyTexts.push(new newText(TXT("#how")));
        start = frameCount;
    }
    
    textSize(20);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(crazyTexts[0].getText(), 300, 200);
    pushMatrix();
    translate(0, min(0, frameCount-start-2200));
    button("play");
    button("home");
    popMatrix();
    
    crazyTexts.forEach(function (item, index) {
        item.add();
    });
};

// choose a language
var chooseLang = function() {
    background(255, 222, 122);
    normalize();
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(40);
    pushMatrix();
    translate(300, 100);
    rotate(cos(frameCount*5)*10);
    text("Language", 0, 0);
    popMatrix();
    button("en");
    button("us");
    button("fr");
};

// home
var drawHome = function() {
    background(255, 227, 125);
    
    // the little animation
    // {
    pushMatrix();
    translate(300, 200);
    rotate((frameCount*0.5)%360);
    rotate(0);
    var x1 = 200+cos(frameCount)*75;
    var x2 = x1-x1/3;
    var pos = [[x2, x2], [x1, 0], [x2, -x2], [0, -x1], [-x2, -x2], [-x1, 0], [-x2, x2], [0, x1]];
    
    for (var i = 0; i < pos.length; i++) {
        img.ennemy({
            x: pos[i][0],
            y: pos[i][1],
            life: "none",
            color: color(255, 0, 0, 100),
            toX: 0,
            toY: 0,
            type:3
        });
    }
    popMatrix();
    // }
    
    // label
    // {
    textSize(113);
    textAlign(CENTER);
    fill(255, 255, 255);
    text(TXT("t"), 300, 120);
    fill(232, 162, 0);
    text(TXT("t"), 303, 122);
    // }
    
    // the contents
    // {
    button("play");
    button("shop");
    button("how");
    // }
    
};

// the shop
var loadShop = function() {
    css.inform_win.content = TXT("win1")+getMoney(moneyToWin)+TXT("win2")+getMoney(round(getPrice("money_win")));
    css.inform_start.content = TXT("start1")+getMoney(moneyToStart)+TXT("start2")+getMoney(round(getPrice("money_start")));
    css.inform_more_damage.content = TXT("damage1")+damageBullet+TXT("damage2")+getMoney(round(getPrice("money_damage")));
    css.inform_more_speed.content = TXT("speed1")+speedBullet+TXT("speed2")+getMoney(round(getPrice("money_speed")));
    css.inform_othermoney.content = TXT("m")+getMoney(round(otherMoney));
};
var drawShop = function() {
    background(255, 227, 125);
    normalize();
    
    // label
    // {
    textSize(50);
    textAlign(CENTER);
    fill(255, 255, 255);
    text(TXT("shop"), 300, 60);
    fill(232, 162, 0);
    text(TXT("shop"), 303, 62);
    // }
    
    // buttons
    // {
    button("home");
    button("play");
    // }
    
    // shopping's part ;-)
    // {
    textSize(30);
    fill(0, 0, 0);
    dom("more", "win");
    dom("more", "start");
    dom("more", "damage");
    dom("more", "speed");
    dom("inform_win");
    dom("inform_start");
    dom("inform_more_damage");
    dom("inform_more_speed");
    dom("inform_othermoney");
    // }
};
//}

// the draw function
draw = function() {
    background(255, 255, 255);
    cursor("none");
    
    switch (mode) {
        case "game":
            drawGame();
            break;
        case "transition":
            drawTransition();
            break;
        case "home":
            drawHome();
            break;
        case "shop":
            drawShop();
            break;
        case "end":
            drawEnd();
            break;
        case "lang":
            chooseLang();
            break;
        case "how":
            drawHow();
            break;
    }
    
    initialize = false;
    if (transition_do) {
        transition();
        myCursor = "default";
    }
    if (onMouse) {
        showCursor();
    }
    if (loadTheShop) {
        loadShop();
    }
    mouseIsReleased = false;
    loadThePanel = false;
    loadTheShop = false;
};

// some other things for the mouse controls
//{
mouseOver = function() {
    onMouse = true;
};
mouseOut = function() {
    onMouse = false;
};
mouseReleased = function() {
    mouseIsReleased = true;
};
//}


