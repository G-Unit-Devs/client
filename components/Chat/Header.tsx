import { use$ } from "@legendapp/state/react";
import { View } from "react-native";
import tw from "twrnc";
import { router } from 'expo-router';
import { AntDesign, Feather } from "@expo/vector-icons";
import { theme$ } from "@/store/theme";
import HeaderButton from "./HeaderButton";

export default function Header() {
    const { mode } = use$(theme$);
    return <View style={tw`flex-row items-center justify-end py-3 gap-1`}>
        <HeaderButton onPress={() => theme$.set(mode === "light" ? "dark" : "light")}>
            <Feather name={mode === "light" ? "moon" : "sun"} size={18} />
        </HeaderButton>
        <HeaderButton onPress={() => router.navigate('/settings')}>
            <AntDesign name="setting" size={18} />
        </HeaderButton>
    </View>;
}