'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

class MeshesFactory {
	constructor() {

	}

	static createMesh(datas, material) {
		var geometry = null;

		if (datas.type === "BoxGeometry") {
			geometry = MeshesFactory.createBoxGeometry(datas);
		}
		else {
			geometry = MeshesFactory.createBoxGeometry(datas);
		}

		if (!geometry) {
			throw new Error("Geometry was not created");
			return false;
		}
		else {
			return new THREE.Mesh(geometry, material);
		}
	}

	static createBoxGeometry(datas) {
		return new THREE.BoxGeometry(
			datas.width,
			datas.height,
			datas.depth
		);
	}
}

export default MeshesFactory;