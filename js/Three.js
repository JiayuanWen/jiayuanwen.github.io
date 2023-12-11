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

	async function addShortCutClick(){ 
	
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

		  // Add icon to main menu, no need to do so if app is already opened and/or minimized
		  if (!document.getElementById('threedemo')) {
			document.getElementById('main-menu').insertAdjacentHTML(
				'beforeend',
				'<a id="threedemo" class="threedemo"><ion-icon name="cube-outline"></ion-icon><img class="app-opened" src="/textures/UI/opened_app.png"/></a>'
			);
		  }
		  
		  threeShortcut = document.getElementById('threedemo');
		  console.log(threeShortcut);
		  threeShortcut.style.color = "var(--firefly)";
		  threeShortcut.addEventListener('click', function() {
			  focusWindow(threeElement);
		  });
		  threeShortcut.addEventListener('click', function() {
			addShortCutClick();
		  });

		  // Add glow below shortcut icon
		  threeShortcut.getElementsByClassName("app-opened")[0].style.opacity = "1";
		  
		  // Enable rendering
		  animateStart();

		  camera.aspect = 1200 / 700;
		  camera.updateProjectionMatrix(); 

		  renderer.setSize( 1200, 700 ); 
		  composer.setSize( 1200, 700 );
		  renderer.setPixelRatio( window.devicePixelRatio );
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


	}

	document.querySelectorAll('.threedemo').forEach(function(shortcut_) {
		shortcut_.addEventListener('click', function(){addShortCutClick()}, false);
	})

	document.getElementById("threejs-minimize").addEventListener('click', function(){ 
		threeShortcut.style.color = "#ffffff";
		threeElement.style.transition = "0.3s";
		threeElement.style.opacity = 0; 
		threeElement.style.pointerEvents = "none";
	});
	document.getElementById("threejs-close").addEventListener('click', function(){ 
		// Stop rendering
		animateStop();

		// Remove icon from main menu
		document.getElementById("threedemo").remove();

		// Close window
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
const camera_default_x = 12; 
const camera_default_y = 12;
const camera_default_z = 12;
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
	
	document.getElementById("fiber-lamp").style.paddingRight = "0vw";
	document.getElementById("fiber-lamp").style.paddingTop = "0vh";
	*/
}

//
camera.position.set(camera_default_x,camera_default_y,camera_default_z);

//----------------------------------------------------------------------------------------- Firefox & Safari WebXR compatibility
const polyfill = new WebXRPolyfill();

//----------------------------------------------------------------------------------------- 3D models
// Fiber Optic Lamp
const fiber_lamp = new THREE.Object3D();
	// Body
	const fiber_lamp_body = new GLTFLoader(/*loadingManager*/);
	fiber_lamp_body.load('3d_models/fiber_lamp/fiber-optic-lamp-body.gltf', function(gltf) {
		const model_root = gltf.scene;
		fiber_lamp.add(model_root);
	}, 
	// Called when loading is in progresses
	function (xhr) {
		if (( xhr.loaded / xhr.total * 100 ) == 100 && dev_output) {
			console.log("Fiber Lamp: ");
			console.log(fiber_lamp);
			console.log(" ");
		}
	}, 
	// Called when loading has errors
	function (error) {
		console.log("Fiber Lamp Object3D error: ");
		console.log(error);
		console.log(" ");
	})

	// Glow
	const fiber_lamp_glow = new GLTFLoader(/*loadingManager*/);
	fiber_lamp_glow.load('3d_models/fiber_lamp/fiber-optic-lamp-glow.gltf', function(gltf) {
		const model_root = gltf.scene;
		fiberColorChange(model_root);
		fiber_lamp.add(model_root);
	}, 
	// Called when loading is in progresses
	function (xhr) {
		if (( xhr.loaded / xhr.total * 100 ) == 100 && dev_output) {
			console.log("Fiber Glow: ");
			console.log(fiber_lamp);
			console.log(" ");
		}
	}, 
	// Called when loading has errors
	function (error) {
		console.log("Fiber Lamp Object3D error: ");
		console.log(error);
		console.log(" ");
	})

// Color changing fibers
var red = 255; 
var green = 0;	
var blue = 0;	
var color_stage = 1;
async function fiberColorChange(model_root) {
	while (true) {
		// Cycle through all non-monochrome colors
		if (color_stage == 1) {
			blue += 1;
			if (blue >= 254) {
				color_stage++;
			}
		}
		if (color_stage == 2) {
			red -= 1;
			if (red <= 1) {
				color_stage++;
			}
		}
		if (color_stage == 3) {
			green += 1;
			if (green >= 254) {
				color_stage++;
			}
		}
		if (color_stage == 4) {
			blue -= 1;
			if (blue <= 1) {
				color_stage++;
			}
		}
		if (color_stage == 5) {
			red += 1;
			if (red >= 254) {
				color_stage++;
			}
		}
		if (color_stage == 6) {
			green -= 1;
			if (green <= 1) {
				color_stage = 1;
			}
		}
		//console.log("Color changed");
		model_root.traverse((child, i) => {
			if (child.isMesh) {
			  child.material = new THREE.MeshBasicMaterial({ color: rgbToHex(red, green, blue)});;
			}
		 });
		 let delayers = await delay(8.2);
	}
}

scene.add(fiber_lamp);

//---------------------------------------------------------------------------------------- Lights


//---------------------------------------------------------------------------------------- Composition
const renderPass = new RenderPass( scene, camera );

var renderTarger_params = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false };
var renderTarget = new THREE.WebGLRenderTarget( 
	window.innerWidth, 
	window.innerHeight, 
	renderTarger_params
);

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = 0;
bloomPass.strength = 1;
bloomPass.radius = 0.1;

