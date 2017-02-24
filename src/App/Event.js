import {extendObservable} from 'mobx';

export default class Event {
    constructor(other) {
        extendObservable(this, {eventId: other.eventId});
        extendObservable(this, {name: other.name});
        extendObservable(this, {eventDate: other.eventDate});
        extendObservable(this, {location: other.location});
    }
}
