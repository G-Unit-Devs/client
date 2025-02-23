import { View } from "react-native"
import { SwitchTheme } from "./SwitchTheme"
import { theme$ } from "@/store/theme"
import tw from "twrnc"

export const HomeBottomBar = () => {
    return <View style={[tw`bg-${theme$.get().bg} flex-row items-center justify-end w-full p-2 px-4`]}>
        <SwitchTheme />
    </View>
}