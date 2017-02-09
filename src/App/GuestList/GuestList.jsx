import React from 'react';
import {observer} from 'mobx-react';
import GuestCard from './GuestCard.jsx';
import style from './style.scss';

const GuestCardList = observer(({guests}) =>
    <div className={style.GuestCardList}>
        {guests.map(guest => <GuestCard key={guest.guestId} guest={guest}></GuestCard>)}
    </div>
);

export default GuestCardList;