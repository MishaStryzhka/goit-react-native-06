import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";

import IconMapPin from "../../assets/icon/iconMapPin.svg";
import IconComments from "../../assets/icon/iconComments.svg";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const PostsScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.auth);

    const getAllPost = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            setPosts((prefPosts) => [
                { id: doc.id, ...doc.data() },
                ...prefPosts,
            ]);
        });
    };

    useEffect(() => {
        getAllPost();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {user && (
                <View style={styles.userView}>
                    {user.image?.base64 ? (
                        <Image
                            source={{
                                uri:
                                    "data:image/jpg;base64," +
                                    user.image.base64,
                            }}
                            style={styles.preview}
                        />
                    ) : (
                        <Image
                            source={require("../../assets/avatar.jpg")}
                            style={styles.preview}
                        />
                    )}
                    <View style={styles.userDescription}>
                        {user.nickName && (
                            <Text style={styles.userTextName}>
                                {user.nickName}
                            </Text>
                        )}
                        {user.email && (
                            <Text style={styles.userTextEmail}>
                                {user.email}
                            </Text>
                        )}
                    </View>
                </View>
            )}

            {posts &&
                posts.map((post) => {
                    const locationCode = post.location.coords;
                    // console.log('post.urlFoto', post.urlFoto)
                    return (
                        <View key={post.id} style={{ marginTop: 32 }}>
                            <Image
                                source={{
                                    uri: post.urlFoto,
                                }}
                                style={styles.postImages}
                            />
                            <Text style={styles.postDescription}>
                                {post.description}
                            </Text>
                            <View
                                style={{
                                    marginTop: 11,
                                    display: "flex",
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
                                        navigation.navigate("CommentsScreen")
                                    }
                                >
                                    <IconComments />
                                    <Text style={{ marginLeft: 9 }}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                    onPress={() =>
                                        navigation.navigate("MapScreen", {
                                            post
                                        })
                                    }
                                >
                                    <IconMapPin style={styles.iconMap} />
                                    <Text style={{ marginLeft: 9 }}>
                                        {post.locationName}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    userView: {
        marginTop: 16,
        display: "flex",
        flexDirection: "row",
    },

    userDescription: {
        marginLeft: 8,
        justifyContent: "center",
    },

    userTextName: {
        fontFamily: "Roboto-Bold",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 15,

        color: "#212121",
    },

    userTextEmail: {
        fontFamily: "Roboto-Bold",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 11,
        lineHeight: 13,

        color: "#21212180",
    },

    preview: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },

    postImages: {
        width: "100%",
        height: 240,
        borderRadius: 8,
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

export default PostsScreen;
