import { delay } from "../delay.js"

export async function contactInfoFade(delay_, bool_) {
    var opacity = 0;
    document.getElementById("contact-info").style.opacity = opacity;

    let delayer = await delay(delay_);

    if (bool_ == "In") {
        opacity = 0;
        while (opacity < 1) {
            opacity += 0.01;
            document.getElementById("contact-info").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
    }
    else {
        opacity = 1;
        while (opacity > 0) {
            opacity -= 0.01;
            document.getElementById("contact-info").style.opacity = opacity;
    
            let delayer = await delay (5.8);
        }
    }
    
}