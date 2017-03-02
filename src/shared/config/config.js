import {computed, when} from 'mobx';
import {RemoteJsonStore} from "../mobx-tools/AsyncStore";

export class ConfigStore extends RemoteJsonStore {

    @computed get operatorName() {
        return this.promise.value.operatorName;
    }

    @computed get accessUrl() {
        return this.promise.value.accessUrl;
    }

    @computed get accessCode() {
        return this.promise.value.accessCode;
    }

    @computed get editAllowed() {
        return this.promise.value.editAllowed;
    }

}

// expose config.json in build
const url = require("file-loader?name=[name].[ext]!./config.json");

export const globalConfig = new ConfigStore(url);

export default globalConfig;

// make sure loading error is presented
when(
    () => globalConfig.isLoadingError,
    () => console.error("globalConfig cannot be loaded.", globalConfig.promise.value)
);
