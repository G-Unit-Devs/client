import { user$ } from "@/store/chat";
import { use$ } from "@legendapp/state/react";
import { $ScrollView } from "@legendapp/state/react-native";
import { View } from "react-native";
import tw from "twrnc";
import { TabScreen } from "@/components/Tabs";
import { theme$ } from "@/store/theme";
import Header from "@/components/Chat/Header";
import Title from "@/components/Title";
import ChatBotSection from "@/components/Chat/ChatBotSection";
import ChatSection from "@/components/Chat/ChatSection";

export default function ChatList() {
    const user = use$(user$);
    const { fg } = use$(theme$);
    
    return <TabScreen>
        <$ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
            <Header />
            <Title size="3xl">Bonjour, {user.firstname ?? user.username}</Title>
            <View style={tw`h-32 bg-${fg}/20 my-2 mb-4 rounded-lg flex-row items-center justify-center`} />
            <ChatBotSection />
            <ChatSection />
        </$ScrollView>
    </TabScreen>;
}







