import React from 'react';
import Header from './Header/Header.jsx';
import {observer} from 'mobx-react';
import {AppStore} from "./AppStore";
import {defaultAppMock} from "./mock/appMock";
import GuestCardList from "./GuestList/GuestList.jsx";

@observer
class App extends React.Component {
    render() {
        let store = this.props.store;
        return (
            <div>
                <Header title={store.title}></Header>
                <GuestCardList guests={store.guests}></GuestCardList>
            </div>);
    }
}

//const globalStore = new AppStore();
const globalStore = defaultAppMock;

const GlobalApp = () =>
    <App store={globalStore}></App>;

export default GlobalApp;