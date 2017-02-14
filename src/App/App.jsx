import React from 'react';
import Header from './Header/Header.jsx';
import {observer} from 'mobx-react';
import appStore from "./AppStore";
import {defaultAppMock} from "./mock/appMock";
import GuestCardList from "./GuestList/GuestList.jsx";
import config from '../shared/config/config.js';
import {Snackbar} from 'react-toolbox/lib/snackbar';
import {ProgressBar} from 'react-toolbox/lib/progress_bar';

@observer
class App extends React.Component {
    render() {
        let store = this.props.store;
        return (
            <div>
                { config.isLoadingNow && <ProgressBar type="linear" mode="indeterminate"/> }
                { config.isLoadingSuccess &&
                <Header
                    title={store.title}
                    filter={store.filter}
                    updateFilter={store.updateFilter}
                    totalGuests={store.totalGuests}
                    totalArrived={store.totalArrived}>
                </Header> }
                { config.isLoadingSuccess &&
                <GuestCardList guests={store.guests} filter={store.filter}></GuestCardList> }
                <Snackbar
                    active={config.isLoadingError}
                    label={'שגיאה - בדוק תקשורת לשרת'}
                    type='warning'
                />
            </div>
        );
    }
}

//const globalStore = appStore;
const globalStore = defaultAppMock;

const GlobalApp = () =>
    <App store={globalStore}></App>;

export default GlobalApp;