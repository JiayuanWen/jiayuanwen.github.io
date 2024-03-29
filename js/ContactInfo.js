import { delay } from "./helper/delay.js"
import { isMobile } from "./helper/mobileCheck.js";
import { enableDrag } from "./helper/draggablewindow.js";
import { focusWindow } from "./helper/UI/windowfocus.js";

let delayer;

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(700);

//----------------------------------------------------------------------------------------- Contact icon click handler
let a = 0;
let contactElement;
let contactShortcut;
$(document).ready(async function() {
  for (var i = 0; i < 1000; i++) {
    

    if (!contactShortcut) {
      contactShortcut = document.getElementById("social");
    }
    if (!contactElement) {
      contactElement = document.getElementById("social-window");
    }

    if (contactShortcut && contactElement) {
      break;
    }

    
  }

  document.querySelectorAll('.social').forEach(function(shortcut_) {
    shortcut_.addEventListener('click', async function(){ 
    
      if (contactElement.style.opacity == 0) {
        // Hide Start Menu
        let startMenu = document.getElementById("start-menu");
        startMenu.style.opacity = "0";
        startMenu.style.bottom = "0px";
        startMenu.style.pointerEvents = "none";

        // Add glow below shortcut icon
        contactShortcut.getElementsByClassName("app-opened")[0].style.opacity = "1";
  
        // Make window the main focus on open
        focusWindow(contactElement);
  
        // Hightlight shorcut
        contactShortcut.style.color = "var(--firefly)";
  
        // Window cannot be dragged when transition is set, set temporarily for transition then unset. 
        contactElement.style.transition = "0.3s";
        contactElement.style.opacity = 1;
  
        // Unset transition so window can be dragged.
        delayer = await delay(400);
        contactElement.style.transition = "0s";
        contactElement.style.pointerEvents = "auto"; 
        
      }
      else {
        //contactShortcut.style.color = "#ffffff";
  
        //contactElement.style.pointerEvents = "none"; 
        //contactElement.style.transition = "0.3s";
        //contactElement.style.opacity = 0;
        let startMenu = document.getElementById("start-menu");
        startMenu.style.opacity = "0";
        startMenu.style.bottom = "0px";
        startMenu.style.pointerEvents = "none";

        focusWindow(contactElement);
      }
    }, false);
  });

  document.getElementById("social-minimize").addEventListener('click', function(){ 
    contactShortcut.style.color = "#ffffff";
    contactElement.style.transition = "0.3s";
    contactElement.style.opacity = 0;
    contactElement.style.pointerEvents = "none"; 
  });
  document.getElementById("social-close").addEventListener('click', function(){ 
    contactShortcut.style.color = "#ffffff";
    contactElement.style.transition = "0.3s";
    contactElement.style.opacity = 0; 
    contactElement.style.pointerEvents = "none"; 

    // Remove glow below shortcut icon
    contactShortcut.getElementsByClassName("app-opened")[0].style.opacity = "0";
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
    
    document.getElementById("contactinfo-style").setAttribute("href", "style/contactinfo-mobile.css");
}
else { // For PC
    //let menuHTML = "/page_components/contact_info.html";
    //$(`#contact-info-container`).load(menuHTML);

    document.getElementById("contactinfo-style").setAttribute("href", "style/contactinfo.css");
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


