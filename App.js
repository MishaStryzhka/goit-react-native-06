import React, { useEffect } from "react";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./component/Main";
// import { getCurrentPosition } from "./helpers/getCurrentPosition";

export default function App() {

    const [loadFonts] = useFonts({
        "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    });

    if (!loadFonts) {
        return undefined;
    }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
