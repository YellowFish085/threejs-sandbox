'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

class MaterialsFactory {
	constructor() {

	}

	/**
	 * Create a new material
	 * @param {JSON} datas - JSON with material datas
	 * @return {Material} - A three.js material
	 */ 
	static createMaterial(datas) {
		// Create material
		var material = null;

		if (datas.type === "MeshBasicMaterial") {
			material = MaterialsFactory.createMeshBasicMaterial(datas);
		}
		else {
			material = MaterialsFactory.createMeshBasicMaterial(datas);
		}

		// Return material
		if (!material) {
			throw new Error("Material was not created");
			return false;
		}
		else {
			return material;
		}
	}

	static createMeshBasicMaterial(datas) {
		return new THREE.MeshBasicMaterial({
			color: parseInt(datas.color)
		});
	}
}

export default MaterialsFactory;