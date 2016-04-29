(function() {
	'use strict';
	angular.module('auth.controllers')
	.controller('RegisterCtrl', ['$scope', 'Auth', function($scope, Auth) {
		var vm = this;
		vm.register = register;
		function register() {
			Auth.register(vm.email, vm.password);
		}

	}]);

})();