import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/core";

import Pretendard from "@/components/fonts/pretendard";
import Logo from "@/components/logo/logo.svg";

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

    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) return Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
        const loginResult = await login(email, password);

        if (loginResult){
            console.log("navigate to Main")
            navigation.reset({
                index: 0,
                routes: [{ name: 'Hospital' }]
            });
        }
    }

    return (
        <View style={styles.container}>
            <Logo width={50} height={50} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 50,
        paddingTop: 130,
    }
})

export default Login;