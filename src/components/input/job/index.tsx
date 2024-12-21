import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Theme} from "@/design/theme";

type JobType = 'medical' | 'firefighting';

interface JobSelectionProps {
    onSelectType: (type: JobType) => void;
    selectedType?: JobType;
}

const JobSelection = ({ onSelectType, selectedType }: JobSelectionProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedType === 'medical' && styles.selectedOption
                    ]}
                    onPress={() => onSelectType('medical')}
                >
                    <View style={styles.radioContainer}>
                        <View style={[
                            styles.radioOuter,
                            selectedType === 'medical' && styles.selectedRadioOuter
                        ]}>
                            {selectedType === 'medical' && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                        <Text style={[
                            styles.optionText,
                            selectedType === 'medical' && styles.selectedOptionText
                        ]}>의료</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedType === 'firefighting' && styles.selectedOption
                    ]}
                    onPress={() => onSelectType('firefighting')}
                >
                    <View style={styles.radioContainer}>
                        <View style={[
                            styles.radioOuter,
                            selectedType === 'firefighting' && styles.selectedRadioOuter
                        ]}>
                            {selectedType === 'firefighting' && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                        <Text style={[
                            styles.optionText,
                            selectedType === 'firefighting' && styles.selectedOptionText
                        ]}>소방</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    option: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.colors.gray[400],
        width: '45%',
        backgroundColor: Theme.colors.white,
    },
    selectedOption: {
        borderColor: Theme.colors.primary[500],
        backgroundColor: Theme.colors.primary[200],
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadioOuter: {
        borderColor: Theme.colors.primary[400],
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.colors.primary[500],
    },
    optionText: {
        fontSize: 16,
        color: '#4B5563',
    },
    selectedOptionText: {
        color: Theme.colors.primary[500],
        fontFamily: 'Pretendard',
        fontWeight: '500',
    },
});

export default JobSelection;