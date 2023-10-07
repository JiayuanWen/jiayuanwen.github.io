import { delay } from "../delay.js";
import { isMobile } from "../mobileCheck.js";

//----------------------------------------------------------------------------------------- Start Menu button tooltip
jQuery(window).on("load", function () {
    document.getElementById("home-button").onmouseover = async function() { 
        // Only show tooltip if Start menu is not shown
        if (document.getElementById("start-menu").style.opacity == 0) {
            document.getElementById("home-button-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("home-button").onmouseout  = async function() { 
        document.getElementById("home-button-tooltip").style.opacity = "0";
    }
});

//----------------------------------------------------------------------------------------- Start Menu button click handle 
let starMenu = document.getElementById("start-menu");
async function startMenuButton() {
            
    starMenu = document.getElementById("start-menu");
    let delayer;

    if (starMenu.style.opacity == 0) {
        starMenu.style.opacity = "1";
        starMenu.style.bottom = "60px";
        // Hide tooltip on menu show
        document.getElementById("home-button-tooltip").style.opacity = "0";
    } else {
        starMenu.style.opacity = "0";
        starMenu.style.bottom = "0px";
    }
}
jQuery(window).on("load", function () {
    starMenu = document.getElementById("start-menu");
    console.log("Assign click to Start Menu: OK");
    document.getElementById("home-button").addEventListener("click", function() {startMenuButton()})
});