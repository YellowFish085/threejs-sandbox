'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

import RendererFactory from './rendererFactory';
import SceneManager from '../scenes/scenesManager';

class Renderer {
	constructor(domElement) {
		this._domElementId  = domElement;
		this._threeRenderer = null;
		this._scenesManager = new SceneManager();
	}

	/**
	 * Initialize renderer
	 * @param {JSON} datas - Datas of the renderer
	 * @return {Promise}
	 */
	init(datas) {
		var that = this;

		return new Promise((resolve, reject) => {
			that._threeRenderer = RendererFactory.createRenderer(datas);
			that.displayRenderer();

			resolve();
		});
	}

	/**
	 * Initialize scene datas
	 * @param {JSON} datas - Scenes datas
	 * @return {Promise}
	 */
	initScenes(datas) {
		return this._scenesManager.init(datas.path)
	}

	/**
	 * Display renderer
	 */
	displayRenderer() {
		document.getElementById(this._domElementId)
			.appendChild(this._threeRenderer.domElement);
	}

	/**
	 * Initialize current scene meshes
	 */
	setupScene() {
		this._scenesManager.currentScene.setupScene();
	}

	/**
	 * Render function
	 */
	render() {
		this._threeRenderer.render(
			this._scenesManager.currentScene.threeScene,
			this._scenesManager.currentScene.threeCamera
		);
	}

	updateCameraPosition(mousePosition) {
		this._scenesManager.currentScene.threeCamera.position.x = (mousePosition.x - this._scenesManager.currentScene.threeCamera.position.x) * 0.05;
		this._scenesManager.currentScene.threeCamera.position.y = (mousePosition.y - this._scenesManager.currentScene.threeCamera.position.y) * 0.05;

		this._scenesManager.currentScene.threeCamera.lookAt(this._scenesManager.currentScene.threeScene.position);
	}
}

export default Renderer;