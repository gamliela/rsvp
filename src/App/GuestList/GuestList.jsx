import React from 'react';
import {observer} from 'mobx-react';
import GuestCard from './GuestCard.jsx';
import styles from './style.scss';

const GuestCardList = observer(({guests}) =>
    <div className={styles.GuestCardList}>
        {guests.map(guest => <GuestCard key={guest.guestId} guest={guest}></GuestCard>)}
    </div>
);

export default GuestCardList;