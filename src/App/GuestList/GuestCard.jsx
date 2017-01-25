import React from 'react';
import {Card,CardTitle,CardText,CardActions} from 'react-toolbox/lib/card';
import {Button,IconButton} from 'react-toolbox/lib/button';
import style from "./style.scss";

const GuestCard = ({guest}) =>
    <Card theme={style}>
        <CardTitle
            title={guest.name}
            subtitle={"שולחן " + guest.tableNumber}
        />
        <CardText>{guest.numGuests} אורחים</CardText>
        <CardActions>
            <div style={{flex:1}}></div>
            <Button icon='done' floating primary mini />
        </CardActions>
    </Card>;

//        {//<CardText>Table Number: {guest.tableNumber}</CardText>}

export default GuestCard;