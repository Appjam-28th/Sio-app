import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

export type RootStackPramList = {
    Login: undefined;
}

const Stack = createStackNavigator<RootStackPramList>();

const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" />
        </Stack.Navigator>
    )
}