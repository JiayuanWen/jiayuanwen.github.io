// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";
import { backToHomepage } from "./helper/UI/back-button.js";

// Other helpful functions
import { delay } from "./helper/delay.js";
import { isMobile } from "./helper/mobileCheck.js";
import { getDeviceOrientation } from "./helper/orientationMode.js";
import { gpuEnabled } from "./helper/gpu-detect.js";

//----------------------------------------------------------------------------------------- Tooltip handler
let blogShortcut;
let blogTooltip;
$(document).ready(function() {
    while (!blogShortcut) {
        blogShortcut = document.getElementById("blog");
    }
    while (!blogTooltip) {
        blogTooltip = document.getElementById("blog-tooltip");
    }

    blogShortcut.onmouseover = async function() { 
        blogTooltip.style.opacity = "1";
    }
    blogShortcut.onmouseout  = async function() { 
        blogTooltip.style.opacity = "0";
    }
})


//---------------------------------------------------------------------------------------- Mobile layout
if (isMobile()) {
    // Initially check user's device orientation, change stylesheet accordingly
    var device_orientation = getDeviceOrientation(false);

    if (device_orientation == "portrait") {
        toggleMobileLayout_MyBlogs(true);
    }
    else {
        toggleMobileLayout_MyBlogs(false);
    };

    // Continue to listen for user's device orientation, change stylesheet accordingly
    window.addEventListener('orientationchange', () => {
        var device_orientation = getDeviceOrientation(false);

        if (device_orientation == "portrait") {
            toggleMobileLayout_MyBlogs(true);
        }
        else {
            toggleMobileLayout_MyBlogs(false);
        };
    });
}

function toggleMobileLayout_MyBlogs(mode_) {
    if (mode_ == true) {
        document.getElementById("myblogs-style").setAttribute("href", "style/myblogs-mobile.css");
    }
    else {
        document.getElementById("myblogs-style").setAttribute("href", "style/myblogs.css");
    }
}

//---------------------------------------------------------------------------------------- My Blogs click handle
if (isMobile()) {
document.getElementById("blogs").addEventListener("click", async function() {

    // Enable back button to allow visitors to go back
    document.getElementById("back-button").style.pointerEvents = "auto";
    document.getElementById("back-button").style.display = "block";

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    // Move lamp aside
    if (gpuEnabled()) {
        document.getElementById("fiber-lamp").style.transition = "1.9s";
        document.getElementById("fiber-lamp").style.paddingRight = "90vw"; 
    }
    else {
        document.getElementById("fiber-lamp-lite").style.left = "-100%";
        document.getElementById("fiber-lamp-lite").style.opacity = "0";
    }

    // Show blogs
    document.getElementById('blog-background').style.opacity = "100%";
    if (isMobile()) {
        document.getElementById('blog-background').style.opacity = "0%";
    }
    //document.getElementById('no-blog').style.opacity = "100%";
    document.getElementById('blog-container').style.opacity = "100%";
    loadBlogs();

    // Show stars
    let delayer = await delay(500);
    document.getElementById("stars-bg-grey").style.visibility = "visible";
    document.getElementById("stars-bg-grey").style.opacity = "50%";

    // Make page scrollable
    if (isMobile()) {
        document.getElementsByTagName('body')[0].style.overflowY = "auto";
    }

    // Make page interactable
    document.getElementById('blog-container').style.pointerEvents = "auto";

    //---------------------------------------------------------------------------------------- Back button function
    document.getElementById("back-button").addEventListener("click", async function backButton() {
        let delayer;

        backToHomepage(1);

        // Make page unscrollable
        window.scrollTo(0,0);
        document.getElementsByTagName('body')[0].style.overflowY = "hidden";

        // Hide blogs
        document.getElementById('blog-background').style.opacity = "0%";
        //document.getElementById('no-blog').style.opacity = "0%";
        document.getElementById('blog-container').style.opacity = "0%";

        // Hide stars
        delayer = await delay(500);
        document.getElementById("stars-bg-grey").style.opacity = "0%";
        //delayer = await delay(3000); document.getElementById("stars-bg").style.visibility = "hidden";

        // 
        //delayer = await delay(1000);

        // Remove back buttom function on click to prevent function overlaps
        document.getElementById("back-button").removeEventListener("click", backButton);

        // Unload blog list
        removeBlogs();

        // Make page uninteractable
        document.getElementById('blog-container').style.pointerEvents = "none";
    })
})

}
//---------------------------------------------------------------------------------------- Load/Remove blogs from data repository
let blogsTotal = 1; 

async function loadBlogs() {
    let blogI = 1;
    // Blog images and descriptions hosted on https://github.com/JiayuanWen/blogs
    let filePath = `https://raw.githubusercontent.com/JiayuanWen/blogs/main/resources/blog${blogI}/preview.html`;

    let blogDiv;

    var blogID;

    for (let i = 1; i <= blogsTotal; i++) {
        blogI = i;
        // Blog images and descriptions hosted on https://github.com/JiayuanWen/blogs
        filePath = `https://raw.githubusercontent.com/JiayuanWen/blogs/main/resources/blog${blogI}/preview.html`;

        // Create blog element
        blogDiv = document.createElement('a');
        blogDiv.setAttribute('id',`blog${blogI}`);
        blogDiv.setAttribute('class',`blog-clicklistener`);
        //blogDiv.setAttribute('href',`a`);

        // Insert blog element to container
        document.getElementById("blog-container").insertAdjacentHTML('beforeend',blogDiv.outerHTML);

        // Load blog element
        $(`#blog${blogI}`).load(filePath);

        // Add click handle and assign id to each blog
        blogID = document.getElementById(`blog${blogI}`).id;
        // For addEventListener in a loop with variables: https://stackoverflow.com/a/38860151
        document.getElementById(`blog${blogI}`).addEventListener("click", expandBlog.bind(this,blogID), false);
    }
}
async function removeBlogs() {
    let delayer = await delay(1000);

    let blogI = 1;

    for (let i = 1; i <= blogsTotal; i++) {
        blogI = i;
        document.getElementById(`blog-${blogI}`).outerHTML = "";
    }
}

//---------------------------------------------------------------------------------------- Click handle for each blog
function expandBlog(blogID) {
    console.log(blogID);

    // (deprecated) Load full blog from https://github.com/JiayuanWen/JiayuanWen.github.io.data
    //let articlePath = `https://raw.githubusercontent.com/JiayuanWen/JiayuanWen.github.io.data/main/blogs/${blogID}/article.html`;

    // (deprecated) Load blog from https://github.com/JiayuanWen/JiayuanWen.github.io.data
    //$(`#blog-content`).load(articlePath);

    // Redirect to blog article
    window.location.href = `http://jiayuanwen.github.io/blogs/resources/${blogID}/redirect.html`;
}

