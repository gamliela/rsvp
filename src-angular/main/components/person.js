'use strict';

angular.module('myApp.main')

	.component('person', {
		templateUrl: 'main/components/person.html',
		bindings: {
			props: '=props'
		},
		controller: ['server', 'config', function (server, config) {
			var self = this;
			this.isEdit = false;
			this.isSaving = false;
			this.saveError = false;

			// edit operation
			this.edit = function () {
				var now = new Date();
				var padding = function (s) {
					s += "";
					return s.length === 1 ? "0" + s : s;
				};
				this.isEdit = true;
				this.saveError = false;
				this.form = {
					guestId: this.props.person.guestId,
					newTableNumber: typeof(this.props.person.newTableNumber) === "string" ? this.props.person.newTableNumber : this.props.person.tableNumber,
					newNumGuests: typeof(this.props.person.newNumGuests) === "string" ? this.props.person.newNumGuests : this.props.person.numGuests,
					newArrivalTime: typeof(this.props.person.newArrivalTime) === "string" ? this.props.person.newArrivalTime : ( padding(now.getHours()) + ":" + padding(now.getMinutes())),
					newHandledBy: typeof(this.props.person.newHandledBy) === "string" ? this.props.person.newHandledBy : config.operatorName
				};
			};

			// save operation
			this.save = function () {
				self.isSaving = true;
				self.saveError = false;
				var savedData = Object.assign({}, self.form);
				if (savedData.newArrivalTime)
					savedData.newArrivalTime += ":00";
				server.submitGuest(savedData).then(function () {
					if (savedData.newArrivalTime)
						savedData.newArrivalTime = savedData.newArrivalTime.substring(0, savedData.newArrivalTime.length - 3);
					self.props.person = Object.assign(self.props.person, savedData);
					self.isEdit = false;
				}).catch(function () {
					self.saveError = true;
				}).finally(function () {
					self.isSaving = false;
				});
			};

		}]
	});
