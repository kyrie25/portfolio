const processBox = document.querySelectorAll<HTMLDivElement>(
		"body > div.titlebar > div.spaces > div"
	),
	backgroundImage =
		document.querySelector<HTMLStyleElement>(".background_image"),
	{ hash } = window.location;

// Reloading purposes
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
	backgroundImage.innerHTML = `html {
      background-image: url('static/img/bg.jpg');
    }`;
	clear();
	switchToNewLine(true);
	printinfo();
}
function musicHash() {
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
