'use strict';

angular.module('myApp.services')

	// send with x-www-form-urlencoded format
	.config(function ($httpProvider, $httpParamSerializerJQLikeProvider) {
		$httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
	})

	.service('server', ['$http', 'config', function ($http, config) {
		return {
			queryLastEvent: function () {
				return $http.get(config.accessUrl, {params: {'action': 'query-last-event', 'access-code': config.accessCode}});
			},
			submitGuest: function (params) {
				params = Object.assign({}, params, {'action': 'submit-guest'});

				return $http({
					method: 'POST',
					url: config.accessUrl,
					data: params
				});
			}
		}
	}]);