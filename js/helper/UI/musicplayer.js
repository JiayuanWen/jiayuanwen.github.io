import { delay } from "../delay.js";

let delayer;

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(1200);

let progress = document.getElementById("player-progress");
let song = document.getElementById("player");
let play = document.getElementById("play");
let info = document.getElementById("song-info");

// Player show/hide
let playerShortcut = document.getElementById("volume");
let playerWindow = document.getElementById("player-window");

playerShortcut.addEventListener('click', async function(){ 
    if (playerWindow.style.opacity == 0) {
        playerWindow.style.opacity = 1;
        playerWindow.style.bottom = "60px";
        playerWindow.style.pointerEvents = "auto";
    }
    else {
        playerWindow.style.opacity = 0;
        playerWindow.style.bottom = "0px";
        playerWindow.style.pointerEvents = "none";
    }
})




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

    // Set Play/Pause button icon to pause if song is paused.
    if (play.getAttribute('name') === 'play') {
        play.setAttribute('name','pause');
    }

    // Show info if song is paused
    /*
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
    */
}

// Play/Pause button, also show/hide song info
play.addEventListener("click", async function() {
    var infoOpacity;
    // If song is playing
    if (play.getAttribute('name') === 'pause') {
        song.pause();
        play.setAttribute('name','play');
        /*
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
        */
    }
    // If song is not playing
    else if (play.getAttribute('name') === 'play') {
        song.play();
        play.setAttribute('name','pause'); 
        /*
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
        */
    }
})

// Pause music on start
document.getElementById('player').pause();
document.getElementById('player').volume = 0.15;