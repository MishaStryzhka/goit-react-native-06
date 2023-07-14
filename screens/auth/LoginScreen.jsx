import { useState } from "react";
import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState({
        is: true,
        value: "",
    });
    const [password, setPassword] = useState({
        is: true,
        value: "",
    });
    const [showPasword, setShowPasword] = useState(false)
    const dispatch = useDispatch();

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
        setShowPasword(!showPasword)
    };

    const hendleSubmit = () => {
        if (!email.is) { Alert.alert("Введите адрес электронной почты") }
        else if (!password.is) { Alert.alert("Введите пароль") }
        else if (email.value !== "" && password.value !== "") {
            dispatch(authSignInUser({ email: email.value, password: password.value}))
            Alert.alert(`Поздравляем! \u{1F44C}`);
        } else {
            Alert.alert("Введите ваши данные!!!")
        }
    };

    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? -230 : -500}
            >
                <ImageBackground source={require('../../assets/PhotoBG.png')} resizeMode="cover" style={styles.image}>
                    <View style={styles.registrationContainer}>

                        <Text style={styles.titel}>Увійти</Text>
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
                                secureTextEntry={!showPasword}
                                placeholder="Пароль"
                                style={password.is ? styles.input : styles.inputEror}
                                keyboardType="default"
                            />
                            <TouchableOpacity style={styles.btnShow} onPress={handlerShow}>
                                <Text>Показати</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.btnRegister} onPress={hendleSubmit}>
                            <Text style={styles.btnRegisterText}>Увійти</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate("RegistrationScreen")}>
                            <Text style={styles.btnSignInText}>Немає акаунту? Зареєструватися</Text>
                        </TouchableOpacity>


                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    // Registration container

    registrationContainer: {
        position: "absolute",
        bottom: 0,
        height: 450,
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFFFFF",
    },


    // Titel "Регистрация"

    titel: {
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        color: "#212121",

        marginTop: 32,
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
        height: "100%",
        width: "100%",
    },



});

export default LoginScreen;