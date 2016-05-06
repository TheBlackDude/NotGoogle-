(function() {
	'use strict';
	angular.module('update.services')
	.factory('Profile', ['$http', function($http) {
		var Profile = {
			get: get,
			update: update
		};

		function get (user_id) {
			return $http.get('/api/' + user_id);
		}

		function update (profile) {
			return $http.put('/api/' + profile._id, profile);
		}

		return Profile;

	}]);
	
})();