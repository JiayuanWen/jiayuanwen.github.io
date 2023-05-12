import { delay } from "../delay.js";

let progress = document.getElementById("player-progress");
let song = document.getElementById("player");
let play = document.getElementById("play");
let info = document.getElementById("song-info");

// Set progress bar max value to same as song duration
progress.max = song.duration;
progress.value = song.currentTime;
song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

// Place slider position to match song 
if (song.play()) {
    setInterval(()=>{
        progress.value = song.currentTime;
    }, 500)
}

// Allows jumping to different time
progress.onchange = async function() {
    var infoOpacity;
    song.play();
    song.currentTime = progress.value;

    // Show info if song is paused
    infoOpacity = 0;
    if (!info.style.opacity) {
        info.style.opacity = 0;
    }
    else {
        info.style.opacity = 0;
    }
    //while (info.style.opacity > 0) {
    while (infoOpacity < 1) {
        infoOpacity += 0.02;
        //info.style.opacity -= 0.02 //This doesn't work, objects via getElementByID doesn't like math
        info.style.opacity = infoOpacity;
        let delayer = await delay(12.5);
        //console.log(infoOpacity);
    }
    
    // Set Play/Pause button icon to pause if song is paused.
    if (play.classList.contains("fa-play")) {
        play.classList.remove("fa-play");
        play.classList.add("fa-pause");
    }
}

// Play/Pause button, also show/hide song info
play.addEventListener("click", async function() {
    var infoOpacity;
    // If song is playing
    if (play.classList.contains("fa-pause")) {
        song.pause();
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");

        infoOpacity = 1;
        if (!info.style.opacity) {
            info.style.opacity = 0;
        }
        //while (info.style.opacity > 0) {
        while (infoOpacity > 0) {
            infoOpacity -= 0.02
            //info.style.opacity -= 0.02 //This doesn't work, objects via getElementByID doesn't like math
            info.style.opacity = infoOpacity
            let delayer = await delay(12);
            //console.log(infoOpacity);
        }
    }
    // If song is not playing
    else if (play.classList.contains("fa-play")) {
        song.play();
        play.classList.add("fa-pause");
        play.classList.remove("fa-play"); 

        infoOpacity = 0;
        if (!info.style.opacity) {
            info.style.opacity = 0;
        }
        //while (info.style.opacity < 1) {
        while (infoOpacity < 1) {
            infoOpacity += 0.02
            //info.style.opacity += 0.02 //This doesn't work, objects via getElementByID doesn't like math
            info.style.opacity = infoOpacity
            let delayer = await delay(12);
            //console.log(infoOpacity);
        }
    }
})