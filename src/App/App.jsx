import React from 'react';
import 'react-toolbox/lib/commons.scss';
import styles from './style.scss';
import Header from './Header/Header.jsx';
import {observer} from 'mobx-react';
import {AppStore} from "./AppStore";
import {defaultAppMock} from "./mock/appMock";
import GuestList from "./GuestList/GuestList.jsx";

@observer
class App extends React.Component {
    render() {
        let store = this.props.store;
        return (
            <div>
                <Header title={store.title}></Header>
                <GuestList guests={store.guests} className={styles.ModifiedGuestCardList}></GuestList>
            </div>);
    }
}

//const globalStore = new AppStore();
const globalStore = defaultAppMock;

const GlobalApp = () =>
    <App store={globalStore}></App>;

export default GlobalApp;