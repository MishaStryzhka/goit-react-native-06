import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreensPosts/DefaultScreenPosts";
import CommentsScreen from "../nestedScreensPosts/CommentsScreen";
import MapScreen from "../nestedScreensPosts/MapScreen";
import { TouchableOpacity } from "react-native";
import IconlogOut from "../../assets/icon/iconlogOut.svg";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(authSignOutUser());
    };
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                options={{
                    title: "Публікації",
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
                        <TouchableOpacity onPress={handleSignOut}>
                            <IconlogOut width={24} height={24} />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        right: 16,
                    },
                }}
                name="DefaultScreen"
                component={DefaultScreenPosts}
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

export default PostsScreen;
