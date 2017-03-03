import {observable, action, computed, when} from 'mobx';
import {fetchLastEvent} from "../shared/server/server";
import {AsyncStore} from "../shared/mobx-tools/AsyncStore";
import config from "../shared/config/config";

export class AppStore extends AsyncStore {
    @observable filter = {
        query: "",
        missingOnly: false
    };

    constructor(useMockData) {
        // although config is not used in this class, it is still required by many other children.
        // so it's better to make sure it is loaded instead of checking it on every child.
        super(fetchLastEvent(useMockData), [config]);
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
        return this.promise.value.guests.reduce((a, b) => a + b.numGuestsCount, 0);
    }

    @computed get totalArrived() {
        return this.promise.value.guests.reduce((a, b) => a + (b.arrived ? b.numGuestsCount : 0), 0);
    }
}

export const useMockData = false;

export const appStore = new AppStore(useMockData);

export default appStore;

// make sure loading error is presented
when(
    () => appStore.isLoadingError,
    () => console.error("appStore cannot be loaded.", appStore.promise.value)
);
