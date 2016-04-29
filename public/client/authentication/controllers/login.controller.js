(function() {
	'use strict';
	angular.module('auth.controllers')
	.controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
		var vm = this;
		vm.login = login;
		function login() {
			Auth.login(vm.email, vm.password);
		}

	}]);

})();