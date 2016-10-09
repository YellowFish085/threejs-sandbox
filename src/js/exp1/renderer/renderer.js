'use strict';

import RendererFactory from './rendererFactory';
import SceneManager from '../scenes/scenesManager';

class Renderer {
	constructor(domElement) {
		this._domElement    = domElement;
		this._renderer      = null;
		this._scenesManager = new SceneManager();
	}

	init(datas) {
		var that = this;

		return new Promise((resolve, reject) => {
			that._renderer = RendererFactory.createRenderer(datas);
			that.displayRenderer();

			resolve();
		});
	}

	initScenes(datas) {
		return this._scenesManager.init(datas.path);
	}

	displayRenderer() {
		document.getElementById(this._domElement).appendChild(this._renderer.renderer.domElement);
	}
}

export default Renderer;