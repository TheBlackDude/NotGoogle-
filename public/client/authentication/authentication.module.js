(function() {
	'use strict';
	angular.module('MainAppModule.authentication', [
		'authentication.controllers',
		'authentication.services'
		]);

	angular.module('authentication.controllers', []);
	angular.module('authentication.services', ['ngCookies']);
})();