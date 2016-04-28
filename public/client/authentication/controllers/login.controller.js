(function() {
	'use strict';
	angular.module('authentication.controllers')
	.controller('LoginCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
		var vm = this;
		vm.login = login;
		function login() {
			Authentication.login(vm.email, vm.password);
		}

	}]);
	
})();