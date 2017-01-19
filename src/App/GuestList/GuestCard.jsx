import React from 'react';
import {Card,CardTitle} from 'react-toolbox/lib/card';

const GuestCard = (props) =>
    <Card>
        <CardTitle
            title={props.guest.name}
        />
    </Card>;

export default GuestCard;