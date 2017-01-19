import React from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';

const Header = (props) =>
    <AppBar>{props.title}</AppBar>;

export default Header;