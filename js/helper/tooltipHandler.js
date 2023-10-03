import { isMobile } from "./mobileCheck.js";
import { delay } from "./delay.js";

let i = 0;

if (!isMobile()) {
//----------------------------------------------------------------------------------------- Time tooltip
i = 0;
let timeOnHover = setInterval( function () {
    document.getElementById("time-container").onmouseover = async function() { 
        let delayer = await delay(500);
        // Only show tooltip if Start menu is not shown
        if (true) {
            document.getElementById("time-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("time-container").onmouseout  = async function() { 
        let delayer = await delay(500);
        document.getElementById("time-tooltip").style.opacity = "0";
    }
    if (++i === 5) {
        clearInterval(timeOnHover);
    }
}, 1000);
//----------------------------------------------------------------------------------------- Home button tooltip
i = 0;
let homeOnHover = setInterval( function () {
    document.getElementById("home-button").onmouseover = async function() { 
        let delayer = await delay(500);
        // Only show tooltip if Start menu is not shown
        if (document.getElementById("start-menu").style.opacity == 0) {
            document.getElementById("home-button-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("home-button").onmouseout  = async function() { 
        let delayer = await delay(500);
        document.getElementById("home-button-tooltip").style.opacity = "0";
    }
    if (++i === 5) {
        clearInterval(homeOnHover);
    }
}, 1000);
//----------------------------------------------------------------------------------------- Home button tooltip
i = 0;
let terminalOnHover = setInterval( function () {
    document.getElementById("terminal").onmouseover = async function() { 
        let delayer = await delay(500);
        // Only show tooltip if Start menu is not shown
        if (true) {
            document.getElementById("terminal-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("terminal").onmouseout  = async function() { 
        let delayer = await delay(500);
        document.getElementById("terminal-tooltip").style.opacity = "0";
    }
    if (++i === 5) {
        clearInterval(terminalOnHover);
    }
}, 1000);

}