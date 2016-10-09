'use strict';

import * as THREE from 'three';

class Renderer {
	constructor(datas) {
		this._renderer = new THREE.WebGLRenderer();
		this._renderer.setSize(datas.width, datas.height);
	}

	get THREErenderer() {
		return this._renderer;
	}
}

export default Renderer;