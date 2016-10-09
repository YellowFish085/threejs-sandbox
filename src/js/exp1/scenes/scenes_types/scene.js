'use strict';

import * as THREE from 'three';

import Utils from '../../_classes/utils';
import IdentifiableObject from '../../_classes/identifiableObject';

import CameraFactory from '../../cameras/cameraFactory';

class Scene extends IdentifiableObject {
	constructor(datas) {
		super();

		this._name   = datas.name;
		this._scene  = new THREE.Scene();
		this._camera = CameraFactory.create(datas.camera);
	}
}

export default Scene;