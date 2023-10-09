import { delay } from "../delay.js"
import { isMobile } from "../mobileCheck.js";
import { enableDrag } from "../draggablewindow.js";

let delayer;

//----------------------------------------------------------------------------------------- Contact icon click handler
let a = 0;
let contactElement;
let contactShortcut;
$(document).ready(function() {
  for (var i = 0; i < 1000; i++) {
    if (!contactShortcut) {
      contactShortcut = document.getElementById("social");
    }
    if (!contactElement) {
      contactElement = document.getElementById("social-window").style;
    }

    if (contactShortcut && contactElement) {
      break;
    }
  }
  
  contactShortcut.addEventListener('click', async function(){ 
    
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
  }, false); console.log("Assign click to Contact: OK");

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
let contactTooltip;
$(document).ready(function() {
  contactShortcut.onmouseover = async function() { 
      contactTooltip = document.getElementById("social-tooltip");
      contactTooltip.style.opacity = "1";
  }
  contactShortcut.onmouseout  = async function() { 
    contactTooltip = document.getElementById("social-tooltip");
    contactTooltip.style.opacity = "0";
  }
});

//----------------------------------------------------------------------------------------- Special discalimer for Firefox users
$(document).ready(function() {
  if (platform.name == "Firefox") {
    let inquiryDisclaimer;
    for (var i=0; i < 1000; i++) {
      if (!inquiryDisclaimer ) {
        inquiryDisclaimer = document.getElementById("inquiry-discalimer-firefox");
      } else {
        break;
      }
    }

    inquiryDisclaimer.innerHTML = "*Firefox users: Submission require hCaptcha verification, which may not work on Firfox. Please submit your inquiries through the email provided.";
  }
})

//----------------------------------------------------------------------------------------- Make the terminal draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
let contactWindow;
$(document).ready(function() {
  for (var i = 0; i < 1000; i++) {
    if (!contactWindow) {
      contactWindow = document.getElementById("social-window");
    } else {
      break;
    }
  }

  enableDrag(contactWindow);
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


