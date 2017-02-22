import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox.js';
import {rtl} from './checkbox.scss';
import {themr} from "react-css-themr";
import {CHECKBOX} from "react-toolbox/lib/identifiers.js";
import {RIPPLE} from "react-toolbox/lib/identifiers.js";
import checkBoxTheme from './checkbox.scss';
import rippleTheme from 'react-toolbox/lib/ripple/theme.scss';

@themr(RIPPLE, rippleTheme, {composeTheme: 'deeply'})
@themr(CHECKBOX, checkBoxTheme, {composeTheme: 'deeply'})
export class CheckboxRTL extends React.Component {
    render() {
        return <Checkbox {...this.props} className={rtl}/>
    }
}
