(function() {
	'use strict';
	angular.module('mainAppModule.authentication.auth', [
		'auth.controllers',
		'auth.services'
		]);

	angular.module('auth.controllers', []);
	angular.module('auth.services', ['ngCookies']);
})();