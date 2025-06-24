import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NavigationBar() {
    const navigation = useNavigation<NavigationProp>();
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("profileChildren")} style={{flexDirection: "row"}}>  
                <Image
                style={styles.icon}
                    source={require("@/assets/icons/icon-perfil.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("home")} style={{flexDirection: "row"}}>
                <Image
                style={styles.iconHome}
                    source={require("@/assets/icons/icon-home.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("menu")} style={{flexDirection: "row"}}>
                <Image
                style={styles.icon}
                    source={require("@/assets/icons/icon-menu.png")}
                />
            </TouchableOpacity>
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