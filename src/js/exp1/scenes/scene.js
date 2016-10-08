'use strict';

import Utils from '../_classes/utils';

import IdentifiableObject from '../_classes/identifiableObject';
import * as THREE from 'three';

class Scene extends IdentifiableObject {
	constructor(datas) {
		super();

		if (!datas) {
			datas = {};
		}

		// Initialize scene datas
		Utils.extendObject(datas, {
			name: 'Default name',
		});

		this._name = datas.name;
	}

	get id() {
		return this._id;
	}
}

export default Scene;