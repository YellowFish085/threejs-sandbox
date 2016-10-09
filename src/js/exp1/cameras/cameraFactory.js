'use strict';

import Utils from '../_classes/utils';

import PerspectiveCamera from './perspectiveCamera';

class CameraFactory {
	constructor() {

	}

	static create(options) {
		// Initialize scene datas
		Utils.extendObject(options, {
			type: "PerspectiveCamera",
			fov: 75,
			aspect: window.innerWidth / window.innerHeight,
			near: 0.1,
			far: 1000
		});

		// Usefull if aspect is something like "window.innerWidth / window.innerHeight"
		if (typeof options.aspect === "string") {
			options.aspect = eval(options.aspect);
		}

		var camera = null;

		if (options.type == "PerspectiveCamera") {
			camera = new PerspectiveCamera(options);
		}
		else {
			camera = new PerspectiveCamera(options);
		}

		if (!camera) {
			throw new Error("Camera was not created");
			return false;
		}
		else {
			return camera;
		}
	}
}

export default CameraFactory;