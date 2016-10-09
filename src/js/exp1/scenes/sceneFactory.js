'use strict';

import Utils from '../_classes/utils';

import Scene from './scene';

class SceneFactory {
	constructor() {

	}

	static createScene(options) {
		// Initialize scene datas
		Utils.extendObject(options, {
			name: 'Default name',
		});

		var scene = null;

		if (options.type === "Scene") {
			scene =  new Scene(options);
		}
		else {
			scene = new Scene(options);
		}

		if (!scene) {
			throw new Error("Scene was not created");
			return false;
		}
		else {
			return scene;
		}
	}
}

export default SceneFactory;