(function() {
	'use strict';
	angular.module('auth.controllers')
	.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
		//var vm = this;
		$scope.logout = Auth.logout;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.currentUser = Auth.currentUser;

	}]);

})();