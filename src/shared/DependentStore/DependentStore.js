import {computed, when, observable} from 'mobx';

export class DependentStore {

    @observable areDepsLoading = true;

    constructor(dependencies) {
        when(
            () => dependencies.every(dep => !dep.isLoading),
            () => this.areDepsLoading = false
        );
    }

    @computed get isLoading() {
        return this.areDepsLoading;
    }

    @computed get isLoadingSuccess() {
        return !this.areDepsLoading && dependencies.every(dep => dep.isLoadingSuccess);
    }

    @computed get isLoadingError() {
        return !this.areDepsLoading && !this.isLoadingSuccess;
    }

}
