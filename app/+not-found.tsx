import { token$ } from "@/store/token";
import { use$ } from "@legendapp/state/react";
import { Redirect } from "expo-router";

export default function () {
    const token = use$(token$);

    if (token) return <Redirect href="/chat" />

    return <Redirect href="/login" />
}