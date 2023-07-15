import React, { useEffect, useState } from "react";
import {
    Dimensions,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import Geocoder from "react-native-geocoding";

import IconRemoveBtn from "../../assets/icon/IconRemoveBtn";
import IconCamera from "../../assets/icon/iconCamera";
import IconCameraRotate from "../../assets/icon/iconCameraRotate";
import IconMapPin from "../../assets/icon/iconMapPin";
import IconPhotoFolder from "../../assets/icon/iconPhotoFolder";
import IconBtnBack from "../../assets/icon/iconBtnBack";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { createPost } from "../../redux/dashboard/posts/postOperations";

let ScreenHeight = Dimensions.get("window").height;

Geocoder.init("AIzaSyBEHgFGpupDVZLrrXJoj74yqYiz9E46zUM");

const CreatePostsScreen = ({ navigation }) => {
    const [description, setDescription] = useState("");
    const [locationName, setLocationName] = useState("");

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState(null);

    const [isDisabledBtnPublish, setIsDisabledBtnPublish] = useState(true);
    const user = useSelector((state) => state.auth);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    useEffect(() => {
        setPhoto(null);
        setDescription("");
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, [isFocused]);

    useEffect(() => {
        if (description && photo) {
            setIsDisabledBtnPublish(false);
        }
    }, [description, locationName, photo]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handlerPublish = async () => {
        const urlPhoto = photo.uri

        dispatch(createPost(urlPhoto, description, locationName, user.currentPosition))

        navigation.navigate("PostsScreen");
        setPhoto(null);
        setDescription("");
    };

    // take a photo ======================

    const saveFoto = async () => {
        getLocationName();
        if (cameraRef) {
            const newPhoto = await cameraRef.takePictureAsync();
            setPhoto(newPhoto);
        }
    };

    // selected photo ====================

    const pickImage = async () => {
        getLocationName();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        });

        const { height, uri, width } = result.assets[0];
        const newPhoto = { height, uri, width }
        setPhoto(newPhoto);
    };

    // Location   =========================
    const getLocationName = async () => {
        let ret = await Geocoder.from(user.currentPosition);
        setLocationName(ret.results[0].formatted_address);
    };

    // Exit    =============================
    const handlerRemove = () => {
        navigation.navigate("PostsScreen");
        setPhoto(null);
        setDescription("");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
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
                                {photo ? (
                                    <>
                                        <Image
                                            source={{
                                                uri: photo.uri,
                                            }}
                                            style={styles.preview}
                                        />
                                    </>
                                ) : (
                                    <View style={styles.photoView}>
                                        <TouchableOpacity
                                            style={styles.flipContainer}
                                            onPress={() => {
                                                setType(
                                                    type ===
                                                        Camera.Constants.Type
                                                            .back
                                                        ? Camera.Constants.Type
                                                              .front
                                                        : Camera.Constants.Type
                                                              .back
                                                );
                                            }}
                                        >
                                            <IconCameraRotate
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.btnPhotoFolder}
                                            onPress={() => pickImage()}
                                        >
                                            <IconPhotoFolder />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.btnCamera}
                                            onPress={() => saveFoto()}
                                        >
                                            <IconCamera />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Camera>
                        </View>
                        {photo && (
                            <TouchableOpacity
                                style={styles.btnBack}
                                onPress={() => {
                                    setPhoto(null)
                                }}
                            >
                                <IconBtnBack />
                            </TouchableOpacity>
                        )}
                        <TextInput
                            multiline
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Назва..."
                            placeholderStyle={styles.text}
                            style={
                                locationName
                                    ? { ...styles.input }
                                    : { ...styles.input, ...styles.text }
                            }
                            keyboardType="default"
                        />
                        <View style={{ width: "100%" }}>
                            <IconMapPin style={styles.iconMap} />
                            <TextInput
                                multiline
                                value={locationName}
                                onChangeText={setLocationName}
                                placeholder="Місцевість..."
                                style={
                                    locationName
                                        ? { ...styles.input, paddingStart: 30 }
                                        : {
                                              ...styles.input,
                                              paddingStart: 30,
                                              ...styles.text,
                                          }
                                }
                                keyboardType="default"
                            />
                        </View>
                        <TouchableOpacity
                            disabled={isDisabledBtnPublish}
                            style={{
                                ...styles.btnPublish,
                                backgroundColor: isDisabledBtnPublish
                                    ? "#F6F6F6"
                                    : "#FF6C00",
                            }}
                            onPress={handlerPublish}
                        >
                            <Text style={styles.text}>Опубліковати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnRemove}
                            onPress={() => handlerRemove()}
                        >
                            <IconRemoveBtn />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

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
        top: 40,
        left: 30,
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
