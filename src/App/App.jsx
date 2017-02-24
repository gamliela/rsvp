import React from 'react';
import Header from './Header/Header.jsx';
import {observer} from 'mobx-react';
import config from "../shared/config/config";
import appStore from "./AppStore";
import GuestCardList from "./GuestList/GuestList.jsx";
import {Snackbar} from 'react-toolbox/lib/snackbar';
import {ProgressBar} from 'react-toolbox/lib/progress_bar';

// TODO: check store communication problems

@observer
class App extends React.Component {
    render() {
        const store = this.props.store;

        // note that App is not using config properties, but inner components do
        // this code is not so clean, as App must know about children dependencies
        const isLoadingNow = config.isLoadingNow || store.isLoadingNow;
        const isLoadingSuccess = config.isLoadingSuccess && store.isLoadingSuccess;
        const isLoadingError = config.isLoadingError || store.isLoadingError;

        return (
            <div>
                { isLoadingNow && <ProgressBar type="linear" mode="indeterminate"/> }
                { isLoadingSuccess &&
                <Header
                    title={store.title}
                    filter={store.filter}
                    updateFilter={store.updateFilter}
                    totalGuests={store.totalGuests}
                    totalArrived={store.totalArrived}>
                </Header> }
                { isLoadingSuccess &&
                <GuestCardList guests={store.guests} filter={store.filter}></GuestCardList> }
                <Snackbar
                    active={isLoadingError}
                    label={'שגיאה - בדוק תקשורת לשרת'}
                    type='warning'
                />
            </div>
        );
    }
}

const GlobalApp = () =>
    <App store={appStore}></App>;

export default GlobalApp;