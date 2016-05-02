(function() {
	'use strict';

	angular.module('mainAppModule', [
		'mainAppModule.config',
		'mainAppModule.routes',
		'mainAppModule.authentication',
		'mainAppModule.utils'
		]);

	angular.module('mainAppModule.config', []);
	angular.module('mainAppModule.routes', ['ngRoute']);
	angular.module('mainAppModule.authentication', ['mainAppModule.authentication.auth']);
	angular.module('mainAppModule.utils', ['mainAppModule.utils.snackbar']);

})();