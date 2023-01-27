
const playBtn = document.querySelector('.sam__main-wheel-btn'),
      playBtnText = document.querySelector('.sam__main-wheel-btn span'),
      wheel = document.querySelector('.sam__main-wheel-reel'),
      tries = document.querySelector('.try-number'),
      triesFull = document.querySelector('.sam__main-left-try'),
      overlay = document.querySelector('.sam__overlay'),
      popupFirst = document.querySelector('.sam__firstWin'),
      popupFirstBtn = document.querySelector('.sam__firstWin-btn'),
      popupSecond = document.querySelector('.sam__secondWin'),
      popupSecondRules = document.querySelector('.sam__secondWin-rules'),
      rules = document.querySelector('.sam__rules'),
      footerRulesBtn = document.querySelector('.sam__footer-rules'),
      mobRulesBtn = document.querySelector('.sam__infoMob-txt-more'),
      overflow = document.querySelector('body'),
      popupClose = document.querySelector('.sam__rules-close'),
      video = document.querySelector('.sam__main-video-bg'),
      wrapper = document.querySelector('.sam'),
      totalTriesCounter = 2

let triesCounter = 0

footerRulesBtn.addEventListener('click', () => {
    overlay.classList.remove('opacity-overlay')
    rules.classList.remove('hide')
})

mobRulesBtn.addEventListener('click', () => {
    overlay.classList.remove('opacity-overlay')
    rules.classList.remove('hide')
    overflow.style.overflow = 'hidden'
})

popupClose.addEventListener('click', () => {
    overlay.classList.add('opacity-overlay')
    rules.classList.add('hide')
    overflow.style.overflow = 'unset'
})

playBtn.addEventListener('click', () => {
    if (triesCounter === 0) {
        runFirstRotation()
    } else {
        runSecondRotation()
    }
})

function updTriesCounter() {
    const cnt = totalTriesCounter - triesCounter
    if (cnt === 2) {
        tries.innerText = "2 спроби"
    } else if (cnt === 1) {
        tries.innerText = "1 спроба"
    } else {
        tries.innerText = "0 спроб"
    }
}

function runFirstRotation() {
    wheel.classList.add('reel-rotation-first')
    playBtn.classList.remove('pulse-btn')
    playBtnText.classList.add('hide')
    playBtn.style.transform = 'scale(0.7)'
    playBtn.style.cursor = 'default'
    wrapper.style.pointerEvents = 'none'
    setTimeout(() => {
        if (window.innerWidth <= 500) {
            triesFull.style.opacity = '0'
        }
    }, 700)
    setTimeout(() => {
        doAfterFirstRotation()
    }, 6000)
    triesCounter++
    updTriesCounter()
}

function doAfterFirstRotation() {
    wheel.style.transform = 'rotate(992deg)'
    wheel.classList.remove('reel-rotation-first')
    displayPopup(popupFirst)
    wrapper.style.pointerEvents = 'auto'
    overflow.style.overflow = 'hidden'
    setTimeout(() => {
        playBtn.classList.add('pulse-btn')
        playBtnText.classList.remove('hide')
        playBtn.style.transform = 'scale(1)'
        playBtn.style.cursor = 'pointer'
    }, 1200)
}

function runSecondRotation() {
    wheel.classList.add('reel-rotation-second')
    playBtn.classList.remove('pulse-btn')
    playBtnText.classList.add('hide')
    playBtn.style.transform = 'scale(0.7)'
    playBtn.style.cursor = 'default'
    overflow.style.overflow = 'hidden'
    wrapper.style.pointerEvents = 'none'
    setTimeout(() => {
        doAfterSecondRotation()
    }, 6000)
    triesCounter++
    updTriesCounter()
}

function doAfterSecondRotation() {
    displayPopup(popupSecond)
    wrapper.style.pointerEvents = 'auto'
    popupSecondRules.addEventListener('click', () => {
        popupSecond.classList.add('hide')
        rules.classList.add('popup-win')
        rules.classList.remove('hide')
    })
}

popupFirstBtn.addEventListener('click', () => {
    overlay.classList.add('opacity-overlay')
    popupFirst.classList.add('hide')
    overflow.style.overflow = 'unset'
})

function displayPopup(popup) {
    overlay.classList.remove('opacity-overlay')
    popup.classList.remove('hide')
}

window.onload = videoSource(video, 'img/video.mp4', 'video/mp4')
function videoSource(element, src, type) {
    if(window.innerWidth > 1024) {
        let source = document.createElement('source')
        source.src = src
        source.type = type
        video.appendChild(source)
    }
}