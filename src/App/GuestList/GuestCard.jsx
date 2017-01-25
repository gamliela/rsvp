import React from 'react';
import {observer} from 'mobx-react';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import style from "./style.scss";

const GuestCard = observer(({guest}) =>
    <Card theme={style}>
        <CardTitle
            title={guest.name}
            subtitle={"שולחן " + guest.tableNumber}
        />
        <CardText>{guest.numGuests} אורחים</CardText>
        <CardActions>
            <div style={{flex: 1}}></div>
            <Button icon='done' floating primary mini/>
        </CardActions>
    </Card>
);

export default GuestCard;