import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, TextInput } from "react-native";
import IconSend from "../../assets/icon/iconSend";
import { db } from "../../firebase/config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";

const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);
    const user = useSelector((state) => state.auth);
    const scrollRef = useRef();
    
    useEffect(() => {
        getAllComments();
    }, []);

    const { post } = route.params;
    const commentsListSortByDate = commentsList.sort(
        (firstComment, secondComment) => firstComment.date - secondComment.date
    );


    const getAllComments = async () => {
        const querySnapshot = await getDocs(
            collection(db, `posts/${post.id}/comments`)
        );
        await querySnapshot.docs.forEach((comment) => {
            const isComment = commentsList
                .map((comment) => comment.id)
                .includes(comment.id);
            if (isComment) return;

            setCommentsList((prefCommentsList) => [
                ...prefCommentsList,
                { id: comment.id, ...comment.data() },
            ]);
        });
    };

    const handleSend = async () => {
        const date = new Date();
        try {
            const docRef = await addDoc(
                collection(db, `posts/${post.id}/comments`),
                {
                    text: comment,
                    userID: user.userId,
                    nickName: user.nickName,
                    date: date.getTime(),
                }
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        const cityRef = doc(db, "posts", `${post.id}`);
        setDoc(cityRef, { ...post, quantityComent: commentsList.length + 1});

        getAllComments();
        setComment("");
    };

    return (
        <KeyboardAvoidingView
            behavior={"height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 70 : 70}
        >
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{
                        justifyContent: "flex-end",
                        paddingBottom: 16,
                    }}
                    ref={scrollRef}
                    onContentSizeChange={() => scrollRef.current.scrollToEnd()}
                    style={styles.commentContainer}
                >
                    {commentsList &&
                        commentsListSortByDate.map((comment) => {
                            const date = new Date(comment.date);
                            const newDateFormat = dateFormat(date, "HH:MM");
                            return (
                                <View
                                    key={comment.id}
                                    style={{
                                        alignItems:
                                            comment.userID === user.userId
                                                ? "flex-end"
                                                : "flex-start",
                                    }}
                                >
                                    <View style={styles.commentItemContainer}>
                                        <Text
                                            style={{
                                                color: comment.color,
                                                marginBottom: 4,
                                                marginLeft: 8,
                                            }}
                                        >
                                            {comment.nickName}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "baseline",
                                            }}
                                        >
                                            <Text>{comment.text}</Text>
                                            <Text
                                                style={{
                                                    color: "#959595",
                                                    fontSize: 10,
                                                    marginBottom: 4,
                                                    marginLeft: 8,
                                                }}
                                            >
                                                {newDateFormat}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline={true}
                        value={comment}
                        style={{
                            ...styles.input,
                            width: comment ? "85%" : "100%",
                        }}
                        onChangeText={setComment}
                    />
                    {comment && (
                        <TouchableOpacity
                            style={styles.btnSend}
                            onPress={handleSend}
                        >
                            <IconSend width={34} height={34} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 6,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    commentContainer: {
        width: "100%",
        padding: 16,
        borderWidth: 1,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        marginBottom: 16,
        borderRadius: 8,
    },
    commentItemContainer: {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        paddingBottom: 4,
        paddingTop: 4,
        width: "70%",
    },
    textComent: {
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    input: {
        height: 50,
        paddingTop: 15,
        padding: 15,
        borderWidth: 1,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 28,
    },
    btnSend: {
        alignContent: "center",
        justifyContent: "center",
        padding: 1,
        borderWidth: 1,
        borderColor: "transparent",
        marginRight: 16,
        borderRadius: 28,
    },
});

export default CommentsScreen;
