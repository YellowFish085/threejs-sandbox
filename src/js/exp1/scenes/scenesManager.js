'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import Utils from '../_classes/utils';
import Loader from '../loader/loader';

import SceneFactory from './sceneFactory';

class ScenesManager {
	constructor() {
		this._scenes       = [];
		this._currentScene = 0;
	}

	/**
	 * Initialize scenesManager
	 * @param {string} path - Path to the json with the scenes datas
	 * @return {Promise}
	 */
	init(path) {
		if (!path) {
			Utils.log('Empty path for scenes datas');
			return false;
		}
		
		var that = this;
		
		var loader = Loader.load(path)
			.then(function(datas) {
				Utils.log(datas);
				that.initScenes(datas);
			});

		return loader;
	}

	/**
	 * Initialize scenes
	 * @param {JSON} scenesDatas - JSON with the datas
	 * @return {boolean} true if all scenes are initialized
	 */
	initScenes(scenesDatas) {
		for(var i = 0; i < scenesDatas.scenes.length; i++) {
			if (!this.add(scenesDatas.scenes[i])) {
				throw new Error('Error while adding scene.')
				Utils.log(scenesDatas.scenes[i]);
				return false;
			}
		}

		this._currentScene = parseInt(scenesDatas.defaultScene);

		return true;
	}

	/**
	 * Add a scene
	 * @param {JSON} sceneDatas - JSON with the datas
	 * @return {boolean} true if scene is added
	 */
	add(sceneDatas) {
		if (!sceneDatas) {
			return false;
		}

		var exists = false;
		for (var i = 0; i < this._scenes.length; i++) {
			if (this._scenes[i].id === sceneDatas.id) {
				Utils.log('Scene ' + sceneDatas.id + ' already in SceneManager. Skip...');
				return false
			}
		}

		var newScene = SceneFactory.createScene(sceneDatas);
		if (!newScene) {
			return false;
		}

		this._scenes.push(newScene);
		return true;
	}

	/**
	 * Remove scene
	 * @param {string} id - Id of the scene
	 * @return {boolean} true if scene is removed
	 */
	remove(id) {
		var newScenesArray = this._scenes.filter(function(el) {
			return el.id !== id;
		})

		if (newScenesArray.length != this._scenes.length) {
			this._scenes.length = newScenesArray;
			return true;
		}
		else {
			return false;
		}
	}

	get scenes() {
		return this._scenes;
	}

	/**
	 * Return a scene
	 * @param {string} id - Id of the scene
	 */
	scene(id) {
		return this._scenes.filter(function(el) {
			return el.id === id;
		})[0];
	}

	/**
	 * Get current scene
	 * @return {Scene} Current scene
	 */
	get currentScene() {
		return this._scenes[this._currentScene];
	}
}

export default ScenesManager;