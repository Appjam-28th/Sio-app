import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Theme } from "@/design/theme";
import Pretendard from "@/components/fonts/pretendard";

type RolePickerProps = {
    onRoleSelect: (role: 'MEDICAL' | 'FIRE_FIGHTING') => void;
};

const RolePicker = ({ onRoleSelect }: RolePickerProps) => {
    const [selectedRole, setSelectedRole] = useState<'MEDICAL' | 'FIRE_FIGHTING' | null>(null);

    const handleRoleSelect = (role: 'MEDICAL' | 'FIRE_FIGHTING') => {
        setSelectedRole(role);
        onRoleSelect(role);
    };

    return (
        <View style={styles.container}>
            <View style={styles.roleContainer}>
                <TouchableOpacity
                    style={[styles.roleButton, selectedRole === 'MEDICAL' && styles.selectedRole]}
                    onPress={() => handleRoleSelect('MEDICAL')}
                >
                    <Pretendard fontSize={16} fontWeight={"SemiBold"} style={[styles.roleButtonText, selectedRole === 'MEDICAL' && { color: Theme.colors.white }]}>
                        의료
                    </Pretendard>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.roleButton, selectedRole === 'FIRE_FIGHTING' && styles.selectedRole]}
                    onPress={() => handleRoleSelect('FIRE_FIGHTING')}
                >
                    <Pretendard fontSize={16} fontWeight={"SemiBold"} style={[styles.roleButtonText, selectedRole === 'FIRE_FIGHTING' && { color: Theme.colors.white }]}>
                        소방
                    </Pretendard>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    roleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Theme.colors.gray[100],
        width: '48%',
        alignSelf: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Theme.colors.gray[300],
    },
    selectedRole: {
        backgroundColor: Theme.colors.primary[500],
        borderColor: Theme.colors.primary[500],
    },
    roleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Theme.colors.black,
        marginLeft: 10,
    },
});

export default RolePicker;
