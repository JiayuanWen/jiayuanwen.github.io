import { delay } from "../delay.js";

let delayer;

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(1200);

// Player show/hide
let wifiShortcut = document.getElementById("wifi");
let wifiWindow = document.getElementById("wifi-menu");

wifiShortcut.addEventListener('click', async function(){ 
    if (wifiWindow.style.opacity == 0) {
        wifiWindow.style.opacity = 1;
        wifiWindow.style.bottom = "60px";
        wifiWindow.style.pointerEvents = "auto";
    }
    else {
        wifiWindow.style.opacity = 0;
        wifiWindow.style.bottom = "0px";
        wifiWindow.style.pointerEvents = "none";
    }
})