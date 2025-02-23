import { chatBot$, socket } from "@/store/chat";
import { theme$ } from "@/store/theme";
import { observable, observe } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import { $ScrollView } from "@legendapp/state/react-native";
import { useRef } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

const loading$ = observable(false);
socket.on('loading/chat/bot/box', loading$.set);

export default function ChatBoxBody() {
    const { messages } = use$(chatBot$);
    const scrollView = useRef<ScrollView>(null);
    const loading = use$(loading$);

    observe(() => {
        setTimeout(() => { scrollView.current?.scrollToEnd(); }, 100);
    });

    observe(chatBot$?.messages, () => {
        setTimeout(() => { scrollView.current?.scrollToEnd(); }, 100);
    });

    return <$ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 gap-1`} ref={scrollView}>
        {loading ? <ActivityIndicator size="large" /> : messages.sort((a, b) => a.date - b.date).map((message, index) => <ChatBubble key={index} message={message} fromUser={message.sender === "user"} />)}
    </$ScrollView>
}

export function ChatBubble({ message, fromUser }: { message: { text: string }, fromUser: boolean }) {
    const { bg, primary, muted } = use$(theme$);

    return <View style={tw`flex-row items-center justify-${fromUser ? "end" : "start"}`}>
        <Pressable style={tw`bg-${fromUser ? primary.bg : muted.bg} p-2 px-3 rounded-[20px] max-w-3/4`}>
            <Text style={tw`text-${fromUser ? primary.fg : muted.fg}`}>{message.text}</Text>
        </Pressable>
    </View>
}