import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import BtnPlus from "./component/btnPlus";

import IconPosts from "./assets/icon/iconPosts.svg";
import IconUser from "./assets/icon/iconUser.svg";
import IconlogOut from "./assets/icon/iconlogOut.svg";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreens/PostsScreen";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen";
import ProfileScreen from ".//screens/mainScreens/ProfileScreen";
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