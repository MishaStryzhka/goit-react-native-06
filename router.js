import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

// icons import
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

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
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    borderTopWidth: 1,
                },
            }}>
            <Tabs.Screen
                options={{
                    title: "Публикации",
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
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <IconlogOut width={24} height={24} />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        right: 16,
                    },
                    tabBarIcon: ({ focused, size, color }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("PostsScreen")}>
                            <IconPosts width={24} height={24} />
                        </TouchableOpacity>
                    ),

                }}
                name="PostsScreen"
                component={PostsScreen} />
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <BtnPlus style={styles.btnPlus} color={"#FF6C00"} borderColor={"#FFFFFF"} onPress={() => navigation.navigate("CreatePostsScreen")} />
                    ),
                    headerShown: false,
                }}
                name="CreatePostsScreen"
                component={CreatePostsScreen} />
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                            <IconUser width={24} height={24} />
                        </TouchableOpacity>
                    ),
                    headerShown: false,
                }}
                name="ProfileScreen"
                component={ProfileScreen} />
        </Tabs.Navigator>
    );
};