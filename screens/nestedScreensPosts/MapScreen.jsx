import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Geocoder from "react-native-geocoding";
import { useSelector } from "react-redux";

Geocoder.init("AIzaSyBEHgFGpupDVZLrrXJoj74yqYiz9E46zUM");

const MapScreen = ({ route }) => {
    const user = useSelector((state) => state.auth);
    const { post } = route.params;
    console.log("post", post);

    let coordsMarker = {};

    if (post.location) {
        const locationCode = post.location;
        const { latitude, longitude } = locationCode;
        coordsMarker = {
            latitude,
            longitude,
        };
    }

    return (
        <View style={styles.container}>
            {!post.location && <Text style={{position: "absolute", top: 20, textAlign: "center", zIndex: 1, fontSize: 20, color: "red"}}>!!!Локація не була познечена на карті!!!</Text>}
            <MapView
                style={styles.mapStyle}
                region={{
                    ...user.currentPosition,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                {post.location && (
                    <Marker
                        title={post.nickName}
                        coordinate={coordsMarker}
                        description={post.description}
                    />
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
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default MapScreen;
