import { observable } from "@legendapp/state";
import { syncPlugin } from "./utils/syncPlugin";
import { token$ } from "./token";
import { io } from "socket.io-client";

const socket = io("http://localhost/auth");

export const firstLogin$ = observable(syncPlugin({ initial: false, persist: { name: btoa('g-unit-app-persist-first-login') } }));

export const login$ = observable({
    login: syncPlugin({ initial: "", persist: { name: btoa('g-unit-app-persist-login-input') } }),
    password: "",
    visible: false,
    submit: function () {
        socket.emit("login", login$.login.get(), login$.password.get(), (res) => {
            if(res.error) return console.error(res.error);
            token$.set(res.token);
            firstLogin$.set(res.firstLogin);
        });
    }
});

export const signup$ = observable({
    firstname: "",
    lastname: "",
    username: "",
    email: syncPlugin({ initial: "", persist: { name: btoa('g-unit-app-persist-signup-email') } }),
    password: "",
    visible: false,
    submit: function () {
        socket.emit("signup", {
            firstname: signup$.firstname.get(),
            lastname: signup$.lastname.get(),
            username: signup$.username.get(),
            email: signup$.email.get(),
            password: signup$.password.get(),
        }, (res) => {
            if (res.error) return console.error(res.error);
            token$.set(res.token);
            firstLogin$.set(res.firstLogin);
        });
    }
});

export const logout$ = () => token$.set(null);