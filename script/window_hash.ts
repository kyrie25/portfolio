const processBox = document.querySelectorAll<HTMLDivElement>(
    "body > div.titlebar > div.spaces > div"
  ),
  backgroundImage =
    document.querySelector<HTMLStyleElement>(".background_image"),
  { hash } = window.location;

// Reloading purposes
if (hash === "") homeHash();
else if (hash === "#music") musicHash();
else if (hash === "#about") aboutHash();

function homeHash() {
  processBox[0].className = "space space--active";
  processBox[1].className = "space";
  processBox[2].className = "space";
  backgroundImage.innerHTML.replace(
    /about_bg[.]jpg|music_bg[.]jpg/gm,
    "bg.jpg"
  );
  clear();
  switchToNewLine(true);
  printinfo();
}
function musicHash() {
  processBox[0].className = "space";
  processBox[1].className = "space space--active";
  processBox[2].className = "space";
  backgroundImage.innerHTML.replace(
    /about_bg[.]jpg|bg[.]jpg/gm,
    "music_bg.jpg"
  );
  clear();
  switchToNewLine(true);
  printmusic();
}
function aboutHash() {
  processBox[0].className = "space";
  processBox[1].className = "space";
  processBox[2].className = "space space--active";
  backgroundImage.innerHTML.replace(
    /music_bg[.]jpg|bg[.]jpg/gm,
    "about_bg.jpg"
  );
  clear();
  switchToNewLine(true);
  printabout();
}
