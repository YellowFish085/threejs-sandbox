'use strict';

import Stats from 'stats.js';

class AppStats {
	/**
	 * Availaible options
	 * fps  = application default fps
	 * mode = stats mode
	 */
	constructor() {
		this._fps   = null;
		this._stats = new Stats();
	}

	init(options) {
		return new Promise((resolve, reject) => {
			this._fps                             = options.fps || 60;
			this._stats.domElement.style.position = 'absolute';
			this._stats.domElement.style.top      = '0px';
			this._stats.domElement.style.left     = '0px';
			this._stats.setMode(options.mode);

			this.appendToBody();
			this.setInterval();
			
			resolve();
		});
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