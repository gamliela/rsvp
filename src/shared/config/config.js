import {observable, extendObservable, action, computed} from 'mobx';
import {RemoteJsonStore} from "./RemoteStore";

export class ConfigStore extends RemoteJsonStore {

    constructor() {
        super(url);
    }

    @computed get operatorName() {
        return this.isLoadingSuccess && this.data.operatorName;
    }

    @computed get accessUrl() {
        return this.isLoadingSuccess && this.data.accessUrl;
    }

    @computed get accessCode() {
        return this.isLoadingSuccess && this.data.accessCode;
    }

    @computed get editAllowed() {
        return this.isLoadingSuccess && this.data.editAllowed;
    }

}

// expose config.json in build
var url = require("file-loader?name=[name].[ext]!./config.json");

export default new ConfigStore(url);