
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
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var clockElement = document.getElementById("time");
        function updateClock ( clock ) {
            clock.innerHTML = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        setInterval(function () {
            updateClock( clockElement );
        }, 1000);
    }
}

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



