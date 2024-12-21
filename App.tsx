import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from "@/libs/context";
import RootNavigation from "@/navigations/RootNavigation";


export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        </AuthProvider>
    );
}
