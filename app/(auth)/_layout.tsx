import { token$ } from "@/store/token";
import { use$ } from "@legendapp/state/react";
import { Redirect, Stack } from "expo-router";

export default function() {
    const token = use$(token$);
    if(token) return <Redirect href="/" />

    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
    </Stack>;
}