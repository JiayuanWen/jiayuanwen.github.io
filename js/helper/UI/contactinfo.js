import { delay } from "../delay.js"
import { isMobile } from "../mobileCheck.js";
import { enableDrag } from "../draggablewindow.js";

let delayer;

//----------------------------------------------------------------------------------------- Contact icon click handler
let a = 0;
let contactElement;

$(document).ready(function() {
  contactElement = document.getElementById("social-window").style;
  console.log("Assign click to Contact: OK");
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
        contactElement.pointerEvents = "none"; 
        contactElement.transition = "0.3s";
        contactElement.opacity = 0;
      }
    }, false);

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
});

//----------------------------------------------------------------------------------------- Tooltip handler
$(document).ready(function() {
  document.getElementById("social").onmouseover = async function() { 
      // Only show tooltip if Start menu is not shown
      if (true) {
          document.getElementById("social-tooltip").style.opacity = "1";
      }
  }
  document.getElementById("social").onmouseout  = async function() { 
      document.getElementById("social-tooltip").style.opacity = "0";
  }
});

//----------------------------------------------------------------------------------------- Make the terminal draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
$(document).ready(function() {
  enableDrag(document.getElementById("social-window"));
})

//----------------------------------------------------------------------------------------- Menu layout base on type of system
if (isMobile()) { // For mobile
    let menuHTML = "/page_components/contact_info_mobile.html";
    $(`#contact-info-container`).load(menuHTML);
    
    document.getElementById("contactinfo-style").setAttribute("href", "style/components/contactinfo-mobile.css");
}
else { // For PC
    //let menuHTML = "/page_components/contact_info.html";
    //$(`#contact-info-container`).load(menuHTML);

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

//----------------------------------------------------------------------------------------- hCAPTCHA
window.onSubmit = function(token) { document.getElementById("inquiry-form").submit(); }; 


