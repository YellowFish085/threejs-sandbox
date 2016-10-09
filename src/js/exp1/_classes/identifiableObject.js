'use strict';

class IdentifiableObject {
	constructor() {
		this._id = this.guid();
	}

	/**
	 * Generate a pseudo-uniq id
	 */
	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	get id() {
		return this._id;
	}
}

export default IdentifiableObject;