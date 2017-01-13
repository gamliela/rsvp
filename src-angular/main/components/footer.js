'use strict';

angular.module('myApp.main')

	.component('footer', {
		templateUrl: 'main/components/footer.html',
		bindings: {
			props: '=props'
		},
		controller: function () {
			this.totalSeats = function () {
				return this.props.people.reduce(function (a, b) {
					return (+a) + (+b.numGuests);
				}, 0);
			};
			this.totalArrived = function () {
				return this.props.people.reduce(function (a, b) {
					return (+a) + (+b.newNumGuests);
				}, 0);
			};
		}
	});
