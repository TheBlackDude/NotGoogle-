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
			})
			.state('register', {
				url: '/register',
				controller: 'RegisterCtrl',
				controllerAs: 'vm',
				templateUrl: '/client/templates/authentication/register.html',
				onEnter: ['$state', 'Authentication', function($state, Authentication) {
					if (Authentication.isAuthenticated()) {
						$state.go('home');
					}
				}]
			})
			.state('login', {
				url: '/login',
				controller: 'LoginCtrl',
				controllerAs: 'vm',
				templateUrl: '/client/templates/authentication/login.html',
				onEnter: ['$state', 'Authentication', function($state, Authentication) {
					if (Authentication.isAuthenticated()) {
						$state.go('home');
					}
				}]
			});
		$urlRouterProvider.otherwise('home');
	}]);
})();