export const delay = 500;

export const lastEvent = {
    "event": {
        "event_id": 1,
        "name": "החתונה של דני ומיכל",
        "event_date": "2017-01-14",
        "location": "אולמי בראשית ירושלים",
        "comments": "נסיון"
    },
    "guests": [{
        "guest_id": 1,
        "name": "שלמה ומירטה",
        "table_number": "23",
        "num_guests": "2",
        "new_table_number": "23",
        "new_num_guests": "2",
        "new_arrival_time": "16:20:00",
        "new_handled_by": "איילת",
        "comments": ""
    }, {
        "guest_id": 2,
        "name": "אייל ודניאלה",
        "table_number": "15",
        "num_guests": "2",
        "new_table_number": "15",
        "new_num_guests": "2",
        "new_arrival_time": "17:50:00",
        "new_handled_by": "איילת",
        "comments": ""
    }, {
        "guest_id": 3,
        "name": "משפחת אלימלך",
        "table_number": "10",
        "num_guests": "5",
        "comments": "אין שום הערות!!"
    }, {
        "guest_id": 4,
        "name": "נורית ירון",
        "table_number": "10",
        "num_guests": "1",
        "comments": ""
    }, {
        "guest_id": 5,
        "name": "משפחת מצליח",
        "table_number": "3",
        "num_guests": "3",
        "comments": ""
    }, {
        "guest_id": 6,
        "name": "יובל ודנה",
        "table_number": "22",
        "num_guests": "2",
        "new_table_number": "23",
        "new_num_guests": "1",
        "new_arrival_time": "16:25:00",
        "new_handled_by": "איילת",
        "comments": ""
    }, {
        "guest_id": 7,
        "name": "משפחת כהן",
        "table_number": "14",
        "num_guests": "5",
        "comments": ""
    }, {
        "guest_id": 8,
        "name": "משפחת לוי",
        "table_number": "12",
        "num_guests": "4",
        "comments": ""
    }]
};

export const actions = {
    "query-last-event": lastEvent,
    "submit-guest": {}
};

export default actions;
