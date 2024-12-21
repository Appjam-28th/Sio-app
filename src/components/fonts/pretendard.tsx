import React from "react";
import {Text, StyleSheet} from "react-native";
import {useFonts} from "expo-font";
import {fontList} from "@/assets/fonts/fontList";

type PretendardProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
    fontWeight?: "Bold" | "SemiBold" | "Medium" | "Regular";
}

export default function Pretendard({children, style, fontSize, fontWeight}: PretendardProps) {
    const [fontsLoaded] = useFonts(fontList);

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    return (
        <Text style={[style, {fontFamily: `Pretendard-${fontWeight}`, fontSize: fontSize}]}>
            {children}
        </Text>
    )
}