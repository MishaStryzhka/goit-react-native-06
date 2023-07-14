import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import IconPosts from "../assets/icon/iconPosts.svg";
import IconUser from "../assets/icon/iconUser.svg";
import IconlogOut from "../assets/icon/iconlogOut.svg";

import CreatePostsScreen from "./mainScreens/CreatePostsScreen";
import PostsScreen from "./mainScreens/PostsScreen";
import ProfileScreen from "./mainScreens/ProfileScreen";
import BtnPlus from "../component/btnPlus";
import { authSignOutUser} from "../redux/auth/authOperations";

const Tabs = createBottomTabNavigator();

const Home = () => {
    
    const handleSignOut = () => {
        dispatch(authSignOutUser())
    }
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    borderTopWidth: 1,
                },
            }}
            >
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
                        <TouchableOpacity onPress={handleSignOut}>
                            <IconlogOut width={24} height={24} />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        right: 16,
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        // <TouchableOpacity onPress={() => navigation.navigate("PostsScreen")}>
                            <IconPosts width={24} height={24} />
                        // </TouchableOpacity>
                    ),

                }}
                name="PostsScreen"
                component={PostsScreen} />
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <BtnPlus disabled={true} style={styles.btnPlus} color={"#FF6C00"} borderColor={"#FFFFFF"} />
                    ),
                    tabBarStyle:{
                        display: "none",
                      },
                    // headerShown: false,
                }}
                name="Створити публікацію"
                component={CreatePostsScreen} />
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        // <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                            <IconUser width={24} height={24} />
                        // </TouchableOpacity>
                    ),
                    headerShown: false,
                }}
                name="ProfileScreen"
                component={ProfileScreen} />
        </Tabs.Navigator>
    );
};

const styles = StyleSheet.create({
    createBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FF6C00",
    },

    btnPlus: {
        width: 70,
        height: 40,
        marginTop: 9,
    },
});

export default Home;
