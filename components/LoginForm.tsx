import Input from "@/components/Input";
import Button from "@/components/Button";
import { Image, View } from "react-native";
import tw from "twrnc";
import { login$ } from "@/store/auth";
import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { Text } from "react-native";
import { router } from "expo-router";

export default function LoginForm() {
    const { submit } = use$(login$);
    const theme = use$(theme$);

    const logo = {
        dark: require(`@/assets/images/MeMentorWhite.png`),
        light: require(`@/assets/images/MeMentorBlack.png`),
    };

    return <View style={[tw`bg-${theme?.bg} justify-center items-center gap-2 flex-1 max-w-[300px]`]}>
        <View style={tw`w-full h-[70px] overflow-hidden`}>
            <Image source={logo[theme?.mode]} style={tw`w-full h-full`} resizeMode="cover" />
        </View>
        <Input value={login$.login} onSubmit={submit} placeholder="Identifiant" widthFull />
        <Input value={login$.password} onSubmit={submit} placeholder="Mot de passe" secure widthFull />
        <Button text="Connexion" onPress={submit} />
        <Text style={tw`text-${theme?.fg}/50 mt-2 text-center text-xs`}>Vous ne possedez pas de compte ? <Text style={tw`text-${theme?.primary.bg}`} onPress={() => router.navigate('/signup')}>S'inscrire</Text></Text>
    </View>
}