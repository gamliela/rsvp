import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import 'react-toolbox/lib/commons.scss';
import 'material-design-icons/iconfont/material-icons.css';
import GlobalApp from './App/App.jsx';
import {ThemeProvider} from 'react-css-themr/lib';
import theme from './shared/react-toolbox-rtl/theme';

// mobx configuration
useStrict(true);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalApp/>
    </ThemeProvider>,
    document.getElementById('app-root'));
