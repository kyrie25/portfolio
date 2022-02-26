"use strict";
setInterval((function a() {
    const [b, c] = [new Date(), new Date()];
    b.setHours(0, 0, 0);
    c.setHours(0, 0, 0);
    c.setDate(c.getDate() + 1);
    document.querySelector(".date-widget").innerHTML =
        '<svg class="date-display__icon" height="24" viewBox="0 0 24 24" width="24"><path d="M21 3h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zM7 10h5v5H7v-5z"></path></svg>' +
            new Date().toLocaleString("en-UK", {
                weekday: "short",
                month: "short",
                day: "numeric"
            });
    document.querySelector(".time-widget").innerHTML =
        '<svg class="time__icon" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>' +
            new Date().toLocaleString("en-UK", {
                hour: "numeric",
                minute: "numeric"
            }) +
            '<div class="time__filler"></div>';
    document.querySelector(".time__filler").style.transform = `scaleX(${(100 -
        (100 * Math.max(0, c.valueOf() - Date.now())) / c.valueOf() -
        b.valueOf()) /
        100})`;
    return a;
})(), 5e3);
const elem = document.querySelector(".terminal");
document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
elem.onmousedown = onMouseDown;
function onMouseDown(g) {
    window.event;
    g.preventDefault();
    pos3 = g.clientX;
    pos4 = g.clientY;
    document.onmouseup = onMouseUp;
    document.onmousemove = onMouseMuse;
}
function onMouseMuse(h) {
    window.event;
    h.preventDefault();
    pos1 = pos3 - h.clientX;
    pos2 = pos4 - h.clientY;
    pos3 = h.clientX;
    pos4 = h.clientY;
    elem.style.top = elem.offsetTop - pos2 + "px";
    elem.style.left = elem.offsetLeft - pos1 + "px";
    checkPos();
}
function onMouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
}
function touchHandler(i) {
    const j = i.changedTouches[0], k = document.createEvent("MouseEvent");
    k.initMouseEvent({ touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup" }[i.type], true, true, window, 1, j.screenX, j.screenY, j.clientX, j.clientY, false, false, false, false, 0, null);
    j.target.dispatchEvent(k);
    i.preventDefault();
}
document.addEventListener("keydown", function (l) {
    window.event;
    if (l.altKey) {
        switch (l.key) {
            case "ArrowUp":
                elem.style.top = elem.offsetTop - 20 + "px";
                break;
            case "ArrowDown":
                elem.style.top = elem.offsetTop + 20 + "px";
                break;
            case "ArrowLeft":
                elem.style.left = elem.offsetLeft - 20 + "px";
                break;
            case "ArrowRight":
                elem.style.left = elem.offsetLeft + 20 + "px";
                break;
        }
        checkPos();
    }
}, false);
function checkPos() {
    if (elem.offsetHeight + elem.offsetTop > window.innerHeight)
        elem.style.top = window.innerHeight - elem.offsetHeight + "px";
    if (elem.offsetWidth + elem.offsetLeft > window.innerWidth)
        elem.style.left = window.innerWidth - elem.offsetWidth + "px";
    if (elem.offsetLeft < -elem.offsetWidth / 2)
        elem.style.left = -Math.floor(elem.offsetWidth / 2) + "px";
    if (elem.offsetTop < -elem.offsetHeight / 2)
        elem.style.top = -Math.floor(elem.offsetHeight / 2) + "px";
}
