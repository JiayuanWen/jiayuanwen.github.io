import { delay } from "../delay.js"

export async function mainMenuFadeIn(delay_) {
    var opacity = 0;
    document.getElementById("main-menu-container").style.opacity = opacity;

    let delayer = await delay(delay_);

    while (opacity < 1) {
        opacity += 0.01;
        document.getElementById("main-menu-container").style.opacity = opacity;

        let delayer = await delay (5.8);
    }
}