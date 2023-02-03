var playBtn = document.querySelector(".sam__main-wheel-btn"),
    playBtnText = document.querySelector(".sam__main-wheel-btn span"),
    wheel = document.querySelector(".sam__main-wheel-reel"), tries = document.querySelector(".try-number"),
    triesFull = document.querySelector(".sam__main-left-try"), overlay = document.querySelector(".sam__overlay"),
    popupFirst = document.querySelector(".sam__firstWin"), popupFirstBtn = document.querySelector(".sam__firstWin-btn"),
    popupSecond = document.querySelector(".sam__secondWin"),
    popupSecondRules = document.querySelector(".sam__secondWin-rules"), rules = document.querySelector(".sam__rules"),
    footerRulesBtn = document.querySelector(".sam__footer-rules"),
    mobRulesBtn = document.querySelector(".sam__infoMob-txt-more"), overflow = document.querySelector("body"),
    popupClose = document.querySelector(".sam__rules-close"), video = document.querySelector(".sam__main-video-bg"),
    wrapper = document.querySelector(".sam"), totalTriesCounter = 2, triesCounter = 0;

function updTriesCounter() {
    var e = totalTriesCounter - triesCounter;
    tries.innerText = 2 == e ? "2 спроби" : 1 == e ? "1 спроба" : "0 спроб"
}

function runFirstRotation() {
    wheel.classList.add("reel-rotation-first"), playBtn.classList.remove("pulse-btn"), playBtnText.classList.add("hide"), playBtn.style.transform = "scale(0.7)", playBtn.style.cursor = "default", wrapper.style.pointerEvents = "none", setTimeout(function () {
        window.innerWidth <= 500 && (triesFull.style.opacity = "0")
    }, 700), setTimeout(function () {
        doAfterFirstRotation()
    }, 6e3), triesCounter++, updTriesCounter()
}

function doAfterFirstRotation() {
    wheel.style.transform = "rotate(992deg)", wheel.classList.remove("reel-rotation-first"), displayPopup(popupFirst), wrapper.style.pointerEvents = "auto", overflow.style.overflow = "hidden", setTimeout(function () {
        playBtn.classList.add("pulse-btn"), playBtnText.classList.remove("hide"), playBtn.style.transform = "scale(1)", playBtn.style.cursor = "pointer"
    }, 1200)
}

function runSecondRotation() {
    wheel.classList.add("reel-rotation-second"), playBtn.classList.remove("pulse-btn"), playBtnText.classList.add("hide"), playBtn.style.transform = "scale(0.7)", playBtn.style.cursor = "default", overflow.style.overflow = "hidden", wrapper.style.pointerEvents = "none", setTimeout(function () {
        doAfterSecondRotation()
    }, 6e3), triesCounter++, updTriesCounter()
}

function doAfterSecondRotation() {
    displayPopup(popupSecond), wrapper.style.pointerEvents = "auto", popupSecondRules.addEventListener("click", function () {
        popupSecond.classList.add("hide"), rules.classList.add("popup-win"), rules.classList.remove("hide")
    })
}

function displayPopup(e) {
    overlay.classList.remove("opacity-overlay"), e.classList.remove("hide")
}

function videoSource(e, t, o) {
    var r;
    1024 < window.innerWidth && ((r = document.createElement("source")).src = t, r.type = o, video.appendChild(r))
}

mobRulesBtn.addEventListener("click", function () {
    overlay.classList.remove("opacity-overlay"), rules.classList.remove("hide"), overflow.style.overflow = "hidden"
}), popupClose.addEventListener("click", function () {
    overlay.classList.add("opacity-overlay"), rules.classList.add("hide"), overflow.style.overflow = "unset"
}), playBtn.addEventListener("click", function () {
    (0 === triesCounter ? runFirstRotation : runSecondRotation)()
}), popupFirstBtn.addEventListener("click", function () {
    overlay.classList.add("opacity-overlay"), popupFirst.classList.add("hide"), overflow.style.overflow = "unset"
}), window.onload = videoSource(video, "img/video.mp4", "video/mp4"), function () {
    var e, r = new URL(window.location.href),
        s = ["l", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "param1", "param2"];
    !r.searchParams.has("redirectUrl") || 4 === (e = new URL(r.searchParams.get("redirectUrl"))).href.match(/\//g).length && e.searchParams.get("l") && localStorage.setItem("redirectUrl", e.href), s.forEach(function (e) {
        r.searchParams.has(e) && localStorage.setItem(e, r.searchParams.get(e))
    }), ["affid", "cpaid"].forEach(function (e) {
        r.searchParams.has(e) && localStorage.setItem(e, r.searchParams.get(e))
    }), window.addEventListener("click", function (e) {
        var t, o = e.target.closest("a");
        "https://tds.favbet.partners" === o.getAttribute("href") && o && (e.preventDefault(), localStorage.getItem("redirectUrl") ? t = new URL(localStorage.getItem("redirectUrl")) : (t = new URL(o.href), affid = localStorage.getItem("affid"), cpaid = localStorage.getItem("cpaid"), affid && cpaid && (t.pathname = "/" + affid + "/" + cpaid)), s.forEach(function (e) {
            r.searchParams.has(e) && t.searchParams.set(e, localStorage.getItem(e))
        }), document.location.href = t)
    })
}();