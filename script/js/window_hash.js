const terminalBox = document.querySelector("body > div.titlebar > div.spaces > div:nth-child(1)"), musicBox = document.querySelector("body > div.titlebar > div.spaces > div:nth-child(2)"), aboutBox = document.querySelector("body > div.titlebar > div.spaces > div:nth-child(3)"), styleSheet = document.querySelector("head > link[rel='stylesheet']");
let { hash } = window.location;
if (hash === "")
    homeHash();
else if (hash === "#music")
    musicHash();
else if (hash === "about")
    aboutHash();
function homeHash() {
    hash = "";
    terminalBox.className = "space space--active";
    musicBox.className = "space";
    aboutBox.className = "space";
    styleSheet.href = "static/style.css";
    clear();
    printinfo();
}
function musicHash() {
    hash = "#music";
    terminalBox.className = "space";
    musicBox.className = "space space--active";
    aboutBox.className = "space";
    styleSheet.href = "static/style_music.css";
    clear();
    printmusic();
}
function aboutHash() {
    hash = "#about";
    terminalBox.className = "space";
    musicBox.className = "space";
    aboutBox.className = "space space--active";
    styleSheet.href = "static/style_about.css";
    clear();
    printabout();
}
