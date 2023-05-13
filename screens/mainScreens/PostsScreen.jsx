import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

import IconMapPin from "../../assets/icon/iconMapPin.svg";
import IconComments from "../../assets/icon/iconComments.svg";

const PostsScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState({ nextId: 1, postsList: [] });
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log('posts :>> ', posts);
    }, [posts])

    useEffect(() => {
        if (route?.params?.user) {
            setUser(route.params.user);
        }

        if (route?.params?.post) {
            setPosts(pref => {
                return {
                    nextId: pref.nextId + 1,
                    postsList: [...pref.postsList, {
                        id: pref.nextId,
                        ...route.params.post
                    }]
                }
            })
        }

    }, [route]);


    return (
        <ScrollView style={styles.container}>
            {user && <View style={styles.userView}>
                {user.image?.base64
                    ? <Image
                        source={{ uri: 'data:image/jpg;base64,' + user.image.base64 }}
                        style={styles.preview}
                    />
                    : <Image
                        source={require('../../assets/avatar.jpg')}
                        style={styles.preview}
                    />
                }
                <View style={styles.userDescription}>
                    {user.name && <Text style={styles.userTextName}>{user.name}</Text>}
                    {user.email && <Text style={styles.userTextEmail}>{user.email}</Text>}
                </View>
            </View>}

            {posts.postsList && posts.postsList.map(post => {
                const { locationCode } = post
                return <View key={post.id} style={{ marginTop: 32 }}>
                    <Image
                        source={{ uri: 'data:image/jpg;base64,' + post.photo.base64 }}
                        style={styles.postImages}
                    />
                    <Text style={styles.postDescription}>{post.description}</Text>
                    <View style={{ marginTop: 11, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => navigation.navigate("CommentsScreen")}>
                            <IconComments />
                            <Text style={{ marginLeft: 9 }}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => navigation.navigate("MapScreen", locationCode)}>
                            <IconMapPin style={styles.iconMap} />
                            <Text style={{ marginLeft: 9 }}>{post.location}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            )}



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