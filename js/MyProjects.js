// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";

// Other helpful functions
import { delay } from "./helper/delay.js";

//---------------------------------------------------------------------------------------- About Me click handle
document.getElementById("my-projects").addEventListener("click", function() {

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    document.getElementById("fiber-lamp").style.transition = "2s";
    document.getElementById("fiber-lamp").style.paddingRight = "0vw"; 
})