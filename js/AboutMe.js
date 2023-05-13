// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";

// Other helper functions
import { delay } from "./helper/delay.js";

//---------------------------------------------------------------------------------------- About Me click handle
document.getElementById("about-me").addEventListener("click", async function() {
    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    // Move lamp to side
    document.getElementById("fiber-lamp").style.transition = "2s";
    document.getElementById("fiber-lamp").style.paddingRight = "90vw";
    
    // Show about me page
    document.getElementById("aboutme").style.transition = "2s";
    document.getElementById("aboutme").style.opacity= "1";

    // Make page interactable
    document.getElementById("aboutme").style.pointerEvents = "auto";
})