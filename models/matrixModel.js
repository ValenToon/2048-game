function MatrixModel() {
    BaseModel.call(this);
    this.staticDigit = 2;
    this.randomGridIteration = Math.floor(Math.random() * 4);
    this.randomNumber = Math.random() < 0.8 ? 2 : 4;
    this.attributes = {
        size: { width: 4, height: 4 },
        grid: JSON.parse(localStorage.getItem('matrix')) || [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', '']
        ]
    };

    var instance = this;
    MatrixModel = function() {
        return instance;
    };

    !localStorage.getItem('matrix') && this.fillMatrixCell(true);
    localStorage.removeItem('addition');
}

MatrixModel.prototype = Object.create(BaseModel.prototype);
MatrixModel.prototype.constructor = MatrixModel;

MatrixModel.prototype.reset = function() {
    var i, matrix = this.attributes.grid,
        matrixLength = matrix.length;
    for (i = 0; i < matrixLength; i += 1) {
        matrix[i].fill('');
    }
};

MatrixModel.prototype.startNewGame = function() {
    localStorage.removeItem('matrix');
    this.reset();
    this.fillMatrixCell(true);
    this.publish('changeData');
};

MatrixModel.prototype.fillRandomNumber = function(concatArr, indexArray, arrayWithRandoms) {
    var i, len = concatArr.length;
    for (i = 0; i < len; i += 1) {
        (typeof concatArr[i] !== 'number') && indexArray.push(i);
    }
    var randomIndex = indexArray[Math.floor(Math.random() * indexArray.length)];
    concatArr[randomIndex] = this.randomNumber;

    for (i = 0; i < len; i += 4) {
        arrayWithRandoms.push(concatArr.slice(i, i + 4));
    }
    this.attributes.grid = arrayWithRandoms;
    localStorage.setItem('matrix', JSON.stringify(this.attributes.grid));
};

MatrixModel.prototype.fillRandomNumbersOnInit = function(lastArray) {
    this.attributes.grid[this.randomGridIteration][this.randomGridIteration] = this.staticDigit;
    this.attributes.grid[this.randomGridIteration][this.randomGridIteration + 1] = this.randomNumber;
    if (lastArray.length === 5) {
        lastArray.pop();
        this.attributes.grid[this.randomGridIteration][this.randomGridIteration - 2] = this.randomNumber;
    }
};

MatrixModel.prototype.fillMatrixCell = function(needed) {
    var matrix = this.attributes.grid,
        lastArray = this.attributes.grid[3],
        arr = [].concat.apply([], matrix),
        indexArray = [],
        arrayWithRandoms = [];
    needed ? this.fillRandomNumbersOnInit(lastArray) : this.fillRandomNumber(arr, indexArray, arrayWithRandoms);
};

MatrixModel.prototype.transformToColumn = function(matrix, columns, matrixLength) {
    var i, j;
    for (i = 0; i < matrixLength; i += 1) {
        for (j = 0; j < 4; j += 1) {
            columns[j].push(matrix[i][j]);
        }
    }
};

MatrixModel.prototype.transformToMatrix = function(matrix, columns, columnsLength) {
    var i, j;
    for (i = 0; i < columnsLength; i += 1) {
        for (j = 0; j < 4; j += 1) {
            matrix[j].push(columns[i][j]);
            matrix[j].shift();
        }
    }
};

MatrixModel.prototype.moveElements = function(elements, i, innerLength, key) {
    var k;
    for (k = 0; k < innerLength; k += 1) {
        if (typeof elements[i][k] !== 'number') {
            (key === 'up' || key === 'left') ?
            elements[i].push(elements[i].splice(elements[i].indexOf(elements[i][k]), 1)[0]):
                elements[i].unshift(elements[i].splice(k, 1)[0]);
        }
        if (elements[i][k] === 2048) {
            alert('winner');
        }
    }
};

MatrixModel.prototype.calculateValue = function(values, i, innerLength, key) {
    var j, result = 0;
    for (j = 0; j < innerLength; j += 1) {
        if (values[i][j] === values[i][j + 1] && (typeof values[i][j] && values[i][j + 1]) !== 'string') {
            values[i][j] *= 2;
            if (values[i][j] === 0) values[i][j] = '';
            values[i].splice(j + 1, 1);
            if (key === 'down' || key === 'right') values[i].unshift('');
            if (isNaN(values[i][j])) values[i][j] = '';
            result += +values[i][j];
        }
    }

    if (result !== 0 && typeof result !== 'undefined') {
        return result;
    } else {
        return 0;
    }
};

MatrixModel.prototype.displayActionResult = function(key) {
    var i, matrix = this.attributes.grid,
        matrixLength = matrix.length,
        columns = [
            [],
            [],
            [],
            []
        ],
        columnsLength = columns.length,
        result = 0;

    if (key === 'up' || key === 'down') {

        this.transformToColumn(matrix, columns, matrixLength);
        for (i = 0; i < columnsLength; i += 1) {
            this.moveElements(columns, i, columns[i].length, key);
            result += this.calculateValue(columns, i, columns[i].length, key);
        }
        this.transformToMatrix(matrix, columns, columnsLength);

    } else {
        for (i = 0; i < matrixLength; i += 1) {
            this.moveElements(matrix, i, matrix[i].length, key);
            result += this.calculateValue(matrix, i, matrix[i].length, key)
        }
    }
    this.fillMatrixCell();
    this.publish('changeData');
    return result;
};