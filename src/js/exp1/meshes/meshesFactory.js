'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

class MeshesFactory {
	constructor() {

	}

	/**
	 * Create a new mesh
	 * @param {JSON} datas - JSON with mesh datas
	 * @return {THREE.Mesh} - A three.js mesh
	 */ 
	static createMesh(datas, material) {
		// Create mesh
		var geometry = null;

		if (datas.type === "BoxGeometry") {
			geometry = MeshesFactory.createBoxGeometry(datas);
		}
		else {
			geometry = MeshesFactory.createBoxGeometry(datas);
		}

		// Return mesh
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