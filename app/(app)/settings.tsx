import { TabScreen } from "@/components/Tabs";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { $ScrollView, $Pressable } from "@legendapp/state/react-native";
import Title from "@/components/Title";
import List from "@/components/List";
import MediaObject from "@/components/MediaObject";
import { Feather, AntDesign } from "@expo/vector-icons";
import { logout$ } from "@/store/auth";
import { theme$, zoom$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";

export default function settings() {
    return <TabScreen>
        <$ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
            <Title size="3xl">Paramètres</Title>
            <List>
                <MediaObject title="Zoom" text="Appuyez pour zoomer/dézoomer" icon={<Feather name="zoom-in" size={24} />} right={<Zoom />} />

                <MediaObject title="Déconnexion" text="Appuyez pour vous deconnecter" icon={<AntDesign name="logout" size={18} />} onPress={() => logout$()} />
            </List>
        </$ScrollView>
    </TabScreen>;
}

function Zoom() {
    const zoom = use$(zoom$);
    const { fg } = use$(theme$);
    return <View style={tw`items-center justify-center border border-white/10 rounded-xl flex-row overflow-hidden`}>
        <Pressable style={tw`p-2 px-3 border-r border-white/10`} onPress={() => zoom$.set(zoom - 0.05)} disabled={zoom <= 0.5}>
            <Text style={tw`text-${fg}`}>-</Text>
        </Pressable>
        <$Pressable style={tw`p-2 px-3`}>
            <Text style={tw`text-${fg}`}>{Math.round(zoom*100)-100}</Text>
        </$Pressable>
        <Pressable style={tw`p-2 px-3 border-l border-white/10`} onPress={() => zoom$.set(zoom + 0.05)} disabled={zoom >= 2}>
            <Text style={tw`text-${fg}`}>+</Text>
        </Pressable>
    </View>
}