import { delay } from "../delay.js"

export async function selfIntroFade(delay_, mode) {
    document.getElementById("site-intro").style.display = "block";
    document.getElementById("site-intro").style.opacity = 0;

    // Wait delay_ miliseconds before continuing
    let delayer = await delay(delay_);

    // Different font size for firefox
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        document.getElementById("site-intro").style.fontSize = "calc((4.1vh + 4.1vw)/2)";
    }

    // Fade in effect
    if (mode == "In") {
        document.getElementById("site-intro").style.opacity = 0;

        let d = await delay(10.5);
        document.getElementById("site-intro").style.transition = "1s";
        document.getElementById("site-intro").style.opacity = 1;

        d = await delay(1000);
        document.getElementById("site-intro").style.transition = "0s";
    }
    // Fade out effect
    else {
        document.getElementById("site-intro").style.opacity = 1;

        let d = await delay(10.5);
        document.getElementById("site-intro").style.transition = "1s";
        document.getElementById("site-intro").style.opacity = 0;

        d = await delay(1000);
        document.getElementById("site-intro").style.transition = "0s";
    }
}
    