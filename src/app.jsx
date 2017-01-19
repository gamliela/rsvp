import React from 'react';
import 'react-toolbox/lib/commons.scss';
import styles from './style.scss';
import Header from './header/header.jsx';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

class AppStore {
    @observable title = 'Hello!';
}

@observer
class App extends React.Component {
    render() {
        let store = this.props.store;
        return (
            <div>
                <Header title={store.title}></Header>
                <div className={styles.helloHeader}>
                    Hello World
                </div>
            </div>);
    }
}

const StatefulApp = () =>
    <App store={new AppStore()}></App>;

export default StatefulApp;