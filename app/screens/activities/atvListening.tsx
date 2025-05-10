import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";

type SoundItem = {
  id: string;
  source: any;
  image: any;
  expectedLabel: string;
};

const sounds: SoundItem[] = [
  {
    id: "1",
    source: require("../../../assets/audios/cow.wav"),
    image: require("../../../assets/images/som-vermelho.png"),
    expectedLabel: "Cow",
  },
  {
    id: "2",
    source: require("../../../assets/audios/bird.wav"),
    image: require("../../../assets/images/som-amarelo.png"),
    expectedLabel: "Bird",
  },
  {
    id: "3",
    source: require("../../../assets/audios/dog.wav"),
    image: require("../../../assets/images/som-azul.png"),
    expectedLabel: "Dog",
  },
];

const { width, height } = Dimensions.get("window");

export default function AtvListeningScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [assignments, setAssignments] = useState<{ [soundId: string]: string }>(
    {}
  );

  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
      return null;
    }
  };

  const handleAssign = (soundId: string, label: string) => {
    setAssignments((prev) => ({ ...prev, [soundId]: label }));
  };

  const handleConfirm = () => {
    let correct = 0;
    sounds.forEach((sound) => {
      if (assignments[sound.id] === sound.expectedLabel) correct++;
    });

    alert(`Você acertou ${correct} de ${sounds.length}`);
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderFase
        image={require("../../../assets/images/listen.png")}
        title="Listen & Answer"
        description="Ouça o nome e encontre ele escrito"
        color="#EF5B6A"
        onReturn={() => navigation.navigate("world")}
      />

      <View style={styles.containerSounds}>
        {sounds.map((sound) => (
          <SoundCard
            key={sound.id}
            id={sound.id}
            image={sound.image}
            source={sound.source}
          />
        ))}
      </View>

      <View style={styles.viewQuadrados}>
        {sounds.map((sound, index) => {
          const borderColors = ["#EF5B6A", "#FFB300", "#6CD2FF"]; // vermelho, amarelo, azul
          return (
            <View
              key={sound.id}
              style={[
                styles.quadradoColocar,
                { borderColor: borderColors[index] || "#ccc" },
              ]}
            >
              <Text style={styles.txtAnimal}>
                {assignments[sound.id] || "?"}
              </Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: height * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Text style={styles.txtPergunta}>Selecione a ordem correta</Text>
        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          {["Dog", "Cow", "Bird"].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => {
                // Simula mover para a primeira posição vazia (para fins de teste)
                const firstEmpty = sounds.find((s) => !assignments[s.id]);
                if (firstEmpty) handleAssign(firstEmpty.id, label);
              }}
              style={styles.quadradoAnimal}
            >
              <Text style={styles.txtAnimal}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.viewButtons}>
        <Image
          source={require("../../../assets/images/icon-dica.png")}
          style={styles.icon}
        />
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handleConfirm}
        >
          <Image
            source={require("../../../assets/images/icon-confirmar-vermelho.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
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
  containerSounds: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.05,
    marginVertical: height * 0.02,
  },
  viewQuadrados: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.06,
  },
  quadradoColocar: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  txtPergunta: {
    color: "#4c4c4c",
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  quadradoAnimal: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  txtAnimal: {
    color: "#4c4c4c",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  viewButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
    gap: width * 0.02,
  },
  icon: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
});
