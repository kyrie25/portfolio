"use strict";
const processBox = document.querySelectorAll("body > div.titlebar > div.spaces > div"), dynamicCSS = document.querySelector(".dynamic_css"), { hash } = window.location;
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
    processBox[0].className = "space space--active";
    processBox[1].className = "space";
    processBox[2].className = "space";
    dynamicCSS.innerHTML = `html {
      background-image: url('static/img/bg.jpg');
    }`;
    dynamicCSS.innerHTML = `html {
		background-image: url('static/img/bg.jpg');
	  }
	  .terminal {
		animation: fadein 0.5s ease-in;
	}`;
    clear();
    switchToNewLine(true);
    printinfo();
}
function musicHash() {
    processBox[0].className = "space";
    processBox[1].className = "space space--active";
    processBox[2].className = "space";
    dynamicCSS.innerHTML = `html {
      background-image: url('static/img/music_bg.jpg');
    }`;
    dynamicCSS.innerHTML = `html {
		background-image: url('static/img/music_bg.jpg');
	  }
	  .terminal {
		animation: fadein 0.5s ease-in;
	}`;
    clear();
    switchToNewLine(true);
    printmusic();
}
function aboutHash() {
    processBox[0].className = "space";
    processBox[1].className = "space";
    processBox[2].className = "space space--active";
    dynamicCSS.innerHTML = `html {
      background-image: url('static/img/about_bg.jpg');
    }`;
    dynamicCSS.innerHTML = `html {
		background-image: url('static/img/about_bg.jpg');
	  }
	  .terminal {
		animation: fadein 0.5s ease-in;
	}`;
    clear();
    switchToNewLine(true);
    printabout();
}
