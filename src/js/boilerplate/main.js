'use strict';

import domready from 'domready';

import App from './src/app';

domready(function() {
	const app = new App();
});