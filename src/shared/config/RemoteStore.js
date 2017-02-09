import {observable, extendObservable, action, computed} from 'mobx';

export const Status = {
    EMPTY: 1,
    LOADING: 2,
    LOADED: 3,
    ERROR: 4
};

function checkStatus(response) {
    if (response.ok) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json()
}

export class RemoteStore {
    @observable status = Status.LOADING;
    @observable data = null;
    @observable err = null;

    constructor(url, parseFunction) {
        if (window.fetch)
            window.fetch(url)
                .then(checkStatus)
                .then(parseFunction)
                .then(this.emitData)
                .catch(this.emitError);
        else
            this.emitError("fetch is not supported");
    }

    @computed get errorMessage() {
        if (this.status == Status.ERROR) {
            if (typeof(this.err) === 'string')
                return this.err;
            else if ((typeof(this.err) === 'object') && (typeof(this.err.message) === 'string'))
                return this.err.message;
            else
                return '';
        }
    }

    @action.bound emitData(data) {
        this.status = Status.LOADED;
        this.data = data || {};
    }

    @action.bound emitError(err) {
        this.status = Status.ERROR;
        this.err = err || "";
    }

    @computed get isLoadingNow() {
        return this.status === Status.LOADING;
    }

    @computed get isLoadingSuccess() {
        return this.status === Status.LOADED;
    }

    @computed get isLoadingError() {
        return this.status === Status.ERROR;
    }

    @computed get isLoadingCompleted() {
        return this.status === Status.LOADED || this.status === Status.ERROR;
    }

}

export class RemoteJsonStore extends RemoteStore {
    constructor(url) {
        super(url, parseJSON);
    }
}
