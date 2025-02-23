import { HomeBottomBar } from "@/components/HomeBottomBar";
import LoginForm from "@/components/LoginForm";
import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { View } from "react-native";
import tw from "twrnc";

export default function Index() {
    const theme = use$(theme$);

    return (
        <View style={[tw`bg-${theme?.bg}`, { flex: 1, justifyContent: "center", alignItems: "center", }]} >   
            <LoginForm />
            <HomeBottomBar />
        </View>
    );
}