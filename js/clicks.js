var gIsFirstClick = false
var gFirstClickLocation

// clicks
//-------------------------------------------------------------


// all left clicks functions
function cellClicked(elCell, i, j) {



    if (gIsOn === false ||
        gBoard[i][j].isFlagged === true ||
        elCell.classList.contains('flagged') ||
        elCell.classList.contains('shown')) {
        return
    }

    elCell.classList.add('shown')

    gClickCount++
    gClickCount === 1 ? gIsFirstClick = true : gIsFirstClick = false
    // first click
    if (gIsFirstClick) {

        if (gBoard[i][j].gameElement !== MINE) {
            gNuts ? startCountDown() : startTimer()
            gIsOn = true
            firstClick(elCell, i, j)
            gBoard[i][j].isShown = true
        } else if (gIsOn) {
            chooseDiff(gDiff)
            gIsOn = true
            elCell.classList.add('shown')
            cellClicked(elCell, i, j)
            return
        }

    }
    if (gBoard[i][j].gameElement === MINE && gLife > 0) {
        removeLife()
        elCell.classList.add('shown')
        gScore--
        gBoard[i][j].isShown = true
        removeMine(i, j)

    }
    // recurssion --> beta --> currently off
    if (gBoard[i][j].gameElement === 0) {
        // expandEmptyCells(elCell, i, j)
    }
    if (gLife < 1 && gBoard[i][j].gameElement === MINE) {
        showMines()
        gameOver()
        showLoseModal()

    } else {
        gBoard[i][j].isShown = true

        addScore()
        elCell.classList.add('shown')
        gameWin()
    }


}

// first click expands safe neighbors
function firstClick(elCell, i, j) {

    showEmptyNeighbors(elCell, i, j)
    elCell.classList.add('shown')
    gFirstClickLocation = { i, j }
    gIsFirstClick = true

}

// right click toggles --> .flagged
function rightClick(elCell, i, j) {
    var cell = gBoard[i][j]
    if (!gIsOn || elCell.classList.contains('shown')) return
    if (!cell.isFlagged) gFlagCount++
    else gFlagCount--

    elCell.classList.toggle('flagged')
    !cell.isFlagged ? elCell.innerText = SYRING : elCell.innerHTML = `<span>${cell.gameElement}</span>`

    if (cell.gameElement === 0) cell.gameElement = EMPTY
    cell.isFlagged = !cell.isFlagged


    gameWin()

}

// expand zero elements (recurssion --> BETA)
function expandEmptyCells(elCell, i, j) {
    if (gBoard[i][j].gameElement === MINE) return
    showEmptyCells(elCell, i, j)

    var zeroCells = countEmptyZeroCells(i, j, gBoard)
    console.log('zero neigs', zeroCells);
    for (var i = 0; i < zeroCells.length; i++) {
        var zeroCell = zeroCells[i]
        var elNextCell = document.querySelector('.' + getClassName(zeroCell))
        expandEmptyCells(elNextCell, zeroCell.i, zeroCell.j)
    }
}