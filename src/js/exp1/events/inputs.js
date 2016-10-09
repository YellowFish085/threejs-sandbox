'use strict';

import Utils from '../_classes/utils';

class Inputs {
	constructor(renderer) {
		this._renderer = renderer;

		this._mousePosition = {
			x: 0,
			y: 0
		}
	}

	initEvents() {
		var a = document.addEventListener('mousemove', this.mouseEvents.bind(this), false);
	}

	mouseEvents(event) {
		this._mousePosition.x = event.clientX - window.innerWidth / 2;
		this._mousePosition.y = event.clientY - window.innerHeight / 2;

		this._renderer.updateCameraPosition(this._mousePosition);
	}
}

export default Inputs;