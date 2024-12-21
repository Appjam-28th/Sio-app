import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import Login from "@/screens/auth/login";

export type RootStackPramList = {
    Login: undefined;
}

const Stack = createStackNavigator<RootStackPramList>();

const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default RootNavigation;