import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function NavigationBar() {
    return(
        <View style={styles.container}>
            <Image
            style={styles.icon}
                source={require("../../assets/images/icon-perfil.png")}
            />
            <Image
            style={styles.iconHome}
                source={require("../../assets/images/icon-home.png")}
            />
            <Image
            style={styles.icon}
                source={require("../../assets/images/icon-menu.png")}
            />
        </View>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4C4C4C",
        width: "100%", 
        height: height * 0.07,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: width * 0.12,
    },
    icon: {
        width: width * 0.13,
        aspectRatio: 1 / 1,
        top: -height * 0.02,
    },
    iconHome: {
        width: width * 0.15,
        aspectRatio: 1 / 1,
        top: -height * 0.03,
    },
})