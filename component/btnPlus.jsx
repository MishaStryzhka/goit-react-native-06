import { TouchableOpacity, View, StyleSheet } from "react-native";

const BtnPlus = ({ onPress, color = "#FFFFFF", borderColor = "#FF6C00", style }) => {
    return (
        <>
            <View style={{ ...styles.btnAddsImages, backgroundColor: color, borderColor: borderColor, ...style }} onPress={onPress}>
                <View style={{ ...styles.icon1, backgroundColor: borderColor, }} />
                <View style={{ ...styles.icon2, backgroundColor: borderColor, }} />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    btnAddsImages: {
        borderWidth: 1,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    icon1: {
        position: "absolute",
        width: 1,
        height: 13,
        backgroundColor: "#FF6C00",
    },
    icon2: {
        position: "absolute",
        width: 13,
        height: 1,
        backgroundColor: "#FF6C00",
    },
});

export default BtnPlus;