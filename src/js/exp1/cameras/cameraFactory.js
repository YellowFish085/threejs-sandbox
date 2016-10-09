'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

class CameraFactory {
	constructor() {

	}

	/**
	 * Create a new camera
	 * @param {JSON} datas - JSON with camera datas
	 * @return {Camera} - A three.js camera
	 */
	static create(datas) {
		// Default camera settings
		Utils.extendObject(datas, {
			type: "PerspectiveCamera",
			fov: 75,
			aspect: window.innerWidth / window.innerHeight,
			near: 0.1,
			far: 1000,
			position: {
				x: 0,
				y: 0,
				z: 0
			}
		});

		// Usefull if aspect is something like "window.innerWidth / window.innerHeight"
		if (typeof datas.aspect === "string") {
			datas.aspect = eval(datas.aspect);
		}

		// Create new Camera
		var camera = null;

		if (datas.type == "PerspectiveCamera") {
			camera = this.createPerspectiveCamera(datas);
		}
		else {
			camera = this.createPerspectiveCamera(datas);
		}

		// Return new camera
		if (!camera) {
			throw new Error("Camera was not created");
			return false;
		}
		else {
			return camera;
		}
	}

	static createPerspectiveCamera(datas) {
		var camera = new THREE.PerspectiveCamera(
			datas.fov,
			datas.aspect,
			datas.near,
			datas.far
		);

		camera.position.x = datas.position.x;
		camera.position.y = datas.position.y;
		camera.position.z = datas.position.z;

		return camera;
	}
}

export default CameraFactory;