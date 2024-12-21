import React, {useCallback} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { Theme } from "@/design/theme";
import {Ionicons} from "@expo/vector-icons";
import Pretendard from "@/components/fonts/pretendard";
import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackPramList} from "@/navigations/RootNavigation";

type RootNavigationProps = StackNavigationProp<RootStackPramList, "Login">;

const Main = () => {
    const navigation = useNavigation<RootNavigationProps>();

    const handleAnalytics = () => {
        navigation.navigate("Analystic")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.selectBox} onPress={handleAnalytics}>
                <Ionicons name="search" size={50} color={Theme.colors.primary[400]} />
                <Pretendard fontSize={18} fontWeight="SemiBold" >
                    환자 분석
                </Pretendard>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectBox}>
                <Ionicons name="medkit" size={50} color={Theme.colors.primary[400]} />
                <Pretendard fontSize={18} fontWeight="SemiBold" >
                    응급실 확인
                </Pretendard>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        flex: 1,
        backgroundColor: Theme.colors.white,
    },
    selectBox: {
        width: 350,
        height: 250,
        borderRadius: 20,
        borderWidth: 3,
        gap: 7,
        borderColor: Theme.colors.primary[400],
        borderStyle: 'solid',
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Main;
