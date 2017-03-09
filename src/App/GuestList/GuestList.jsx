import React from 'react';
import {observer} from 'mobx-react';
import GuestCard from './GuestCard.jsx';
import style from './style.scss';

const GuestCardList = observer(({guests, className}) => {
    let mergedClassName = style.GuestCardList;
    if (className)
        mergedClassName += " " + className;

    return (
        <div className={mergedClassName}>
            {guests
                .map(guest => <GuestCard key={guest.guestId} guest={guest}></GuestCard>)}
        </div>
    );
});

export default GuestCardList;