import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox.js';
import {rtl} from './checkbox.scss';

export class CheckboxRTL extends React.Component {
    render() {
        return <Checkbox {...this.props} className={rtl} />
    }
}
