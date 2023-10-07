import { delay } from "../delay.js";
import { isMobile } from "../mobileCheck.js";

//----------------------------------------------------------------------------------------- Start Menu button tooltip
let a = 0;
let homeOnHover = setInterval( function () {
    document.getElementById("home-button").onmouseover = async function() { 
        // Only show tooltip if Start menu is not shown
        if (document.getElementById("start-menu").style.opacity == 0) {
            document.getElementById("home-button-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("home-button").onmouseout  = async function() { 
        document.getElementById("home-button-tooltip").style.opacity = "0";
    }
    if (++a === 5) {
        clearInterval(homeOnHover);
    }
}, 1000);

//----------------------------------------------------------------------------------------- Start Menu button click handle 
async function startMenuButton() {
            
    let starMenu = document.getElementById("start-menu");
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
let st = 0;
var applyHomeButtonFunction = setInterval(function () {
    if (document.readyState == "complete" && !isMobile()) {
        document.getElementById("home-button").addEventListener("click", function() {startMenuButton()})
    }
    if (++st === 5) {
        window.clearInterval(applyHomeButtonFunction);
    }
}, 500);