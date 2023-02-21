var playBtn = document.querySelector(".sam__main-wheel-btn"),
    playBtnText = document.querySelector(".sam__main-wheel-btn span"),
    wheel = document.querySelector(".sam__main-wheel-reel"), tries = document.querySelector(".try-number"),
    triesFull = document.querySelector(".sam__main-left-try"), overlay = document.querySelector(".sam__overlay"),
    popupFirst = document.querySelector(".sam__firstWin"), popupFirstBtn = document.querySelector(".sam__firstWin-btn"),
    popupSecond = document.querySelector(".sam__secondWin"),
    popupSecondRules = document.querySelector(".sam__secondWin-rules"), overflow = document.querySelector("body"),
    video = document.querySelector(".sam__main-video-bg"), wrapper = document.querySelector(".sam"),
    totalTriesCounter = 2, triesCounter = 0;

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
        popupSecond.classList.add("hide")
    })
}

function displayPopup(e) {
    overlay.classList.remove("opacity-overlay"), e.classList.remove("hide")
}

function videoSource(e, t, r) {
    var o;
    1024 < window.innerWidth && ((o = document.createElement("source")).src = t, o.type = r, video.appendChild(o))
}

playBtn.addEventListener("click", function () {
    (0 === triesCounter ? runFirstRotation : runSecondRotation)()
}), popupFirstBtn.addEventListener("click", function () {
    overlay.classList.add("opacity-overlay"), popupFirst.classList.add("hide"), overflow.style.overflow = "unset"
}), window.onload = videoSource(video, "img/video.mp4", "video/mp4"), function () {
    var e, o = new URL(window.location.href),
        a = ["l", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "param1", "param2"];
    !o.searchParams.has("redirectUrl") || 4 === (e = new URL(o.searchParams.get("redirectUrl"))).href.match(/\//g).length && e.searchParams.get("l") && localStorage.setItem("redirectUrl", e.href), a.forEach(function (e) {
        o.searchParams.has(e) && localStorage.setItem(e, o.searchParams.get(e))
    }), ["affid", "cpaid"].forEach(function (e) {
        o.searchParams.has(e) && localStorage.setItem(e, o.searchParams.get(e))
    }), window.addEventListener("click", function (e) {
        var t, r = e.target.closest("a");
        "https://tds.favbet.partners" === r.getAttribute("href") && r && (e.preventDefault(), localStorage.getItem("redirectUrl") ? t = new URL(localStorage.getItem("redirectUrl")) : (t = new URL(r.href), affid = localStorage.getItem("affid"), cpaid = localStorage.getItem("cpaid"), affid && cpaid && (t.pathname = "/" + affid + "/" + cpaid)), a.forEach(function (e) {
            o.searchParams.has(e) && t.searchParams.set(e, localStorage.getItem(e))
        }), document.location.href = t)
    })
}();