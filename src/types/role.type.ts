export enum MedicalSpecialties {
    // 의료 분야
    EMERGENCY_MEDICINE = '응급의학과',
    GENERAL_SURGERY = '일반외과',
    THORACIC_SURGERY = '흉부외과',
    ORTHOPEDICS = '정형외과',
    CARDIOLOGY = '심장내과',
    RESPIRATORY_MEDICINE = '호흡기내과',
    GASTROENTEROLOGY = '소화기내과',
    PEDIATRICS = '소아청소년과',
    OBSTETRICS_GYNECOLOGY = '산부인과',
    NEUROSURGERY = '신경외과',
    // 소방 분야
    PARAMEDIC = '응급구조사',
    FIREFIGHTER = '소방공무원',
    RESCUE_WORKER = '구조대원',
}

// 역할 유형 정의
export type RoleType = 'MEDICAL' | 'FIRE_FIGHTING';

