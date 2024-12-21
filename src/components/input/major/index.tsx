import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { MedicalSpecialties } from "@/types/role.type";

type MajorSelectionProps = {
    role: 'MEDICAL' | 'FIRE_FIGHTING';
    onSelectMajor: (major: string) => void;
    selectedMajor: string;
};

const MajorSelection = ({ role, onSelectMajor, selectedMajor }: MajorSelectionProps) => {
    const getMajors = () => {
        if (role === 'MEDICAL') {
            return [
                MedicalSpecialties.RESPIRATORY_MEDICINE,
                MedicalSpecialties.EMERGENCY_MEDICINE,
                MedicalSpecialties.GENERAL_SURGERY,
                MedicalSpecialties.THORACIC_SURGERY,
                MedicalSpecialties.ORTHOPEDICS,
                MedicalSpecialties.CARDIOLOGY,
                MedicalSpecialties.GASTROENTEROLOGY,
                MedicalSpecialties.PEDIATRICS,
                MedicalSpecialties.OBSTETRICS_GYNECOLOGY,
                MedicalSpecialties.NEUROSURGERY,
            ];
        } else if (role === 'FIRE_FIGHTING') {
            return [
                MedicalSpecialties.PARAMEDIC,
                MedicalSpecialties.FIREFIGHTER,
                MedicalSpecialties.RESCUE_WORKER,
            ];
        }
        return [];
    };


    const getDisplayName = (major: string) => {
        switch (major) {
            case MedicalSpecialties.RESPIRATORY_MEDICINE:
                return '호흡기내과';
            case MedicalSpecialties.EMERGENCY_MEDICINE:
                return '응급의학과';
            case MedicalSpecialties.GENERAL_SURGERY:
                return '일반외과';
            case MedicalSpecialties.THORACIC_SURGERY:
                return '흉부외과';
            case MedicalSpecialties.ORTHOPEDICS:
                return '정형외과';
            case MedicalSpecialties.CARDIOLOGY:
                return '심장내과';
            case MedicalSpecialties.GASTROENTEROLOGY:
                return '소화기내과';
            case MedicalSpecialties.PEDIATRICS:
                return '소아과';
            case MedicalSpecialties.OBSTETRICS_GYNECOLOGY:
                return '산부인과';
            case MedicalSpecialties.NEUROSURGERY:
                return '신경외과';
            case MedicalSpecialties.PARAMEDIC:
                return '구급대원';
            case MedicalSpecialties.FIREFIGHTER:
                return '소방관';
            case MedicalSpecialties.RESCUE_WORKER:
                return '구조대원';
            default:
                return major;
        }
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={getMajors()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectMajor(item)}>
                        <Text style={[styles.majorText, selectedMajor === item && styles.selectedMajor]}>
                            {getDisplayName(item)}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    majorText: {
        padding: 10,
        fontSize: 16,
    },
    selectedMajor: {
        backgroundColor: "#d3d3d3",
    },
});

export default MajorSelection;