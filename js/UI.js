import { rgbToHex } from "./helper/rgbToHex.js";
import { delay } from "./helper/delay.js";

//---------------------------------------------------------------------------------------- Fullscreen button
document.getElementById("fullscreen").addEventListener("click", fullscreenToggle);

// Credit: Kraang Prime from Stack Overflow (https://stackoverflow.com/a/36672683)
function fullscreenToggle() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
        document.getElementById("fullscreen-toggle").classList.remove('fa-expand');
        document.getElementById("fullscreen-toggle").classList.add('fa-compress');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        document.getElementById("fullscreen-toggle").classList.remove('fa-compress');
        document.getElementById("fullscreen-toggle").classList.add('fa-expand');
    }
}

//---------------------------------------------------------------------------------------- Self introduction name
// Color changing fibers
var red = 255; 
var green = 0;	
var blue = 0;	
var color_stage = 1;
async function introNameColorSpectrum() {
	while (true) {
		// Cycle through all non-monochrome colors
		if (color_stage == 1) {
			blue += 1;
			if (blue >= 254) {
				color_stage++;
			}
		}
		if (color_stage == 2) {
			red -= 1;
			if (red <= 1) {
				color_stage++;
			}
		}
		if (color_stage == 3) {
			green += 1;
			if (green >= 254) {
				color_stage++;
			}
		}
		if (color_stage == 4) {
			blue -= 1;
			if (blue <= 1) {
				color_stage++;
			}
		}
		if (color_stage == 5) {
			red += 1;
			if (red >= 254) {
				color_stage++;
			}
		}
		if (color_stage == 6) {
			green -= 1;
			if (green <= 1) {
				color_stage = 1;
			}
		}

        // Change color of real name
		document.getElementById("site-intro-name").style.textShadow = 
        "-1px -1px 0 "
        +rgbToHex(red,green,blue)+", 1px -1px 0 "
        +rgbToHex(red,green,blue)+", -1px 1px 0 "
        +rgbToHex(red,green,blue)+", 1px 1px 0 "
        +rgbToHex(red,green,blue);

        // Change color of nick name
        document.getElementById("site-intro-nickname").style.textShadow = 
        "-1px -1px 0 "
        +rgbToHex(red,green,blue)+", 1px -1px 0 "
        +rgbToHex(red,green,blue)+", -1px 1px 0 "
        +rgbToHex(red,green,blue)+", 1px 1px 0 "
        +rgbToHex(red,green,blue);

		let delayers = await delay(8.2);
	}
}
introNameColorSpectrum();
