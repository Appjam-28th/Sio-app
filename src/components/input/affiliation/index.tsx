import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    Pressable,
    SafeAreaView,
    Dimensions
} from "react-native";
import {Theme} from "@/design/theme";

export enum MedicalSpecialties {
    EMERGENCY_MEDICINE = "응급의학과",
    GENERAL_SURGERY = "일반외과",
    THORACIC_SURGERY = "흉부외과",
    ORTHOPEDICS = "정형외과",
    CARDIOLOGY = "심장내과",
    RESPIRATORY_MEDICINE = "호흡기내과",
    GASTROENTEROLOGY = "소화기내과",
    PEDIATRICS = "소아청소년과",
    OBSTETRICS_GYNECOLOGY = "산부인과",
    NEUROSURGERY = "신경외과",
}

export enum FirstResponders {
    PARAMEDIC = '응급구조사',
    FIREFIGHTER = '소방공무원',
    RESCUE_WORKER = '구조대원',
}

type AffiliationPickerProps = {
    type: 'medical' | 'firefighting';
};

const AffiliationPicker = ({ type }: AffiliationPickerProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

    type OptionItem = {
        label: string;
        value: string;
    };

    const options: OptionItem[] = type === 'medical'
        ? Object.entries(MedicalSpecialties).map(([key, value]) => ({
            label: value.toString(),
            value: key,
        }))
        : Object.entries(FirstResponders).map(([key, value]) => ({
            label: value.toString(),
            value: key,
        }));

    const getSelectedLabel = () => {
        if (!selectedSpecialty) return "분야를 선택해주세요";

        if (type === 'medical') {
            return MedicalSpecialties[selectedSpecialty as keyof typeof MedicalSpecialties];
        } else {
            return FirstResponders[selectedSpecialty as keyof typeof FirstResponders];
        }
    };

    const handleSelect = (item: { label: string; value: string }) => {
        setSelectedSpecialty(item.value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectButtonText}>
                    {getSelectedLabel()}
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <SafeAreaView style={styles.modalHeader}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>취소</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>
                                {type === 'medical' ? '의료 분야 선택' : '소방 분야 선택'}
                            </Text>

                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.confirmButton}
                            >
                                <Text style={styles.confirmButtonText}>확인</Text>
                            </TouchableOpacity>
                        </SafeAreaView>

                        <FlatList<OptionItem>
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[
                                        styles.optionItem,
                                        selectedSpecialty === item.value && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        selectedSpecialty === item.value && styles.selectedOptionText
                                    ]}>
                                        {item.label}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    selectButton: {
        width: Theme.width.large,
        height: Theme.height.large,
        padding: 12,
        justifyContent: "center",
        borderRadius: Theme.borderRadius.small,
        backgroundColor: Theme.colors.gray[300],
    },

    selectButtonText: {
        fontSize: 12,
        fontFamily: "Pretendard-Medium",
        color: Theme.colors.gray[800],
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        maxHeight: Dimensions.get('window').height * 0.7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 65,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        fontSize: 17,
        color: '#666',
    },
    confirmButton: {
        padding: 8,
    },
    confirmButtonText: {
        fontSize: 17,
        color: '#007AFF',
        fontWeight: '600',
    },
    optionItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedOption: {
        backgroundColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 16,
        color: Theme.colors.black
    },
    selectedOptionText: {
        color: Theme.colors.black,
        fontWeight: '500',
    },
});

export default AffiliationPicker;