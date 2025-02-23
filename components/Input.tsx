import { $Pressable as Pr, $TextInput as Ti } from "@legendapp/state/react-native"
import { FontAwesome as Fa } from '@expo/vector-icons'
import { ActivityIndicator as Ai } from "react-native";
import tw from "twrnc"
import { use$ } from "@legendapp/state/react";
import { observable, ObservablePrimitive } from "@legendapp/state";
import { theme$ } from "@/store/theme";

type Si = {
    defaultValue?: string,
    value?: string | ObservablePrimitive<string>,
    editable?: boolean,
    onSubmit?: (v: any) => void,
    onEnd?: (v: any) => void,
    onChangeText?: (v: any) => void,
    onChange?: (v: any) => void,
    secure?: boolean,
    visible?: boolean,
    toggleVisible?: () => void,
    loading?: boolean,
    placeholder?: string,
    textColor?: string,
    props?: any,
    left?: React.ReactNode,
    right?: React.ReactNode,
    flexFull?: boolean,
    size?: "sm" | "md" | "lg" | "xl",
    disabled?: boolean,
    widthFull?: boolean
}

const visiblePass$ = observable<boolean>(false);

export default function({ 
    size = "md",
    defaultValue,
    value, 
    editable = true, 
    onSubmit, 
    onEnd,
    onChangeText,
    onChange,
    secure, 
    loading, 
    placeholder,
    left,
    right,
    flexFull,
    widthFull,
    disabled,
    ...props 
}: Si) {
    const { fg } = use$(theme$);
    const visible = use$(visiblePass$);
    const paddings = {
        sm: 'px-2 py-1 text-sm gap-1',
        md: 'px-3 py-2 gap-2',
        lg: 'px-4 py-3 text-lg gap-3',
        xl: 'px-5 py-4 text-xl gap-4'
    };

    return <Pr style={tw`items-center justify-center flex-row ${flexFull ? 'flex-1' : ''} ${widthFull ? 'w-full' : ''}`}>
        <Pr style={tw`bg-${fg}/10 flex-1 rounded-lg gap-2 flex-row ${paddings[size]} items-center justify-center`} >
            {left}
            <Ti 
                $defaultValue={defaultValue}
                $value={value} 
                editable={editable} 
                onSubmitEditing={onSubmit}
                onEndEditing={onEnd}
                onChangeText={onChangeText}
                onChange={onChange}
                style={[tw`text-${fg} flex-1`, { outline: "none" }]} 
                secureTextEntry={secure && !visible} 
                placeholder={placeholder}
                placeholderTextColor={tw`text-${fg}/50`.color}
                disabled={disabled || loading}
                {...props} 
            />
            {right}
        </Pr>
        {(secure && !loading) && <Pr style={tw`px-3`} onPress={() => visiblePass$.set(!visible)}>
            <Fa name={`eye${visible ? '-slash' : ''}`} size={16} color={tw`text-${fg}`.color} />
        </Pr>}
        {loading && <Ai style={tw`px-3`} />}
    </Pr>;
}