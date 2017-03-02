import {observable, extendObservable, action, computed} from 'mobx';
import config from "../shared/config/config.js";
import {nowString, truncateSeconds} from "../shared/util";
import * as server from "../shared/server/server";
import {useMockData} from "./AppStore";

export default class Guest {

    @observable isSaving = false;
    @observable isSavingError = false;

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
    save(guestData) {
        if (!this.isSaving) {
            this.isSaving = true;
            this.isSavingError = false;

            const newData = {
                guestId: this.guestId,
                newTableNumber: guestData.tableNumber,
                newNumGuests: guestData.numGuests,
                newArrivalTime: guestData.arrivalTimeTruncated && (guestData.arrivalTimeTruncated + ":00"),
                newHandledBy: guestData.handledBy
            };

            server
                .submitGuest(newData, useMockData)
                .then(action(() => {
                    this.isSaving = false;
                    this.newTableNumber = newData.newTableNumber || undefined;
                    this.newNumGuests = newData.newNumGuests || undefined;
                    this.newArrivalTime = newData.newArrivalTime || undefined;
                    this.newHandledBy = newData.newHandledBy || undefined;
                }))
                .catch(action((error) => {
                    this.isSaving = false;
                    this.isSavingError = true;
                    console.log(`guest ${this.guestId} cannot be saved.`, error);
                }));
        }
    }

    saveDefault() {
        this.save({
            tableNumber: this.newTableNumber || this.tableNumber,
            numGuests: this.newNumGuests || this.numGuests,
            arrivalTimeTruncated: truncateSeconds(this.newArrivalTime || nowString()),
            handledBy: this.newHandledBy || config.operatorName,
        });
    }

    @computed get arrived() {
        return this.newArrivalTime && this.newArrivalTime.length;
    }

    @computed get view() {
        return {
            name: this.name,
            tableNumber: typeof(this.newTableNumber) === "string" ? this.newTableNumber : (this.tableNumber || ''),
            numGuests: typeof(this.newNumGuests) === "string" ? this.newNumGuests : (this.numGuests || ''),
            arrivalTimeTruncated: typeof(this.newArrivalTime) === "string" ? truncateSeconds(this.newArrivalTime) : '',
            handledBy: typeof(this.newHandledBy) === "string" ? this.newHandledBy : ''
        }
    }
}
