import { delay } from "../delay.js";

//----------------------------------------------------------------------------------------- Home button tooltip
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