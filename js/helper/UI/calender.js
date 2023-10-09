import { delay } from "../delay.js";
import { isMobile } from "../mobileCheck.js";

//----------------------------------------------------------------------------------------- Calender button (bottom right) click handle 
async function calenderClick() {
            
    let calenderMenu = document.getElementById("calender-container");
    let delayer;

    if (calenderMenu.style.opacity == 0) {
        calenderMenu.style.opacity = "1";
        calenderMenu.style.bottom = "60px";
        // Hide tooltip on menu show
        document.getElementById("time-tooltip").style.opacity = "0";
    } else {
        calenderMenu.style.opacity = "0";
        calenderMenu.style.bottom = "0px";
    }
}
let timeContainer;
$(document).ready(function() {

    while (!timeContainer) {
        timeContainer = document.getElementById("time-container");
    }

    timeContainer.addEventListener("click", function() {calenderClick()})
    console.log("Assign click to Calender: OK");

});

//----------------------------------------------------------------------------------------- Time tooltip
$(document).ready(function() {
    document.getElementById("time-container").onmouseover = async function() { 
        if (true) {
            document.getElementById("time-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("time-container").onmouseout  = async function() { 
        document.getElementById("time-tooltip").style.opacity = "0";
    }
});