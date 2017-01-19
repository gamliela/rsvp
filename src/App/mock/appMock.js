import {AppStore} from "../AppStore";

const defaultAppMock = new AppStore();
defaultAppMock.title = 'החתונה של דני ומיכל';
defaultAppMock.guests = [
    {
        guestId: 1,
        name: 'שלמה ומירטה',
        tableNumber: 23,
        numGuests: 2,
        newTableNumber: 23,
        newNumGuests: 2,
        newArrivalTime: "16:20",
        newHandledBy: "איילת",
    },
    {
        guestId: 2,
        name: 'אייל ודניאלה',
        tableNumber: 15,
        numGuests: 2,
        newTableNumber: 15,
        newNumGuests: 2,
        newArrivalTime: "17:50",
        newHandledBy: "איילת",
    },
    {
        guestId: 3,
        name: 'משפחת אלימלך',
        tableNumber: 10,
        numGuests: 5
    },
    {
        guestId: 4,
        name: 'נורית ירון',
        tableNumber: 10,
        numGuests: 1
    },
    {
        guestId: 5,
        name: 'משפחת מצליח',
        tableNumber: 3,
        numGuests: 3
    },
    {
        guestId: 6,
        name: 'יובל ודנה',
        tableNumber: 22,
        numGuests: 2,
        newTableNumber: 23,
        newNumGuests: 1,
        newArrivalTime: "16:25",
        newHandledBy: "איילת"
    },
    {
        guestId: 7,
        name: 'משפחת כהן',
        tableNumber: 14,
        numGuests: 5
    },
    {
        guestId: 8,
        name: 'משפחת לוי',
        tableNumber: 12,
        numGuests: 4
    }
];

export { defaultAppMock };