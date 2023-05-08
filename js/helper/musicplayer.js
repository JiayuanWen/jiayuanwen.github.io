let progress = document.getElementById("player-progress");
let song = document.getElementById("player");

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

// 
progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
}