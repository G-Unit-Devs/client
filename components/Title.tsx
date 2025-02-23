import { use$ } from "@legendapp/state/react";
import { Text } from "react-native";
import tw from "twrnc";
import { theme$ } from "@/store/theme";

export default function Title({ children, size }: { children: React.ReactNode, size?: string }) {
    const { fg } = use$(theme$);
    return <Text style={tw`text-${size ?? '2xl'} font-bold text-${fg}`}>{ children }</Text>;
}