import { authSlice } from "../redux/auth/authReducer";
import * as Location from "expo-location";

export const getCurrentPosition = async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        console.log("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
    
    dispatch(authSlice.actions.updateCurrentPosition({currentPosition: coords}))
};