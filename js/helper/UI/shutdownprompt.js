import { delay } from "../delay.js";
import { isMobile } from "../mobileCheck.js";

let delayer;

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(700);

let powerButton;

let shutdownPrompt;

let shutdownButton;
let restartButton;
let cancelButton;

let startMenu;

$(document).ready(function() {
    powerButton = document.getElementById("power-button");

    shutdownPrompt = document.getElementById("shutdown-prompt");

    shutdownButton = document.getElementById("shutdown");
    restartButton = document.getElementById("restart");
    cancelButton = document.getElementById("shutdown-cancel");

    startMenu = document.getElementById("start-menu");

    // Power button (in start menu) handle
    powerButton.addEventListener('click', function(){ 
        shutdownPrompt.style.opacity = "1";
        shutdownPrompt.style.pointerEvents = "auto";

        // Hide start menu
        startMenu.style.opacity = "0";
        startMenu.style.pointerEvents = "none";
        startMenu.style.bottom = "0px";
    });

    // Shutdown prompt option handle
    shutdownButton.addEventListener('click', function(){ 
        window.close();
        // In case site does not close successfully
        window.location.reload();
    });
    restartButton.addEventListener('click', function(){ 
        window.location.reload();
    });
    cancelButton.addEventListener('click', function(){ 
        shutdownPrompt.style.opacity = "0";
        shutdownPrompt.style.pointerEvents = "none";
    });
})



