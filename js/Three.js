// Essential Three.JS modules
import * as THREE from "three"

// Three.js addons
// Every addon is imported beginning with "three/addons/..."
// Full addon list: https://github.com/mrdoob/three.js/tree/dev/examples/jsm
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {InteractionManager} from "threeInteract";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


// Other helper functions
import WebXRPolyfill from "../js/helper/webxr-polyfill.module.js";
import { delay } from "../js/helper/delay.js";
import { rgbToHex } from "../js/helper/rgbToHex.js";
import { isMobile } from "../js/helper/mobileCheck.js";
import { gpuEnabled } from "../js/helper/gpu-detect.js";
import { enableDrag } from "./helper/draggablewindow.js";
import { focusWindow } from "./helper/UI/windowfocus.js";

let delayer;

// Wait for site to fully load before continuing
delayer = await delay(1200);

// Dev outputs for dev purposes
let dev_output = false;

//----------------------------------------------------------------------------------------- Shorcut handler
let threeShortcut;
let threeElement;
$(document).ready(function() {
	for (var i = 0; i < 1000; i++) {
		if (!threeShortcut && !threeElement) {
			threeShortcut = document.getElementById("threejs-window");
			threeElement = document.getElementById("threejs-window");
		} else {
			break;
		}
	}

	document.querySelectorAll('.threedemo').forEach(function(shortcut_) {
		shortcut_.addEventListener('click', async function(){ 
	
		  if (threeElement.style.opacity == 0) {
			// Hide Start Menu
			let startMenu = document.getElementById("start-menu");
			startMenu.style.opacity = "0";
			startMenu.style.bottom = "0px";
			startMenu.style.pointerEvents = "none";
	  
			// Make window the focus when opened
			focusWindow(threeElement);
	  
			// Highlight shortcut
			//threeShortcut.style.color = "#6100f0";
	  
			// Window cannot be dragged when transition is set, set temporarily for transition then unset. 
			threeElement.style.transition = "0.3s";
			threeElement.style.opacity = 1;
	  
			// Unset transition so window can be dragged.
			delayer = await delay(400);
			threeElement.style.transition = "0s";
			threeElement.style.pointerEvents = "auto";
			
		  }
		  else {
			//threeShortcut.style.color = "#ffffff";
	  
			//threeElement.style.transition = "0.3s";
			//threeElement.style.opacity = 0;
	  
	  
			//delayer = await delay(400);
			//threeElement.style.transition = "0s";
			//threeElement.style.pointerEvents = "none";
			// Hide Start Menu
			let startMenu = document.getElementById("start-menu");
			startMenu.style.opacity = "0";
			startMenu.style.bottom = "0px";
			startMenu.style.pointerEvents = "none";
	
			focusWindow(threeElement);
		  }
		}, false);
	})

	document.getElementById("threejs-minimize").addEventListener('click', function(){ 
		threeShortcut.style.color = "#ffffff";
		threeElement.style.transition = "0.3s";
		threeElement.style.opacity = 0; 
		threeElement.style.pointerEvents = "none";
	});
	document.getElementById("threejs-close").addEventListener('click', function(){ 
		threeShortcut.style.color = "#ffffff";
		threeElement.style.transition = "0.3s";
		threeElement.style.opacity = 0; 
		threeElement.style.pointerEvents = "none";
	});
})

//----------------------------------------------------------------------------------------- Make window draggable
// More details see here: https://www.w3schools.com/howto/howto_js_draggable.asp
let threeWindow_;
$(document).ready(function() {
  // Check for element until found. Fail safe for when script load before DOM
  for (var i= 0; i < 1000; i++) {
    if (!threeWindow_) {
        threeWindow_ = document.getElementById("threejs-window");
    } else {
      break;
    }
  }

  enableDrag(threeWindow_);
})

//----------------------------------------------------------------------------------------- 3D Scene for fiber lamp
const scene = new THREE.Scene();

// Use delta so system calculate animation using universal ticks instead of base on 
// framerate
const clock = new THREE.Clock();
let delta = null;

// Origin
const origin = new THREE.Vector3(0,0,0);
	if (dev_output) {
		console.log("Origin x:"+origin.x); 
		console.log("Origin y:"+origin.y);
		console.log("Origin z:"+origin.z);
		console.log(" ");
	}

//scene.background = new THREE.Color(0xa5a5a5);
// Environment map
new RGBELoader()
	.setPath( 'textures/env_map/' )
	.load( 'guangzhou.hdr', function ( texture ) {

		texture.mapping = THREE.EquirectangularReflectionMapping;

		//scene.background = texture;
		scene.background = null;
		scene.environment = texture;

	} );

//----------------------------------------------------------------------------------------- Renderer
// Disable anti-aliasing on iOS due to it crashing the site
const antialiasingiOSToggle = function () {
	if( !(/iphone|ipod|ipad/.test(window.navigator.userAgent.toLowerCase())) ) {
		// any browser not on iOS
		return true;
	} else {
		return false;
	}
}


const canvas = document.querySelector(".fiber");
const renderer = new THREE.WebGLRenderer({
	canvas, 
	alpha: true, 
	antialias: antialiasingiOSToggle()
});
renderer.setClearColor( 0x000000, 0 );
//renderer.autoclear = false;

// Setting the size of rendered 
renderer.setSize( 1, 1 ); 
renderer.setPixelRatio( window.devicePixelRatio );

// Senderer color mode. Use sRGB to prevent bright image texture
renderer.outputEncoding = THREE.sRGBEncoding;

//----------------------------------------------------------------------------------------- Camera
const cam_fov = 45;
const cam_renderMin = 0.1
const cam_renderMax = 1000

const camera = new THREE.PerspectiveCamera(cam_fov, 1200 / 700, cam_renderMin, cam_renderMax);

// Camera default position
const camera_default_x = 8; 
const camera_default_y = 8;
const camera_default_z = 8;
//camera.lookAt(0,0,0);

// Creating orbitcontrol to have our camera to orbit around the model.
const camera_controls = new OrbitControls(camera,renderer.domElement); 

// Limit how much users are able to zoom
camera_controls.minDistance = 0.41;

// Smooth camera movement
camera_controls.enableDamping = true;
camera_controls.dampingFactor = 0.045;


// Camera orbiting central point
camera_controls.target = new THREE.Vector3(0,3,0);

// Lock y-axis rotation
camera_controls.minPolarAngle = (Math.PI-10)/2;
camera_controls.maxPolarAngle = (Math.PI-1)/2;

// Introl zoom animation
const zoomInAnimation = async() => {

	//camera.position.set(camera_default_x,camera_default_y,camera_default_z);
	camera_controls.enabled = true;
	camera_controls.enableZoom = false;
	camera_controls.enablePan = false;
	camera_controls.update();
	


	camera.position.set(12,12,12);

	renderer.setSize( 1200, 700 ); 

	/*
	document.getElementById("fiber-lamp").style.paddingRight = "50vw";
	document.getElementById("fiber-lamp").style.paddingTop = "0vh";
	*/
	document.getElementById("fiber-lamp").style.paddingRight = "0vw";
	document.getElementById("fiber-lamp").style.paddingTop = "0vh";
}


//----------------------------------------------------------------------------------------- Firefox & Safari WebXR compatibility
const polyfill = new WebXRPolyfill();