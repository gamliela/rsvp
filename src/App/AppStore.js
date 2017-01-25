import {observable, extendObservable, action} from 'mobx';

export class AppStore {
    @observable title;
    @observable guests = [];
}

export class Guest {
    constructor(other) {
        extendObservable(this, {guestId: other.guestId});
        extendObservable(this, {name: other.name});
        extendObservable(this, {tableNumber: other.tableNumber});
        extendObservable(this, {numGuests: other.numGuests});
        extendObservable(this, {newTableNumber: other.newTableNumber});
        extendObservable(this, {newNumGuests: other.newNumGuests});
        extendObservable(this, {newArrivalTime: other.newArrivalTime});
        extendObservable(this, {newHandledBy: other.newHandledBy});
    }

    @action.bound
    updateStatus(newTableNumber, newNumGuests, newArrivalTime, newHandledBy) {
        this.newTableNumber = newTableNumber;
        this.newNumGuests = newNumGuests;
        this.newArrivalTime = newArrivalTime;
        this.newHandledBy = newHandledBy;
    }
}