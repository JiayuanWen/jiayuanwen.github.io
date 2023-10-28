// Advanced UI elements
import { focusWindow } from "./helper/UI/windowfocus.js";
import { enableDrag } from "./helper/draggablewindow.js";

// Other helpful functions
import { delay } from "./helper/delay.js";
import { isMobile } from "./helper/mobileCheck.js";
import { getDeviceOrientation } from "./helper/orientationMode.js";

let delayer;

// Wait a second before continuing, at low internet speed some elements might not finish loading.
delayer = await delay(700);

//----------------------------------------------------------------------------------------- blog icon click handler
let a = 0;
let blogElement;
$(document).ready(async function() {
  // Check for element until found. Fail safe for when script load before DOM
  for (var i = 0; i < 1000; i++) {

    if (!blogShortcut) {
      blogShortcut = document.getElementById("blog");
    }
    if (!blogElement) {
      blogElement = document.getElementById("blog-window");
    }

    if (blogShortcut && blogElement) {
      break;
    }

  }
  
  document.querySelectorAll('.blog').forEach(function(shortcut_) {
    shortcut_.addEventListener('click', async function(){ 
    
      if (blogElement.style.opacity == 0) {
        // Hide Start Menu
        let startMenu = document.getElementById("start-menu");
        startMenu.style.opacity = "0";
        startMenu.style.bottom = "0px";
        startMenu.style.pointerEvents = "none";
  
        // Make window the focus when opened
        focusWindow(blogElement);
  
        // Highlight shorcut
        blogShortcut.style.color = "#6100f0";
  
        // Window cannot be dragged when transition is set, set temporarily for transition then unset. 
        blogElement.style.transition = "0.3s";
        blogElement.style.opacity = 1;
  
        // Unset transition so window can be dragged.
        delayer = await delay(400);
        blogElement.style.transition = "0s";
        blogElement.style.pointerEvents = "auto"; 
        loadBlogs();
      }
      else {
        //blogShortcut.style.color = "#ffffff";
        //blogElement.style.pointerEvents = "none"; 
        //blogElement.style.transition = "0.3s";
        //blogElement.style.opacity = 0;
        let startMenu = document.getElementById("start-menu");
        startMenu.style.opacity = "0";
        startMenu.style.bottom = "0px";
        startMenu.style.pointerEvents = "none";

        focusWindow(blogElement);
      }
    }, false);
  });

  document.getElementById("blog-minimize").addEventListener('click', function(){ 
    blogShortcut.style.color = "#ffffff";
    blogElement.style.transition = "0.3s";
    blogElement.style.opacity = 0;
    blogElement.style.pointerEvents = "none"; 
  });
  document.getElementById("blog-close").addEventListener('click', function(){ 
    blogShortcut.style.color = "#ffffff";
    blogElement.style.transition = "0.3s";
    blogElement.style.opacity = 0; 
    blogElement.style.pointerEvents = "none"; 
    //$("#terminal-text").scrollTop(0);
    removeBlogs();
  });

});

//----------------------------------------------------------------------------------------- Tooltip handler
let blogShortcut;
let blogTooltip;
$(document).ready(function() {
    // Check for element until found. Fail safe for when script load before DOM
    for (var i=0; i < 1000; i++) {
        if (!blogShortcut) {
            blogShortcut = document.getElementById("blog");
        }
        if (!blogTooltip) {
            blogTooltip = document.getElementById("blog-tooltip");
        }

        if (blogTooltip && blogShortcut) {
            break;
        }
    }
    

    blogShortcut.onmouseover = async function() { 
        blogTooltip.style.opacity = "1";
    }
    blogShortcut.onmouseout  = async function() { 
        blogTooltip.style.opacity = "0";
    }
})

//----------------------------------------------------------------------------------------- Make window draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
let blogWindow_;
$(document).ready(function() {
  // Check for element until found. Fail safe for when script load before DOM
  for (var i= 0; i < 1000; i++) {
    if (!blogWindow_) {
        blogWindow_ = document.getElementById("blog-window");
    } else {
      break;
    }
  }
  

  enableDrag(blogWindow_);
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
        document.getElementById("blog-area").insertAdjacentHTML('beforeend',blogDiv.outerHTML);

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
        document.getElementById(`blog${blogI}`).outerHTML = "";
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

