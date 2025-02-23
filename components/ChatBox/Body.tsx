import { chatBot$, socket } from "@/store/chat";
import { theme$ } from "@/store/theme";
import { observable, observe } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import { $ScrollView } from "@legendapp/state/react-native";
import { useRef } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import MediaObject from "../MediaObject";
import { FontAwesome } from '@expo/vector-icons';

const loading$ = observable(false);
socket.on('loading/chat/bot/box', loading$.set);
socket.on('recommendation/pro', console.log);

export default function ChatBoxBody() {
    const chatBot = use$(chatBot$);
    const scrollView = useRef<ScrollView>(null);
    const loading = use$(loading$);

    observe(() => {
        setTimeout(() => { scrollView.current?.scrollToEnd(); }, 100);
    });

    if(chatBot$?.messages) observe(chatBot$?.messages, () => {
        setTimeout(() => { scrollView.current?.scrollToEnd(); }, 100);
    });

    return <$ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 gap-1`} ref={scrollView}>
        {loading ? <ActivityIndicator size="large" /> : chatBot?.messages.sort((a, b) => a.date - b.date).map((message, index) => {
            if (message.type === "recommendation") return <Recommendation key={index} message={message} />
            return <ChatBubble key={index} message={message} fromUser={message.sender === "user"} />
        })}
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

export function Recommendation({ message }) {
    const { bg, muted, primary } = use$(theme$);

    console.log(message);

    return <View style={tw`flex items-start justify-start`}>
        <Pressable style={tw`bg-${muted.bg} p-2 px-3 rounded-[20px] max-w-3/4`}>
            <Text style={tw`text-${muted.fg}`}>{message.text}</Text>
        </Pressable>
        <View style={tw`flex gap-2 p-2`}>
            {message.pros.map((user, index) => {
                return <MediaObject
                    key={index}
                    text={user.username}
                    title={user.firstname + " " + user.lastname}
                    right={
                        <FontAwesome name="send-o" size={24} color={tw`text-${primary.bg}`.color} />
                    } />
            })}
        </View>
    </View>
}

