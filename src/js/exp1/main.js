'use strict';

require('es6-promise').polyfill();

import * as THREE from 'three';

import Utils from './_classes/utils';
import Loader from './loader/loader';

import Stats from './stats/stats';
import Renderer from './renderer/renderer';
import Inputs from './events/inputs';

class App {
	constructor(options) {
		this._configPath = options.config.path;
		this._config     = null;
		this._stats      = null;
		this._renderer   = null;
		this._inputs     = null;

		var init = this.init();
		init.then(function() {
			app.run();
		})
	}

	/**
	 * Initialize app
	 * @return {Promise}
	 */
	init() {
		var that = this;

		var loader = Loader.load(this._configPath)
			.then(function(config) {
				that._config = config;
				
				Utils.setDebugMode(that._config.debugMode);

				that._stats    = new Stats();
				that._renderer = new Renderer(that._config.domElement);
				that._inputs   = new Inputs(that._renderer);
			})
			.then(function() {
				return Promise.all([
					that._stats.init({
						mode: that._config.stats.mode,
						fps: that._config.fps
					}),
					that._renderer.init(that._config.renderer),
					that._renderer.initScenes(that._config.scenes)
				]);
			})

		return loader;
	}

	/**
	 * Run the App
	 */
	run() {
		Utils.log('Running!');
		this._renderer.setupScene();
		this._inputs.initEvents();
		this.render();
	}

	/**
	 * Render the current scene on the Renderer
	 */
	render() {
		requestAnimationFrame(this.render.bind(this));
		this._renderer.render();
	}
}

var app = new App({
	config: {
		path: 'assets/json/config.json'
	}
});