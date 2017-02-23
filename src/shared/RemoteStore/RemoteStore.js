import {computed} from 'mobx';
import {fetchJson} from "../util-server";
import {fromPromise, PENDING, FULFILLED, REJECTED} from "mobx-utils";

export class RemoteStore {

    constructor(fetchResult) {
        this.promise = fromPromise(fetchResult);
    }

    @computed get isLoading() {
        return this.promise.state == PENDING;
    }

    @computed get isLoadingSuccess() {
        return this.promise.state == FULFILLED;
    }

    @computed get isLoadingError() {
        return this.promise.state == REJECTED;
    }

}

export class RemoteJsonStore extends RemoteStore {

    constructor(url) {
        super(fetchJson(url));
    }

}
