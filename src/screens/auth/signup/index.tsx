import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/core";

import Pretendard from "@/components/fonts/pretendard";
import Logo from "@/components/logo/logo.svg";

import {RootStackPramList} from "@/navigations/RootNavigation";
import useLogin from "@/hooks/auth/useLogin";
import SioInput from "@/components/input";
import {SioButton} from "@/components/button";
import {Theme} from "@/design/theme";
import BackButton from "@/components/button/back";
import AffiliationPicker from "src/components/input/affiliation";
import JobSelection from "@/components/input/job";

type RootNavigationProps = StackNavigationProp<RootStackPramList, "Login">;

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [affiliation, setAffiliation] = useState<string>("");
    const [jobType, setJobType] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [departmentType, setDepartmentType] = useState<'medical' | 'firefighting'>();
    const {loading, login, error} = useLogin();

    const navigation = useNavigation<RootNavigationProps>();

    useEffect(() => {
        if (error) {
            Alert.alert("회원가입 실패, 모든 필드를 다 입력해주세요.");
            console.error(error);
        }
    }, [error]);

    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            return Alert.alert("오류", "올바른 이메일 형식을 입력해주세요.");
        }

        const loginResult = await login(email, password);

        if (loginResult) {
            console.log("navigate to Main");
            navigation.reset({
                index: 0,
                routes: [{name: "Hospital"}],
            });
        }
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    return (
        <View style={styles.container}>
            <BackButton/>
            <View style={styles.logoContainer}>
                <Logo width={80} height={80}/>
                <Pretendard fontSize={20} fontWeight={"Bold"} style={{color: Theme.colors.gray["800"]}}>
                    환자 분류, 이제는 더 빠르게
                </Pretendard>
                <Pretendard fontSize={16} fontWeight={"SemiBold"} style={{color: Theme.colors.gray["600"]}}>
                    회원가입
                </Pretendard>
            </View>

            <View style={styles.inputContainer}>
                <SioInput
                    keyboardType={"default"}
                    placeholder="이름을 입력해주세요"
                    value={name}
                    onChangeText={setName}
                />
                <JobSelection
                    selectedType={departmentType}
                    onSelectType={setDepartmentType}
                />
                {departmentType && (
                    <AffiliationPicker
                        type={departmentType}
                    />
                )}
                <SioInput
                    keyboardType={"email-address"}
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChangeText={setEmail}
                />
                <SioInput
                    securePassword={true}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChangeText={setPassword}
                />
            </View>


            <View style={styles.buttonContainer}>
                <SioButton
                    title={loading ? "가입 중..." : "회원가입"}
                    onPress={handleLogin}
                    disabled={loading}
                    style={styles.loginButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    logoContainer: {
        marginLeft: 5,
        flex: 0.3,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    inputContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        marginBottom: 20,
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 30,
    },
    loginButton: {
        flex: 0.2,
        alignSelf: "center",
        width: "100%",
    },
    buttonContainer: {
        marginTop: 40
    }
});

export default SignUp;
