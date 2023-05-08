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
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

// Other helper functions
import WebXRPolyfill from "./helper/webxr-polyfill.module.js";
import { delay } from "./helper/delay.js";
import { rgbToHex } from "./helper/rgbToHex.js";
import { isMobile } from "./helper/mobileCheck.js";

//----------------------------------------------------------------------------------------- 3D Scene
const scene = new THREE.Scene();

// Use delta so system calculate animation using universal ticks instead of base on 
// framerate
const clock = new THREE.Clock();
let delta = null;

// Origin
const origin = new THREE.Vector3(0,0,0);
	console.log("Origin x:"+origin.x); 
	console.log("Origin y:"+origin.y);
	console.log("Origin z:"+origin.z);
	console.log(" ");

//scene.background = new THREE.Color(0xa5a5a5);
// Environment map
new RGBELoader()
	.setPath( 'textures/env_map/' )
	.load( 'guangzhou.hdr', function ( texture ) {

		texture.mapping = THREE.EquirectangularReflectionMapping;

		//scene.background = texture;
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

// Setting the size of rendered 
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.setPixelRatio( window.devicePixelRatio );

// Senderer color mode. Use sRGB to prevent bright image texture
renderer.outputEncoding = THREE.sRGBEncoding;

//----------------------------------------------------------------------------------------- Camera
const cam_fov = 45;
const cam_renderMin = 0.1
const cam_renderMax = 1000

const camera = new THREE.PerspectiveCamera(cam_fov, window.innerWidth / window.innerHeight, cam_renderMin, cam_renderMax);

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

// Make camera orbit around
//camera_controls.autoRotate = true; 
//camera_controls.autoRotateSpeed = 0.5; 

// Camera orbiting central point
camera_controls.target = new THREE.Vector3(0,3,0);

// Lock y-axis rotation
camera_controls.minPolarAngle = (Math.PI-10)/2;
camera_controls.maxPolarAngle = (Math.PI-1)/2;

// Introl zoom animation
const zoomInAnimation = async() => {
	camera.position.set(0,0,300);
	camera.updateProjectionMatrix(); 
	
	camera_controls.enabled = false;
	camera_controls.update();

	for (var i = 200; i > 12; i*=0.965) {
		let delayres = await delay(8.2);
		camera.position.set(i,i,i);
		camera.updateProjectionMatrix(); 

		i += 0.435
	}
	//camera.position.set(camera_default_x,camera_default_y,camera_default_z);
	camera_controls.enabled = true;
	camera_controls.enableZoom = false;
	camera_controls.enablePan = false;
	camera_controls.update();

	// Reinforce camera zoom after animation ends
	//camera_controls.maxDistance = 31; 
}

//----------------------------------------------------------------------------------------- Raycaster setup 
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Detect user mouse movement on PC, or touch screen activity on mobile or tablets
function onPointerMove( event ) {
	// Calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'pointermove', onPointerMove );

// By default a ray stays there after being casted
// for disable ray when not needed
function resetCaster() {
	pointer.x = null;
	pointer.y = null;
	raycaster.set((new THREE.Vector3(9999,9999,9999)), (new THREE.Vector3(9999,9999,9999)));
	raycaster.params.Points.threshold = 0.01;
}

//----------------------------------------------------------------------------------------- Firefox & Safari WebXR compatibility
const polyfill = new WebXRPolyfill();

//----------------------------------------------------------------------------------------- Loading management
const loadingManager = new THREE.LoadingManager();

// Execute on loading start
loadingManager.onStart = function(url, item, total) {

}

// Execute during loading
const loadingBar = document.getElementById('loading-bar');
loadingManager.onProgress = function(url, loaded, total) {

	loadingBar.value = (loaded / total) * 100;
}

// Execute on loading complete
const loadingScreen = document.querySelector('.loading-screen');
loadingManager.onLoad = async function() {

	// Loading screen fade
	loadingScreenFade();

	// Zoom animation
	zoomInAnimation();

	// Play music
	//document.getElementById('player').play();
	

	// Starts animating the site after everything has loaded
	animate(); 

}
function loadingScreenFade() {
    var fadeOutEffect = setInterval(function () {
        if (!loadingScreen.style.opacity) {
            loadingScreen.style.opacity = 1;
        }
        if (loadingScreen.style.opacity > 0) {
            loadingScreen.style.opacity -= 0.02;
        } else {
			loadingScreen.style.display = 'none';
            clearInterval(fadeOutEffect);
        }
    }, 10);
}

// Execute when encounter error during loading
loadingManager.onError = function(url) {
	console.log(`Loading failed: ${url}`);
}

//----------------------------------------------------------------------------------------- 3D models
// Fiber Optic Lamp
const fiber_lamp = new THREE.Object3D();
	// Body
	const fiber_lamp_body = new GLTFLoader(loadingManager);
	fiber_lamp_body.load('3d_models/fiber_lamp/fiber-optic-lamp-body.gltf', function(gltf) {
		const model_root = gltf.scene;
		fiber_lamp.add(model_root);
	}, 
	// Called when loading is in progresses
	function (xhr) {
		if (( xhr.loaded / xhr.total * 100 ) == 100) {
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
	const fiber_lamp_glow = new GLTFLoader(loadingManager);
	fiber_lamp_glow.load('3d_models/fiber_lamp/fiber-optic-lamp-glow.gltf', function(gltf) {
		const model_root = gltf.scene;
		fiberColorChange(model_root);
		fiber_lamp.add(model_root);
	}, 
	// Called when loading is in progresses
	function (xhr) {
		if (( xhr.loaded / xhr.total * 100 ) == 100) {
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
const lightColor = 0x090909;
const lightIntensity = 0.8;
const sunLight = new THREE.DirectionalLight(lightColor, lightIntensity);
sunLight.position.set(0, 50, 900);
scene.add(sunLight);
console.log("Sunlight setting set: "); 
console.log(sunLight);
console.log(" ");

const shadowColor = 0xffffff;
const shadowBrightness = 1;
const backShadow = new THREE.HemisphereLight(shadowColor, shadowColor, shadowBrightness);
backShadow.position.set(0, 50, 900);
scene.add(backShadow);
console.log("Shadow settings set: ");
console.log(backShadow);
console.log(" ");

//---------------------------------------------------------------------------------------- Composition
const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = 0;
bloomPass.strength = 1;
bloomPass.radius = 0.1;

let composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );

//---------------------------------------------------------------------------------------- Window resize handler
// Updates render area on device orientation change (Mobile)
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

// Updates render area when resizing window (Desktop)
function onWindowResize(){
	//console.log( 'width: ' + document.documentElement.clientWidth, 'height: ' + window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix(); 

	renderer.setSize( window.innerWidth, window.innerHeight ); 
	composer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
}
window.addEventListener( 'resize', onWindowResize, false );

//---------------------------------------------------------------------------------------- Finalize renderer 
function animate () {
	
	delta = clock.getDelta();

	// Animation controllers
	fiber_lamp.rotation.y += 0.055 * delta;

	// Allow user to control camera
	camera_controls.update();

	//
	composer.render();
	
	// Render the 3D scene
	//renderer.render(scene, camera);

    // Required by WebXR
	renderer.setAnimationLoop(animate);

	// Use this if only Three.js no WebXR
	//requestAnimationFrame(animate); 
	

}