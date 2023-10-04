import { detectGPU } from "../gpu-detect.js";
import { isMobile } from "../mobileCheck.js";
import { getInternetSpeed } from "../speedtest.js";
import { delay } from "../delay.js"; let delayer;

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

        
      }
      else {
        terminalElement.opacity = 0;
      }
    }, false);
  }
  document.getElementById("terminal-minimize").addEventListener('click', function(){ 
    terminalElement.transition = "0.3s";
    terminalElement.opacity = 0; 
  });
  document.getElementById("terminal-close").addEventListener('click', function(){ 
    terminalElement.transition = "0.3s";
    terminalElement.opacity = 0; 

    document.getElementById("terminal-line").innerHTML = " \nPress 'H' for a list of avaliable shortcuts.\n"+commandEnd;
    $("#terminal-text").scrollTop(0);
  });

  if (++i === 5) {
    window.clearInterval(failSafeLoop);
  }
})

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
'P' - My projects
'B' - My blogs
'F' - Fun facts about me
'T' - List of features on this website
'C' - Clear terminal output

*Pages can be long, don't forget to scroll.

`
+commandEnd;

    $("#terminal-text").scrollTop($("#terminal-text")[0].scrollHeight);
  }

  // 'T' for site feature
  if ((e.which == "116" || e.which == "84") && document.getElementById("terminal-window").style.opacity != 0) {
    document.getElementById("terminal-line").innerHTML += 
`\n
============ Site Features ============ \n
* You can put the site on fullscreen mode by clicking on the up right corner.

`
+commandEnd;

    $("#terminal-text").scrollTop($("#terminal-text")[0].scrollHeight);
  }

  // 'C' for Clear terminal
  if ((e.which == "99" || e.which == "67") && document.getElementById("terminal-window").style.opacity != 0) {
    document.getElementById("terminal-line").innerHTML = " \nPress 'H' for a list of avaliable shortcuts.\n"+commandEnd;

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


//----------------------------------------------------------------------------------------- Make the DIV element draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
dragElement(document.getElementById("terminal-window"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // If present, the header is where you move the DIV from
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // Otherwise, move the DIV from anywhere inside the DIV
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

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

