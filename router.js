import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";

import Home from "./screens/Home";


export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen options={{ headerShown: false, }} name="RegistrationScreen" component={RegistrationScreen} />
                <AuthStack.Screen options={{ headerShown: false, }} name="LoginScreen" component={LoginScreen} />
            </AuthStack.Navigator>
        );
    }
    return (
        <Home />
    );
};