import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { getCurrentPosition } from "../helpers/getCurrentPosition";

const Main = () => {
    const stateChande = useSelector((state) => state.auth.stateChande);
    const routing = useRoute(stateChande);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChangeUser());
        getCurrentPosition(dispatch);
    }, []);

    return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
