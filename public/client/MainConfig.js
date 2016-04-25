(function () {
	'use strict';
	angular.module('MainAppModule.config').config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}]);
})();