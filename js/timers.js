// timer
//--------------------------------------------------------------------------------------
var gDisplayminDown
var gDisplaySecDown
function startTimer() {
    gStartTime = Date.now()
    gIntervalTime = setInterval(stopWatch, 1000)
}

function stopWatch() {
    gSeconds++
    if (gSeconds / 60 === 1) {
        gSeconds = 0
        gMinutes++
    }

    gSeconds < 10 ? gDisplaySec = '0' + gSeconds : gDisplaySec = gSeconds
    gMinutes < 10 ? gDisplayMin = '0' + gMinutes : gDisplayMin = gMinutes

    var elTimerSpan = document.querySelector('.timer span')
    elTimerSpan.innerText = gDisplayMin + ':' + gDisplaySec
}

function clearTimer() {
    clearInterval(gIntervalTime)
    gSeconds = 0
    gMinutes = 0

    // countdown
    clearInterval(gIntervalCountdown)
    if (gNuts) {
        document.querySelector('.countdown').innerHTML = '02:00'

    } else {
        document.querySelector('.countdown').innerHTML = '00:00'
    }
    // when game is over - display past time
    if (!gIsOn) {
        if (!gNuts) {
            document.querySelector('.countdown').innerHTML = gDisplayMin + ':' + gDisplaySec 
        } else {
            document.querySelector('.countdown').innerHTML = `<span>${gDisplayminDown}:${gDisplaySecDown}</span>`
        }

    }
    time = startingMinutes * 60
}
//-------------------------------------------------------------------------------------------------------
// count down
function startCountDown() {
    gIntervalCountdown = setInterval(updateCountDown,10)
    gIntervalCountdown
}

function updateCountDown() {
    var minutes = Math.floor(time / 60)
    var seconds = time % 60
    var elCountDown = document.querySelector('.countdown')

    timeFinish(seconds,minutes)
   
    seconds < 10 ? gDisplaySecDown = '0' + seconds : gDisplaySecDown = seconds
    minutes < 10 ? gDisplayminDown = '0' + minutes : gDisplayminDown = minutes

    elCountDown.innerHTML = `<span>${gDisplayminDown}:${gDisplaySecDown}</span>`
    time--
}

//  
function timeFinish(seconds,minutes){
    if (seconds === 0 && minutes === 0) {
        clearInterval(gIntervalCountdown)
        gameOver()
        showLoseModal()
    }
}