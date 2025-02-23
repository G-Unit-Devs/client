import { For } from "@legendapp/state/react";
import Title from "../Title";
import List from "../List";
import MediaObject from "../MediaObject";
import { chat$ } from "@/store/chat";
import { router } from "expo-router";

export default function ChatSection() {
    return <>
        <Title>Messages</Title>
        <List>
            <For each={chat$}>
                {item$ => {
                    const lastMessage = item$.messages.sort((a, b) => b.date - a.date)[0];

                    const names = item$?.users?.get()?.map(user => user?.firstname ? user?.firstname + " " + user?.lastname : user?.username)?.join(", ");

                    return <>
                        <MediaObject title={names} onPress={() => router.navigate(`/chat/${item$._id.get()}`)} text={lastMessage?.content ?? "Lancez la discussion !"} />
                    </>
                }}
            </For>
        </List>
    </>;
}