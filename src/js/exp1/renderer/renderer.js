'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

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
		return this._scenesManager.init(datas.path)
	}

	displayRenderer() {
		document.getElementById(this._domElement).appendChild(this._renderer.THREErenderer.domElement);
	}

	// Remove after tests
	preRender() {
		var geometry       = new THREE.BoxGeometry(1, 1, 1);
		var material       = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this._cube           = new THREE.Mesh(geometry, material);

		this._currentScene = this._scenesManager.currentScene;
		this._currentScene.THREEscene.add(this._cube);

		this._camera = this._currentScene.camera;
		Utils.log(this._camera);
		this._camera.THREEcamera.position.z = 5;
	}

	animateCube() {
		this._cube.rotation.x += 0.01;
		this._cube.rotation.y += 0.01;
	}

	// End remove after tests
	render() {
		this.animateCube();
		this._renderer.THREErenderer.render(this._currentScene.THREEscene, this._camera.THREEcamera);
	}
}

export default Renderer;