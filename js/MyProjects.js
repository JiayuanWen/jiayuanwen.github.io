// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";

// Other helpful functions
import { delay } from "./helper/delay.js";

//---------------------------------------------------------------------------------------- About Me click handle
document.getElementById("my-projects").addEventListener("click", async function() {

    // Enable back button to allow visitors to go back
    document.getElementById("back-button").style.pointerEvents = "auto";
    document.getElementById("back-button").style.display = "block";

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    // Move lamp to center
    document.getElementById("fiber-lamp").style.transition = "1.9s";
    document.getElementById("fiber-lamp").style.paddingRight = "0vw"; 

    // Show project container
    let delayer = await delay(100);
    document.getElementById("myproject").style.visibility = "visible";

    document.getElementById("project-container").style.height = "87vh";
    document.getElementById("project-container").style.width = "95vw";
    document.getElementById("project-container").style.top = "5vh";

    document.getElementById("project-border").style.height = "87vh";
    document.getElementById("project-border").style.width = "95vw";
    document.getElementById("project-border").style.top = "5vh";
})

//---------------------------------------------------------------------------------------- Back button function
document.getElementById("back-button").addEventListener("click", async function() {
    // Hide project container
    document.getElementById("project-container").style.height = "0.1vh";
    document.getElementById("project-container").style.width = "0.1vw";
    document.getElementById("project-container").style.top = "50vh"; 

    document.getElementById("project-border").style.height = "0.1vh";
    document.getElementById("project-border").style.width = "0.1vw";
    document.getElementById("project-border").style.top = "50vh";

    
    document.getElementById("myproject").style.visibility = "hidden";
})