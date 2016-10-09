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

		this.init();
		window.waitingForInit = setInterval(function() {
			if (Loader.itemsLoaded()) {
				clearInterval(window.waitingForInit);
				Utils.log(Loader.getLoadQueue());
				app.run();
				return;
			}
		
			Utils.log('Loading app...');
		}, 100);
	}

	init() {
		var that = this;

		var loader = Loader.load(this._configPath);
		loader.then(function(config) {
			that._config = config;
			
			Utils.setDebugMode(that._config.debugMode);

			that.initContent();

			that._isReady = true;
		});
	}

	initContent() {
		this._stats = new Stats({
			mode: this._config.stats.mode,
			fps: this._config.fps
		});
		this._stats.init();
		
		this._scenesManager = new SceneManager();
		this._scenesManager.init(this._config.scenes.path);
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