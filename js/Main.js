
import { isMobile } from "./helper/mobileCheck.js";
import { delay } from "./helper/delay.js";

let delayer;

//----------------------------------------------------------------------------------------- Loading management
// Execute on loading start

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(700);

let loadingBar;
let loadingPercent;
let loadingScreen;

if (isMobile()) {
	alert("The site is currently not optimized for mobile devices. It is best to visit on PC for the time being.");
}
else {
	//alert("Note: Site is still under construction.");
}

// Execute during loading
let total = 1000;
let loaded = 0;
let loading_flag = "loading";

let loading_am_list = [0,0,0,1,2,8,2,4,6];
let loading_am = 1;

async function loading() {
	if (!loadingBar) {
		loadingBar = document.getElementById('loading-bar');
	}
	
	while (loadingBar.value < 100) {
		loading_am = loading_am_list[Math.floor(Math.random() * 9)];

		loadingBar.value = (loaded / total) * 100;
		loadingPercent.textContent =  'Booting...'+parseInt((loaded / total) * 100)+' %';

		loaded += loading_am;
		delayer = await delay(0.1);
	}
	if (loadingBar.value > 100) {
		loadingBar.value = 100;
		loadingPercent.textContent = '100%';
	}
	loading_flag = "complete";
	loadingComplete();

	return;
} 

$(document).ready(function() {
	loadingBar = document.getElementById('loading-bar');
	loadingPercent = document.getElementById('loading-percent');
	loadingScreen = document.querySelector('.loading-screen');
	console.log("Browser: "+platform.name);
	loading();
})

// Execute on loading complete
async function loadingComplete() {
	// Load wallpaper
	var wallpaper_i = Math.floor(Math.random() * 1) + 1;
	document.body.style.backgroundImage = `url('/textures/Background/wallpapers/${wallpaper_i}.jpg')`;

	delayer = await delay(10);

	// Hide percentage
	if (loadingPercent) {
		loadingPercent.style.opacity = 0;
	}
	// Set loading indicator (the spinning cube) to random image, then hide.
	// Set to random image is to prevent site lag due to gif eating resources.
	// Keeping a animated gif isn't a good idea after all.
	let loading_indicator = document.getElementById('loading-indicator');
	if (loading_indicator) {
		loading_indicator.style.opacity = 0;
		loading_indicator.src = "/textures/Alan_Walker_Play.jpg";
	}

	// Fade out loading screen
	delayer = await delay(700);
	var fadeOutEffect = setInterval(function () {
		if (!loadingScreen.style.opacity) {
			loadingScreen.style.opacity = 1;
		}
		if (loadingScreen.style.opacity > 0) {
			loadingScreen.style.opacity -= 0.02;
		} else {
			loadingScreen.style.display = 'none';
			clearInterval(fadeOutEffect);
		}
	}, 15);

	// Show main menu bar
	delayer = await delay(900);
	document.getElementById("main-menu-container").style.opacity = "1";
}

//----------------------------------------------------------------------------------------- Other
window.onunload = function(){}; //This forces bfcache to not cache the page
