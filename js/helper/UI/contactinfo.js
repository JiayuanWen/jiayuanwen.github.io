import { delay } from "../delay.js"
import { isMobile } from "../mobileCheck.js";

//----------------------------------------------------------------------------------------- Menu layout base on type of system
if (isMobile()) { // For mobile
    let menuHTML = "/page_components/contact_info_mobile.html";
    $(`#contact-info-container`).load(menuHTML);
    
    document.getElementById("contactinfo-style").setAttribute("href", "style/components/contactinfo-mobile.css");
}
else { // For PC
    let menuHTML = "/page_components/contact_info.html";
    $(`#contact-info-container`).load(menuHTML);

    document.getElementById("contactinfo-style").setAttribute("href", "style/components/contactinfo.css");
}

//----------------------------------------------------------------------------------------- Contact info fade effect
export async function contactInfoFade(delay_, mode) {
    var opacity = 0;
    document.getElementById("contact-info").style.opacity = opacity;
    if (isMobile()) {
        document.getElementById("site-credit").style.opacity = opacity;
    }

    let delayer = await delay(delay_);

    if (mode == "In") {
        opacity = 0;
        while (opacity < 1) {
            opacity += 0.01;
            document.getElementById("contact-info").style.opacity = opacity;
            if (isMobile()) {
                document.getElementById("site-credit").style.opacity = opacity;
            }

            let delayer = await delay (5.8);
        }
    }
    else {
        opacity = 1;
        while (opacity > 0) {
            opacity -= 0.01;
            document.getElementById("contact-info").style.opacity = opacity;
            if (isMobile()) {
                document.getElementById("site-credit").style.opacity = opacity;
            }
            let delayer = await delay (5.8);
        }
        document.getElementById("contact-info").style.display = "none";
    }
    
}

//----------------------------------------------------------------------------------------- Start button (bottom left) click handle 
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
let i = 0;
var applyHomeButtonFunction = setInterval(function () {
    if (document.readyState == "complete" && !isMobile()) {
        document.getElementById("home-button").addEventListener("click", function() {startMenuButton()})
    }
    if (++i === 5) {
        window.clearInterval(applyHomeButtonFunction);
    }
}, 500);

//----------------------------------------------------------------------------------------- Tooltip on hover
i = 1;
let hoverLoop = setInterval( function () {
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
        clearInterval(hoverLoop);
    }
}, 1000);
