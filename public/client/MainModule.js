(function() {
	'use strict';
	angular.module('MainAppModule', [
		'MainAppModule.config',
		'MainAppModule.routes',
		'MainAppModule.authentication'
		]);

	angular.module('MainAppModule.config', []);
	angular.module('MainAppModule.routes', ['ui.router']);
	angular.module('MainAppModule.authentication', []);
})();