import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useQuestions } from "@/hooks/useQuestion";
import { Theme } from "@/design/theme";

const QuestionsScreen = () => {
    const {
        questions,
        currentQuestion,
        currentIndex,
        submitAnswer,
        answers,
        loading,
        error
    } = useQuestions();

    const [answer, setAnswer] = useState<string>("");

    const handleSubmit = () => {
        submitAnswer(answer);
        setAnswer("");
    };

    if (loading) {
        return <ActivityIndicator size="large" color={Theme.colors.primary[400]} />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            {currentQuestion ? (
                <>
                    <Text style={styles.question}>
                        {`Q${currentIndex + 1}: ${currentQuestion.text}`}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your answer"
                        value={answer}
                        onChangeText={setAnswer}
                    />
                    <Button title="Next" onPress={handleSubmit} disabled={!answer.trim()} />
                </>
            ) : (
                <Text style={styles.completed}>All questions answered!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: Theme.colors.white,
    },
    question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: "80%",
    },
    completed: {
        fontSize: 20,
        color: Theme.colors.primary[400],
    },
    error: {
        color: "red",
        fontSize: 16,
    },
});

export default QuestionsScreen;
