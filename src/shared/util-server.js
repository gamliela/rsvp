import {computed} from 'mobx';

export function encodeQueryData(data) {
    return Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
}

export function fetchContent(url, options) {
    if (window.fetch)
        return window.fetch(url, options).then(response => {
            if (response.ok) {
                return response
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        });
    else
        return Promise.reject(new Error("fetch is not supported"));
}

export function fetchJson(url, options) {
    return fetchContent(url, options).then(content => content.json());
}
