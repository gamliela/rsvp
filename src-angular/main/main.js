'use strict';

angular.module('myApp.main', ['ngRoute', 'myApp.services'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			template: '<page></page>'
		});
	}]);