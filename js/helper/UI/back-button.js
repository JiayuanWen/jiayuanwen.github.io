// Advanced UI elements
import { selfIntroFade } from "./selfintro-fade.js";
import { mainMenuFade } from "./mainmenu-fade.js";

// Other helper functions
import { delay } from "../delay.js";

//---------------------------------------------------------------------------------------- Back button click handle
document.getElementById("back-button").addEventListener("click", async function() {

    // Don't need back button anymore, disable it
    document.getElementById("back-button").style.pointerEvents = "none";
    document.getElementById("back-button").style.display = "none";

    // Move lamp back
    document.getElementById("fiber-lamp").style.position = "static";
    document.getElementById("fiber-lamp").style.transition = "2s";
    document.getElementById("fiber-lamp").style.paddingRight = "50vw";
    document.getElementById("fiber-lamp").style.opacity = "1";

    // Show main page
    selfIntroFade(10,"In");
    mainMenuFade(500,"In");

    // Restore transition speed of some elements
    let delayer = await delay(2100);
    document.getElementById("fiber-lamp").style.transition = "0s";
})

