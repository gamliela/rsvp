import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import 'react-toolbox/lib/commons.scss';
import 'material-design-icons/iconfont/material-icons.css';
import GlobalApp from './App/App.jsx';

// mobx configuration
useStrict(true);

ReactDOM.render(
    <GlobalApp/>,
    document.getElementById('app-root'));
