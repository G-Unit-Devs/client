import { Pressable as Pr, Text as Tx, View as Vw, ActivityIndicator as Ai } from 'react-native';
import tw from 'twrnc';
import { use$ as us } from '@legendapp/state/react';
import { ReactNode as Rn } from 'react';
import { theme$ } from '@/store/theme';

type Bt = {
    onPress: () => void,
    loading?: boolean,
    disabled?: boolean,
    text: string,
    variant?: string,
    size?: 'sm' | 'md' | 'lg',
    full?: boolean,
    flexFull?: boolean,
    left?: Rn,
    right?: Rn,
    justify?: 'center' | 'start' | 'end' | 'between' | 'around'
};

export default function Button({ 
    onPress, 
    loading, 
    disabled,
    text,
    variant = 'primary',
    size = 'md',
    full,
    flexFull,
    left,
    right,
    justify = 'center',
}: Bt) {
    const theme = us(theme$);
    const variantStyles = theme[variant];

    const sizes = {
        sm: 'px-2 py-1 text-sm gap-1',
        md: 'px-3 py-2 gap-2',
        lg: 'px-4 py-3 text-lg gap-3'
    };

    const justifies = {
        center: 'justify-center',
        start: 'justify-start',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around'
    };

    return (
        <Pr 
            onPress={onPress}
            disabled={disabled || loading}
            style={tw`
                bg-${variantStyles?.bg}
                ${sizes[size]} ${justifies[justify]}
                ${flexFull ? 'flex-1' : ''} ${full ? 'w-full' : ''}
                flex-row items-center rounded-lg
                ${disabled ? `opacity-50 ${variantStyles.disabled}` : ''}
            `}
        >
            {left}
            <Vw style={tw`${flexFull ? 'flex-1' : ''} overflow-hidden`}>
                {loading ? <Ai /> : 
                    <Tx numberOfLines={1} style={tw`text-${variantStyles?.fg} text-center`}>
                        {text}
                    </Tx>
                }
            </Vw>
            {right}
        </Pr>
    );
}
