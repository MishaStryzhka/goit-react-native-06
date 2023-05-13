import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import IconCamera from "../../assets/icon/iconCamera.svg";

import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyBEHgFGpupDVZLrrXJoj74yqYiz9E46zUM");

const MapScreen = ({ route }) => {
    const [location, setLocation] = useState({});

    console.log(route.params)
    const GetLocationName = async () => {
        const lat = location.latitude;
        const lng = location.longitude;
        let ret = await Geocoder.from({ lat, lng })

        console.log(ret.results[0].formatted_address)
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setLocation(coords);
        })();
    }, []);

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.btnCamera} onPress={() => GetLocationName()}>
                <IconCamera />
            </TouchableOpacity> */}
            <MapView
                style={styles.mapStyle}
                region={{
                    ...location,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                {location && (
                    <Marker title="I am here" coordinate={route.params} description="Hello" />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        // width: 200,
        // height: 200,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },

    btnCamera: {
        // position: "absolute",
        // top: 200,
        width: 60,
        height: 60,
        borderRadius: 30,
        // backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red"
    }
});

export default MapScreen;
