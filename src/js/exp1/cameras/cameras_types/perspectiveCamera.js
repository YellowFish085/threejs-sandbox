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

		this._camera.position.x = options.position.x;
		this._camera.position.y = options.position.y;
		this._camera.position.z = options.position.z;
	}

	get THREEcamera() {
		return this._camera;
	}
}

export default PerspectiveCamera;