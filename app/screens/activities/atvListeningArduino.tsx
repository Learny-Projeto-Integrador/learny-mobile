import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";

// Definição da estrutura de cada opção de áudio
type AudioOption = {
  id: string;
  label: string;
  source: any; // como o require retorna qualquer tipo, usamos 'any'
};

const audioOptions: AudioOption[] = [
  {
    id: "dog",
    label: "Dog",
    source: require("../../../assets/audios/dog.wav"),
  },
  {
    id: "cow",
    label: "Cow",
    source: require("../../../assets/audios/cow.wav"),
  },
  {
    id: "bird",
    label: "Bird",
    source: require("../../../assets/audios/bird.wav"),
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

export default function AtvListeningArduinoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [correctOption, setCorrectOption] = useState<AudioOption | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<AudioOption[]>([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * audioOptions.length);
    const selected = audioOptions[randomIndex];
    setCorrectOption(selected);

    const shuffled = [...audioOptions].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, []);

  const handleConfirm = (isCorrect: boolean) => {
    if (isCorrect) {
      alert("Correto!");
    } else {
      alert("Incorreto. Tente novamente.");
    }

    // Você pode navegar para outra tela se quiser
    // navigation.navigate("NextScreen");
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
      return null;
    }
  };

  if (!correctOption) return null;

  return (
    <ScrollView style={styles.container}>
      <HeaderFase
        image={require("../../../assets/images/listen.png")}
        title="Listen & Answer"
        description="Ouça o nome e encontre ele escrito"
        color="#EF5B6A"
        onReturn={() => navigation.navigate("world")}
      />

      <View style={{ paddingHorizontal: width * 0.03, marginTop: height * 0.02 }}>
        <SoundCard
          id="1"
          image={require("../../../assets/images/som-vermelho-grande.png")}
          source={correctOption.source}
          type="grande"
        />
      </View>

      <View style={styles.viewRespostas}>
        <Text style={styles.txtPergunta}>Que animal é esse?</Text>
        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          {shuffledOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleConfirm(option.id === correctOption.id)}
              style={styles.retanguloAnimal}
            >
              <Text style={styles.txtEmocao}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: height * 0.16 }}>
        <Image
          source={require("../../../assets/images/icon-dica.png")}
          style={styles.iconDica}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.5,
  },
  viewRespostas: {
    alignItems: "center",
    justifyContent: "center",
    gap: height * 0.02,
    marginTop: height * 0.02,
  },
  retanguloAnimal: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    padding: width * 0.06,
    borderRadius: 20,
  },
  txtPergunta: {
    color: "#4c4c4c",
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  txtEmocao: {
    color: "#4c4c4c",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  iconDica: {
    width: width * 0.1,
    aspectRatio: 49 / 67,
  },
});
