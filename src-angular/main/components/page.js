'use strict';

angular.module('myApp.main')

	.component('page', {
		templateUrl: 'main/components/page.html',
		controllerAs: 'page',
		controller: ['server', function (server) {
			var self = this;
			this.people = [];
			this.event = null;

			server.queryLastEvent().then(function (response) {
				self.event = response.data.event;
				self.people = response.data.guests.map(function (guest) {
					var trimSeconds = function (s) {
						if (s)
							return s.substr(0, s.lastIndexOf(":"));
					};
					return {
						guestId: guest.guest_id,
						name: guest.name,
						tableNumber: guest.table_number,
						numGuests: guest.num_guests,
						newTableNumber: guest.new_table_number,
						newNumGuests: guest.new_num_guests,
						newArrivalTime: trimSeconds(guest.new_arrival_time),
						newHandledBy: guest.new_handled_by
					};
				})
			});
		}]
	});
