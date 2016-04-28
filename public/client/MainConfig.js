(function () {
	'use strict';
	angular.module('mainAppModule.config').config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}]);
})();