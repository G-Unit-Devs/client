import { ActivityIndicator, View } from "react-native";;
import tw from "twrnc";
import Input from "@/components/Input";
import { FontAwesome as Fa } from '@expo/vector-icons';
import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { socket } from "@/store/chat";
import { token$ } from "@/store/token";
import { observable } from "@legendapp/state";

const message$ = observable("");
const loading$ = observable(false);
socket.on('loading/chat/bot', loading$.set);

export default function ChatBoxFooter({ }) {
    const { primary, fg } = use$(theme$);
    const token = use$(token$);
    const message = use$(message$);
    const loading = use$(loading$);
    const send = () => {
        if (message.length === 0) return;
        socket.emit("msg/send/bot", token, message);
        message$.set("");
    }

    return <View style={tw`flex-row items-center justify-between p-2 px-3 gap-2`}>
        <Input
            value={message$}
            size="lg"
            flexFull
            placeholder="Envoyer un message"
            left={<Fa name="microphone" size={18} color={tw`text-${fg}`.color} />}
            onSubmit={send}
            disabled={loading}
            right={
                !loading ? (message.length > 0 ? 
                <Fa name="paper-plane" size={18} color={tw`text-${primary.bg}`.color} onPress={send} /> :
                <></>)
             : <ActivityIndicator size="small" color={tw`text-${primary.bg}`.color} />}
        />
    </View>
}