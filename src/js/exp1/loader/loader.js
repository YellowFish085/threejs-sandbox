'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import Utils from '../_classes/utils';

let loadQueue = [];

class Loader {
	constructor() {

	}

	static load(path) {
		if (!path) {
			throw new Error('Path not specified');
			return false;
		}

		path = path + '?' + Math.random();

		loadQueue.push({
			id: path,
			resolved: false,
			loaded: false,
			error: false,
			error_type: '',
			start_time: Date.now(),
			end_time: null,
			duration: null
		});
		var index = loadQueue.length - 1;
		
		return fetch(path)
			.then(function(response) {
				var end_time = Date.now();
				Loader.itemResolved(index, end_time);

				if (response.status >= 400) {
					throw new Error("Bad response from server");
					Loader.itemError(index, response.status);
				}
				else {
					Loader.itemLoaded(index);
				}
				return response.json();
			})
	}

	static itemResolved(index, end_time) {
		loadQueue[index].resolved = true;
		loadQueue[index].end_time = end_time;
		loadQueue[index].duration = end_time - loadQueue[index].start_time;
	}

	static itemLoaded(index) {
		loadQueue[index].loaded = true;
	}

	static itemError(index, type) {
		loadQueue[index].error      = true;
		loadQueue[index].error_type = type;
	}

	static itemsLoaded() {
		for (var i = 0; i < loadQueue.length; i++) {
			if (!loadQueue[i].resolved) {
				return false;
			}
		}

		return true;
	}

	static getLoadQueue() {
		return loadQueue;
	}
}

export default Loader;