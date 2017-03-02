import React from 'react';
import Header from './Header/Header.jsx';
import {observer} from 'mobx-react';
import appStore from "./AppStore";
import GuestCardList from "./GuestList/GuestList.jsx";
import {Snackbar} from 'react-toolbox/lib/snackbar';
import {ProgressBar} from 'react-toolbox/lib/progress_bar';

@observer
class App extends React.Component {
    render() {
        const store = this.props.store;

        return (
            <div>
                { store.isLoadingNow && <ProgressBar type="linear" mode="indeterminate"/> }
                { store.isLoadingSuccess &&
                <Header
                    title={store.title}
                    filter={store.filter}
                    updateFilter={store.updateFilter}
                    totalGuests={store.totalGuests}
                    totalArrived={store.totalArrived}>
                </Header> }
                { store.isLoadingSuccess &&
                <GuestCardList guests={store.guests} filter={store.filter}></GuestCardList> }
                <Snackbar
                    active={store.isLoadingError}
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