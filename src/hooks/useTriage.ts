import { useState, useEffect } from "react";
import triageData from "@/services/triage.json";  // triage.json을 로컬에서 import

type Answer = {
    [key: string]: string;
};

type Question = {
    id: string;
    text: string;
};

export const useTriage = () => {
    const [questions, setTriage] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        // 로컬 파일에서 질문 데이터 불러오기
        setLoading(true);
        try {
            // 모든 질문을 OX 질문으로 변경
            const modifiedQuestions = triageData.map((question: Question) => {
                if (question.id !== '4' && question.id !== '5') {
                    return {
                        ...question,
                        text: question.text + " (OX 질문)", // 질문 뒤에 (OX 질문) 추가
                    };
                }
                return question;
            });
            setTriage(modifiedQuestions);  // triage.json 파일에서 질문 데이터 세팅
        } catch (err) {
            setError("질문을 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const currentQuestion = questions[currentIndex];

    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            const currentAnswer = answers[currentQuestion.id];

            // OX 질문이 아닌 경우에만 빈값 체크
            if (!isOXQuestion(currentQuestion.text) && !currentAnswer) {
                alert("답변을 입력해 주세요.");
                return;
            }

            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const submitAnswers = () => {
        console.log("제출된 답변:", answers);
    };

    // OX 질문인지 확인하는 함수
    const isOXQuestion = (questionText: string) => {
        return questionText.includes("OX 질문");
    };

    return {
        questions,
        answers,
        loading,
        error,
        currentQuestion,
        currentIndex,
        goToNextQuestion,
        handleAnswerChange,
        submitAnswers,
        isOXQuestion,
    };
};
