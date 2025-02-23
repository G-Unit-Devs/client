import { View } from "react-native";
import tailwind from "twrnc";

export default function ({ style }: { style?: any }) {
    return <View style={{...tailwind`rounded-full bg-black/5`, ...style}} />
}