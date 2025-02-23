import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import tw from "twrnc";

export function LaunchPage() {
    const { bg, mode } = use$(theme$);
    const logo = {
        dark: require(`@/assets/images/MeMentorWhite.png`),
        light: require(`@/assets/images/MeMentorBlack.png`),
    };
  
    return <View style={tw`bg-${bg} flex-1 justify-center items-center`}>
        <Image source={logo[mode]} style={tw`w-full max-w-[500px]`} resizeMode="contain" />
    </View>;
  }