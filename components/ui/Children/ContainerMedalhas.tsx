import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
} from "react-native";
import Medalha from "./Medalha";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { Medalhas } from "@/types";

export default function ContainerMedalhas() {
  const [medalhas, setMedalhas] = useState<Medalhas[] | null>(null);
  const { request } = useApi();

  const fetchData = async () => {
    const result = await request({
      endpoint: "/criancas",
    });
    setMedalhas(result.medalhas ?? null);
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medalhas</Text>
      <View style={{gap: 20, marginTop: 20}}>
        {medalhas?.map((medalha, index) => (
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
