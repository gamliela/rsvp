function padding(s) {
    s += "";
    return s.length === 1 ? "0" + s : s;
}

export function nowString(now) {
    now = now || new Date();
    return padding(now.getHours()) + ":" + padding(now.getMinutes()) + ":" + padding(now.getSeconds());
}

export function encodeQueryData(data) {
    return Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
}
