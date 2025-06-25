//@ts-nocheck
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import Medalha from "./Medalha";
import { useGetToken } from "@/hooks/useGetToken";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useLoadData } from "@/hooks/useLoadData";

type Medalhas = {
  nome: string;
  descricao: string;
};

export default function ContainerMedalhas() {
  const [medalhas, setMedalhas] = useState<Medalhas[] | null>(
      null
    );
  const { getToken } = useGetToken();

  const { loadData } = useLoadData();
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await loadData("http://10.0.2.2:5000/criancas");
        setMedalhas(data.medalhas ?? null);
      };
      fetchData();
    }, [])
  );

  return (
    <View 
    style={styles.container}>
      <Text style={styles.title}>Medalhas</Text>
      <View style={{gap: 20, marginTop: 20}}>
        {medalhas?.map((medalha, index) => (
          <Medalha key={index} nome={medalha.nome} descricao={medalha.descricao} date={medalha.dataConquista}/>
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
