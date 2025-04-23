import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function ContainerFasesConcluidas() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fases Concluidas</Text>
            <Text style={styles.txt}>10</Text>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.28,
        height: width * 0.24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 15,   

        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        // Sombra para Android
        elevation: 5,
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