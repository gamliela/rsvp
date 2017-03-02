import {computed} from 'mobx';
import {fetchJson} from "../util-server";
import {fromPromise, PENDING, FULFILLED, REJECTED} from "mobx-utils";
import {DependentStore} from "./DependentStore";

export class AsyncStore extends DependentStore {

    constructor(fetchResult, dependencies) {
        super(dependencies);
        this.promise = fromPromise(fetchResult);
    }

    @computed get isLoading() {
        return super.isLoadingImpl() || this.promise.state == PENDING;
    }

    @computed get isLoadingSuccess() {
        return super.isLoadingSuccessImpl() && this.promise.state == FULFILLED;
    }

    @computed get isLoadingError() {
        return super.isLoadingErrorImpl() || this.promise.state == REJECTED;
    }

}

export class RemoteJsonStore extends AsyncStore {

    constructor(url, dependencies) {
        super(fetchJson(url), dependencies);
    }

}
