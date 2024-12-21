import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/core";

import Pretendard from "@/components/fonts/pretendard";

import {RootStackPramList} from "@/navigations/RootNavigation";
import useLogin from "@/hooks/auth/useLogin";

type RootNavigationProps = StackNavigationProp<RootStackPramList, "Login">

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {loading, login, error} = useLogin();

    const navigation = useNavigation<RootNavigationProps>();

    useEffect(() => {
        if (error) {
            Alert.alert("로그인 실패, 정보를 다시 확인해주세요.");
            console.error(error);
        }
    }, [error]);

    return (
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default Login;