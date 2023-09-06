import { delay } from "./delay.js";

const loadingBar = document.getElementById('loading-bar');
async function showDisclaimer() {
	let delayer = await delay(5700);
	if (loadingBar.value != 100) {
		document.getElementById("loading-disclaimer").style.visibility = "visible";
	}
}
showDisclaimer();