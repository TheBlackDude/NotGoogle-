(function() {
	'use strict';
	angular.module('authentication.controllers')
	.controller('RegisterCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
		var vm = this;
		vm.register = register;
		function register() {
			Authentication.register(vm.email, vm.password);
		}

	}]);

})();