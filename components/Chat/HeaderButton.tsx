import { use$ } from "@legendapp/state/react";
import { Pressable, Text } from "react-native";
import tw from "twrnc";
import { theme$ } from "@/store/theme";
import { useState } from "react";

export default function HeaderButton({ children, onPress }: { children: React.ReactNode, onPress: () => void }) {
    const { fg, bg } = use$(theme$);
    const [hover, setHover] = useState(false);

    return <Pressable style={tw`flex-row items-center gap-2 border border-${fg}/70 ${hover ? `bg-${fg}` : ``} rounded-full p-1 aspect-square`} onPress={(e) => (setHover(true), onPress && onPress(e))} onHoverIn={() => setHover(true)} onHoverOut={() => setHover(false)}>
        <Text style={tw`${hover ? `text-${bg}` : `text-${fg}/70`}`}>{children}</Text>
    </Pressable>
}