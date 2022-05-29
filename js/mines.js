// Mines
//-------------------------------------------------------------------
// place random mines on board
function randomMines(mineAmount) {
    var ranMinesIdxs = randomIdxs(gBoard, gBoard.length ** 2)

    for (var i = 0; i < mineAmount; i++) {
        var randMine = getCellLocByIdx(ranMinesIdxs.pop())
        // some times placing from array would break game -->
        // condition to continue loop if randMine undefined 
        if (!randMine) {
            i--
            continue
        }
        gMines.push(randMine)
        randMine.gameElement = MINE
    }

}
// add class --> .shown --> to all mines on board
// used when gamer lose 
function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].gameElement === MINE) {
                var mineClassName = getClassName(gBoard[i][j].location)
                var elMine = document.querySelector('.' + mineClassName)
                elMine.classList.add('shown')
                elMine.classList.add('mine')
            }
        }
    }
}
// remove mine from mines array if reveald
function removeMine(i, j) {
    console.log('og', gMines);
    console.log('item', gBoard[i][j]);
    console.log('index of item is', gMines.indexOf(gBoard[i][j]));
    var index = gMines.indexOf(gBoard[i][j])
    for (var i = 0; i < gMines.length; i++) {
        if (gMines[i].isShown) {
            console.log('is shown', gMines[i]);
        } else {
            break
        }
    }
    gMines.splice(index, 1)
    console.log('new list', gMines);
}
