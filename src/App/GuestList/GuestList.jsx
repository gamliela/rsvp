import React from 'react';
import {observer} from 'mobx-react';
import GuestCard from './GuestCard.jsx';
import style from './style.scss';

const GuestCardList = observer(({guests, filter}) => {
    let query = filter.query;

    let filterGuestFunction = guest => (
        (!query ||
        (guest.name && (guest.name.indexOf(query) != -1)) ||
        (guest.tableNumber && (guest.tableNumber.indexOf(query) != -1))) &&
        (!filter.missingOnly || !guest.arrived)
    );

    return (
        <div className={style.GuestCardList}>
            {guests
                .filter(filterGuestFunction)
                .map(guest => <GuestCard key={guest.guestId} guest={guest}></GuestCard>)}
        </div>
    );
});

export default GuestCardList;