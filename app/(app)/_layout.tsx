import { firstLogin$ } from "@/store/auth";
import { theme$ } from "@/store/theme";
import { token$ } from "@/store/token";
import { use$ } from "@legendapp/state/react";
import { Redirect, Stack, usePathname } from "expo-router";
import tw from "twrnc";

export default function() {
    const token = use$(token$);
    const firstLogin = use$(firstLogin$);
    const path = usePathname();
    const { bg } = use$(theme$);

    if(!token) return <Redirect href="/" />
    if(firstLogin && path !== "/chat/bot") return <Redirect href="/chat/bot" />

    return <Stack screenOptions={{ headerShown: false, animation: "fade", animationDuration: 200, contentStyle: tw`flex bg-${bg}` }}>
        <Stack.Screen name="chat" />
        <Stack.Screen name="chat/bot" />
        <Stack.Screen name="chat/[id]" />
    </Stack>;
}

