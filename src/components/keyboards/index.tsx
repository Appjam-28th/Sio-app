import React from "react";
import {TextInput, StyleSheet} from "react-native";

type SioKeyboardProps = KeyboardProps & {
    value?: string;
    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    placeholderTextColor?: string;
    style?: object;
    autoCapitalize?: string;
};

export const SioKeyboard = ({
                                keyboardType = "default",
                                returnKeyType = "done",
                                secureTextEntry = false,
                                value,
                                onChangeText,
                                onFocus,
                                onBlur,
                                placeholder,
                                placeholderTextColor,
                                style,
                                autoCapitalize = "none",
                            }: SioKeyboardProps) => {
    return (
        <TextInput
            style={style}
            keyboardType={keyboardType === "visible-password" ? "default" : keyboardType}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize="none"
        />
    );
};
