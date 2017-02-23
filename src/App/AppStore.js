import {observable, extendObservable, action, computed} from 'mobx';

export class AppStore {
    @observable title;
    @observable guests = [];
    @observable filter = {
        query: "",
        missingOnly: false
    };

    @action.bound
    updateFilter(filter) {
        this.filter = {...filter};
    }

    @computed get totalGuests() {
        return this.guests.length;
    }

    @computed get totalArrived() {
        return this.guests.filter(guest => guest.arrived).length;
    }
}

export default new AppStore();