'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import Utils from '../_classes/utils';

import Scene from './scene';

class ScenesManager {
	constructor() {
		this._scenes = [];
	}

	init(path) {
		if (path) {
			var that = this;
			
			fetch(path)
				.then(function(response) {
					if (response.status >= 400) {
						throw new Error("Bad response from server");
					}
					return response.json();
				})
				.then(function(datas) {
					Utils.log(datas);
					that.initScenes(datas.scenes);
				});
		}
		else {
			// Create an empty scene
			this.add(new Scene());
		}
	}

	initScenes(scenes) {
		for(var i = 0; i < scenes.length; i++) {
			this.add(new Scene(scenes[i]));
		}
	}

	add(scene) {
		var exists = false;
		for (var i = 0; i < this._scenes.length; i++) {
			if (this._scenes[i].id === scene.id) {
				Utils.log('Scene ' + scene.id + ' already in SceneManager. Skip...');
				return false
			}
		}

		this._scenes.push(scene);
		return true;
	}

	remove(scene) {
		this._scenes = this._scenes.filter(function(el) {
			return el.id !== scene.id;
		})
	}

	get scenes() {
		return this._scenes;
	}

	scene(id) {
		return this._scenes.filter(function(el) {
			return el.id === id;
		})[0];
	}
}

export default ScenesManager;