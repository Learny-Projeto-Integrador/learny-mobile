import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";

export default function ContainerFasesConcluidas() {
    return (
        <ImageBackground 
        style={styles.container}
        source={require("../../assets/images/teste2.png")}
        >
            <Text style={styles.title}>Fases Concluidas</Text>
            <Text style={styles.txt}>10</Text>
        </ImageBackground>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.27,
        aspectRatio: 108 / 108, // largura / altura da imagem original
        alignItems: "center",
        justifyContent: "center",
    },
    txt: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: width * 0.06,
        textAlign: "center",
        color: "#EF5B6A",
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: width * 0.035,
        textAlign: "center",
        color: "#4C4C4C",
    }
})