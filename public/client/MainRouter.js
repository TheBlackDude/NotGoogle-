(function() {
	'use strict';
	angular.module('mainAppModule.routes')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		    .when('/register', {
		    	controller: 'RegisterCtrl',
		    	controllerAs: 'vm',
		    	templateUrl: '/client/templates/authentication/register.html'
		    })
		    .when('/login', {
		    	controller: 'LoginCtrl',
		    	controllerAs: 'vm',
		    	templateUrl: '/client/templates/authentication/login.html'
		    })
		    .otherwise('/');
	}]);
	
})();