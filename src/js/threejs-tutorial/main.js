'use strict';

import * as THREE from 'three';
import Stats from 'stats.js';

var stats, scene, camera, renderer, cube;

function initStats() {
	stats = new Stats();

	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top      = '0px';
	stats.domElement.style.left     = '0px';

	document.body.appendChild(stats.domElement);

	setInterval(function() {
		stats.begin();

		stats.end();
	}, 1000/60);
}

function initThree() {
	// Create a new scene
	scene    = new THREE.Scene();
	// Create a new camera, THREE.PerspectiveCamera( fov, aspect, near, far );
	camera   = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	// Create a new renderer
	renderer = new THREE.WebGLRenderer();

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById( 'main' ).appendChild( renderer.domElement );

	camera.position.z = 5;
}

function renderCube(w, h, z) {
	var geometry = new THREE.BoxGeometry(w, h, z);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	
	cube         = new THREE.Mesh(geometry, material);
	scene.add(cube);
}

function animateCube() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

function init() {
	initStats();
	initThree();
	renderCube(1, 1, 1);
}

function render() {
	requestAnimationFrame(render);

	animateCube();

	renderer.render(scene, camera);
}

init();
render();