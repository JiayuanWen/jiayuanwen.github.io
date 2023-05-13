import { delay } from "../delay.js"

export async function mainMenuFade(delay_, mode) {
    var opacity = 0;
    document.getElementById("main-menu-container").style.opacity = opacity;

    // Wait delay_ miliseconds before continuing
    let delayer = await delay(delay_);

    if (mode == "In") {
        // Fade in main menu
        opacity = 0;
        document.getElementById("main-menu-container").style.display = "block";
        while (opacity < 1) {
            opacity += 0.01;
            document.getElementById("main-menu-container").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        // Enable clicking
        document.getElementById("main-menu-container").style.pointerEvents = "auto";
    } 
    else {
        // Disable clicking
        document.getElementById("main-menu-container").style.pointerEvents = "none";

        // Fade out main menu
        opacity = 1;
        while (opacity > 0) {
            opacity -= 0.01;
            document.getElementById("main-menu-container").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        document.getElementById("main-menu-container").style.display = "none";
    }
    
}