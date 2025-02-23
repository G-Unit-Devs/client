import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import tw from "twrnc";
import { router } from "expo-router";
import { use$ } from "@legendapp/state/react";
import { theme$ } from "@/store/theme";
import { firstLogin$ } from "@/store/auth";

export default function ChatBoxHeader({ title }) {
    const { fg } = use$(theme$);
    const firstLogin = use$(firstLogin$);

    return <View style={tw`flex-row items-center justify-start p-2 px-3 gap-2`}>
        {!firstLogin && <AntDesign name="left" size={20} color={tw`text-${fg}`.color} onPress={() => router.back() ?? router.navigate('/chat')} />}
        <Text style={tw`text-2xl font-bold text-${fg}`}>{title}</Text>
    </View>;
}