import {observable} from 'mobx';

export class AppStore {
    @observable title;
    @observable guests = [];
}
