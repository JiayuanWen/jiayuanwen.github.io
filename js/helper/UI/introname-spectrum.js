import { rgbToHex } from "../rgbToHex.js";
import { delay } from "../delay.js";

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