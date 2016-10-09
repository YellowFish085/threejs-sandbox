'use strict';

import * as THREE from 'three';

import Utils from '../../_classes/utils';

class PerspectiveCamera {
	constructor(options) {
		this._camera = new THREE.PerspectiveCamera(
			options.fov,
			options.aspect,
			options.near,
			options.far
		);
	}

	get THREEcamera() {
		return this._camera;
	}
}

export default PerspectiveCamera;