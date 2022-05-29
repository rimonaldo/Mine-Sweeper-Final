//------------------------------------------------------
// vars
//------------------------------------------------------
var gClickCount = 0

var gElement
var gIsOn = false
var gSeconds = 0
var gMinutes = 0

var gDisplaySec = 0
var gDisplayMin = 0
var gIntervalTime

// create game board
//-------------------------------------------------------------------------------------------------------
// create matrix
function createMat(rows, culs) {
    var gameElement
    var minesLocations = []
    var count = 0

    for (var i = 0; i < rows; i++) {
        var row = []
        for (var j = 0; j < culs; j++) {
            row.push({ gameElement: gameElement, location: { i, j }, cellNum: count, isFlagged: false })
            gCells.push(count)
            count++
        }
        gBoard.push(row)
    }
    console.log(gBoard);
    return gBoard
}

// render board to HTML
function renderBoard(board) {
    var table = document.querySelector('table.game-table')

    for (var i = 0; i < board.length; i++) {
        table.innerHTML += `<tr class ="row-${i}">`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            cell.gameElement === MINE ? element = 'mine' : element = ''
            // game element rendering
            cell.gameElement === 0 ? gameElement = EMPTY : gameElement = cell.gameElement
            // table rendering , and class and functions injecting
            var tableRow = document.querySelector(`.row-${i}`)
            tableRow.innerHTML += `<td
            onclick = "cellClicked(this,${i},${j})"
            oncontextmenu = "rightClick(this,${i},${j});return false;"
            class = "cell-${i}-${j} hidden game element-${gElement}"
            id = "${gElement}
            ">
            </td>`
            //injecting game element to cell
            var tableCell = document.querySelector(`.cell-${i}-${j}`)
            tableCell.innerHTML = `<span>${gameElement}</span>`
        }
        table.innerHTML += `</tr>`
    }
}



// utils for functions
//-------------------------------------------------------------------------------------------------------



// object{i,j} --> get html Class name 
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}



// --> random indexes array
function randomIdxs(board, length) {
    shuffle(gCells)
    var randCellNums = []
    for (var i = 0; i < length; i++) {
        randCellNums.push(gCells.pop())
    }
    return randCellNums
}

// util function get Random int
function getRandomInt(min, max) {
    var randomInt = parseInt(Math.random() * (Math.random() * 10))
    while (!(randomInt >= min && randomInt < max)) {
        randomInt = parseInt(Math.random() * (Math.random() * 1000) * (Math.random() * 1000))
    }
    return randomInt
}
// util function shuffle
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

// index --> cell object in board
function getCellLocByIdx(idx) {
    var cell
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].cellNum === idx) {
                cell = gBoard[i][j]
            }
        }
    }
    return cell
}


