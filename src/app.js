import React, {Component} from 'react';
import styles from './style.scss';
import {AppBar} from 'react-toolbox/lib/app_bar';

const App = () =>
    <div>
        <AppBar>That's app bar</AppBar>
        <div className={styles.helloHeader}>
            Hello World
        </div>
    </div>;

export default App;