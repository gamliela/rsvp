import React from 'react';
import 'react-toolbox/lib/commons.scss';
import styles from './style.scss';
import Header from './header/header.jsx';

const App = () =>
    <div>
        <Header></Header>
        <div className={styles.helloHeader}>
            Hello World
        </div>
    </div>;

export default App;