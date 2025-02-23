import { View } from "react-native";
import tw from "twrnc";

export default function List ({ children }) {
    return <View style={tw`py-2`}>
        {children}
    </View>;
}