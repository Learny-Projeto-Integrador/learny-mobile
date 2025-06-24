import {
    Image,
    Text,
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
  } from "react-native";
  
  export default function ContainerTimeAttack() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.container}
          //@ts-ignore
          source={require("@/assets/images/fundo-timeAttack.png")}
        >
          <View style={styles.containerDadosMundo}>
            <Text style={styles.txt}>Modo de Jogo</Text>
            <Text style={styles.txtBlack}>Time Attack</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  const { width, height } = Dimensions.get("window");
  
  const styles = StyleSheet.create({
    container: {
      width: width * 0.8,
      aspectRatio: 423 / 142,
    },
    containerDadosMundo: {
        width: width * 0.85,
        height: "100%",
        justifyContent: "center",
        paddingLeft: width * 0.06,
    },
    txt: {
      color: "#fff",
      fontSize: width * 0.035,
      fontFamily: 'Montserrat_600SemiBold_Italic',
    },
    txtBlack: {
      color: "#fff",
      width: width * 0.3,
      fontSize: width * 0.05,
      fontFamily: 'Montserrat_900Black',
    },
  });
  