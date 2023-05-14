let scrollingUp;
let scrollingDown;

const onMouseDownScrollUp = () => {
    scrollingUp = setInterval(
        function() {
            console.log("Scrolling");
            window.scrollBy(0,-2);
        }, 8.2
    )
}
const onMouseDownScrollDown = () => {
    scrollingDown = setInterval(
        function() {
            console.log("Scrolling");
            window.scrollBy(0,2);
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