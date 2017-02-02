import React from 'react';
import {Input} from 'react-toolbox/lib/input';
import theme from './theme.scss';

export class InputRTL extends React.Component {
    render() {
        return <Input {...this.props} theme={theme} ref={this.setRef}/>
    }

    setRef = (input) => {
        this.wrappedInstance = input && input.getWrappedInstance();
    }
}
