'use strict';

import Utils from '../_classes/utils';

import Scene from './scenes_types/scene';

class SceneFactory {
	constructor() {

	}

	/**
	 * Create a new scene
	 * @param {JSON} datas - JSON with scene datas
	 * @return {Scene} - A Scene
	 */ 
	static createScene(datas) {
		// Default scene datas
		Utils.extendObject(datas, {
			name: 'Default name',
		});

		// Create scene
		var scene = null;

		if (datas.type === "Scene") {
			scene =  new Scene(datas);
		}
		else {
			scene = new Scene(datas);
		}

		// Return new scene
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