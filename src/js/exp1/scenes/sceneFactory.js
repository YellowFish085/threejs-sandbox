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

		if (options.type === "Scene") {
			return new Scene(options);
		}
		else {
			return new Scene(options);
		}
	}
}

export default SceneFactory;