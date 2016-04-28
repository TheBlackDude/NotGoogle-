(function() {
	'use strict';
	angular.module('mainAppModule', [
		'mainAppModule.config',
		'mainAppModule.routes',
		'mainAppModule.authentication'
		]);

	angular.module('mainAppModule.config', []);
	angular.module('mainAppModule.routes', ['ui.router']);
	angular.module('mainAppModule.authentication', []);
})();