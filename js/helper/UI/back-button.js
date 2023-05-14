// Advanced UI elements
import { selfIntroFade } from "./selfintro-fade.js";
import { mainMenuFade } from "./mainmenu-fade.js";
import { toggleAboutMe } from "../../AboutMe.js";

// Other helper functions
import { delay } from "../delay.js";


//---------------------------------------------------------------------------------------- Elements old properties for back button
var lamp_pos_old = document.getElementById("fiber-lamp").style.paddingRight; //Save old position

//---------------------------------------------------------------------------------------- Back button click handle
document.getElementById("back-button").addEventListener("click", async function() {

    // Don't need back button anymore, disable it
    document.getElementById("back-button").style.pointerEvents = "none";
    document.getElementById("back-button").style.display = "none";

    // Hide about me page
    toggleAboutMe("Out");

    // Move lamp back
    document.getElementById("fiber-lamp").style.transition = "2s";
    document.getElementById("fiber-lamp").style.paddingRight = lamp_pos_old;
    document.getElementById("fiber-lamp").style.opacity = "1";

    // Show main page
    selfIntroFade(10,"In");
    mainMenuFade(10,"In");

    // Restore transition speed of some elements
    let delayer = await delay(2100);
    document.getElementById("fiber-lamp").style.transition = "0s";
})

