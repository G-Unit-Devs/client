import { Entypo, Feather } from '@expo/vector-icons';
import { Switch, use$ } from "@legendapp/state/react";
import Button from "./Button";
import { theme$ } from "@/store/theme";

export const SwitchTheme = () => {
    const theme = use$(theme$);
    const Btn = ({ icon, theme }) => <Button text={icon} size="sm" variant="ghost" onPress={() => theme$.set(theme)} />

    return <Switch value={theme?.mode}>
        {{
            "light": () => <Btn icon={<Entypo name="moon" size={24} />} theme="dark" />,
            "dark": () => <Btn icon={<Feather name="sun" size={24} />} theme="light" /> ,
            default: () => <div>Error</div>,
        }}
    </Switch>    
};