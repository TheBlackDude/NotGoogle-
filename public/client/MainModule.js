(function() {
	'use strict';

	angular.module('mainAppModule', [
		'mainAppModule.config',
		'mainAppModule.routes',
		'mainAppModule.authentication'
		]);

	angular.module('mainAppModule.config', []);
	angular.module('mainAppModule.routes', ['ngRoute']);
	angular.module('mainAppModule.authentication', ['mainAppModule.authentication.auth']);

})();