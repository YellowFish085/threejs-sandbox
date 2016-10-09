'use strict';

import * as THREE from 'three';

import Utils from '../_classes/utils';

import WebGLRenderer from './renderers_types/webGLRenderer';

class RendererFactory {
	constructor() {

	}

	static createRenderer(options) {
		// Initialize renderer datas
		Utils.extendObject(options, {
			type: 'WebGLRenderer',
			width: window.innerWidth,
			height: window.innerHeight
		});

		// Usefull if datas contains something like "window.innerWidth"
		if (typeof options.width === "string") {
			options.width = eval(options.width);
		}
		if (typeof options.height === "string") {
			options.height = eval(options.height);
		}

		var renderer = null;

		if (options.type === "WebGLRenderer") {
			renderer = new WebGLRenderer(options);
		}
		else {
			renderer = new WebGLRenderer(options);
		}

		if (!renderer) {
			throw new Error("Renderer was not created");
			return false;
		}
		else {
			return renderer;
		}
	}
}

export default RendererFactory;