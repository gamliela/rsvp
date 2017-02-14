import React from 'react';
import {observer} from 'mobx-react';
import GuestCard from './GuestCard.jsx';
import style from './style.scss';

const GuestCardList = observer(({guests, filter}) => {
    console.log(filter);
    return (
        <div className={style.GuestCardList}>
            {guests
                .filter(guest => !filter || (guest.name && (guest.name.indexOf(filter) != -1)) || (guest.tableNumber && (guest.tableNumber.indexOf(filter) != -1)))
                .map(guest => <GuestCard key={guest.guestId} guest={guest}></GuestCard>)}
        </div>
    );
});

export default GuestCardList;