let composer = new EffectComposer( renderer, renderTarget );
composer.addPass( renderPass );
composer.addPass( bloomPass );

//---------------------------------------------------------------------------------------- Window resize handler
// Updates render area on device orientation change (Mobile)
/*
function onOrientationChange() {
	setTimeout(function(){
		switch(window.orientation) 
		{  
		case -90:
		case 90:
			console.log('Device in landscape mode');
			console.log( 'width: ' + window.innerWidth, 'height: ' + window.visualViewport.innerHeight );
			
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix(); 

			// Setting the size of renderer for landscape
			renderer.setSize( window.innerWidth, window.innerHeight ); 
			composer.setSize( window.innerWidth, window.innerHeight );
			renderer.setPixelRatio( window.devicePixelRatio );
			break; 
		default:
			console.log('Device in portrait mode');
			console.log( 'width: ' + window.innerWidth, 'height: ' + window.innerHeight );

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix(); 

			// Setting the size of renderer for portrait
			renderer.setSize( window.innerWidth, window.innerHeight ); 
			composer.setSize( window.innerWidth, window.innerHeight );
			renderer.setPixelRatio( window.devicePixelRatio );
			break; 
		}
	},200);
}
window.addEventListener('orientationchange', onOrientationChange);
*/

// Updates render area when resizing window (Desktop)
/*
function onWindowResize(){
	//console.log( 'width: ' + document.documentElement.clientWidth, 'height: ' + window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix(); 

	renderer.setSize( window.innerWidth, window.innerHeight ); 
	composer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
}
window.addEventListener( 'resize', onWindowResize, false );
*/

//---------------------------------------------------------------------------------------- Finalize renderer 
let animate_request;
let frames = 0, prevTime = performance.now();

function animate() {

	animate_request = undefined;
	
	delta = clock.getDelta();

	// Animation controllers
	fiber_lamp.rotation.y += 0.055 * delta;

	// Allow user to control camera
	camera_controls.update();

	// FPS
    frames ++;
    const time = performance.now();
    
    if ( time >= prevTime + 1000 ) {
    
    	console.log( Math.round( ( frames * 1000 ) / ( time - prevTime ) ) );
      
      frames = 0;
      prevTime = time;
      
    }

	// Apply post-effects
	//renderer.clear();
	composer.render();
	
	// Render the 3D scene
	//renderer.render(scene, camera);

    // Required by WebXR
	//renderer.setAnimationLoop(animate);

	// Use this if only Three.js no WebXR
	animateStart(); 
	

}

function animateStart() {
	if (!animate_request) {
		animate_request = requestAnimationFrame(animate); 
	 }
}

function animateStop() {
	if (animate_request) {
		cancelAnimationFrame(animate_request);
		animate_request = undefined;
	 }
}