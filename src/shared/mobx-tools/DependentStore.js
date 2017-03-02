import {computed, when, observable, runInAction, action} from 'mobx';

export class DependentStore {

    @observable areDepsLoading = true;

    constructor(dependencies) {
        if (dependencies) {
            this.dependencies = dependencies;
            when(
                () => dependencies.every(dep => !dep.isLoading),
                () => runInAction(() => this.areDepsLoading = false)
            );
        } else
            runInAction(() => this.areDepsLoading = false);
    }

    isLoadingImpl() {
        return this.areDepsLoading;
    }

    @computed get isLoading() {
        return this.isLoadingImpl();
    }

    isLoadingSuccessImpl() {
        return (typeof(this.dependencies) == "undefined") ||
            (!this.areDepsLoading && this.dependencies.every(dep => dep.isLoadingSuccessImpl()));
    }

    @computed get isLoadingSuccess() {
        return this.isLoadingSuccessImpl();
    }

    isLoadingErrorImpl() {
        return !this.areDepsLoading && !this.isLoadingSuccessImpl();
    }

    @computed get isLoadingError() {
        return this.isLoadingErrorImpl();
    }

}
