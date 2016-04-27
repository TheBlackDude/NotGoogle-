(function() {
	'use strict';
	angular.module('authentication.services')
	.factory('Authentication', ['$cookies', '$http', '$window', '$log', function($cookies, $http, $window, $log) {
		var Authentication = {
			register: register,
			login: login,
			logout: logout,
			saveToken: saveToken,
			getToken: getToken,
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
				Authentication.saveToken(data.data.token);
				Authentication.login(Email, Password);
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
				Authentication.setAuthenticatedAccount(data.data);

				window.location = '/';
			}

			function loginErrorFn(data, status, headers, config) {
				$log.log('Login Failure ' + data.error);
			}
		}

		function logout() {
			return $http.get('/api/logout').then(logoutSuccessFn, logoutErrorFn);

			function logoutSuccessFn(data, status, headers, config) {
				Authentication.unauthenticate();
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

		function getAuthenticatedAccount() {
			if (!$cookies.authenticatedAccount) {
				return;
			}
			return JSON.parse($cookies.authenticatedAccount);
		}

		function setAuthenticatedAccount(account) {
			$cookies.authenticatedAccount = JSON.stringify(account);
			Authentication.saveToken(account.token);
		}

		function isAuthenticated() {
			return !! $cookies.authenticatedAccount
		}

		function unauthenticate() {
			delete $cookies.authenticatedAccount;
		    $window.localStorage.removeItem('google-plus');
		}

		return Authentication
	}]);

})();