import { View } from "react-native";
import tw from "twrnc";
import { Body, Footer, Header } from "@/components/ChatBox";

export default function ChatBot() {
    return <View style={tw`flex-1`}>
        <Header title="Paris (Bot)" />
        <Body />
        <Footer />
    </View>;
}