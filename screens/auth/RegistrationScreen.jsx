import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import BtnPlus from "../../component/btnPlus";

import React, { useState, useEffect } from 'react';
import { Button, Image, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { authSignUpUser, updatePhotoURL } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/config";


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
    


    const dispatch = useDispatch();

    const addImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        const { height, uri, width } = result.assets[0];
        setImage(uri)
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
    const handlerShow = () => {
        Alert.alert("Показать");
    };

    const handleSubmit = async () => {
        if (!name.is) { Alert.alert("Введите логин!"); }
        else if (!email.is) { Alert.alert("Введите адрес электронной почты") }
        else if (!password.is) { Alert.alert("Введите пароль") }
        else if (name.value !== "" && email.value !== "" && password.value !== "") {
            dispatch(authSignUpUser({name: name.value, email: email.value, password: password.value, photoURL: image}))
            Alert.alert(`Поздравляем ${name.value}! Вы зарегистрированы.`);
        } else {
            Alert.alert("Введите ваши данные!!!")
        }
    };



    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={{ flex: 1, }}>
                <ImageBackground source={require('../../assets/PhotoBG.png')} style={styles.image}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS == "ios" ? "padding" : 'position'}
                        keyboardVerticalOffset={Platform.OS == "ios" ? -150 : -500}
                    >
                        <View style={styles.registrationContainer}>
                            <View style={styles.imagesContainer}>
                                {image && <Image source={{ uri: image }} style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 16,
                                }} />}
                                <BtnPlus style={styles.btnPlus} onPress={addImages}></BtnPlus>
                            </View>

                            <Text style={styles.titel}>Реєстрація</Text>
                            <TextInput
                                value={name.value}
                                onChangeText={nameHandler}
                                placeholder="Логін"
                                style={name.is ? styles.input : styles.inputEror}
                                keyboardType="default"
                            />
                            <TextInput
                                value={email.value}
                                onChangeText={emailHandler}
                                placeholder="Адреса електронної пошти"
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
                                    <Text>Показати</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.btnRegister} onPress={handleSubmit}>
                                <Text style={styles.btnRegisterText}>Зареєстуватися</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate("LoginScreen")}>
                                <Text style={styles.btnSignInText}>Вже є акаунт? Увійти</Text>
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