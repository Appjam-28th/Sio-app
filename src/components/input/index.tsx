import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {SioKeyboard} from "@/components/keyboards";
import {Theme} from "@/design/theme";

type InputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    securePassword?: boolean;
    keyboardType?: "default" | "email-address" | "visible-password";
    returnKeyType?: "done" | "next" | "search" | "go" | "send" | "previous" | "default";
};

export const SioInput = ({
                             placeholder,
                             value,
                             onChangeText,
                             securePassword,
                             keyboardType,
                             returnKeyType,
                         }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(securePassword);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <SioKeyboard
                style={[
                    styles.inputContainer,
                    { fontSize: 12, color: Theme.colors.gray["800"] },
                    isFocused ? styles.focused : styles.unfocused,
                ]}
                placeholder={placeholder}
                placeholderTextColor="12"
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={showPassword}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
            />
            {securePassword && (
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                    <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={20}
                        color={Theme.colors.gray["300"]}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 8,
        position: "relative",
    },
    inputContainer: {
        width: Theme.width.large,
        height: Theme.height.large,
        padding: 12,
        borderRadius: Theme.borderRadius.small,
        backgroundColor: Theme.colors.gray[300],
        borderWidth: 1,
        fontSize: 16,
        fontFamily: "Pretendard-Medium",
    },
    focused: {
        borderColor: Theme.colors.primary[400],
    },
    unfocused: {
        borderColor: Theme.colors.gray[300],
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: [{ translateY: -12 }],
    },
});

export default SioInput;
