'use strict'
//-------------------------------------------------------------------------------------------------------
// vars
//-------------------------------------------------------------------------------------------------------
const MINE = '🦠'
const EMPTY = ''
const LIFE = ' 🩸 '
const SYRING = '💉'

var gBoard = []
var gCells = []
var gMines = []
var gFlagCount = 0
var gLife
var gNuts = false
var gDiff
var gScore = 0
var gElTimer = document.querySelector('.timer span')
var gIntervalCountdown
const startingMinutes = 2
var time = startingMinutes * 60
//-------------------------------------------------------------------------------------------------------
// Main game
//-------------------------------------------------------------------------------------------------------
function init() {
    chooseDiff(4)

}
// game over --> cleans 
function gameOver() {
    clearInterval(gIntervalTime)
    clearInterval(gIntervalCountdown)
    var elTimerSpan = document.querySelector('.timer span')
    elTimerSpan.innerText = gDisplayMin + ':' + gDisplaySec

    gIsOn = false
    var flagged = document.querySelectorAll('.flagged')

    flagged.forEach(flagged => {
        flagged.classList.remove('flagged')
    })
    clearTimer()
    console.log('game over');

}



function resetVars() {
    var displayTime
    gNuts ? displayTime = '02:00' : displayTime = '00:00'

    // mines 
    gMines = []
    // modal win
    document.querySelector('.modal-win').style.opacity = 0
    // modal lose
    document.querySelector('.modal-lose').style.opacity = 0
    // reset game face
    document.querySelector('.menu.face').innerText = '😷'
    // flag count
    gFlagCount = 0
    // reset clock
    clearTimer()
    document.querySelector('.countdown').innerHTML = displayTime
    // reset score
    removeScore()
    // reset click count
    gClickCount = 0

    // reset game table
    gBoard = []
    var table = document.querySelector('table.game-table')
    table.innerHTML = ''
}
// choose difficulty - starts and restarts game board --> should move to 
// restarts gBoard --> create matrix --> count mines --> renders board
function chooseDiff(diff, nuts) {
    gNuts = nuts
    gDiff = diff
    // reset all
    resetVars()
    // set difficulty to global var
    var mineAmount
    if (diff === 4) mineAmount = 2
    if (diff === 8) mineAmount = 12
    if (diff === 12) mineAmount = 30
    // game is on
    gIsOn = true
    // render life count by difficulty
    renderLife(diff, nuts)
    // create board
    gBoard = createMat(diff, diff)
    // place random mines
    randomMines(mineAmount)
    // count mines around every cell 
    setGameElement()
    // render board
    renderBoard(gBoard)

}


//-------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------
// life
function countLife(count) {
    gLife = count
    var elLife = document.querySelector('.life')
    for (var i = 0; i < count; i++) {
        elLife.innerHTML += `<span class="life-${i + 1}">${LIFE}</span>`

    }
}

function clearLife() {
    var elLife = document.querySelector('.life')
    elLife.innerText = ''
}

function renderLife(diff, nuts) {
    gNuts = nuts
    var life
    clearLife()
    if (diff === 4) life = 2
    if (diff === 8) life = 2
    if (diff > 8) life = 3
    if (nuts) life = 0
    countLife(life)

}

function removeLife() {

    var elLife = document.querySelector(`.life-${gLife}`)

    elLife.innerText = ''
    gLife--
}
//-------------------------------------------------------------------------------------------------------
// score
function addScore() {

    gScore++
    var elScore = document.querySelector('.score')
    elScore.innerText = `${gScore}`
}

function removeScore() {
    gScore = 0
    var elScore = document.querySelector('.score')
    elScore.innerText = `${gScore}`
}

function gameWin() {
    for (var i = 0; i < gMines.length; i++) {

        if (!gMines[i].isFlagged) return
    }

    if (gFlagCount === gMines.length) {
        for (var i = 0; i < gMines.length; i++) {

            if (!gMines[i].isFlagged) return
        }

        gIsOn = false
        showWinModal()
        clearTimer()
    } else return

}

function showWinModal() {

    document.querySelector('.modal-win').style.opacity = '100'
    document.querySelector('.menu.face').innerText = '😃'

}

function showLoseModal() {

    document.querySelector('.modal-lose').style.opacity = '100'
    document.querySelector('.menu.face').innerText = '🤮'
}

