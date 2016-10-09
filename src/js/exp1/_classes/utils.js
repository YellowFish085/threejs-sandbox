'use strict';

let debugMode = false;

class Utils {
	constructor() {

	}

	static setDebugMode(b) {
		debugMode = b;
	}

	static log(msg) {
		if (debugMode) {
			console.trace(msg);
		}
	}

	/**
	 * Extends a JS object with another object.
	 * @param {JSON} a - The object to extend
	 * @param {JONS} b - extended datas
	 */
	static extendObject(a, b) {
	  if (a && b) {
	    for (var key in b) {
	      if (!a.hasOwnProperty(key)) a[key] = b[key];
	    }
	  }
	}
}

export default Utils;