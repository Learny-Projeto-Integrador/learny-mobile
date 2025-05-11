import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContainerActionChildren from "@/components/ui/ContainerActionChildren";
import ContainerAcessibilidade from "@/components/ui/ContainerAcessibilidade";
import GradientText from "@/components/ui/GradientText";
import ContainerEmotion from "@/components/ui/ContainerEmotion";
import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type DinoOption = {
  id: string;
  image: string;
  emotion: string;
  source: string;
};

const dinoOptions: DinoOption[] = [
  {
    id: "dino1",
    image: require("../../../assets/images/dinos/dino1-grande.png"),
    emotion: "Sad",
    source: require("../../../assets/audios/sad.wav"),
  },
  {
    id: "dino2",
    image: require("../../../assets/images/dinos/dino2-grande.png"),
    emotion: "Angry",
    source: require("../../../assets/audios/angry.wav"),
  },
  {
    id: "dino3",
    image: require("../../../assets/images/dinos/dino3-grande.png"),
    emotion: "Happy",
    source: require("../../../assets/audios/happy.wav"),
  },
];

export default function AtvMatchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDino, setSelectedDino] = useState<DinoOption | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<DinoOption[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getDuration } = useScreenDuration();

  useEffect(() => {
    // Escolhe um dino aleatoriamente
    const randomDino =
      dinoOptions[Math.floor(Math.random() * dinoOptions.length)];
    setSelectedDino(randomDino);

    // Embaralha as opções
    const shuffled = shuffleArray([...dinoOptions]);
    setShuffledOptions(shuffled);
  }, []);

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
      return null;
    }
  };

  const handleConfirm = async () => {
    const { durationFormatted } = getDuration();
    const pontos = 100;

    setLoading(true);
    setError(null);

    const body: any = {
      pontos: pontos,
      fasesConcluidas: 1,
      tipoFase: "feeling",
    };

    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/criancas/faseconcluida`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        const score = { pontos: pontos, tempo: durationFormatted };
        navigation.navigate("score", { score: score });
      } else {
        setError(result.error);
        Alert.alert("Erro na atualização dos pontos", result.error);
      }
    } catch (err: any) {
      setError(err.message);
      Alert.alert(
        "Erro inesperado",
        "Não foi possível conectar ao servidor. Verifique sua conexão."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleError = (dino: DinoOption) => {
    navigation.navigate("atvMatchAnswer", {
      answer: {
        image: dino.image,
        emotion: dino.emotion,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderFase
        image={require("../../../assets/images/eye.png")}
        title="Look & Match"
        description="Veja a imagem e ligue a emoção correta"
        color="#6CD2FF"
      />

      <View
        style={{
          alignItems: "center",
          gap: height * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Text style={styles.txtPergunta}>Como ele está?</Text>

        {selectedDino && (
          <Image
            //@ts-ignore
            source={selectedDino.image}
            style={{ width: width * 0.75, aspectRatio: 350 / 257 }}
          />
        )}

        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          {shuffledOptions.map((option, index) => (
            <SoundCard
              key={option.id}
              id={String(index + 1)}
              text={
                option.emotion.charAt(0).toUpperCase() + option.emotion.slice(1)
              }
              source={option.source}
              type="grande"
              onPress={() => {
                if (option.emotion === selectedDino?.emotion) {
                  handleConfirm();
                } else {
                  //@ts-ignore
                  handleError(selectedDino);
                }
              }}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.015,
        }}
      >
        <Image
          source={require("../../../assets/icons/icon-dica.png")}
          style={styles.iconDica}
        />
      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.5,
  },
  containerDados: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    marginTop: height * 0.03,
    gap: width * 0.05,
  },
  foto: {
    width: width * 0.33,
    aspectRatio: 139 / 129,
  },
  viewVoltar: {
    position: "relative",
    alignItems: "center",
    paddingLeft: width * 0.01,
    paddingTop: height * 0.01,
    gap: height * 0.015,
  },
  iconVoltar: {
    width: width * 0.075,
    height: width * 0.075,
  },
  iconInfo: {
    width: width * 0.06,
    height: width * 0.06,
  },
  containerNamePhase: {
    justifyContent: "center",
  },
  txt: {
    color: "#6CD2FF",
    fontSize: width * 0.075,
    fontFamily: "Montserrat_800ExtraBold",
  },
  retangulo: {
    width: width * 0.87,
    aspectRatio: 350 / 85,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.03,
  },
  txtTipoFase: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.055,
    fontFamily: "Montserrat_500Medium",
  },
  img: {
    marginTop: height * 0.02,
    width: width * 0.8,
    aspectRatio: 350 / 257,
  },
  txtPergunta: {
    color: "#4c4c4c",
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  iconDica: {
    width: width * 0.1,
    aspectRatio: 49 / 67,
  },
});
