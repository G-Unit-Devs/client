import { LaunchPage } from "@/components/LaunchPage";
import { zoom$ } from "@/store/theme";
import { token$ } from "@/store/token";
import { observable } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import { Stack } from "expo-router";

const appLaunch$ = observable(false)
const appLaunchTimeout = setTimeout(() => {
  appLaunch$.set(true);
  clearTimeout(appLaunchTimeout);
}, 2000);

export default function RootLayout() {
  const zoom = use$(zoom$);

  const token = use$(token$);
  const appLaunch = use$(appLaunch$);

  if (!appLaunch) return <LaunchPage />

  return <Stack screenOptions={{ headerShown: false, animation: "fade", animationDuration: 200, contentStyle: { zoom } }}>
    {token ? <Stack.Screen name="(app)" /> : <Stack.Screen name="(auth)" />}
  </Stack>;
}