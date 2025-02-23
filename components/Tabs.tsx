import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { router, usePathname } from "expo-router";
import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function Tabs() {
    const { bg, fg } = use$(theme$);

    return <View style={tw`flex-row bg-${bg}/90 border-t border-${fg}/10`}>
        <Tab route="/chat">
            <AntDesign name="home" size={22} />
        </Tab>
        <Tab route="/chat/bot" central>
            <FontAwesome5 name="robot" size={20} />
        </Tab>
        <Tab route="/settings">
            <AntDesign name="setting" size={22} />
        </Tab>
    </View>;
}

export function Tab({ children, route, central }: { children: React.ReactNode, route: string, central?: boolean }) {
    const currentRoute = usePathname();
    const isActive = currentRoute === route;
    const { primary, fg } = use$(theme$);

    return <Pressable style={tw`flex-1 items-center justify-center py-3 relative`} onPress={() => router.navigate(route)}>
        {central ? <Central onPress={() => router.navigate(route)}>{children}</Central> : <Text style={tw`text-${!isActive ? fg : primary.bg}`} onPress={() => router.navigate(route)}>{children}</Text>}
    </Pressable>;
}

export function TabScreen({ children }) {    
    return <View style={tw`flex-1`}>
        {children}
        <Tabs />
    </View>;
}

export function Central({ children, ...props }) {
    const { primary } = use$(theme$);

    return <Pressable {...props} style={[tw`items-center justify-center p-4 bg-${primary.bg} rounded-full aspect-square absolute`, { transform: [{translateY: -20}] }]}>
        <Text style={tw`text-${primary.fg}`}>{children}</Text>
    </Pressable>
}