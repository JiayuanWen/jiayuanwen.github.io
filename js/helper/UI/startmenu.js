import { delay } from "../delay.js";
import { isMobile } from "../mobileCheck.js";

//----------------------------------------------------------------------------------------- Start Menu button tooltip
$(document).ready(function() {
    document.getElementById("home-button").onmouseover = async function() { 
        // Only show tooltip if Start menu is not shown
        if (document.getElementById("start-menu").style.opacity == 0) {
            document.getElementById("home-button-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("home-button").onmouseout  = async function() { 
        document.getElementById("home-button-tooltip").style.opacity = "0";
    }
})

//----------------------------------------------------------------------------------------- Start Menu button click handle 
let startMenu;
async function startMenuButton() {
            
    startMenu = document.getElementById("start-menu");
    let delayer;

    if (startMenu.style.opacity == 0) {
        startMenu.style.opacity = "1";
        startMenu.style.pointerEvents = "auto";
        startMenu.style.bottom = "60px";
        // Hide tooltip on menu show
        document.getElementById("home-button-tooltip").style.opacity = "0";
    } else {
        startMenu.style.opacity = "0";
        startMenu.style.pointerEvents = "none";
        startMenu.style.bottom = "0px";
    }
}
$(document).ready(function() {
    startMenu = document.getElementById("start-menu");
    document.getElementById("home-button").addEventListener("click", function() {startMenuButton()})
})

//----------------------------------------------------------------------------------------- Power button handle
// See shutdownprompt.js 

