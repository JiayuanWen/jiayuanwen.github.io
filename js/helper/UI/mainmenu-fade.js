import { delay } from "../delay.js"

export async function mainMenuFade(delay_, mode) {
    var opacity = 0;
    document.getElementById("main-menu-container").style.opacity = opacity;

    let delayer = await delay(delay_);

    if (mode == "In") {
        opacity = 0;
        while (opacity < 1) {
            opacity += 0.01;
            document.getElementById("main-menu-container").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
    } 
    else {
        document.getElementById("main-menu-container").style.pointerEvents = "none";
        opacity = 1;
        while (opacity > 0) {
            opacity -= 0.01;
            document.getElementById("main-menu-container").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        document.getElementById("main-menu-container").style.display = "none";
    }
    
}