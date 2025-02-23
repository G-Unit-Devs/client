import { observable, observe } from "@legendapp/state";
import { syncPlugin } from "./utils/syncPlugin";

export const token$ = observable<string | null>(
    syncPlugin({
        initial: null,
        persist: { name: btoa('g-unit-app-persist-token'), }, retry: { infinite: true, }
    })
);