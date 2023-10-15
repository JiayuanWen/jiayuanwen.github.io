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
let starMenu;
async function startMenuButton() {
            
    starMenu = document.getElementById("start-menu");
    let delayer;

    if (starMenu.style.opacity == 0) {
        starMenu.style.opacity = "1";
        starMenu.style.pointerEvents = "auto";
        starMenu.style.bottom = "60px";
        // Hide tooltip on menu show
        document.getElementById("home-button-tooltip").style.opacity = "0";
    } else {
        starMenu.style.opacity = "0";
        starMenu.style.pointerEvents = "none";
        starMenu.style.bottom = "0px";
    }
}
$(document).ready(function() {
    starMenu = document.getElementById("start-menu");
    document.getElementById("home-button").addEventListener("click", function() {startMenuButton()})
})