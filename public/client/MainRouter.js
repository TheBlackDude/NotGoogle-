(function() {
	'use strict';
	angular.module('MainAppModule.routes')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				controller: 'IndexCtrl',
				controllerAs: 'vm',
				templateUrl: '/client/templates/layout/index.html'
			});
		$urlRouterProvider.otherwise('home');
	}]);
})();