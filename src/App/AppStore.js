import {observable, extendObservable, action, computed, when} from 'mobx';
import {fetchLastEvent} from "../shared/server/server";
import {RemoteStore} from "../shared/RemoteStore/RemoteStore";
import config from "../shared/config/config";

export class AppStore {
    @observable filter = {
        query: "",
        missingOnly: false
    };

    @observable lastEventStore = null;

    constructor(useMockData) {
        // fetch event from server only when config is ready
        when(
            () => config.isLoadingSuccess,
            action(() => this.lastEventStore = new RemoteStore(fetchLastEvent(useMockData)))
        );
    }

    @computed get isLoading() {
        return config.isLoading
            || (config.isLoadingSuccess && (this.lastEventStore == null))           // do we really need this?
            || ((this.lastEventStore != null) && this.lastEventStore.isLoading);
    }

    @computed get isLoadingSuccess() {
        return (this.lastEventStore != null) && this.lastEventStore.isLoadingSuccess;
    }

    @computed get isLoadingError() {
        return config.isLoadingError || ((this.lastEventStore != null) && this.lastEventStore.isLoadingError);
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
when(
    () => appStore.lastEventStore && appStore.lastEventStore.isLoadingError,
    () => console.error(appStore.lastEventStore.promise.value)
);
