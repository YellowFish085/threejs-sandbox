'use strict';

import * as THREE from 'three';

import Utils from '../../_classes/utils';
import IdentifiableObject from '../../_classes/identifiableObject';

import CameraFactory from '../../cameras/cameraFactory';
import MeshesFactory from '../../meshes/meshesFactory'
import MaterialsFactory from '../../materials/materialsFactory'

class Scene extends IdentifiableObject {
	constructor(datas) {
		super();

		this._name           = datas.name;
		this._scene          = new THREE.Scene();
		this._camera         = CameraFactory.create(datas.camera);
		this._meshesDatas    = datas.meshes;
		this._materialsDatas = datas.materials;
		this._meshes         = [];
		}

	setupScene() {
		for (var i = 0; i < this._meshesDatas.length; i++) {
			var newMaterial = MaterialsFactory.createMaterial(this._meshesDatas[i].material);
			var newMesh     = MeshesFactory.createMesh(this._meshesDatas[i], newMaterial);

			if (newMesh) {
				this._meshes.push(newMesh);
				this._scene.add(newMesh);
			}
		}
	}

	get THREEscene() {
		return this._scene;
	}

	get camera() {
		return this._camera;
	}

	get meshes() {
		return this._meshes;
	}
}

export default Scene;