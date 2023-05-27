import { isMobile } from "../mobileCheck.js";
import { isTouchScreen } from "../touchScreenCheck.js";

let scrollingUp;
let scrollingDown;

let speed = 3.1;

const onMouseDownScrollUp = () => {
    scrollingUp = setInterval(
        function() {
            console.log("Scrolling");
            window.scrollBy(0,-speed);
        }, 8.2
    )
}
const onMouseDownScrollDown = () => {
    scrollingDown = setInterval(
        function() {
            console.log("Scrolling");
            window.scrollBy(0,speed);
        }, 8.2
    )
}

const scrollingStop = function() {
    clearInterval(scrollingUp);
    clearInterval(scrollingDown);
}
document.getElementById("scroll-up").addEventListener("mousedown", onMouseDownScrollUp);
document.getElementById("scroll-up").addEventListener("touchstart", onMouseDownScrollUp);

document.getElementById("scroll-down").addEventListener("mousedown", onMouseDownScrollDown);
document.getElementById("scroll-down").addEventListener("touchstart", onMouseDownScrollDown);

document.getElementById("scroll-up").addEventListener("mouseup", scrollingStop);
document.getElementById("scroll-down").addEventListener("mouseup", scrollingStop);

// Scrolling is buggy on touch screen, disable them
if (isTouchScreen() || isMobile()) {
    document.getElementById("scroll-indicator").style.pointerEvents = "none";
}