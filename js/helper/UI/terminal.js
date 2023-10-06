import { detectGPU } from "../gpu-detect.js";
import { isMobile } from "../mobileCheck.js";
import { getInternetSpeed } from "../speedtest.js";
import { delay } from "../delay.js";
import { enableDrag } from "../draggablewindow.js";

let delayer;

//----------------------------------------------------------------------------------------- Terminal icon click handler
let i = 0;
let terminalElement = document.getElementById("terminal-window").style;
var failSafeLoop = setInterval(function () {
  if (document.readyState == "complete" && !isMobile()) {

    document.getElementById("terminal").addEventListener('click', async function(){ 

      if (terminalElement.opacity == 0) {
        // Window cannot be dragged when transition is set, set temporarily for transition then unset. 
        terminalElement.transition = "0.3s";
        terminalElement.opacity = 1;

        // Unset transition so window can be dragged.
        delayer = await delay(400);
        terminalElement.transition = "0s";
        terminalElement.pointerEvents = "auto";
        
      }
      else {
        terminalElement.opacity = 0;
        terminalElement.pointerEvents = "none";
      }
    }, false);
  }
  document.getElementById("terminal-minimize").addEventListener('click', function(){ 
    terminalElement.transition = "0.3s";
    terminalElement.opacity = 0; 
    terminalElement.pointerEvents = "none";
  });
  document.getElementById("terminal-close").addEventListener('click', function(){ 
    terminalElement.transition = "0.3s";
    terminalElement.opacity = 0; 
    terminalElement.pointerEvents = "none";

    document.getElementById("terminal-line").innerHTML = `Press 'H' for a list of avaliable commands.\n`+commandEnd;
    $("#terminal-text").scrollTop(0);
  });

  if (++i === 5) {
    window.clearInterval(failSafeLoop);
  }
})

//----------------------------------------------------------------------------------------- Tooltip handler
let b = 0;
let iconOnHover = setInterval( function () {
    document.getElementById("terminal").onmouseover = async function() { 
        // Only show tooltip if Start menu is not shown
        if (true) {
            document.getElementById("terminal-tooltip").style.opacity = "1";
        }
    }
    document.getElementById("terminal").onmouseout  = async function() { 
        document.getElementById("terminal-tooltip").style.opacity = "0";
    }
    if (++b === 5) {
      clearInterval(iconOnHover);
  }
}, 1000);

//----------------------------------------------------------------------------------------- Terminal functions
let commandEnd = `[<color class="terminal-color">user</color>@<color class="terminal-color">jiayuanwen-site</color> ~]$\n\n`;

// For some easter egg function
var prevKey = null;

$(document).on("keypress", function (e) {
  console.log(e.which);

  //----------------------------------------------------------------------------------------- When user pressed 'H'
  if ((e.which == "104" || e.which == "72") && document.getElementById("terminal-window").style.opacity != 0) {
    document.getElementById("terminal-line").innerHTML += 
`
============ List of shortcuts ============ \n
'A' - About me
'E' - My experiences
'B' - My blogs
'F' - Fun facts about me
'C' - Clear terminal output

*Pages can be long, don't forget to scroll.

`
+commandEnd;

    $("#terminal-text").scrollTop($("#terminal-text")[0].scrollHeight);
  }


  // 'C' for Clear terminal
  if ((e.which == "99" || e.which == "67") && document.getElementById("terminal-window").style.opacity != 0) {
    document.getElementById("terminal-line").innerHTML = `Press 'H' for a list of avaliable shortcuts.\n`+commandEnd;

    $("#terminal-text").scrollTop(0);
  }

  // Some easter egg (technically not if you see this)
  if ((e.which == "115") && document.getElementById("terminal-window").style.opacity != 0) {
    prevKey = e.which;
  }
  if ((e.which == "117") && prevKey == "115" && document.getElementById("terminal-window").style.opacity != 0) {
    prevKey = e.which;
  }
  if ((e.which == "100") && prevKey == "117" && document.getElementById("terminal-window").style.opacity != 0) {
    prevKey = e.which;
  }
  if ((e.which == "111") && prevKey == "100" && document.getElementById("terminal-window").style.opacity != 0) {
    document.getElementById("terminal-line").innerHTML += "Uh.. I don't think this is a real terminal \n"+commandEnd+'\n\n';
    $("#terminal-text").scrollTop($("#terminal-text")[0].scrollHeight);
  }


})


//----------------------------------------------------------------------------------------- Make the terminal draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
enableDrag(document.getElementById("terminal-window"));


  //----------------------------------------------------------------------------------------- Detect user system & browser info
 let a = 0;
  var failSafeLoop2 = setInterval(function () {
    if (document.readyState == "complete" && !isMobile()) {

      // OS name & version
      document.getElementById("user-os").innerHTML = platform.os+' ';

      // Browser name & version
      document.getElementById("user-browser").innerHTML = platform.name+' '+platform.version;

      // Web engine name
      document.getElementById("user-engine").innerHTML = platform.layout;

      // Browser window size
      document.getElementById("user-winsize").innerHTML = window.innerWidth+'x'+window.innerHeight;
        // Change browser window size value when resized 
        window.addEventListener('resize', function(event) {
          document.getElementById("user-winsize").innerHTML = window.innerWidth+'x'+window.innerHeight;
        }, true);

      // Name of rendering hardware & software
      document.getElementById("user-gpu").innerHTML = detectGPU();

      // Mode of browser theme
      const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkTheme.matches) {
          document.getElementById("user-theme").innerHTML = "Dark mode";
        } else {
          document.getElementById("user-theme").innerHTML = "Light mode";
        }
      }

      // Current internet speed
      // See below and /js/helper/speedtest.js 

    if (++a === 5) {
      window.clearInterval(failSafeLoop2);
    }
}, 500);

// Current internet speed
setInterval(function(){getInternetSpeed("k")}, 1000) 

