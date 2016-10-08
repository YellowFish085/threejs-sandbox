'use strict';

import Stats from 'stats.js';

class AppStats {
	/**
	 * Availaible options
	 * fps  = application default fps
	 * mode = stats mode
	 */
	constructor(options) {
		this._fps = options.fps || 60;
		this._stats = new Stats();

		this._stats.setMode(options.mode);
		this._stats.domElement.style.position = 'absolute';
		this._stats.domElement.style.top      = '0px';
		this._stats.domElement.style.left     = '0px';
	}

	init() {
		this.appendToBody();
		this.setInterval();
	}

	appendToBody() {
		document.body.appendChild(this._stats.domElement);
	}

	setInterval() {
		var stats = this._stats;
		setInterval(function() {
			stats.begin();
			stats.end();
		}, 1000/this._fps)
	}
}

export default AppStats;