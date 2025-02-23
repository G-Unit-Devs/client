import { configureSynced } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv"

export const syncPlugin = configureSynced({
    persist: {
        plugin: ObservablePersistMMKV
    }
})