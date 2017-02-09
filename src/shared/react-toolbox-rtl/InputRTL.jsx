import React from 'react';
import {Input} from 'react-toolbox/lib/input';
import theme from './theme.scss';

export class InputRTL extends React.Component {
    render() {
        let mergedTheme = Object.assign({}, theme, this.props.theme);
        return <Input {...this.props} theme={mergedTheme} ref={this.setRef}/>
    }

    setRef = (input) => {
        this.wrappedInstance = input && input.getWrappedInstance();
    }
}
