import { HomeBottomBar } from "@/components/HomeBottomBar";
import SignUpForm from "@/components/SignUp";
import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function Index() {
    const theme = use$(theme$);

    return (
        <View style={[tw`bg-${theme?.bg}`, { flex: 1, justifyContent: "center", alignItems: "center", }]} >   
            <SignUpForm />
            <HomeBottomBar />
        </View>
    );
}