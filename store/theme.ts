import { linked, observable, observe } from "@legendapp/state"
import { syncPlugin } from "./utils/syncPlugin";

const mode$ = observable<string>(syncPlugin({ initial: "light", persist: { name: btoa('g-unit-app-persist-theme- mode') } }));

const palette$ = observable({
    light: {
        bg: "neutral-100",
        fg: "neutral-900",
        border: "neutral-300",
        muted: { bg: "neutral-200", fg: "neutral-800", border: "neutral-300" },
        ghost: { bg: "transparent", fg: "neutral-800", border: "neutral-200" },

        primary: { 
            bg: "blue-600", fg: "white", border: "blue-700",
            hover: "blue-500", active: "blue-700", disabled: "blue-300",
        },
        secondary: { 
            bg: "indigo-500", fg: "white", border: "indigo-600",
            hover: "indigo-400", active: "indigo-600", disabled: "indigo-300",
        },
        accent: { 
            bg: "yellow-500", fg: "black", border: "yellow-600",
            hover: "yellow-400", active: "yellow-600", disabled: "yellow-300",
        },
        error: { 
            bg: "red-500", fg: "white", border: "red-600",
            hover: "red-400", active: "red-600", disabled: "red-300",
        },
        success: { 
            bg: "green-500", fg: "white", border: "green-600",
            hover: "green-400", active: "green-600", disabled: "green-300",
        },
        warning: { 
            bg: "amber-500", fg: "black", border: "amber-600",
            hover: "amber-400", active: "amber-600", disabled: "amber-300",
        },
        info: { 
            bg: "cyan-500", fg: "white", border: "cyan-600",
            hover: "cyan-400", active: "cyan-600", disabled: "cyan-300",
        },
    },

    dark: {
        bg: "neutral-900",
        fg: "neutral-100",
        border: "neutral-700",
        muted: { bg: "neutral-800", fg: "neutral-200", border: "neutral-700" },
        ghost: { bg: "transparent", fg: "neutral-200", border: "neutral-200" },

        primary: { 
            bg: "blue-500", fg: "white", border: "blue-600",
            hover: "blue-400", active: "blue-600", disabled: "blue-300",
        },
        secondary: { 
            bg: "indigo-400", fg: "white", border: "indigo-500",
            hover: "indigo-300", active: "indigo-500", disabled: "indigo-200",
        },
        accent: { 
            bg: "yellow-400", fg: "black", border: "yellow-500",
            hover: "yellow-300", active: "yellow-500", disabled: "yellow-200",
        },
        error: { 
            bg: "red-400", fg: "white", border: "red-500",
            hover: "red-300", active: "red-500", disabled: "red-200",
        },
        success: { 
            bg: "green-400", fg: "white", border: "green-500",
            hover: "green-300", active: "green-500", disabled: "green-200",
        },
        warning: { 
            bg: "amber-400", fg: "black", border: "amber-500",
            hover: "amber-300", active: "amber-500", disabled: "amber-200",
        },
        info: { 
            bg: "cyan-400", fg: "white", border: "cyan-500",
            hover: "cyan-300", active: "cyan-500", disabled: "cyan-200",
        },
    },
});

export const theme$ = observable(linked({
    get: () => {
        const mode = mode$.get().value ?? mode$.get();
        const palette = palette$?.[mode].get();
        return { mode, ...palette };
    },
    set: (value: string) => mode$.set(value),
}));

export const zoom$ = observable(syncPlugin({ initial: 1, persist: { name: btoa('g-unit-app-persist-zoom') } }));