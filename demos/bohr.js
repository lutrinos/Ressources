/**
 * This is a modeling of Bohr's model, an atomic model introduced in 1913.
 * Press the RIGHT of LEFT keys to change the atom. Press the SPACE key to pause / play the animation.
 * 
 * Wikipedia: https://en.wikipedia.org/wiki/Bohr_model
 * 
 * 
 * * * * * * * * * * *
 * * * * * * * * * * *
 * 
 * 
 * Il s'agit d'une modélisation du modèle atomique de Bohr, introduit en 1913
 * Appuie les touches DROITE ou GAUCHE pour changer l'atome. Appuie sur la touche ESPACE pour arrêter / jouer l'animation.
 * 
 * Wikipedia: https://fr.wikipedia.org/wiki/Mod%C3%A8le_de_Bohr
**/

textAlign(CENTER, CENTER);

var atomCenterX = width / 2;
var atomCenterY = height / 3;

var Colors = {
	Yellow: color(255, 252, 171),
	Green: color(80, 209, 131),
	Red: color(232, 55, 91),
	Blue: color(49, 103, 204)
};

var data = [
	{
		name: "Hydrogen",
		symbol: "H",
	},
	{
		name: "Helium",
		symbol: "He",
	},
	{
		name: "Lithium",
		symbol: "Li"
	},
	{
		name: "Beryllium",
		symbol: "Be"
	},
	{
		name: "Boron",
		symbol: "B"
	},
	{
		name: "Carbon",
		symbol: "C",
	},
	{
		name: "Nitrogen",
		symbol: "N",
	},
	{
		name: "Oxygen",
		symbol: "O",
	},
	{
		name: "Fluorine",
		symbol: "F",
	},
	{
		name: "Neon",
		symbol: "Ne",
	},
	{
		name: "Sodium",
		symbol: "Na",
	},
	{
		name: "Magnesium",
		symbol: "Mg",
	},
	{
		name: "Aluminium",
		symbol: "Al",
	},
	{
		name: "Silicon",
		symbol: "Si",
	},
	{
		name: "Phosphorus",
		symbol: "P",
	},
	{
		name: "Sulfur",
		symbol: "S",
	},
	{
		name: "Chlorine",
		symbol: "Cl",
	},
	{
		name: "Argon",
		symbol: "Ar",
	},
];

var Electron = function (radius, angle) {
	this.radius = radius;
	this.angle = angle + 57;
};
Electron.prototype.draw = function (offset) {
	var x = sin(this.angle + offset * (1 - this.radius / 400)) * this.radius / 2;
	var y = cos(this.angle + offset * (1 - this.radius / 400)) * this.radius / 2;
	
	noStroke();
	fill(0, 0, 0);
	
	ellipse(atomCenterX + x, atomCenterY + y, 6, 6);
};

var Atom = function (symbol, atomicNumber, numberOfLayers) {
	this.symbol = symbol;
	this.atomicNumber = atomicNumber;
	this.numberOfLayers = numberOfLayers;
	this.rotation = 0;
	
	var electrons = [];
	
	var remainingElectrons = this.atomicNumber;
	
	function addElectrons (radius, n, offset) {
		for (var i = 0; i < n; i++) {
			electrons.push(
				new Electron(radius, (360 / n) * i + offset)
			);
			remainingElectrons--;
		}
	}
	
	for (var i = 1; i <= this.numberOfLayers; i++) {
		
		if (remainingElectrons <= 0) {
			break;
		}
		
		var subLayers = i === 1 ? 1 : 2;
		
		for (var j = 0; j < subLayers; j++) {
			addElectrons(this.getOffset(i, j), Math.min(j === 0 ? 2 : 6, remainingElectrons), 0);
		}
	}
	
	this.electrons = electrons;
};
Atom.prototype.getOffset = function (layer, sublayer) {
	return layer * 100 + sublayer * 30;
};
Atom.prototype.draw = function () {
	
	fill(Colors.Yellow);
	noStroke();
	ellipse(atomCenterX, atomCenterY, 40, 40);
	
	fill(0, 0, 0);
	text(this.symbol, atomCenterX, atomCenterY);
	
	
	noFill();
	stroke(232, 232, 232);
	
	for (var i = 1; i <= this.numberOfLayers; i++) {
		stroke([Colors.Green, Colors.Red, Colors.Blue][i - 1]);
		
		var subLayers = i === 1 ? 1 : 2;
		
		for (var j = 0; j < subLayers; j++) {
			var radius = this.getOffset(i, j);
			
			ellipse(atomCenterX, atomCenterY, radius, radius);
		}
	}
	
	for (var i = 0; i < this.electrons.length; i++) {
		this.electrons[i].draw(this.rotation);
	}
};
Atom.prototype.update = function () {
	this.rotation += 6;
};

var Table = function (atoms) {
	this.tileWidth = width / 8;
	this.offsetY = (height - 3 * this.tileWidth);
	this.selected = 0;
	
	this.atoms = [];
	
	for (var i = 0; i < atoms.length; i++) {
		var numberOfLayers = Math.ceil((i - 1) / 8) + 1;
		
		var tileX = i < 2 ? i * 7 : ((i - 2) % 8);
		var tileY = i < 2 ? 0 : Math.ceil((i - 1) / 8);
		
		this.atoms.push({
			name: atoms[i].name,
			symbol: atoms[i].symbol,
			numberOfLayers: numberOfLayers,
			tileX: tileX,
			tileY: tileY
		});
	}
};
Table.prototype.draw = function () {
	
	
	textSize(19);
	
	noStroke();
	
	for (var i = 0; i < this.atoms.length; i++) {
		var atom = this.atoms[i];
		
		var x = atom.tileX * this.tileWidth;
		var y = this.offsetY + atom.tileY * this.tileWidth;
		
		fill(Colors.Yellow);
		rect(x, y, this.tileWidth, this.tileWidth);
		
		if (this.selected === i) {
			fill(0, 0, 0, 10);
			rect(x + 8, y + 8, this.tileWidth - 16, this.tileWidth - 16, 8);
		}
		
		fill(0, 0, 0);
		text(atom.symbol, x + this.tileWidth / 2, y + this.tileWidth / 2);
	}
};

var index = 0;
var shouldRotate = true;

var table = new Table(data);
var atom = new Atom('H', 1, 1);

function updateAtom (i) {
	index = i % 18;
	table.selected = index;
	atom = new Atom(table.atoms[index].symbol, index + 1, table.atoms[index].numberOfLayers);
}

draw = function () {
	background(255, 255, 255);
	
	table.draw(index);
	atom.draw();
	
	if (shouldRotate) {
		atom.update();
	}
	
	
	
	textSize(14);
	text(table.atoms[index].name, width / 2, 16);
};

keyPressed = function () {
	if (keyCode === RIGHT) {
		updateAtom(index + 1);
	} else if (keyCode === LEFT) {
		updateAtom(index  + table.atoms.length - 1);
	} else if (keyCode === 32) {
		shouldRotate = !shouldRotate;
	}
};


