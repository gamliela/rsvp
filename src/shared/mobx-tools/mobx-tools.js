import {when} from "mobx";

export function toPromise(store) {
    return new Promise(function (resolve, reject) {
        when(() => !store.isLoading, () => {
            if (store.isLoadingSuccess)
                resolve(store);
            else
                reject(new Error("store cannot be loaded"));
        });
    });
}
