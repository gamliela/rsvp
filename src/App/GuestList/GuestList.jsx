import React from 'react';
import GuestCard from './GuestCard.jsx';

const GuestCardList = (props) =>
    <div>
        {props.guests.map(guest => <GuestCard key={guest.guestId} guest={guest}></GuestCard>)}
    </div>;

export default GuestCardList;