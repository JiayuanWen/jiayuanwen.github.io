import { delay } from "../delay.js"
import { isMobile } from "../mobileCheck.js";
import { enableDrag } from "../draggablewindow.js";

let delayer;

//----------------------------------------------------------------------------------------- Contact icon click handler
let a = 0;
let contactElement = document.getElementById("social-window").style;
var failSafeLoop1 = setInterval(function () {
  if (document.readyState == "complete" && !isMobile()) {

    document.getElementById("social").addEventListener('click', async function(){ 

      if (contactElement.opacity == 0) {
        // Window cannot be dragged when transition is set, set temporarily for transition then unset. 
        contactElement.transition = "0.3s";
        contactElement.opacity = 1;

        // Unset transition so window can be dragged.
        delayer = await delay(400);
        contactElement.transition = "0s";
        contactElement.pointerEvents = "auto"; 
        
      }
      else {
        contactElement.opacity = 0;
        contactElement.pointerEvents = "none"; 
      }
    }, false);
  }
  document.getElementById("social-minimize").addEventListener('click', function(){ 
    contactElement.transition = "0.3s";
    contactElement.opacity = 0;
    contactElement.pointerEvents = "none"; 
  });
  document.getElementById("social-close").addEventListener('click', function(){ 
    contactElement.transition = "0.3s";
    contactElement.opacity = 0; 
    contactElement.pointerEvents = "none"; 
    //$("#terminal-text").scrollTop(0);
  });

  if (++a === 5) {
    window.clearInterval(failSafeLoop1);
  }
})

//----------------------------------------------------------------------------------------- Tooltip handler
let ci = 0;
let iconOnHover = setInterval( function () {
    document.getElementById("social").onmouseover = async function() { 
        // Only show tooltip if Start menu is not shown
        if (true) {
            document.getElementById("social-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("social").onmouseout  = async function() { 
        document.getElementById("social-tooltip").style.opacity = "0";
    }
    if (++ci === 5) {
      clearInterval(iconOnHover);
  }
}, 1000);

//----------------------------------------------------------------------------------------- Make the terminal draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
enableDrag(document.getElementById("social-window"));

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

//----------------------------------------------------------------------------------------- My Social click handle 
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


