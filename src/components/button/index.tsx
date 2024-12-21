import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Theme} from "@/design/theme";
import Pretendard from "@/components/fonts/pretendard";

type ButtonProps = {
    title?: string;
    onPress?: () => void;
    disabled?: any;
    style?: any;
}

export const SioButton = ({title = "Text", onPress, disabled, style}: ButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, isPressed && styles.buttonPressed]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
        >
            <Pretendard fontSize={18} fontWeight={"SemiBold"} style={styles.buttonText}>
                {title}
            </Pretendard>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Theme.colors.primary[400],
        paddingVertical: 12,
        paddingHorizontal: 25,
        width: Theme.width.large,
        height: Theme.height.large,
        borderRadius: Theme.borderRadius.small,
        elevation: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPressed: {
        backgroundColor: Theme.colors.primary[500],
    },
    buttonText: {
        color: Theme.colors.white,
        fontSize: 16,
        textAlign: "center",
    },
});
