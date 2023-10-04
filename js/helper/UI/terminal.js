import { detectGPU } from "../gpu-detect.js";
import { isMobile } from "../mobileCheck.js";
import { getInternetSpeed } from "../speedtest.js";

let i;

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
  i = 0;
  var failSafeLoop = setInterval(function () {
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

    if (++i === 5) {
      window.clearInterval(failSafeLoop);
    }
}, 500);

// Current internet speed
setInterval(function(){getInternetSpeed("k")}, 1000) 

