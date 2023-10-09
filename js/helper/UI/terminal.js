import { detectGPU } from "../gpu-detect.js";
import { isMobile } from "../mobileCheck.js";
import { getInternetSpeed } from "../speedtest.js";
import { delay } from "../delay.js";
import { enableDrag } from "../draggablewindow.js";

let delayer;

//----------------------------------------------------------------------------------------- Terminal icon click handler
function terminalWindow() {
  let terminalElement = document.getElementById("terminal-window").style;

  console.log("Assign click to Terminal: OK");
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
      terminalElement.transition = "0.3s";
      terminalElement.opacity = 0;


      delayer = await delay(400);
      terminalElement.transition = "0s";
      terminalElement.pointerEvents = "none";
    }
  }, false);

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
}

$(document).ready(function() {
  terminalWindow();
})

//----------------------------------------------------------------------------------------- Tooltip handler
function terminalTooltip() {
  document.getElementById("terminal").onmouseover = async function() { 
    if (true) {
        document.getElementById("terminal-tooltip").style.opacity = "1";
    }
  }
  document.getElementById("terminal").onmouseout  = async function() { 
    document.getElementById("terminal-tooltip").style.opacity = "0";
  }
}

$(document).ready(function() {
  terminalTooltip();
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
`============ List of commands ============ \n
'A' - About me
'E' - My experiences
'F' - Fun facts about me
'S' - Site credits
'C' - Clear terminal output

*Pages can be long, don't forget to scroll.

`
+commandEnd;

    $("#terminal-text").scrollTop($("#terminal-text")[0].scrollHeight);
  }


  // 'C' for Clear terminal
  if ((e.which == "99" || e.which == "67") && document.getElementById("terminal-window").style.opacity != 0) {
    document.getElementById("terminal-line").innerHTML = `Press 'H' for a list of avaliable commands.\n`+commandEnd;

    $("#terminal-text").scrollTop(0);
  }

  // 'S' for Site credit
  if ((e.which == "115" || e.which == "83") && document.getElementById("terminal-window").style.opacity != 0) {
        document.getElementById("terminal-line").innerHTML += 
`============ Credits / Components Used ============ \n
* <a href="https://www.w3schools.com/howto/howto_html_include.asp">HTML loader v1.31</a> by <a href="https://www.w3schools.com/">W3Schools.com</a>
* <a href="https://github.com/bestiejs/platform.js/">Platform.js</a> by <a href="https://github.com/bestiejs">BestieJS Modules</a>
* <a href="https://gist.github.com/cvan/042b2448fcecefafbb6a91469484cdf8#file-webgl-detect-gpu-js">GPU detection</a> by <a href="https://github.com/cvan">Christopher Van</a>
* <a href="https://fontawesome.com/icons">Font Awesome icons</a> by <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://ionic.io/ionicons">ionicons</a> by <a href="https://ionic.io/">ionic</a>
* <a href="https://codepen.io/LeonGr/pen/eYoZJB">Background stars</a> by <a href="https://codepen.io/LeonGr">Leon</a>
* <a href="https://prismjs.com/index.html">Prism syntax highlighter</a> by <a href="https://prismjs.com/index.html#credits">The Prism Team</a>
* <a href="https://github.com/zerodevx/zero-md">zero-md</a> by <a href="https://github.com/zerodevx">Jason Lee</a>
* <a href="https://www.geeksforgeeks.org/how-to-detect-network-speed-using-javascript/#">Internet speed test</a> by <a href="https://auth.geeksforgeeks.org/user/romy421kumari">romy421kumari</a>
* <a href="">Email form</a> by <a href="https://usebasin.com/">Basin</a>

Built by me, hosted on <a id="site-source-link" rel="noopener noreferrer" target="about:blank" href="https://github.com/JiayuanWen/jiayuanwen.github.io">Github</a>.

`
+commandEnd;

    $("#terminal-text").scrollTop($("#terminal-text")[0].scrollHeight);
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
$(document).ready(function() {
  enableDrag(document.getElementById("terminal-window"));
})

//----------------------------------------------------------------------------------------- Detect user system & browser info
function terminalSysInfo() {
  // OS name & version
  document.getElementById("user-os").innerHTML = platform.os+' ';

  // Browser name & version
  document.getElementById("user-browser").innerHTML = platform.name+' '+platform.version;

  // Browser name & version
  document.getElementById("user-browser").innerHTML = platform.name+' '+platform.version;

  // Browser/System language
  document.getElementById("user-lang").innerHTML = navigator.language;

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

  // Current internet speed
  setInterval(function(){getInternetSpeed("k")}, 1000) 

}

$(document).ready(function() {
  terminalSysInfo();
})

