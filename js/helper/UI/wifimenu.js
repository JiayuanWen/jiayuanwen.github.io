import { delay } from "../delay.js";

let delayer;

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(1200);

// Player show/hide
let wifiShortcut = document.getElementById("wifi");
let wifiWindow = document.getElementById("wifi-menu");

wifiShortcut.addEventListener('click', async function(){ 
    if (wifiWindow.style.opacity == 0) {
        // Hide other menus if any
        document.querySelectorAll(".sub-menu").forEach((menu) => {
            menu.style.opacity = 0;
            menu.style.bottom = "0px";
            menu.style.pointerEvents = "none";
        });
        // Unhightlight menu icons if any
        document.querySelectorAll(".menu-icon").forEach((icon) => {
            icon.style.background = "transparent";
            icon.style.color = "white";
        });
        // Show WiFi menu
        wifiWindow.style.opacity = 1;
        wifiWindow.style.bottom = "60px";
        wifiWindow.style.pointerEvents = "auto";
        // Hightlight icon
        wifiShortcut.style.background = "var(--firefly)";
        wifiShortcut.style.color = "black";
    }
    else {
        // Hide WiFi menu
        wifiWindow.style.opacity = 0;
        wifiWindow.style.bottom = "0px";
        wifiWindow.style.pointerEvents = "none";

        wifiShortcut.style.background = "transparent";
        wifiShortcut.style.color = "white";
    }
})