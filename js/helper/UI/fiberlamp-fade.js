import { delay } from "../delay.js"

export async function fiberLampFade(delay_, mode) {
    var opacity = 0;
    document.getElementById("fiber-lamp").style.opacity = opacity;

    let delayer = await delay(delay_);

    if (mode == "In") {
        opacity = 0;
        while (opacity < 1) {
            opacity += 0.01;
            document.getElementById("fiber-lamp").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        
    }
    else {
        opacity = 1;
        while (opacity > 0) {
            opacity -= 0.01;
            document.getElementById("fiber-lamp").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
        document.getElementById("fiber-lamp").style.opacity = "none";
    }
}
    