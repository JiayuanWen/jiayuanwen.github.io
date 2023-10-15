// Advanced UI elements
import { enableDrag } from "./helper/draggablewindow.js";

// Other helpful functions
import { delay } from "./helper/delay.js";
import { isMobile } from "./helper/mobileCheck.js";
import { getDeviceOrientation } from "./helper/orientationMode.js";
import { gpuEnabled } from "./helper/gpu-detect.js";

let delayer;

//----------------------------------------------------------------------------------------- project icon click handler
let a = 0;
let projectElement;
$(document).ready(async function() {
  for (var i = 0; i < 1000; i++) {
    

    if (!projectShortcut) {
      projectShortcut = document.getElementById("project");
    }
    if (!projectElement) {
      projectElement = document.getElementById("project-window").style;
    }

    if (projectShortcut && projectElement) {
      break;
    }

    
  }
  
  projectShortcut.addEventListener('click', async function(){ 
    
    if (projectElement.opacity == 0) {
      projectShortcut.style.color = "#6100f0";

      // Window cannot be dragged when transition is set, set temporarily for transition then unset. 
      projectElement.transition = "0.3s";
      projectElement.opacity = 1;

      // Unset transition so window can be dragged.
      delayer = await delay(400);
      projectElement.transition = "0s";
      projectElement.pointerEvents = "auto"; 
      loadProjects();
    }
    else {
      projectShortcut.style.color = "#ffffff";
      projectElement.pointerEvents = "none"; 
      projectElement.transition = "0.3s";
      projectElement.opacity = 0;
    }
  }, false);

    document.getElementById("project-minimize").addEventListener('click', function(){ 
      projectShortcut.style.color = "#ffffff";
      projectElement.transition = "0.3s";
      projectElement.opacity = 0;
      projectElement.pointerEvents = "none"; 
    });
    document.getElementById("project-close").addEventListener('click', function(){ 
      projectShortcut.style.color = "#ffffff";
      projectElement.transition = "0.3s";
      projectElement.opacity = 0; 
      projectElement.pointerEvents = "none"; 
      //$("#terminal-text").scrollTop(0);
    });
});

//----------------------------------------------------------------------------------------- Tooltip handler
let projectShortcut;
let projectTooltip;
$(document).ready(function() {
    for (var i=0; i < 1000; i++) {
        if (!projectShortcut) {
            projectShortcut = document.getElementById("project");
        }
        if (!projectTooltip) {
            projectTooltip = document.getElementById("project-tooltip");
        }

        if (projectShortcut && projectTooltip) {
            break;
            console.log("Done");
        }
    }
    

    projectShortcut.onmouseover = async function() { 
        projectTooltip.style.opacity = "1";
    }
    projectShortcut.onmouseout  = async function() { 
        projectTooltip.style.opacity = "0";
    }
})

//----------------------------------------------------------------------------------------- Make window draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
let projectWindow_;
$(document).ready(function() {

  for (var i= 0; i < 1000; i++) {
    if (!projectWindow_) {
        projectWindow_ = document.getElementById("project-window");
    } else {
      break;
    }
  }
  

  enableDrag(projectWindow_);
})

//---------------------------------------------------------------------------------------- Loading projects from data repository
let projectsNumber = 5; // Set when you add a project in https://github.com/JiayuanWen/projects
async function loadProjects() {
    
    let projI = 1;
    // Project images and descriptions hosted on https://github.com/JiayuanWen/projects
    let filePath = `https://raw.githubusercontent.com/JiayuanWen/projects/main/projects/proj${projI}/display.html`;
    let projTotal = projectsNumber;

    let projDiv;

    for (let i = 1; i <= projTotal; i++) {
        projI = i;
        // Project images and descriptions hosted on https://github.com/JiayuanWen/projects
        filePath = `https://raw.githubusercontent.com/JiayuanWen/projects/main/projects/proj${projI}/display.html`;

        // Create project element
        projDiv = document.createElement('div');
        projDiv.setAttribute('id',`project-${projI}`);

        // Insert project element to container
        document.getElementById("project-area").insertAdjacentHTML('beforeend',projDiv.outerHTML);

        // Load project from https://github.com/JiayuanWen/JiayuanWen.github.io.data
        $(`#project-${projI}`).load(filePath);
    }
}

//---------------------------------------------------------------------------------------- Remove projects from page
async function removeProjects() {
    let projI = 1;
    let projTotal = projectsNumber;

    for (let i = 1; i <= projTotal; i++) {
        projI = i;
        document.getElementById(`project-${projI}`).outerHTML = "";
    }
}

//---------------------------------------------------------------------------------------- Mobile layout
if (isMobile()) {
    // Initially check user's device orientation, change stylesheet accordingly
    var device_orientation = getDeviceOrientation(false);

    if (device_orientation == "portrait") {
        toggleMobileLayout_MyProjects(true);
    }
    else {
        toggleMobileLayout_MyProjects(false);
    };

    // Continue to listen for user's device orientation, change stylesheet accordingly
    window.addEventListener('orientationchange', () => {
        var device_orientation = getDeviceOrientation(false);

        if (device_orientation == "portrait") {
            toggleMobileLayout_MyProjects(true);
        }
        else {
            toggleMobileLayout_MyProjects(false);
        };
    });
}

function toggleMobileLayout_MyProjects(mode_) {
    if (mode_ == true) {
        document.getElementById("myproject-style").setAttribute("href", "style/myproject-mobile.css");
    }
    else {
        document.getElementById("myproject-style").setAttribute("href", "style/myproject.css");
    }
}