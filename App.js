import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { useRoute } from "./router";
import { store } from "./redux/store";


// import { createStackNavigator } from "@react-navigation/stack";

// import IconArrowLeft from "./assets/icon/iconArrowLeft.svg";

// import RegistrationScreen from "./Screens/auth/RegistrationScreen";
// import LoginScreen from "./screens/auth/LoginScreen";
// import Home from "./Screens/Home";
// import CreatePostsScreen from "./Screens/mainScreens/CreatePostsScreen";
// import CommentsScreen from "./Screens/othersScreens/CommentsScreen";
// import MapScreen from "./Screens/othersScreens/MapScreen";

// const MainStack = createStackNavigator(); // вказує на групу навігаторів


export default function App() {
  const routing = useRoute(true);

  const [loadFonts] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  if (!loadFonts) {
    return undefined
  }

  return (
    <NavigationContainer>
      {routing}
      {/* <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen options={{ headerShown: false, }} name="RegistrationScreen" component={RegistrationScreen} />
        <MainStack.Screen options={{ headerShown: false, }} name="LoginScreen" component={LoginScreen} />
        <MainStack.Screen options={{ headerShown: false, }} name="Home" component={Home} />
        <MainStack.Screen
          options={{
            title: "Создать публикацию",
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
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <IconArrowLeft width={24} height={24} />
            ),
            headerLeftContainerStyle: {
              left: 16,
            },
          }}
          name="CreatePostsScreen" component={CreatePostsScreen} />
        <MainStack.Screen
          options={{
            title: "Комментарии",
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
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <IconArrowLeft width={24} height={24} />
            ),
            headerLeftContainerStyle: {
              left: 16,
            },
          }}
          name="CommentsScreen" component={CommentsScreen} />
        <MainStack.Screen
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
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <IconArrowLeft width={24} height={24} />
            ),
            headerLeftContainerStyle: {
              left: 16,
            },
          }} name="MapScreen" component={MapScreen} />

      </MainStack.Navigator> */}
    </NavigationContainer>
  );
};