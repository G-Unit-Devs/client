import { Dimensions, GestureResponderEvent, Platform, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import Skeleton from "./Skeleton";
import { use$ } from "@legendapp/state/react";
import { useState } from "react";
import { theme$ } from "@/store/theme";
import { observable } from "@legendapp/state";

export const isMobile$ = observable(() => Platform.OS === "ios" || Platform.OS === "android" || Dimensions.get('window').width < Dimensions.get('window').height);
export const spacing$ = observable(4);

export default function({ title, text, icon, color, style, right, onPress } : { 
    title?: React.ReactNode, 
    text?: React.ReactNode, 
    icon?: React.ReactNode, 
    color?: string, 
    style?: any, 
    right?: React.ReactNode 
    onPress?: (e: GestureResponderEvent) => void
}) {
    const s = use$(spacing$);
    const { fg: defaultTextColor } = use$(theme$);
    const txtClr = color ?? defaultTextColor;
    const isMobile = use$(isMobile$);
    const [hover, setHover] = useState(false);

    return (
        <Pressable style={[tw`flex-row items-center rounded-lg p-${s} py-${s/1.5} gap-${s} ${hover ? 'bg-black/5' : ''}`, style]} onPress={e => (setHover(true), onPress && onPress(e))} onHoverIn={() => setHover(true)} onPressOut={() => setHover(false)} onHoverOut={() => setHover(false)}>
            <View style={tw`w-${s*3} aspect-square rounded-full ${!icon ? `bg-${txtClr}/10` : ""} items-center justify-center`}>
                <Text style={tw`text-${txtClr}`}>{icon ?? <Skeleton style={tw`w-3 h-3`} />}</Text>
            </View>
            <View style={tw`flex-1 min-w-0 overflow-hidden`}>
                <Text numberOfLines={1} style={tw`text-${txtClr}`}>
                    {title ?? <Skeleton style={tw`w-full h-3 w-[33%]`} />}
                </Text>
                <Text numberOfLines={1} style={tw`text-${txtClr}/50 text-xs`}>
                    {text ?? <Skeleton style={tw`w-full h-3 w-[50%]`} />}
                </Text>
            </View>
            {right && (
                <View style={tw`${isMobile ? 'flex-1' : ''} flex-row items-center justify-end ml-${s}`}>
                    {right}
                </View>
            )}
        </Pressable>
    );
}