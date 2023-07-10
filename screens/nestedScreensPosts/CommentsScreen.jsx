import React, { useState } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, TextInput } from "react-native";
const CommentsScreen = () => {
    const [comment, setComment] = useState('')
    return (
        <View style={styles.container}>
            <ScrollView style={styles.commentContainer}>
                <Text style={styles.textComent}>qweqwe</Text>
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput value={comment} style={styles.input} onChangeText={setComment}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    commentContainer:{
        
        height: 50,
        padding: 16,
        borderWidth: 1,
        // backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,

        backgroundColor: "red"
    },
    textComent:{
        flex: 1,
        marginRight: "",
    },
    inputContainer:{
        width: "100%",
        // height: 50,
        // backgroundColor: "red",
    },
    input: {
        height: 50,
        padding: 16,
        borderWidth: 1,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,
    },
});

export default CommentsScreen;