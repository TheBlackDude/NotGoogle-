(function() {
	'use strict';
	angular.module('auth.controllers')
	.controller('RegisterController', ['$scope', 'Authentication', function($scope, Authentication) {
		var vm = this;
		vm.register = register;
		function register() {
			Authentication.register(vm.email, vm.password);
		}

	}]);

})();