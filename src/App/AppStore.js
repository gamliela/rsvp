import {observable, extendObservable, action, computed, when} from 'mobx';
import {RemoteStore} from "../shared/RemoteStore/RemoteStore";
import {fetchLastEvent} from "../shared/server/server";

export class AppStore extends RemoteStore {
    @observable filter = {
        query: "",
        missingOnly: false
    };

    constructor(useMockData) {
        super(fetchLastEvent(useMockData));
    }

    @action.bound
    updateFilter(filter) {
        this.filter = {...filter};
    }

    @computed get title() {
        return this.promise.value.event.name;
    }

    @computed get guests() {
        return this.promise.value.guests;
    }

    @computed get totalGuests() {
        return this.promise.value.guests.length;
    }

    @computed get totalArrived() {
        return this.promise.value.guests.filter(guest => guest.arrived).length;
    }
}

const useMockData = false;

export const appStore = new AppStore(useMockData);

export default appStore;

// make sure loading error is presented
when(() => appStore.isLoadingError, () => console.error(appStore.promise.value));
