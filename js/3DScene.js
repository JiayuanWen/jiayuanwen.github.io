// Essential Three.JS modules
import * as THREE from "three"

// Three.js addons
// Every addon is imported beginning with "three/addons/..."
// Full addon list: https://github.com/mrdoob/three.js/tree/dev/examples/jsm
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {InteractionManager} from "threeInteract";

// Other helper functions
import WebXRPolyfill from "./webxr-polyfill.module.js";

//--------------------------------------------------------------- 3D Scene
const scene = new THREE.Scene();

// Origin
const origin = new THREE.Vector3(0,0,0);
	console.log("Origin x:"+origin.x); 
	console.log("Origin y:"+origin.y);
	console.log("Origin z:"+origin.z);
	console.log(" ");

//--------------------------------------------------------------- Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});

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

			// setting the size of renderer for landscape
			renderer.setSize( window.innerWidth, window.innerHeight ); 
			renderer.setPixelRatio( window.devicePixelRatio );
			break; 
		default:
			console.log('Device in portrait mode');
			console.log( 'width: ' + window.innerWidth, 'height: ' + window.innerHeight );

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix(); 

			// setting the size of renderer for portrait
			renderer.setSize( window.innerWidth, window.innerHeight ); 
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
	renderer.setPixelRatio( window.devicePixelRatio );
}
window.addEventListener( 'resize', onWindowResize, false );

//--------------------------------------------------------------- Camera
const cam_fov = 85;
const cam_renderMin = 0.1
const cam_renderMax = 1000

const camera = new THREE.PerspectiveCamera(cam_fov, window.innerWidth / window.innerHeight, cam_renderMin, cam_renderMax);

// creating orbitcontrol to have our camera to orbit around the model.
const camera_controls = new OrbitControls(camera,renderer.domElement); 

// limit how much users are able to zoom
camera_controls.minDistance = 0.41;

// smooth camera movement
camera_controls.enableDamping = true;
camera_controls.dampingFactor = 0.045;

// make camera orbit around the asteroid model
camera_controls.autoRotate = true; 

// ----------------------------------------------------------------------------------------- Raycaster setup 
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// detect user mouse movement on PC, or touch screen activity on mobile or tablets
function onPointerMove( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'pointermove', onPointerMove );

// by default a ray stays there after being casted
// for disable ray when not needed
function resetCaster() {
	pointer.x = null;
	pointer.y = null;
	raycaster.set((new THREE.Vector3(9999,9999,9999)), (new THREE.Vector3(9999,9999,9999)));
	raycaster.params.Points.threshold = 0.01;
}

// ----------------------------------------------------------------------------------------- Firefox & Safari WebXR compatibility
const polyfill = new WebXRPolyfill();

// ---------------------------------------------------------------------------------------- Allows animation in 3D view
function animate () {
	// required by WebXR
	renderer.setAnimationLoop(renderScene);
	// use this if only Three.js no WebXR
	//requestAnimationFrame(renderScene); 

}

// ---------------------------------------------------------------------------------------- Finalize renderer 

function renderScene() {
	delta = clock.getDelta();

	// animation controllers

	// allow user to control camera
	camera_controls.update();


	// allow detection of interactions/gestures
	if (renderer.xr.isPresenting) {
		if ( document.getElementById('exploration-progressbar').style.display != "none" ) {
			spotClick();
		}
	}
	
	// render the 3D scene, place the camera
	renderer.render(scene, camera);

};