(function() {
	'use strict';
	angular.module('mainAppModule.routes')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('register', {
				url: '/register',
				controller: 'RegisterController',
				controllerAs: 'vm',
				templateUrl: '/client/templates/authentication/register.html'
			})
			.state('login', {
				url: '/login',
				controller: 'LoginController',
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