const terminalBox = document.querySelector("body > div.titlebar > div.spaces > div:nth-child(1)"), musicBox = document.querySelector("body > div.titlebar > div.spaces > div:nth-child(2)"), aboutBox = document.querySelector("body > div.titlebar > div.spaces > div:nth-child(3)"), styleSheet = document.querySelector("head > link[rel='stylesheet']");
function homeHash() {
    terminalBox.className = "space space--active";
    musicBox.className = "space";
    aboutBox.className = "space";
    styleSheet.href = "static/style.css";
    clear();
    switchToNewLine(true);
    printinfo();
}
function musicHash() {
    terminalBox.className = "space";
    musicBox.className = "space space--active";
    aboutBox.className = "space";
    styleSheet.href = "static/style_music.css";
    clear();
    switchToNewLine(true);
    printmusic();
}
function aboutHash() {
    terminalBox.className = "space";
    musicBox.className = "space";
    aboutBox.className = "space space--active";
    styleSheet.href = "static/style_about.css";
    clear();
    switchToNewLine(true);
    printabout();
}
