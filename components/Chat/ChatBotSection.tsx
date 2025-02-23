import MediaObject from "@/components/MediaObject";
import { chatBot$ } from "@/store/chat";
import { use$ } from "@legendapp/state/react";
import { router } from 'expo-router';
import Title from "../Title";
import List from "../List";
import { FontAwesome5 } from '@expo/vector-icons';
import tw from "twrnc";
import { theme$ } from "@/store/theme";

export default function ChatBotSection() {
    const { primary } = use$(theme$);
    const chatBot = use$(chatBot$);
    const lastMessageBot = chatBot.messages.sort((a, b) => b.date - a.date)[0];
    const lastMessageText = lastMessageBot ? (lastMessageBot.sender === "bot" ? "Paris" : "Vous") + ": " + lastMessageBot.text : "Faites le premier pas !";

    return <>
        <Title>ChatBot</Title>
        <List>
            <MediaObject title="Paris (Bot)" icon={<FontAwesome5 name="robot" size={32} color={tw`text-${primary.bg}`.color} /> } onPress={() => router.navigate('/chat/bot')} text={lastMessageText} />
        </List>
    </>;
}