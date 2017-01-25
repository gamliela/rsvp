import {AppStore, Guest} from "../AppStore";

const defaultAppMock = new AppStore();
defaultAppMock.title = 'החתונה של דני ומיכל';
defaultAppMock.guests = [
    new Guest({
        guestId: 1,
        name: 'שלמה ומירטה',
        tableNumber: 23,
        numGuests: 2,
        newTableNumber: 23,
        newNumGuests: 2,
        newArrivalTime: "16:20",
        newHandledBy: "איילת",
    }),
    new Guest({
        guestId: 2,
        name: 'אייל ודניאלה',
        tableNumber: 15,
        numGuests: 2,
        newTableNumber: 15,
        newNumGuests: 2,
        newArrivalTime: "17:50",
        newHandledBy: "איילת",
    }),
    new Guest({
        guestId: 3,
        name: 'משפחת אלימלך',
        tableNumber: 10,
        numGuests: 5
    }),
    new Guest({
        guestId: 4,
        name: 'נורית ירון',
        tableNumber: 10,
        numGuests: 1
    }),
    new Guest({
        guestId: 5,
        name: 'משפחת מצליח',
        tableNumber: 3,
        numGuests: 3
    }),
    new Guest({
        guestId: 6,
        name: 'יובל ודנה',
        tableNumber: 22,
        numGuests: 2,
        newTableNumber: 23,
        newNumGuests: 1,
        newArrivalTime: "16:25",
        newHandledBy: "איילת"
    }),
    new Guest({
        guestId: 7,
        name: 'משפחת כהן',
        tableNumber: 14,
        numGuests: 5
    }),
    new Guest({
        guestId: 8,
        name: 'משפחת לוי',
        tableNumber: 12,
        numGuests: 4
    })
];

export {defaultAppMock};