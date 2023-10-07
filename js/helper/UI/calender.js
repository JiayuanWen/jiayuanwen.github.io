import { delay } from "../delay.js";

//----------------------------------------------------------------------------------------- Time tooltip
let ta = 0;
let timeOnHover = setInterval( function () {
    document.getElementById("time-container").onmouseover = async function() { 
        if (true) {
            document.getElementById("time-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("time-container").onmouseout  = async function() { 
        document.getElementById("time-tooltip").style.opacity = "0";
    }
    if (++ta === 5) {
        clearInterval(timeOnHover);
    }
}, 1000);

