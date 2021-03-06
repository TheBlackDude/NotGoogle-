(function() {
	'use strict';
	angular.module('auth.services')
	.factory('Auth', ['$cookies', '$http', '$window', '$log', '$location', function($cookies, $http, $window, $log, $location) {
		var Auth = {
			register: register,
			login: login,
			logout: logout,
			saveToken: saveToken,
			getToken: getToken,
			isLoggedIn: isLoggedIn,
			currentUser: currentUser,
			getAuthenticatedAccount: getAuthenticatedAccount,
			setAuthenticatedAccount: setAuthenticatedAccount,
			isAuthenticated: isAuthenticated,
			unauthenticate: unauthenticate
		};

		function register(email, password) {
			var Email = email;
			var Password = password;
			return $http.post('/api/register', {
				email: email,
				password: password
			}).then(registerSuccessFn, registerErrorFn);

			function registerSuccessFn(data, status, headers, config) {
				Auth.saveToken(data.data.token);
				Auth.login(Email, Password);
			}

			function registerErrorFn(data, status, headers, config) {
				$log.log('Registration Failure ' + data.error);
			}
		}

		function login(email, password) {
			return $http.post('/api/login', {
				email: email,
				password: password
			}).then(loginSuccessFn, loginErrorFn);

			function loginSuccessFn(data, status, headers, config) {
				Auth.setAuthenticatedAccount(data.data);

				$location.url('/');
			}

			function loginErrorFn(data, status, headers, config) {
				$log.log('Login Failure ' + data.error);
			}
		}

		function logout() {
			return $http.get('/api/logout').then(logoutSuccessFn, logoutErrorFn);

			function logoutSuccessFn(data, status, headers, config) {
				Auth.unauthenticate();
			}

			function logoutErrorFn(data, status, headers, config) {
				$log.log('Logout Failure ' + data.error);
			}
		}

		function saveToken(token) {
			$window.localStorage['google-plus'] = token;
		}

		function getToken() {
			return $window.localStorage['google-plus']
		}

		function isLoggedIn() {
			var token = Auth.getToken()
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		}

		function currentUser() {
			if (Auth.isLoggedIn()) {
				var token = Auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.username;
			}
		}

		function getAuthenticatedAccount() {
			if (!$cookies.authenticatedAccount) {
				return;
			}
			return JSON.parse($cookies.authenticatedAccount);
		}

		function setAuthenticatedAccount(account) {
			$cookies.authenticatedAccount = JSON.stringify(account);
			Auth.saveToken(account.token);
		}

		function isAuthenticated() {
			return !! $cookies.authenticatedAccount
		}

		function unauthenticate() {
			delete $cookies.authenticatedAccount;
		    $window.localStorage.removeItem('google-plus');
		}

		return Auth
	}]);

})();