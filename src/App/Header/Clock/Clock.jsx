import React from 'react';
import {nowString} from "../../../shared/util";

export class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        //let date = this.state.date;
        //let dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        //let timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return <span>{nowString(this.state.date)}</span>;
    }
}