'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import Utils from './_classes/utils';

import * as THREE from 'three';
import Stats from './stats/stats';
import SceneManager from './scenes/scenesManager'

class App {
	constructor(options) {
		this._configPath = options.config.path;
		this._isReady    = false;
	}

	init() {
		var that = this;
		return this.loadConfig()
			.then(function(config) {
				that._config = config;
				that.initContent();

				that._isReady = true;
			});
	}

	loadConfig() {
		return fetch(this._configPath)
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
	}

	initContent() {
		this._debugMode  = this._config.debugMode;
		this._scenesPath = this._config.scenes.path;
		Utils.setDebugMode(this._debugMode);

		this._stats = new Stats({
			mode: this._config.stats.mode,
			fps: this._config.fps
		});
		this._stats.init();
		
		this._scenesManager = new SceneManager();
		this._scenesManager.init();
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

app.init()
	.then(function() {
		app.run();
	})