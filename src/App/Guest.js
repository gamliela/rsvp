import {observable, extendObservable, action, computed} from 'mobx';
import Config from "../shared/config/config.js";
import {nowString} from "../shared/util";

export default class Guest {
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
    update({tableNumber, numGuests, arrivalTimeTruncated, handledBy}) {
        this.newTableNumber = tableNumber;
        this.newNumGuests = numGuests;
        this.newArrivalTime = arrivalTimeTruncated && (arrivalTimeTruncated + ":00");
        this.newHandledBy = handledBy;
    }

    @action.bound
    updateDefault() {
        if (!this.newTableNumber)
            this.newTableNumber = this.tableNumber;
        if (!this.newNumGuests)
            this.newNumGuests = this.numGuests;
        if (!this.newArrivalTime)
            this.newArrivalTime = nowString();
        if (!this.newHandledBy)
            this.newHandledBy = Config.operatorName;
    }

    @computed get arrived() {
        return this.newArrivalTime && this.newArrivalTime.length;
    }

    @computed get view() {
        let truncateSeconds = s => s.substring(0, s.length - 3);
        return {
            name: this.name,
            tableNumber: typeof(this.newTableNumber) === "string" ? this.newTableNumber : (this.tableNumber || ''),
            numGuests: typeof(this.newNumGuests) === "string" ? this.newNumGuests : (this.numGuests || ''),
            arrivalTimeTruncated: typeof(this.newArrivalTime) === "string" ? truncateSeconds(this.newArrivalTime) : '',
            handledBy: typeof(this.newHandledBy) === "string" ? this.newHandledBy : ''
        }
    }
}
