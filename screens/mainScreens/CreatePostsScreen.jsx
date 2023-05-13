import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Platform, ScrollView, ImageBackground } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Geocoder from 'react-native-geocoding';

import IconRemoveBtn from "../../assets/icon/IconRemoveBtn.svg";
import IconCamera from "../../assets/icon/iconCamera.svg";
import IconCameraRotate from "../../assets/icon/iconCameraRotate.svg";
import IconMapPin from "../../assets/icon/iconMapPin.svg";
import IconPhotoFolder from "../../assets/icon/iconPhotoFolder.svg";
import IconBtnBack from "../../assets/icon/iconBtnBack.svg";

let ScreenHeight = Dimensions.get("window").height;

Geocoder.init("AIzaSyBEHgFGpupDVZLrrXJoj74yqYiz9E46zUM");

const CreatePostsScreen = ({ navigation }) => {
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [locationCode, setlocationCode] = useState({})

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState(undefined);

    const [isDisabledBtnPublish, setIsDisabledBtnPublish] = useState(true)

    useEffect(() => {
        if (description && photo && location) {
            setIsDisabledBtnPublish(false)
        }
    }, [description, location, photo])


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === "granted");

            let { statusLocation } = await Location.requestPermissionsAsync();
            if (statusLocation !== "granted") {
                console.log("Permission to access location was denied");
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handlerRemove = () => {
        navigation.navigate("PostsScreen")
    }
    const handlerPublish = () => {
        const post = { photo, description, location, locationCode }
        console.log(post)
        navigation.navigate("PostsScreen", { post })
    }

    const saveFoto = async () => {
        if (cameraRef) {
            getLocationName()
            const options = {
                quality: 1,
                base64: true,
                exif: false,
            };
            const newPhoto = await cameraRef.takePictureAsync(options);
            console.log(newPhoto)
            setPhoto(newPhoto);

            // await MediaLibrary.createAssetAsync(newPhoto.uri);

            getLocationName()
        }
    }

    const pickImage = async () => {
        getLocationName()
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        const { base64, height, uri, width } = result.assets[0]
        setPhoto({ base64, height, uri, width })
        console.log(result.assets[0]);

        if (!result.canceled) {
            // setImage(result.assets[0].uri);
        }
    };

    // Location   =========================
    const getLocationName = async () => {
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setlocationCode(coords);

        let ret = await Geocoder.from(coords)

        setLocation(ret.results[0].formatted_address)

        console.log(ret.results[0].formatted_address)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
                        <View style={styles.containerCamera}>
                            <Camera
                                style={styles.camera}
                                type={type}
                                ref={(ref) => {
                                    setCameraRef(ref);
                                }}
                            >
                                {photo
                                    ? <><Image
                                        source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
                                        style={styles.preview}
                                    />
                                        <TouchableOpacity style={styles.btnBack} onPress={() => setPhoto(undefined)}>
                                            <IconBtnBack />
                                        </TouchableOpacity></>
                                    : <View style={styles.photoView}>
                                        <TouchableOpacity
                                            style={styles.flipContainer}
                                            onPress={() => {
                                                setType(
                                                    type === Camera.Constants.Type.back
                                                        ? Camera.Constants.Type.front
                                                        : Camera.Constants.Type.back
                                                );
                                            }}
                                        >
                                            <IconCameraRotate style={{ width: 24, height: 24, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btnPhotoFolder} onPress={() => pickImage()}>
                                            <IconPhotoFolder />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btnCamera} onPress={() => saveFoto()}>
                                            <IconCamera />
                                        </TouchableOpacity>
                                    </View>}
                            </Camera>
                        </View>
                        <Text style={{ ...styles.textUploadPhoto, ...styles.text }}>Загрузите фото</Text>
                        <TextInput
                            multiline
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Название..."
                            placeholderStyle={styles.text}
                            style={location ? { ...styles.input } : { ...styles.input, ...styles.text }}
                            keyboardType="default"
                        />
                        <View style={{ width: "100%", }}>
                            <IconMapPin style={styles.iconMap} />
                            <TextInput
                                multiline
                                value={location}
                                onChangeText={setLocation}
                                placeholder="Местность..."
                                style={location ? { ...styles.input, paddingStart: 30, } : { ...styles.input, paddingStart: 30, ...styles.text }}
                                keyboardType="default"
                            />
                        </View>
                        <TouchableOpacity disabled={isDisabledBtnPublish} style={{ ...styles.btnPublish, backgroundColor: isDisabledBtnPublish ? "#F6F6F6" : "#FF6C00", }} onPress={handlerPublish}>
                            <Text style={styles.text}>Опубликовать</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnRemove} onPress={() => handlerRemove()}>
                            <IconRemoveBtn />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontSize: 16,
        lineHeight: 19,

        color: "#BDBDBD",
    },

    preview: {
        width: "100%",
        height: "100%",
    },

    container: {
        width: "100%",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFFFFF",
        bottom: 0,
        position: "absolute",
        height: ScreenHeight - 88,
    },

    btnRemove: {
        height: 40,
        width: 70,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6F6",

        position: "absolute",
        bottom: 34,

    },

    containerCamera: {
        marginTop: 16,
        height: 240,
        width: "100%",
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
    },

    btnPhotoFolder: {
        position: "absolute",
        left: 15,
        bottom: 15,
    },

    btnBack: {
        position: "absolute",
        top: 10,
        left: 10,
    },

    btnCamera: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    textUploadPhoto: {
        marginRight: "auto",
        marginTop: 8,
    },

    input: {
        marginTop: 32,
        width: "100%",
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
    },

    iconMap: {
        position: "absolute",
        top: 30,
    },
    btnPublish: {
        height: 50,
        width: "100%",

        borderRadius: 25,

        alignItems: "center",
        justifyContent: "center",

        marginTop: 32,

    },
    camera: {
        flex: 1,
        width: "100%",
        height: "100%",
        // alignItems: "center",
    },
    photoView: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    flipContainer: {
        flex: 0.1,
        alignSelf: "flex-end",
        marginRight: 10,
    },

    image: {
        height: "100%",
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
});

export default CreatePostsScreen;