// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";

// Other helpful functions
import { delay } from "./helper/delay.js";
import { isMobile } from "./helper/mobileCheck.js";
import { getDeviceOrientation } from "./helper/orientationMode.js";


//---------------------------------------------------------------------------------------- Blogs click handle
document.getElementById("blogs").addEventListener("click", async function() {

    // Enable back button to allow visitors to go back
    document.getElementById("back-button").style.pointerEvents = "auto";
    document.getElementById("back-button").style.display = "block";

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    // Move lamp aside
    document.getElementById("fiber-lamp").style.transition = "1.9s";
    document.getElementById("fiber-lamp").style.paddingRight = "90vw"; 

    //
    document.getElementById('no-blog').style.opacity = "100%";

    // Show stars
    let delayer = await delay(500);
    document.getElementById("stars-bg").style.opacity = "50%";

    // Make page scrollable
    if (isMobile()) {
        document.getElementsByTagName('body')[0].style.overflowY = "auto";
    }
})

//---------------------------------------------------------------------------------------- Back button function
document.getElementById("back-button").addEventListener("click", async function() {

    // Make page unscrollable
    window.scrollTo(0,0);
    document.getElementsByTagName('body')[0].style.overflowY = "hidden";

    //
    document.getElementById('no-blog').style.opacity = "0%";

    // Hide stars
    let delayer = await delay(500);
    document.getElementById("stars-bg").style.opacity = "0%";

    // 
    delayer = await delay(1000);

})


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