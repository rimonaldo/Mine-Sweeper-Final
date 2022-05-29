// neighboors
//------------------------------------------------------------------

// place game element on board
function setGameElement() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.gameElement !== MINE) {
                cell.gameElement = countNeighbors(i, j, gBoard)
            } else if(cell.gameElement === 0){
                cell.gameElement = EMPTY
            }
            else {
                gBoard.gameElement = MINE
            }
        }
    }
}
// returns an array --> neighbor cells without mines (location objects) --> for first click
function countEmptyNeighbors(cellI, cellJ, mat) {
    var neighborsCells = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j].gameElement !== MINE) neighborsCells.push({ i, j });
        }
    }

    return neighborsCells
}
// util function for countMines() --> return neighbors count around cell
// count mines around cell 
function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j].gameElement === MINE) neighborsCount++;
        }
    }

    return neighborsCount;
}


// add class --> .shown --> to all non mines neighbors around cell --> first click
function showEmptyNeighbors(elCell, i, j) {
    var neighborsCells = countEmptyNeighbors(i, j, gBoard)
    for (var i = 0; i < neighborsCells.length; i++) {
        var neigCellClass = getClassName(neighborsCells[i])
        var elNeigCell = document.querySelector('.' + neigCellClass)
        elNeigCell.classList.add('shown')
        elCell.classList.add('shown')
    }
}





// recurssion --> BETA
//---------------------------------------------------------------------------------
// add class --> .shown --> to all empty neighbors around cell --> expand EMPTY (0) cells
function showEmptyCells(elCell, i, j) {
    var neighborsCells = countEmptyZeroCells(i, j, gBoard)
    for (var i = 0; i < neighborsCells.length; i++) {
        var neigCellClass = getClassName(neighborsCells[i])
        var elNeigCell = document.querySelector('.' + neigCellClass)
        elNeigCell.classList.add('shown')
        elCell.classList.add('shown')
    }
}

// returns array with EMPTY (0) cells
function countEmptyZeroCells(cellI, cellJ, mat) {
    var neighborsCells = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j].gameElement === 0) neighborsCells.push({ i, j });
            // console.log(mat[i][j]);
        }
    }
    console.log(neighborsCells);
    return neighborsCells
}