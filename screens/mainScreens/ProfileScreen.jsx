import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableWithoutFeedback } from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import BtnPlus from "../../component/btnPlus";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Keyboard } from "react-native";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../firebase/config";
import { updateProfile } from "firebase/auth";
import { updatePhotoURL } from "../../redux/auth/authOperations";
import { getUserPosts } from "../../redux/dashboard/posts/postOperations";
import dateFormat from "dateformat";
import { TouchableOpacity } from "react-native";

import IconMapPin from "../../assets/icon/iconMapPin.svg";
import IconComments from "../../assets/icon/iconComments.svg";
import IconLike from "../../assets/icon/iconLike.svg";

const ProfileScreen = () => {
    const user = useSelector((state) => state.auth);
    const userPosts = useSelector((state) => state.post.userPosts);
    console.log("user.photoURL", user.photoURL);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPosts(user.userId));
    }, []);

    const addImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });

        const { height, uri, width } = result.assets[0];
        console.log("uri", uri);
        dispatch(updatePhotoURL(uri));
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{
                    marginBottom: -1285,
                }}
                contentContainerStyle={{}}
            >
                <ImageBackground
                    source={require("../../assets/PhotoBG.png")}
                    style={styles.image}
                ></ImageBackground>
                <View style={styles.registrationContainer}>
                    <View style={styles.imagesContainer}>
                        {user.photoURL && (
                            <Image
                                source={{uri: user.photoURL}}
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 16,
                                }}
                            />
                        )}
                        <BtnPlus
                            style={styles.btnPlus}
                            onPress={() => addImages()}
                        ></BtnPlus>
                    </View>
                    <Text
                        style={{
                            marginTop: 100,
                            marginBottom: 16,
                            width: "100%",

                            fontFamily: "Roboto-Medium",
                            fontSize: 30,
                            fontWeight: 500,
                            lineHeight: 35,
                            letterSpacing: 0.01,
                            textAlign: "center",
                        }}
                    >
                        {user.nickName}
                    </Text>
                    {userPosts &&
                        [...userPosts]
                            .sort(
                                (firstPost, secondPost) =>
                                    secondPost.date - firstPost.date
                            )
                            .map((post) => {
                                const dateNow = new Date().getTime();
                                const newDateFormat = dateFormat(
                                    post.date,
                                    dateNow - post.date > 86400000
                                        ? "yyyy-mm-dd"
                                        : "HH:MM"
                                );
                                return (
                                    <View
                                        key={post.id}
                                        style={{
                                            marginBottom: 8,
                                            borderWidth: 1,
                                            padding: 8,
                                            borderRadius: 8,
                                        }}
                                    >
                                        {/* <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: post.userAvatarsURL,
                                                }}
                                                style={styles.postUserAvatars}
                                            ></Image>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "flex-end",
                                                    width: "100%",
                                                }}
                                            >
                                                <Text
                                                    style={styles.postNickName}
                                                >
                                                    {post.nickName}
                                                </Text>
                                                <Text
                                                    style={{ marginRight: 8 }}
                                                >
                                                    {newDateFormat}
                                                </Text>
                                            </View>
                                        </View> */}
                                        <TouchableOpacity
                                            onPress={() =>
                                                doubleClick(() =>
                                                    handleLike(post)
                                                )
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: post.urlFoto,
                                                }}
                                                style={styles.postImages}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.postDescription}>
                                            {post.description}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop: 11,
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                }}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        "CommentsScreen",
                                                        {
                                                            post,
                                                        }
                                                    )
                                                }
                                            >
                                                <IconComments />
                                                <Text style={{ marginLeft: 9 }}>
                                                    {post.quantityComent ?? 0}
                                                </Text>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    width: "50%",
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                    }}
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "MapScreen",
                                                            {
                                                                post,
                                                            }
                                                        )
                                                    }
                                                >
                                                    <IconMapPin
                                                        style={styles.iconMap}
                                                    />
                                                </TouchableOpacity>
                                                <ScrollView
                                                    horizontal={true}
                                                    contentContainerStyle={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text>
                                                        {post.locationName}
                                                    </Text>
                                                </ScrollView>
                                            </View>
                                            <TouchableOpacity
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                }}
                                                onPress={() => handleLike(post)}
                                            >
                                                <Text
                                                    style={{ marginRight: 9 }}
                                                >
                                                    {post?.listLike?.length ??
                                                        0}
                                                </Text>
                                                <IconLike
                                                    style={{
                                                        fill: post?.listLike?.includes(
                                                            user.userId
                                                        )
                                                            ? "#FF6C00"
                                                            : "#BDBDBD",
                                                    }}
                                                    width={34}
                                                    height={34}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    // Registration container

    registrationContainer: {
        top: -1285,
        padding: 8,
        // height: 500,
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFFFFF",
    },

    // Container for image

    imagesContainer: {
        position: "absolute",
        alignSelf: "center",
        top: -60,
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },

    btnPlus: {
        position: "absolute",
        right: -12.5,
        bottom: 22.6,
        width: 25,
        height: 25,
    },

    image: {
        top: -215,
        left: -130,
        height: 1500,
        width: 670,
        resizeMode: "contain",
        transform: [{ scale: 0.65 }],
        // justifyContent: "flex-end",
    },
    postImages: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },
    postUserAvatars: {
        width: "100%",
        height: 38,
        width: 38,
        borderRadius: 25,
    },
    postNickName: {
        padding: 8,
        // backgroundColor: "red",

        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 24,
        lineHeight: 19,

        color: "#212121",
    },

    postDescription: {
        marginTop: 8,

        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
    },
});

export default ProfileScreen;
