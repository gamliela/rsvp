import React from 'react';
import Input from 'react-toolbox/lib/input/Input.js';
import {rtl} from './input.scss';

export class InputRTL extends React.Component {
    render() {
        return <Input {...this.props} className={rtl} ref={this.setRef}/>
    }

    setRef = (input) => {
        this.wrappedInstance = input && input.getWrappedInstance();
    }
}
