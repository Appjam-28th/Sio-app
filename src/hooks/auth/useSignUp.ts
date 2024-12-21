import { useState } from 'react';
import { Alert } from 'react-native';
import sioCustomAxios from '@/libs/axios';
import { RoleType, MedicalSpecialties } from '@/types/role.type';

interface SignUpForm {
    name: string;
    email: string;
    password: string;
    role: RoleType;
    major: string;
}

const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    const signUp = async (signUpData: SignUpForm) => {
        setLoading(true);

        try {
            // 이메일 유효성 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(signUpData.email)) {
                Alert.alert('올바른 이메일 형식을 입력해주세요.');
                return;
            }

            if (!signUpData.name || !signUpData.password || !signUpData.major || !signUpData.role) {
                throw new Error('모든 필드를 입력해주세요.');
            }

            const response = await sioCustomAxios.postData<SignUpForm>('/user', {
                name: signUpData.name,
                email: signUpData.email,
                password: signUpData.password,
                role: signUpData.role,
                major: signUpData.major,
            });

            return response;
        } catch (err: any) {
            console.error(err);
            Alert.alert('회원가입 오류', err?.message || '회원가입 중 오류가 발생했습니다.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        signUp,
        loading,
    };
};

export default useSignUp;
