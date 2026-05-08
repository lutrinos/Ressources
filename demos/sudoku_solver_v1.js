
// not working yet for

var facile = [
	[7, 0, 9, 0, 8, 1, 0, 4, 0],
    [0, 3, 0, 2, 0, 0, 6, 0, 1],
    [0, 2, 0, 0, 6, 4, 7, 0, 0],
    [1, 0, 2, 0, 0, 0, 8, 0, 0],
    [9, 0, 0, 6, 0, 8, 4, 1, 2],
    [0, 0, 7, 4, 1, 0, 0, 0, 3],
    [0, 0, 6, 7, 4, 0, 1, 2, 0],
    [0, 0, 5, 0, 0, 0, 0, 9, 7],
    [0, 7, 0, 0, 3, 9, 0, 6, 0]
];

var difficile = [
	[9, 0, 0,  0, 0, 0,  3, 0, 0],
	[0, 0, 7,  0, 0, 8,  0, 0, 0],
	[0, 1, 0,  0, 9, 0,  2, 0, 8],
	
	[0, 3, 2,  0, 0, 0,  9, 6, 0],
	[0, 4, 0,  0, 0, 0,  0, 0, 2],
	[0, 0, 0,  8, 4, 0,  0, 0, 7],
	
	[0, 0, 0,  1, 5, 0,  0, 0, 0],
	[0, 0, 0,  6, 3, 0,  0, 0, 1],
	[5, 6, 0,  0, 0, 9,  0, 0, 0],
];

var sudoku = facile;

function Solver(cases) {
	this.map = cases;
	this.caseWidth = width / 9;
}
Solver.prototype.drawGrid = function() {

	strokeWeight(1);
	stroke(207, 207, 207);

	for (var y = 1; y < 9; y++) {
		line(0, y * this.caseWidth, width, y * this.caseWidth);
	}

	for (var x = 1; x < 9; x++) {
		line(x * this.caseWidth, 0, x * this.caseWidth, height);
	}

	strokeWeight(1);
	stroke(0, 0, 0);
	for (var y = 1; y < 3; y++) {
		line(0, y * this.caseWidth * 3, width, y * this.caseWidth * 3);
	}

	for (var x = 1; x < 3; x++) {
		line(x * this.caseWidth * 3, 0, x * this.caseWidth * 3, height);
	}

};
Solver.prototype.drawValues = function() {

	fill(21, 0, 255);
	textAlign(CENTER, CENTER);
	textSize(18);

	for (var y = 0; y < this.map.length; y++) {
		for (var x = 0; x < this.map[y].length; x++) {
			if (this.map[y][x] !== 0) {
				text(this.map[y][x], x * this.caseWidth + this.caseWidth / 2, y * this.caseWidth + this.caseWidth / 2);
			}
		}
	}
};

Solver.prototype.getBlockCoordinates = function(x, y) {
	return [Math.floor(x / 3), Math.floor(y / 3)];
};
Solver.prototype.getBlock = function(blockX, blockY) {
	var values = [];

	for (var y = 0; y < 3; y++) {
		for (var x = 0; x < 3; x++) {
			values.push(this.map[blockY * 3 + y][blockX * 3 + x]);
		}
	}

	return values;
};
Solver.prototype.getBlocks = function() {
	var blocks = [];

	for (var blockY = 0; blockY < 3; blockY++) {
		blocks.push([]);
		for (var blockX = 0; blockX < 3; blockX++) {
			blocks[blockY].push(this.getBlock(blockX, blockY));
		}
	}

	return blocks;
};

Solver.prototype.getLines = function() {
	return this.map;
};
Solver.prototype.getColumns = function() {
	var columns = [];

	for (var x = 0; x < 9; x++) {
		columns.push([]);
		for (var y = 0; y < 9; y++) {
			columns[x].push(this.map[y][x]);
		}
	}

	return columns;
};

Solver.prototype.getValues = function(arr) {
	var values = [];

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j] !== 0 && !values.includes(arr[i][j])) {
				values.push(arr[i][j]);
			}
		}
	}

	return values;
};
Solver.prototype.getPossibilities = function(arr) {
	var possibilities = [];

	for (var i = 1; i < 10; i++) {
		if (!arr.includes(i)) {
			possibilities.push(i);
		}
	}

	return possibilities;
};

Solver.prototype.step = function() {
	var blocks = this.getBlocks();
	var lines = this.getLines();
	var columns = this.getColumns();

	for (var y = 0; y < this.map.length; y++) {
		for (var x = 0; x < this.map[y].length; x++) {
			if (this.map[y][x] === 0) {
				var block = this.getBlockCoordinates(x, y);

				var possibilities = this.getPossibilities(
					this.getValues(
						[
							lines[y],
							columns[x],
							blocks[block[1]][block[0]]
						]
					)
				);
				
				
				if (possibilities.length === 1) {
					this.map[y][x] = possibilities[0];
					return true;
				}
			}
		}
	}
	
	/*for (var blockY = 0; blockY < blocks.length; blockY++) {
		for (var blockX = 0; blockX < blocks[blockY].length; blockX++) {
			var emptyCases = this.getValues([blocks[blockY][blockX]]);
			
			if (emptyCases) {
				
			}
		}
	}
*/	
	return false;
};

Solver.prototype.solve = function() {

};

Solver.prototype.draw = function() {
	background(255, 255, 255);

	this.drawGrid();
	this.drawValues();
};

var solver = new Solver(sudoku);

solver.step();

function mouseClicked () {
	solver.step();
	solver.draw();
}


solver.draw();