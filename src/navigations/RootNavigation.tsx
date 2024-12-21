import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";


import Login from "@/screens/auth/login";
import SignUp from "@/screens/auth/signup";
import Hospital from "@/screens/hospital";

export type RootStackPramList = {
    Login: undefined;
    SignUp: undefined;
    Hospital: undefined;
}

const Stack = createNativeStackNavigator<RootStackPramList>();

const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Hospital" component={Hospital} />
        </Stack.Navigator>
    )
}

export default RootNavigation;