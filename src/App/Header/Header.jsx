import React from 'react';
import {observer} from 'mobx-react';
import {AppBar} from 'react-toolbox/lib/app_bar';

const Header = observer(({title}) =>
    <AppBar title={title}/>
);

export default Header;