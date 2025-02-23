import { linked, observable, observe } from "@legendapp/state";
import { syncPlugin } from "./utils/syncPlugin";
import { io } from 'socket.io-client';
import { token$ } from "./token";
import { firstLogin$ } from "./auth";

export const socket = io("http://localhost/chat");
export const user$ = observable(syncPlugin({ initial: {}, persist: { name: btoa('g-unit-app-persist-users') } }));
export const chatBot$ = observable(syncPlugin({ initial: [], persist: { name: btoa('g-unit-app-persist-chat-bot') } }));
export const chat$ = observable(syncPlugin({ initial: [], persist: { name: btoa('g-unit-app-persist-chats') } }));

observe(() => {
    socket.emit("join", token$.get());
    socket.emit("user/get", token$.get(), ({ firstLogin, ...props }) => {
        user$.set({ ...props });
        firstLogin$.set(firstLogin);
    });
    socket.emit("chats/get", token$.get(), ({ msgs, msgBot }) => {
        chat$.set(msgs);
        chatBot$.set(msgBot);
    });
    socket.on('socket/error', (err) => token$.set(""));

    socket.on('user/update', ({ firstLogin, ...props }) => {
        console.log(props, firstLogin);
        user$.set({ ...props });
        firstLogin$.set(firstLogin);
    });

    socket.on('chatBot/update', chatBot$.set);
});