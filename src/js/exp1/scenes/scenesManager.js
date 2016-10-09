'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import Utils from '../_classes/utils';
import Loader from '../loader/loader';

import SceneFactory from './sceneFactory';

class ScenesManager {
	constructor() {
		this._scenes = [];
	}

	/**
	 * Initialize scenesManager
	 * @param {string} path - Path to the json with the scenes datas
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
				that.initScenes(datas.scenes);
			});

		return loader;
	}

	/**
	 * Initialize scenes
	 * @param {JSON} scenesDatas - JSON with the datas
	 * @return {boolean} true if all scenes are initialized
	 */
	initScenes(scenesDatas) {
		for(var i = 0; i < scenesDatas.length; i++) {
			if (!this.add(scenesDatas[i])) {
				throw new Error('Error while adding scene.')
				Utils.log(scenesDatas[i]);
				return false;
			}
		}

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

	/**
	 * Return scenes
	 * @return {array} Array with scenes
	 */
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
}

export default ScenesManager;