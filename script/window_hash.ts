const terminalBox = document.querySelector<HTMLDivElement>(
    "body > div.titlebar > div.spaces > div:nth-child(1)"
  ),
  musicBox = document.querySelector<HTMLDivElement>(
    "body > div.titlebar > div.spaces > div:nth-child(2)"
  ),
  aboutBox = document.querySelector<HTMLDivElement>(
    "body > div.titlebar > div.spaces > div:nth-child(3)"
  ),
  styleSheet = document.querySelector<HTMLLinkElement>(
    "head > link[rel='stylesheet']"
  );
let { hash } = window.location;

if (hash === "") {
  terminalBox.className = "space space--active";
  musicBox.className = "space";
  aboutBox.className = "space";
  styleSheet.href = "static/style.css";
  switchToNewLine(true);
  printinfo();
} else if (hash === "#music") {
  terminalBox.className = "space";
  musicBox.className = "space space--active";
  aboutBox.className = "space";
  styleSheet.href = "static/style_music.css";
  switchToNewLine(true);
  printmusic();
} else if (hash === "#about") {
  terminalBox.className = "space";
  musicBox.className = "space";
  aboutBox.className = "space space--active";
  styleSheet.href = "static/style_about.css";
  switchToNewLine(true);
  printabout();
}
