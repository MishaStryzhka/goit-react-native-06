// import { useState } from "react";
import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import BtnPlus from "../../component/btnPlus";

import React, { useState, useEffect } from 'react';
import { Button, Image, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const RegistrationScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState({
        is: true,
        value: "",
    });
    const [email, setEmail] = useState({
        is: true,
        value: "",
    });
    const [password, setPassword] = useState({
        is: true,
        value: "",
    });



    const addImages = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const { base64, height, uri, width } = result.assets[0]
            setImage({ base64, height, uri, width })
        }
    };

    const handlerShow = () => {
        Alert.alert("Показать");
    };

    const handlerRegister = () => {
        if (!name.is) { Alert.alert("Введите логин!"); }
        else if (!email.is) { Alert.alert("Введите адрес электронной почты") }
        else if (!password.is) { Alert.alert("Введите пароль") }
        else if (name.value !== "" && email.value !== "" && password.value !== "") {
            console.log("name: ", name.value, "   email: ", email.value, "  password; ", password.value)
            Alert.alert(`Поздравляем ${name.value}! Вы зарегистрированы.`);
            navigation.navigate('Home', {
                screen: "PostsScreen",
                params: { user: { name: name.value, email: email.value, image } }
            })
        } else {
            Alert.alert("Введите ваши данные!!!")
        }
    };

    const nameHandler = (text) => {
        if (text === "") {
            setName({
                is: false,
                value: "",
            })
        } else {
            setName({
                is: true,
                value: text,
            })
        }
    };
    const emailHandler = (text) => {
        if (text === "") {
            setEmail({
                is: false,
                value: "",
            })
        } else {
            setEmail({
                is: true,
                value: text,
            })
        }
    };
    const passwordHandler = (text) => {
        if (text === "") {
            setPassword({
                is: false,
                value: "",
            })
        } else {
            setPassword({
                is: true,
                value: text,
            })
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={{ flex: 1, }}>
                <ImageBackground source={require('../../assets/PhotoBG.png')} style={styles.image}>
                    <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={styles.registrationContainer}>
                            <View style={styles.imagesContainer}>
                                {image && <Image source={{ uri: image.uri }} style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 16,
                                }} />}
                                <BtnPlus style={styles.btnPlus} onPress={addImages}></BtnPlus>
                            </View>

                            <Text style={styles.titel}>Регистрация</Text>
                            <TextInput
                                value={name.value}
                                onChangeText={nameHandler}
                                placeholder="Логин"
                                style={name.is ? styles.input : styles.inputEror}
                                keyboardType="default"
                            />
                            <TextInput
                                value={email.value}
                                onChangeText={emailHandler}
                                placeholder="Адрес электронной почты"
                                style={email.is ? styles.input : styles.inputEror}
                                keyboardType="email-address"
                            />
                            <View>
                                <TextInput
                                    value={password.value}
                                    onChangeText={passwordHandler}
                                    placeholder="Пароль"
                                    style={password.is ? styles.input : styles.inputEror}
                                    keyboardType="default"
                                />
                                <TouchableOpacity style={styles.btnShow} onPress={handlerShow}>
                                    <Text>Показать</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.btnRegister} onPress={handlerRegister}>
                                <Text style={styles.btnRegisterText}>Зарегистрироваться</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate("LoginScreen")}>
                                <Text style={styles.btnSignInText}>Уже есть аккаунт? Войти</Text>
                            </TouchableOpacity>


                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    // Registration container

    registrationContainer: {
        height: 500,
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFFFFF",
    },

    // Container for image 

    imagesContainer: {
        position: "absolute",
        alignSelf: 'center',
        top: -60,
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },

    btnPlus: {
        position: "absolute",
        right: -12.5,
        bottom: 26.5,
        width: 25,
        height: 25,
    },

    // Titel "Регистрация"

    titel: {
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        color: "#212121",

        marginTop: 92,
        marginBottom: 33,
    },

    // Input 
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

    inputEror: {
        height: 50,
        padding: 16,
        borderWidth: 1,
        backgroundColor: "#F6F6F6",
        borderColor: "red",
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,
    },

    // Button Show

    btnShow: {
        position: "absolute",
        top: 14,
        right: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    // Button Registr

    btnRegister: {
        height: 50,
        padding: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 100,
        alignItems: "center",

        backgroundColor: "#FF6C00",
    },

    btnRegisterText: {
        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontSize: 16,
        lineHeight: 19,

        color: "#FFFFFF",
    },

    // Button SignIn

    btnSignIn: {
        alignItems: "center",
    },

    btnSignInText: {
        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontSize: 16,
        lineHeight: 19,
        color: "#1B4371",
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },
});

export default RegistrationScreen;