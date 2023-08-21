// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";

// Other helpful functions
import { delay } from "./helper/delay.js";
import { isMobile } from "./helper/mobileCheck.js";
import { getDeviceOrientation } from "./helper/orientationMode.js";


//---------------------------------------------------------------------------------------- Mu Projects click handle
document.getElementById("my-projects").addEventListener("click", async function() {

    // Enable back button to allow visitors to go back
    document.getElementById("back-button").style.pointerEvents = "auto";
    document.getElementById("back-button").style.display = "block";

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    // Move lamp to center
    document.getElementById("fiber-lamp").style.transition = "1.9s";
    document.getElementById("fiber-lamp").style.paddingRight = "0vw"; 

    // Show project container
    let delayer = await delay(100);
    document.getElementById("myproject").style.visibility = "visible";

    document.getElementById("project-container").style.height = "87vh";
    document.getElementById("project-container").style.width = "95vw";
    document.getElementById("project-container").style.top = "5vh";

    document.getElementById("project-border").style.height = "87vh";
    document.getElementById("project-border").style.width = "95vw";
    document.getElementById("project-border").style.top = "5vh";
    document.getElementById("project-border").style.borderRadius = "30px";

    document.getElementById("project-container").style.pointerEvents = "auto";

    // Show projects
    loadProjects();

    delayer = await delay(1000);
    document.getElementById("project-container").style.opacity = "100%";

    // Make page scrollable
    if (isMobile()) {
        document.getElementsByTagName('body')[0].style.overflowY = "auto";
    }
})

//---------------------------------------------------------------------------------------- Back button function
document.getElementById("back-button").addEventListener("click", async function() {
    //Hide projects
    document.getElementById("project-container").style.pointerEvents = "none";
    document.getElementById("project-container").style.opacity = "0%";

    // Make page unscrollable
    window.scrollTo(0,0);
    document.getElementsByTagName('body')[0].style.overflowY = "hidden";

    // Hide project container
    let delayer = await delay(1000);
    document.getElementById("project-container").style.height = "0.1vh";
    document.getElementById("project-container").style.width = "0.1vw";
    document.getElementById("project-container").style.top = "50vh"; 

    document.getElementById("project-border").style.height = "0.1vh";
    document.getElementById("project-border").style.width = "0.1vw";
    document.getElementById("project-border").style.top = "50vh";
    document.getElementById("project-border").style.borderRadius = "30px";
    
    document.getElementById("myproject").style.visibility = "hidden";
})

//---------------------------------------------------------------------------------------- Loading projects from data folder
async function loadProjects() {
    let projI = 1;
    // Project descriptions hosted on https://github.com/JiayuanWen/JiayuanWen.github.io.data
    let filePath = `https://raw.githubusercontent.com/JiayuanWen/JiayuanWen.github.io.data/main/projects/proj${projI}/display.html`;
    let projTotal = 3;

    let projDiv;

    for (let i = 1; i <= projTotal; i++) {
        projI = i;
        // Project descriptions hosted on https://github.com/JiayuanWen/JiayuanWen.github.io.data
        filePath = `https://raw.githubusercontent.com/JiayuanWen/JiayuanWen.github.io.data/main/projects/proj${projI}/display.html`;
        console.log(i);

        // Create project element
        projDiv = document.createElement('div');
        projDiv.setAttribute('id',`project-${projI}`);

        console.log(projDiv.outerHTML);

        // Insert project element to container
        document.getElementById("project-container").insertAdjacentHTML('beforeend',projDiv.outerHTML);

        $(`#project-${projI}`).load(filePath);
    }
}

//---------------------------------------------------------------------------------------- Mobile layout
if (isMobile()) {
    // Initially check user's device orientation, change stylesheet accordingly
    var device_orientation = getDeviceOrientation(false);

    if (device_orientation == "portrait") {
        toggleMobileLayout_AboutMe(true);
    }
    else {
        toggleMobileLayout_AboutMe(false);
    };

    // Continue to listen for user's device orientation, change stylesheet accordingly
    window.addEventListener('orientationchange', () => {
        var device_orientation = getDeviceOrientation(false);

        if (device_orientation == "portrait") {
            toggleMobileLayout_AboutMe(true);
        }
        else {
            toggleMobileLayout_AboutMe(false);
        };
    });
}

function toggleMobileLayout_AboutMe(mode_) {
    if (mode_ == true) {
        document.getElementById("myproject-style").setAttribute("href", "style/myproject-mobile.css");
    }
    else {
        document.getElementById("myproject-style").setAttribute("href", "style/myproject.css");
    }
}