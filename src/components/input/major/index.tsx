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
                MedicalSpecialties.EMERGENCY_MEDICINE,
                MedicalSpecialties.GENERAL_SURGERY,
                MedicalSpecialties.THORACIC_SURGERY,
                MedicalSpecialties.ORTHOPEDICS,
                MedicalSpecialties.CARDIOLOGY,
                MedicalSpecialties.RESPIRATORY_MEDICINE,
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

    return (
        <View style={styles.container}>
            <FlatList
                data={getMajors()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectMajor(item)}>
                        <Text style={[styles.majorText, selectedMajor === item && styles.selectedMajor]}>
                            {item}
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
