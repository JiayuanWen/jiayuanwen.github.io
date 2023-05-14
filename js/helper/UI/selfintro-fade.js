import { delay } from "../delay.js"

export async function selfIntroFade(delay_, mode) {
    var opacity = 0;
    document.getElementById("site-intro").style.opacity = opacity;

    // Wait delay_ miliseconds before continuing
    let delayer = await delay(delay_);

    // Different font size for firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        document.getElementById("site-intro").style.fontSize = "calc((4.1vh + 4.1vw)/2)";
    }
    

    // Fade in effect
    if (mode == "In") {
        opacity = 0;
        document.getElementById("site-intro").style.display = "block";
        while (opacity < 1) {
            opacity += 0.01;
            document.getElementById("site-intro").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        
    }
    // Fade out effect
    else {
        opacity = 1;
        while (opacity > 0) {
            opacity -= 0.01;
            document.getElementById("site-intro").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        document.getElementById("site-intro").style.display = "none";
    }
}
    