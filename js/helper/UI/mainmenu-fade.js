import { delay } from "../delay.js"

export async function mainMenuFade(delay_, mode) {
    document.getElementById("main-menu-container").style.display = "block";
    document.getElementById("main-menu-container").style.opacity = 0;

    // Wait delay_ miliseconds before continuing
    let delayer = await delay(delay_);

    if (mode == "In") {
        // Fade in main menu
        document.getElementById("main-menu-container").style.transition = "1s";
        document.getElementById("main-menu-container").style.opacity = 1;

        let d = await delay(1000);
        document.getElementById("main-menu-container").style.transition = "0s";

        // Enable clicking
        document.getElementById("main-menu-container").style.pointerEvents = "auto";
    } 
    else {
        // Disable clicking
        document.getElementById("main-menu-container").style.pointerEvents = "none";

        // Fade out main menu
        document.getElementById("main-menu-container").style.transition = "1s";
        document.getElementById("main-menu-container").style.opacity = 0;

        let d = await delay(1000);
        document.getElementById("main-menu-container").style.transition = "0s";
    }
    
}