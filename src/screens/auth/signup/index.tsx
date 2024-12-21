import React, { useState } from "react";
import { View, StyleSheet, Alert, Modal, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";

import Pretendard from "@/components/fonts/pretendard";
import Logo from "@/components/logo/logo.svg";
import { RootStackPramList } from "@/navigations/RootNavigation";
import SioInput from "@/components/input"; // 다른 입력 필드에 사용
import { SioButton } from "@/components/button";
import { Theme } from "@/design/theme";
import BackButton from "@/components/button/back";
import RolePicker from "@/components/input/role";
import MajorSelection from "@/components/input/major";
import useSignUp from "@/hooks/auth/useSignUp";

type RootNavigationProps = StackNavigationProp<RootStackPramList, "Login">;

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<'MEDICAL' | 'FIRE_FIGHTING' | null>(null);
    const [major, setMajor] = useState<string>("");
    const [isRoleModalVisible, setRoleModalVisible] = useState<boolean>(false);
    const [isMajorModalVisible, setMajorModalVisible] = useState<boolean>(false);

    const { signUp, loading } = useSignUp();
    const navigation = useNavigation<RootNavigationProps>();

    const handleSignUp = async () => {
        if (!role || !major) {
            Alert.alert("회원가입 실패", "Role과 Major를 선택해주세요.");
            return;
        }

        const signUpData = {
            name,
            email,
            password,
            role,
            major,
        };

        const result = await signUp(signUpData);

        if (result) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
            });
        }
    };

    const handleRoleSelect = (selectedRole: 'MEDICAL' | 'FIRE_FIGHTING') => {
        setRole(selectedRole);
        setRoleModalVisible(false);
        setMajor(""); // Reset major when role is selected
        setMajorModalVisible(true); // Open Major selection modal
    };

    const getRoleLabel = (role: 'MEDICAL' | 'FIRE_FIGHTING' | null) => {
        switch (role) {
            case 'MEDICAL':
                return '의료';
            case 'FIRE_FIGHTING':
                return '소방';
            default:
                return '역할을 선택해주세요';
        }
    };

    return (
        <View style={styles.container}>
            <BackButton />
            <View style={styles.logoContainer}>
                <Logo width={80} height={80} />
                <Pretendard fontSize={20} fontWeight={"Bold"} style={{ color: Theme.colors.gray["800"] }}>
                    환자 분류, 이제는 더 빠르게
                </Pretendard>
                <Pretendard fontSize={16} fontWeight={"SemiBold"} style={{ color: Theme.colors.gray["600"] }}>
                    회원가입
                </Pretendard>
            </View>

            <View style={styles.inputContainer}>
                <SioInput
                    placeholder="이름을 입력해주세요"
                    value={name}
                    onChangeText={setName}
                />

                {/* 역할 선택 부분 */}
                <TouchableOpacity
                    style={styles.roleInput}
                    onPress={() => setRoleModalVisible(true)}
                >
                    <Text style={styles.roleText}>{getRoleLabel(role)}</Text>
                </TouchableOpacity>

                <SioInput
                    placeholder="전공을 선택해주세요"
                    value={major}
                    onChangeText={setMajor} // 사용자가 직접 입력 가능
                />

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
                    onPress={handleSignUp}
                    disabled={loading}
                />
            </View>

            {/* Role Selection Modal */}
            <Modal
                visible={isRoleModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setRoleModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <RolePicker onRoleSelect={handleRoleSelect} />
                        <TouchableOpacity onPress={() => setRoleModalVisible(false)}>
                            <Text style={styles.closeButton}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Major Selection Modal */}
            <Modal
                visible={isMajorModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setMajorModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {role && (
                            <MajorSelection
                                role={role}
                                onSelectMajor={(selectedMajor) => {
                                    setMajor(selectedMajor);
                                    setMajorModalVisible(false);
                                }}
                                selectedMajor={major}
                            />
                        )}
                        <TouchableOpacity onPress={() => setMajorModalVisible(false)}>
                            <Text style={styles.closeButton}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        alignItems: "center",
    },
    roleInput: {
        width: '100%',
        padding: 12,
        borderRadius: Theme.borderRadius.small,
        backgroundColor: Theme.colors.gray[300],
        borderWidth: 1,
        borderColor: Theme.colors.gray[300],
        marginVertical: 10,
        justifyContent: "center",
    },
    roleText: {
        fontSize: 16,
        color: Theme.colors.black,
    },
    buttonContainer: {
        marginTop: 40,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        width: 300,
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        marginTop: 20,
        color: "blue",
        textAlign: "center",
    },
});

export default SignUp;
