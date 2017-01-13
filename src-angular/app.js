'use strict';

angular.module('myApp', ['ngRoute', 'myApp.main'])

	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
	}])

	.service('myApp.')