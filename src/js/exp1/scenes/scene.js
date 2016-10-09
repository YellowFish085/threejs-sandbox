'use strict';

import Utils from '../_classes/utils';

import IdentifiableObject from '../_classes/identifiableObject';
import * as THREE from 'three';

class Scene extends IdentifiableObject {
	constructor(datas) {
		super();

		this._name  = datas.name;
		this._scene = new THREE.Scene();
	}

	get id() {
		return this._id;
	}
}

export default Scene;