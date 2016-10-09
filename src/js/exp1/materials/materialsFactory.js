'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

class MaterialsFactory {
	constructor() {

	}

	static createMaterial(datas) {
		var material = null;

		if (datas.type === "MeshBasicMaterial") {
			material = MaterialsFactory.createMeshBasicMaterial(datas);
		}
		else {
			material = MaterialsFactory.createMeshBasicMaterial(datas);
		}

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