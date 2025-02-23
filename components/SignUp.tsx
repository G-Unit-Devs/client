import Input from "@/components/Input";
import Button from "@/components/Button";
import { Image, Text, View } from "react-native";
import tw from "twrnc";
import { signup$ } from "@/store/auth";
import { theme$ } from "@/store/theme";
import { use$ } from "@legendapp/state/react";
import { router } from "expo-router";

export default function SignUpForm() {
    const { submit } = use$(signup$);
    const theme = use$(theme$);

    const logo = {
        dark: require(`@/assets/images/MeMentorWhite.png`),
        light: require(`@/assets/images/MeMentorBlack.png`),
    };

    return (<>
        <View style={[tw`bg-${theme?.bg} justify-center items-center gap-2 flex-1 max-w-[300px]`]}>
            <View style={tw`w-full h-[70px] overflow-hidden`}>
                <Image source={logo[theme?.mode]} style={tw`w-full h-full`} resizeMode="cover" />
            </View>
            <Input value={signup$.firstname} placeholder="Prénom" widthFull />
            <Input value={signup$.lastname} placeholder="Nom" widthFull />
            <Input value={signup$.username} placeholder="Nom d'utilisateur" widthFull />
            <Input value={signup$.email} placeholder="Email" widthFull />
            <Input value={signup$.password} placeholder="Mot de passe" secure widthFull />
            <Button text="S'inscrire" onPress={submit} />
            <Text style={tw`text-${theme?.fg}/50 mt-2 text-center text-xs`}>Vous possedez deja un compte ? <Text style={tw`text-${theme?.primary.bg}`} onPress={() => router.navigate('/login')}>Se connecter</Text></Text>
        </View>
    </>);
}