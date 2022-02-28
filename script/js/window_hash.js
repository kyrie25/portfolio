"use strict";
const processBox = document.querySelectorAll("body > div.titlebar > div.spaces > div"), backgroundImage = document.querySelector(".background_image"), { hash } = window.location;
switch (hash) {
    case "#music": {
        musicHash();
        break;
    }
    case "#about":
        {
            aboutHash();
        }
        break;
    case "":
    default: {
        homeHash();
        break;
    }
}
function homeHash() {
    document.querySelector(".terminal").className =
        "terminal_await-css";
    document.querySelector(".terminal_await-css").className =
        "terminal";
    processBox[0].className = "space space--active";
    processBox[1].className = "space";
    processBox[2].className = "space";
    backgroundImage.innerHTML = `html {
      background-image: url('static/img/bg.jpg');
    }`;
    clear();
    switchToNewLine(true);
    printinfo();
}
function musicHash() {
    document.querySelector(".terminal").className =
        "terminal_await-css";
    document.querySelector(".terminal_await-css").className =
        "terminal";
    processBox[0].className = "space";
    processBox[1].className = "space space--active";
    processBox[2].className = "space";
    backgroundImage.innerHTML = `html {
      background-image: url('static/img/music_bg.jpg');
    }`;
    clear();
    switchToNewLine(true);
    printmusic();
}
function aboutHash() {
    document.querySelector(".terminal").className =
        "terminal_await-css";
    document.querySelector(".terminal_await-css").className =
        "terminal";
    processBox[0].className = "space";
    processBox[1].className = "space";
    processBox[2].className = "space space--active";
    backgroundImage.innerHTML = `html {
      background-image: url('static/img/about_bg.jpg');
    }`;
    clear();
    switchToNewLine(true);
    printabout();
}
