import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
} from "react-native";
import Medalha from "./Medalha";
import { useUser } from "@/contexts/UserContext";

export default function ContainerMedalhas() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medalhas</Text>
      <View style={{gap: 20, marginTop: 20}}>
        {user?.medalhas?.map((medalha, index) => (
          <Medalha 
            key={index} 
            fundo={""}
            nome={medalha.nome} 
            descricao={medalha.descricao} 
            date={medalha.dataConquista}/>
        ))}
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.06,
  },
  title: {
    color: "#b5b5b5",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  missao: {
    width: width * 0.68,
    aspectRatio: 378 / 103,
    marginTop: height * 0.02,
  }
});
