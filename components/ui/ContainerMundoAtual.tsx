import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function ContainerMundoAtual() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mundo Atual</Text>
      <View style={styles.containerNumMundo}>
        <Text style={styles.txtNumMundo}>10</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: width * 0.24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,

    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Sombra para Android
    elevation: 5,
  },
  containerNumMundo: {
    backgroundColor: "#EF5B6A",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.14,
    height: width * 0.12,
    borderRadius: 10,
    marginTop: width * 0.02,
  },
  txt: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    textAlign: "center",
    color: "#EF5B6A",
  },
  txtNumMundo: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    textAlign: "center",
    color: "#fff",
  },
  title: {
    fontFamily: "Montserrat_500Medium",
    fontSize: width * 0.035,
    textAlign: "center",
    color: "#4C4C4C",
  },
});
