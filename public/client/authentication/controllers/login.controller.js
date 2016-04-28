(function() {
	'use strict';
	angular.module('auth.controllers')
	.controller('LoginController', ['$scope', 'Authentication', function($scope, Authentication) {
		var vm = this;
		vm.login = login;
		function login() {
			Authentication.login(vm.email, vm.password);
		}

	}]);

})();