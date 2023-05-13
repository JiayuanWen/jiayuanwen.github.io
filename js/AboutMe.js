// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";

//---------------------------------------------------------------------------------------- About Me click handle
document.getElementById("about-me").addEventListener("click", function() {

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    document.getElementById("fiber-lamp").style.transition = "2s";
    document.getElementById("fiber-lamp").style.paddingRight = "90vw"; 
})