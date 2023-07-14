import React, { useEffect } from "react";
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
import IconLike from "../../assets/icon/iconLike.svg";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getAllPosts } from "../../redux/dashboard/posts/postOperations";
import dateFormat from "dateformat";
import doubleClick from "../../helpers/doubleClick";
import togglLike from "../../helpers/togglLike";

const PostsScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth);
    const postsAll = useSelector((state) => state.post.postsAll);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [isFocused]);

    useEffect(() => {
        getAllPosts();
    }, [postsAll]);

    const handleLike = async (post) => {
        togglLike(post, user);
        dispatch(getAllPosts());
    };

    return (
        <ScrollView style={styles.container}>
            {postsAll &&
                [...postsAll]
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
                                <View
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
                                            justifyContent: "space-between",
                                            width: "90%",
                                        }}
                                    >
                                        <Text style={styles.postNickName}>
                                            {post.nickName}
                                        </Text>
                                        <Text style={{ marginRight: 8 }}>
                                            {newDateFormat}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        doubleClick(() => handleLike(post))
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
                                            <Text>{post.locationName}</Text>
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
                                        <Text style={{ marginRight: 9 }}>
                                            {post?.listLike?.length ?? 0}
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    userView: {
        marginTop: 8,
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

export default PostsScreen;
