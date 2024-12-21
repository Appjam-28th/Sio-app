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

    // 한글 전공명을 enum 값으로 변환하는 함수
    const convertMajorToEnum = (koreanMajor: string): string => {
        const majorMapping: { [key: string]: string } = {
            '소방관': MedicalSpecialties.FIREFIGHTER,
            '소방공무원': MedicalSpecialties.FIREFIGHTER,
            '구급대원': MedicalSpecialties.PARAMEDIC,
            '구조대원': MedicalSpecialties.RESCUE_WORKER,
            '호흡기내과': MedicalSpecialties.RESPIRATORY_MEDICINE,
            '응급의학과': MedicalSpecialties.EMERGENCY_MEDICINE,
            '일반외과': MedicalSpecialties.GENERAL_SURGERY,
            '흉부외과': MedicalSpecialties.THORACIC_SURGERY,
            '정형외과': MedicalSpecialties.ORTHOPEDICS,
            '심장내과': MedicalSpecialties.CARDIOLOGY,
            '소화기내과': MedicalSpecialties.GASTROENTEROLOGY,
            '소아과': MedicalSpecialties.PEDIATRICS,
            '산부인과': MedicalSpecialties.OBSTETRICS_GYNECOLOGY,
            '신경외과': MedicalSpecialties.NEUROSURGERY,
        };

        return majorMapping[koreanMajor] || koreanMajor;
    };


    const signUp = async (signUpData: SignUpForm) => {
        setLoading(true);

        try {
            // 이메일 유효성 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(signUpData.email)) {
                Alert.alert('입력 오류', '올바른 이메일 형식을 입력해주세요.');
                return null;
            }

            if (!signUpData.name || !signUpData.password || !signUpData.major || !signUpData.role) {
                throw new Error('모든 필드를 입력해주세요.');
            }

            // role 값이 올바른지 확인
            if (signUpData.role !== 'MEDICAL' && signUpData.role !== 'FIRE_FIGHTING') {
                throw new Error('올바른 역할을 선택해주세요.');
            }

            // 전공명을 enum 값으로 변환
            const enumMajor = convertMajorToEnum(signUpData.major);
            console.log(enumMajor);

            const requestData = {
                name: signUpData.name,
                email: signUpData.email,
                password: signUpData.password,
                role: signUpData.role,
                major: signUpData.major,  // 여기서 변환된 영어 major를 사용
            };

            console.log('Sending data to server:', requestData);

            const response = await sioCustomAxios.postData<SignUpForm>('/user', requestData);
            return response;
        } catch (err: any) {
            console.error('SignUp Error:', err);
            const errorMessage = err?.response?.data?.message || err?.message || '회원가입 중 오류가 발생했습니다.';
            Alert.alert('회원가입 오류', errorMessage);
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