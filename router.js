import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const NestedScreen = createStackNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";

import Home from "./screens/Home";
import CommentsScreen from "./screens/nestedScreensPosts/CommentsScreen";
import MapScreen from "./screens/nestedScreensPosts/MapScreen";

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="RegistrationScreen"
                    component={RegistrationScreen}
                />
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="LoginScreen"
                    component={LoginScreen}
                />
            </AuthStack.Navigator>
        );
    }
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                options={{ headerShown: false }}
                name="Публікації"
                component={Home}
            />
            <NestedScreen.Screen
                options={{
                    title: "Коментарі",
                    headerStyle: {
                        height: 88,
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        marginBottom: -10,
                        fontFamily: "Roboto-Medium",
                        fontSize: 17,
                        lineHeight: 22,
                        letterSpacing: -0.408,
                    },
                    headerTitleAlign: "center",
                }}
                name="CommentsScreen"
                component={CommentsScreen}
            />
            <NestedScreen.Screen
                options={{
                    title: "Карта",
                    headerStyle: {
                        height: 88,
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        marginBottom: -10,
                        fontFamily: "Roboto-Medium",
                        fontSize: 17,
                        lineHeight: 22,
                        letterSpacing: -0.408,
                    },
                    headerTitleAlign: "center",
                }}
                name="MapScreen"
                component={MapScreen}
            />
        </NestedScreen.Navigator>
    );
};
