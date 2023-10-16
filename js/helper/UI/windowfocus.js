

export function focusWindow(this_window) {
    let windows = document.querySelectorAll(".window");

    for (var i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = "1";
    } 

    this_window.style.zIndex = "50";
}