"use strict";
const terminal = document.querySelector(".terminal"), base = 'kyrie25@<span style="color: #b8d5ef">github.io</span>:<span style="color: dodgerblue">~</span>$ ', array = [];
let input = "", lastIdx = -1, lastCmd = "", index = 0, sw = true;
function updateConsole() {
    document.querySelector(".new-line").innerHTML = sw
        ? index === 0
            ? `${base + input}|`
            : `${base + input.slice(0, index)}|${input.slice(index)}`
        : base + input;
}
document.addEventListener("keydown", function (a) {
    window.event;
    const b = a.key;
    if ((a.metaKey || a.ctrlKey) &&
        a.key === "v" &&
        navigator.userAgent.search("Firefox") === -1) {
        navigator.clipboard.readText().then(function (c) {
            if (c === "" || c.trim().length === 0)
                return;
            if (index === 0)
                input += c;
            else
                input = input.slice(0, index) + c + input.slice(index);
            updateConsole();
        });
        a.preventDefault();
        return;
    }
    if (a.ctrlKey || a.metaKey || a.altKey)
        return;
    if (input.length + index <= 0)
        index = -input.length;
    if (index > 0)
        index = 0;
    if (b.length === 1) {
        if (index === 0)
            input += b;
        else
            input = input.slice(0, index) + b + input.slice(index);
        updateConsole();
        a.preventDefault();
        return;
    }
    let d = input.length !== 0;
    switch (b) {
        case "Enter":
            if (d) {
                const fa = input.trim().split(" "), f = fa.shift().toLowerCase();
                switch (f) {
                    case "spark":
                        if (fa.length >= 1) {
                            if (fa[0].toLowerCase() === "show")
                                showSpark();
                            else if (fa[0].toLowerCase() === "set") {
                                if (!fa[1].match(/^\d*$/) ||
                                    (fa[2] && !fa[2].match(/^\d*$/)) ||
                                    (fa[3] && !fa[3].match(/^\d*$/)))
                                    invalidSpark();
                                else {
                                    localStorage.setItem("crystals", fa[1]);
                                    if (fa[2])
                                        localStorage.setItem("tickets", fa[2]);
                                    if (fa[3])
                                        localStorage.setItem("10tickets", fa[3]);
                                    showSpark();
                                }
                            }
                            else
                                sparkInfo();
                        }
                        else
                            sparkInfo();
                        break;
                    case "music":
                        music();
                        break;
                    case "about":
                        about();
                        break;
                    case "ls":
                    case "dir":
                        ls();
                        break;
                    case "clear":
                        clear();
                        break;
                    case "info":
                    case "neofetch":
                        info();
                        break;
                    default:
                        d = false;
                        writeLine(`bash: command not found: ${f}`);
                        break;
                }
            }
            switchToNewLine(d);
            terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
            break;
        case "Backspace":
            if (input.length <= 0)
                return;
            if (index === 0)
                input = input.slice(0, -1);
            else
                input = input.slice(0, index - 1) + input.slice(index);
            updateConsole();
            break;
        case "Delete":
            if (input.length <= 0 || index === 0)
                return;
            input =
                input.slice(0, index) + (index === -1 ? "" : input.slice(index + 1));
            index = index >= 0 ? 0 : index + 1;
            updateConsole();
            break;
        case "ArrowLeft":
            if (input.length === 0 || input.length + index <= 0)
                index = -input.length;
            else
                index--;
            updateConsole();
            break;
        case "ArrowRight":
            index = index >= 0 ? 0 : index + 1;
            updateConsole();
            break;
        case "ArrowUp":
            if (array.length === 0)
                return;
            if (lastIdx === -1) {
                lastIdx = array.length;
                lastCmd = input;
            }
            lastIdx--;
            if (lastIdx <= 0)
                lastIdx = 0;
            input = array[lastIdx];
            updateConsole();
            break;
        case "ArrowDown":
            if (lastIdx === -1)
                return;
            lastIdx++;
            if (lastIdx >= array.length) {
                lastIdx = -1;
                input = lastCmd;
                return;
            }
            input = array[lastIdx];
            updateConsole();
            break;
    }
    a.preventDefault();
}, false);
inputLine("info");
info();
switchToNewLine(true);
setInterval((function g() {
    if (index === 0)
        sw = !sw;
    else
        sw = true;
    updateConsole();
    return g;
})(), 500);
function switchToNewLine(h) {
    if (input.length !== 0)
        array.push(input);
    lastIdx = -1;
    input = "";
    const i = document.querySelector(".new-line");
    if (i) {
        if (h)
            i.style.paddingBottom = "5px";
        i.classList.remove("new-line");
        if (i.innerHTML.endsWith("|"))
            i.innerHTML = i.innerHTML.slice(0, -1);
    }
    index = 0;
    inputLine("");
}
function printspark() {
    const j = document.querySelector(".new-line");
    j.classList.remove("new-line");
    if (j.innerHTML.endsWith("|"))
        j.innerHTML = j.innerHTML.slice(0, -1);
    j.innerHTML += "spark";
    sparkInfo();
    switchToNewLine(true);
}
function printinfo() {
    const j = document.querySelector(".new-line");
    j.classList.remove("new-line");
    if (j.innerHTML.endsWith("|"))
        j.innerHTML = j.innerHTML.slice(0, -1);
    j.innerHTML += "info";
    info();
    switchToNewLine(true);
}
function printmusic() {
    const j = document.querySelector(".new-line");
    j.classList.remove("new-line");
    if (j.innerHTML.endsWith("|"))
        j.innerHTML = j.innerHTML.slice(0, -1);
    j.innerHTML += "music";
    music();
    switchToNewLine(true);
}
function printabout() {
    const j = document.querySelector(".new-line");
    j.classList.remove("new-line");
    if (j.innerHTML.endsWith("|"))
        j.innerHTML = j.innerHTML.slice(0, -1);
    j.innerHTML += "about";
    about();
    switchToNewLine(true);
}
function print404() {
    const j = document.querySelector(".new-line");
    j.classList.remove("new-line");
    if (j.innerHTML.endsWith("|"))
        j.innerHTML = j.innerHTML.slice(0, -1);
    j.innerHTML += "nahbro";
    writeLine("bash: <span>404</span> - Page not found. Redirected to the main page in <span>5s</span>.......");
    inputLine("./main");
    switchToNewLine(true);
}
function inputLine(k) {
    terminal.innerHTML += `\n<div class="new-line">kyrie25@<span style="color: #b8d5ef">github.io</span>:<span style="color: dodgerblue">~</span>$ ${k ? k : ""}</div>`;
}
function writeLine(l) {
    terminal.innerHTML += `<div>${l}</div>`;
}
function clear() {
    terminal.innerHTML = "";
}
function ls() {
    terminal.innerHTML +=
        '\nI could list the files, but it is better if you check it out on <a href="https://github.com/kyrie25/portfolio">GitHub</a> yourself</div>\n' +
            '  <div style="padding-bottom:10px; clear: both;">';
}
function invalidSpark() {
    terminal.innerHTML +=
        "\nInvalid spark command\n" +
            '  <div style="padding-bottom:10px; clear: both;">';
}
function showSpark() {
    let currentCrystals = Number(localStorage.getItem("crystals")), currentTickets = Number(localStorage.getItem("tickets")), current10Tickets = Number(localStorage.getItem("10tickets"));
    if (isNaN(currentCrystals))
        currentCrystals = 0;
    if (isNaN(currentTickets))
        currentTickets = 0;
    if (isNaN(current10Tickets))
        current10Tickets = 0;
    const totalDraws = Math.trunc(currentCrystals / 300) + currentTickets + current10Tickets * 10;
    terminal.innerHTML +=
        `\nYou currently have ${totalDraws}, with ${currentCrystals} crystals, ${currentTickets} tickets and ${current10Tickets} 10 tickets \n` +
            '  <div style="padding-bottom:10px; clear: both;">';
}
function sparkInfo() {
    terminal.innerHTML +=
        '\n<img alt="icon" class="img" src="static/img/spark_icon.png">\n' +
            "  <div><span>kyrie25</span>@<span>github.io</span></div>\n" +
            "  <div>---------------------</div>\n" +
            "  <div><span>GBF Spark Counter</span> made by <a href=\"https://github.com/kyrie25\" target='_blank'>me</a></div>\n" +
            "  <div>Because all Discord spark bots were dead at the time and I'm too lazy to host one</div>\n" +
            "  <div>---------------------</div>\n" +
            "  <div>Usage:</div>\n" +
            "  <div>'spark set <crystals> <tickets> <10tickets>'</div>\n" +
            "  <div>eg: 'spark 25000 7 1' = 100 draws\n" +
            "  <div>'spark show': Show your current spark count</div>\n" +
            '  <div style="padding-bottom:10px; clear: both;">';
}
function info() {
    terminal.innerHTML +=
        '\n<img alt="icon" class="img" src="static/img/icon.png">\n' +
            "  <div><span>kyrie25</span>@<span>github.io</span></div>\n" +
            "  <div>---------------------</div>\n" +
            "  <div><span>Proofreading</span>: <a href=\"https://premid.app\" target='_blank'>PreMiD</a> | <a href=\"https://lineageos.org\" target='_blank'>LineageOS</a></div>\n" +
            "  <div><span>Translating</span>: <a href=\"https://premid.app\" target='_blank'>PreMiD</a> | <a href=\"https://lineageos.org\" target='_blank'>LineageOS</a> | <a href=\"https://www.ted.com\" target='_blank'>TED</a></div>\n" +
            "  <div><span>Developing</span>: <a href=\"https://premid.app/store\" target='_blank'>PreMiD Presences</a> | Own projects</div>\n" +
            "  <div>---------------------</div>\n" +
            "  <div><span>Crowdin</span>: <a href=\"https://crowdin.com/profile/kyrie_25\" target='_blank'>kyrie_25</a></div>\n" +
            "  <div><span>GitHub</span>: <a href=\"https://github.com/kyrie25\" target='_blank'>@kyrie25</a></div>\n" +
            "  <div><span>PreMiD</span>: <a href=\"https://premid.app/users/368399721494216706\" target='_blank'>Kyrie</a></div>\n" +
            "  <div><span>Discord</span>: <a href=\"https://discord.com/users/368399721494216706\" target='_blank'>Kyrie#5416</a></div>\n" +
            '  <div style="padding-bottom:10px; clear: both;">';
}
function music() {
    terminal.innerHTML +=
        '\n<img alt="icon" class="img" src="static/img/music_icon.png">\n' +
            "  <div><span>kyrie25</span>@<span>github.io</span></div>\n" +
            "  <div>---------------------</div>\n" +
            "  <div><a href=\"https://open.spotify.com/playlist/5OoKLO2wXOqPL8qg2jrLt1?si=8893b3e69a004d5f\" target='_blank'>My Playlist</a></div>\n" +
            "  <div><span>Jap shit:</span></div>\n" +
            "  <div><a href=\"https://open.spotify.com/playlist/6G78HbtY90psDF1gt9D9Kq?si=0a47a3fb501a4b87\" target='_blank'>Touhou music</a></div>\n" +
            "  <div><a href=\"https://www.youtube.com/watch?v=UIp6_0kct_U\" target='_blank'>Touhou music but deserves a separate link</a></div>\n" +
            "  <div><a href=\"https://www.youtube.com/channel/UC10BM9XdLdrvB8japwmRUvA\" target='_blank'>Kanaria</a></div>\n" +
            "  <div><a href=\"https://www.youtube.com/c/inabakumori\" target='_blank'>inabakumori</a></div>\n" +
            "  <div>...and a ton others but too lazy to label, just click the playlist at the top ig</div>\n" +
            '  <div style="padding-bottom:10px; clear: both;">';
}
function about() {
    terminal.innerHTML +=
        '\n<img alt="icon" class="img" src="static/img/about.png">\n' +
            "  <div><span>kyrie25</span>@<span>github.io</span></div>\n" +
            "  <div>---------------------</div>\n" +
            "  <div><span>About this page</span></div>\n" +
            "  <div>This is my <span>first</span> website</div>\n" +
            "  <div>Basically a portfolio/'About Me'</div>\n" +
            "  <div>It probably won't be updated by the time you're reading this</div>\n" +
            "  <div>Credit to stuff I've used in this page:</div>\n" +
            "  <div><span>About 70% of the website</span>: Me</div>\n" +
            "  <div><span>Core script/functionality</span>: Generous stranger on GitHub, not sure who they were</div>\n" +
            "  <div><span>Nazrin</span>: rrat</div>\n" +
            "  <div><span>Home page artwork</span>: <a href=\"https://www.pixiv.net/en/artworks/58056024\" target='_blank'>にしもん</a></div>\n" +
            "  <div><span>Music page artwork</span>: <a href=\"https://twitter.com/ramdayo1122/status/1480119998391918594\" target='_blank'>LAM</a></div>\n" +
            "  <div><span>About page artwork</span>: <a href=\"https://www.pixiv.net/en/artworks/47516247\" target='_blank'>にしもん</a></div>\n" +
            "  <div>Please support the respective owners of the works, they really are awesome <3</div>\n" +
            '  <div style="padding-bottom:10px; clear: both;">';
}
