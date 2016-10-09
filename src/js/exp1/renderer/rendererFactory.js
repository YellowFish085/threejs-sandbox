'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

class RendererFactory {
	constructor() {

	}
	
	/**
	 * Create a new renderer
	 * @param {JSON} datas - JSON with renderer datas
	 * @return {Renderer} - A three.js renderer
	 */ 
	static createRenderer(datas) {
		// Default renderer datas
		Utils.extendObject(datas, {
			type: 'WebGLRenderer',
			width: window.innerWidth,
			height: window.innerHeight
		});

		// Usefull if datas contains something like "window.innerWidth"
		if (typeof datas.width === "string") {
			datas.width = eval(datas.width);
		}
		if (typeof datas.height === "string") {
			datas.height = eval(datas.height);
		}

		// Create renderer
		var renderer = null;

		if (datas.type === "WebGLRenderer") {
			renderer = RendererFactory.createWebGLRenderer(datas);
		}
		else {
			renderer = RendererFactory.createWebGLRenderer(datas);
		}

		// Return new renderer
		if (!renderer) {
			throw new Error("Renderer was not created");
			return false;
		}
		else {
			return renderer;
		}
	}

	static createWebGLRenderer(datas) {
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(datas.width, datas.height);

		return renderer;
	}
}

export default RendererFactory;