import config from "../config/config.js";
import actions from "./serverMockData";
import {delay as serverDelay} from "./serverMockData";
import {fetchJson, encodeQueryData} from "../util-server";
import Guest from "../../App/Guest";
import Event from "../../App/Event";
import {toPromise} from "../mobx-tools/mobx-tools";

const configPromise = toPromise(config);

function delay(time) {
    return new Promise(function (fulfill) {
        setTimeout(fulfill, time);
    });
}

function toFormData(data) {
    let formData = new FormData();
    for (let name in data)
        formData.append(name, data[name]);
    return formData;
}

function fetchData(action, method, requestData, useMockData) {
    if (!useMockData) {
        const body = requestData && (method == 'POST') && toFormData({...requestData, action});
        return configPromise.then(config => {
            let url = config.accessUrl;
            if (method == 'GET') {
                url += '?' + encodeQueryData({
                        "access-code": config.accessCode,
                        "action": action
                    });
            }
            return fetchJson(url, {method, body});
        });
    } else
        return delay(serverDelay).then(() => actions[action]);
}

export function fetchLastEvent(useMockData) {
    return fetchData('query-last-event', 'GET', null, useMockData).then(data => {
        let guests = data.guests.map(guest => {
            return new Guest({
                guestId: guest.guest_id,
                name: guest.name,
                tableNumber: guest.table_number,
                numGuests: typeof(guest.num_guests) == 'number' ? guest.num_guests.toString() : guest.num_guests,
                newTableNumber: guest.new_table_number,
                newNumGuests: typeof(guest.new_num_guests) == 'number' ? guest.new_num_guests.toString() : guest.new_num_guests,
                newArrivalTime: guest.new_arrival_time,
                newHandledBy: guest.new_handled_by,
                comments: guest.comments
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

export function submitGuest(guestData, useMockData) {
    return fetchData('submit-guest', 'POST', guestData, useMockData);
}
