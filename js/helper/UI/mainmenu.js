
// Other useful functions
import { delay } from "../delay.js"
import { isMobile } from "../mobileCheck.js";
import { getAverageRGB } from "../material-color-you.js";

//----------------------------------------------------------------------------------------- Menu layout base on type of system
if (isMobile()) { // For mobile
    let menuHTML = "/page_components/main_menu_mobile.html";
    $(`#main-menu-container`).load(menuHTML);
    
    document.getElementById("mainmenu-style").setAttribute("href", "style/components/mainmenu-mobile.css");
}
else { // For PC
    let menuHTML = "/page_components/main_menu.html";
    $(`#main-menu-container`).load(menuHTML);

    document.getElementById("mainmenu-style").setAttribute("href", "style/components/mainmenu.css");
}

//----------------------------------------------------------------------------------------- Clock
setInterval(function () {
    var clockElement = document.getElementById("time");
    if (document.readyState == "complete" && !isMobile()) {
        clockElement.innerHTML = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
}, 1000);
//----------------------------------------------------------------------------------------- Calender Date
function formatDate(date) {
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
  
    return `${month}, ${day}${suffix}`;
}

setInterval(function () {
    var yearElement = document.getElementById("year");
    var dateElement = document.getElementById("date");
    var clockBigElement = document.getElementById("time-big");

    if (document.readyState == "complete" && !isMobile()) {
        yearElement.innerHTML = new Date().toLocaleDateString([], { year: 'numeric' });
        dateElement.innerHTML = formatDate(new Date());
        clockBigElement.innerHTML = new Date().toLocaleTimeString([],{ hour12: false });
    }
}, 1000);
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
let i = 0;
var timeButtonFunction = setInterval(function () {
    if (document.readyState == "complete" && !isMobile()) {
        document.getElementById("time-container").addEventListener("click", function() {calenderClick()})
    }
    if (++i === 5) {
        window.clearInterval(timeButtonFunction);
    }
}, 500);

//----------------------------------------------------------------------------------------- Material You wallpaper color
/*
document.onreadystatechange = async function () {
    let delayer = await delay(1000);
    let menuElement = document.getElementById("main-menu-container");
    let rgb = getAverageRGB(document.getElementById("wallpaper"));
    let darken = 50;
    console.log("Background wallpaper average col:");
    console.log(rgb);

    menuElement.style.backgroundColor = 'rgba('+(rgb.r-darken)+','+(rgb.g-darken)+','+(rgb.b-darken)+','+211+')';
}
*/
//----------------------------------------------------------------------------------------- Menu fade in/out
export async function mainMenuFade(delay_, mode) {
    let menu_container = document.getElementById("main-menu-container");

    menu_container.style.display = "block";
    menu_container.style.opacity = 0;

    // Wait delay_ miliseconds before continuing
    let delayer = await delay(delay_);

    if (mode == "In") {
        // Fade in main menu
        menu_container.style.transition = "1s";
        menu_container.style.opacity = 1;

        let d = await delay(1000);
        menu_container.style.transition = "0s";

        // Enable clicking
        menu_container.style.pointerEvents = "auto";
    } 
    else {
        // Disable clicking
        menu_container.style.pointerEvents = "none";

        // Fade out main menu
        menu_container.style.transition = "1s";
        menu_container.style.opacity = 0;

        let d = await delay(1000);
        menu_container.style.transition = "0s";
    }
    
}

//----------------------------------------------------------------------------------------- Tooltip on hover (Time)
let a = 1;
let hoverLoop = setInterval( function () {
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
    if (++a === 5) {
        clearInterval(hoverLoop);
    }
}, 1000);

