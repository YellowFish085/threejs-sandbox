'use strict';

require('es6-promise').polyfill();

import * as THREE from 'three';

import Utils from './_classes/utils';
import Loader from './loader/loader';

import Stats from './stats/stats';
import SceneManager from './scenes/scenesManager'

class App {
	constructor(options) {
		this._configPath = options.config.path;
		this._isReady    = false;

		var init = this.init();
		init.then(function() {
			app.run();
		})
	}

	init() {
		var that = this;

		var loader = Loader.load(this._configPath)
			.then(function(config) {
				that._config = config;
				
				Utils.setDebugMode(that._config.debugMode);

				that._stats = new Stats({
					mode: that._config.stats.mode,
					fps: that._config.fps
				});
				that._stats.init();
				
				that._scenesManager = new SceneManager();
			})
			.then(function() {
				return Promise.all([that._scenesManager.init(that._config.scenes.path)]);
			})

		return loader;
	}

	run() {
		Utils.log('Running!');
	}
}

var app = new App({
	config: {
		path: 'assets/json/config.json'
	}
});