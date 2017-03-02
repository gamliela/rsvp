import config from "../config/config.js";
import actions from "./serverMockData";
import {fetchJson, encodeQueryData} from "../util-server";
import Guest from "../../App/Guest";
import Event from "../../App/Event";
import {toPromise} from "../mobx-tools/mobx-tools";

const configPromise = toPromise(config);

function fetchData(action, useMockData) {
    if (!useMockData)
        return configPromise.then(config => {
            const queryData = encodeQueryData({
                "access-code": config.accessCode,
                "action": action
            });
            return fetchJson(config.accessUrl + "?" + queryData);
        });
    else
        return Promise.resolve(actions[action]);
}

export function fetchLastEvent(useMockData) {
    return fetchData('query-last-event', useMockData).then(data => {
        let guests = data.guests.map(guest => {
            return new Guest({
                guestId: guest.guest_id,
                name: guest.name,
                tableNumber: guest.table_number,
                numGuests: guest.num_guests,
                newTableNumber: guest.new_table_number,
                newNumGuests: guest.new_num_guests,
                newArrivalTime: guest.new_arrival_time,
                newHandledBy: guest.new_handled_by
            });
        });
        let event = new Event({
            eventId: data.event.event_id,
            name: data.event.name,
            eventDate: data.event.event_date,
            location: data.event.location,
        });
        return {event, guests};
    });
}
