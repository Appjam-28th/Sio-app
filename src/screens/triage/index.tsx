import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // 화면 전환을 위한 useNavigation
import { useTriage } from '@/hooks/useTriage';
import SioInput from "@/components/input";
import { Theme } from "@/design/theme";
import Pretendard from "@/components/fonts/pretendard";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackPramList} from "@/navigations/RootNavigation";

type RootNavigationProps = StackNavigationProp<RootStackPramList>;

const TriageComponent = () => {
    const {
        questions,
        currentQuestion,
        currentIndex,
        goToNextQuestion,
        handleAnswerChange,
        submitAnswers,
        loading,
        isOXQuestion,  // OX 질문 체크 함수
    } = useTriage();

    const [inputAnswer, setInputAnswer] = useState<string>('');  // 사용자가 텍스트로 입력하는 답변 상태
    const navigation = useNavigation<RootNavigationProps>();  // navigation 객체

    const handleOXAnswer = (answer: string) => {
        handleAnswerChange(currentQuestion.id, answer);

        // id가 11일 경우, POST 요청을 보내고 알림 후 메인 화면으로 이동
        if (currentQuestion.id === '11') {
            postAnswer(currentQuestion.id, answer);
        } else {
            goToNextQuestion();
        }
    };

    const handleTextAnswer = () => {
        handleAnswerChange(currentQuestion.id, inputAnswer);
        setInputAnswer('');  // 입력값 초기화

        if (currentQuestion.id === '12') {
            postAnswer(currentQuestion.id, inputAnswer);
        } else {
            goToNextQuestion();
        }
    };

    const postAnswer = async (questionId: string, answer: string) => {
        try {
            const response = await fetch('https://your-api-endpoint.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId,
                    answer,
                }),
            });

            if (response.ok) {
                // 서버에 전송 완료 후 알림 띄우기
                Alert.alert(
                    "전송 완료",
                    "환자의 정보가 주변 병원에 전송되었습니다.",
                    [
                        { text: "확인", onPress: () => navigation.navigate('Main') },  // 메인 화면으로 이동
                    ]
                );
            } else {
                // 서버 응답 오류 처리
                Alert.alert("서버 오류", "답변을 전송하는 데 실패했습니다.");
            }
        } catch (error) {
            console.error('Error posting answer:', error);
            Alert.alert("네트워크 오류", "인터넷 연결을 확인하세요.");
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!currentQuestion) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>모든 질문이 완료되었습니다!</Text>
                <TouchableOpacity style={styles.button} onPress={submitAnswers}>
                    <Pretendard fontSize={18} fontWeight={"SemiBold"} style={styles.buttonText}>답변 제출</Pretendard>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Pretendard fontSize={20} fontWeight={"SemiBold"} style={styles.text}>{currentQuestion.id}. {currentQuestion.text}</Pretendard>
            {isOXQuestion(currentQuestion.text) ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.OXbutton} onPress={() => handleOXAnswer('네')}>
                        <Pretendard fontSize={50} fontWeight={"SemiBold"} style={styles.OXbuttonText}>O</Pretendard>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.OXbutton} onPress={() => handleOXAnswer('아니요')}>
                        <Pretendard fontSize={50} fontWeight={"SemiBold"} style={styles.OXbuttonText}>X</Pretendard>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <SioInput
                        placeholder="답변을 입력하세요"
                        value={inputAnswer}
                        onChangeText={setInputAnswer}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleTextAnswer}>
                        <Pretendard fontSize={18} fontWeight={"SemiBold"} style={styles.submit}>답변 제출</Pretendard>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '60%',
        marginBottom: 30,
        gap: 20
    },
    inputContainer: {
        width: '80%',
        marginBottom: 30,
        alignItems: 'center',
    },
    OXbutton: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '60%',
        height: 400,
        borderRadius: Theme.borderRadius.small,
        backgroundColor: Theme.colors.gray[200],
        borderColor: Theme.colors.primary[400],
        borderWidth: 3,
        textAlign: 'center',
    },
    OXbuttonText: {
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: Theme.height.large,
        backgroundColor: Theme.colors.primary[400],
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Theme.borderRadius.small,
        marginTop: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 50,
    },
    submit: {
        color: Theme.colors.white,
    }
});

export default TriageComponent;
