import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import SoundCard from "@/components/ui/Children/Phases/SoundCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import { useCheckHint } from "@/hooks/useCheckHint";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { scale } from "react-native-size-matters";
import { useRouter } from "expo-router";

type Option = {
  id: string;
  image: string;
  emotion: string;
  audio: string;
};

const options: any = [
  {
    id: "dino1",
    image: require("@/assets/images/phases/watch/dinos/dino1/big.png"),
    emotion: "Sad",
    audio: require("@/assets/audios/emotions/sad.wav"),
  },
  {
    id: "dino2",
    image: require("@/assets/images/phases/watch/dinos/dino2/big.png"),
    emotion: "Angry",
    audio: require("@/assets/audios/emotions/angry.wav"),
  },
  {
    id: "dino3",
    image: require("@/assets/images/phases/watch/dinos/dino3/big.png"),
    emotion: "Happy",
    audio: require("@/assets/audios/emotions/happy.wav"),
  },
];

export default function AtvMatchScreen() {
  const router = useRouter();
  const [selectedDino, setSelectedDino] = useState<Option | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { getDuration } = useScreenDuration();
  const { user } = useUser();
  const { submitMission } = useSubmitMission();
  const { setHintUsed, checkHint } = useCheckHint();

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleHint = async () => {
    showLoadingModal();
    const canUse = await checkHint();
    hideLoadingModal();

    if (!canUse) return;

    if (!selectedDino || shuffledOptions.length <= 2) return;

    const incorrectOptions = shuffledOptions.filter(
      (opt) => opt.emotion !== selectedDino.emotion
    );

    const optionToRemove =
      incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

    setShuffledOptions((prev) =>
      prev.filter((opt) => opt.id !== optionToRemove.id)
    );

    setHintUsed(true); // marca que a dica foi usada
  };

  const handleConfirm = async (pontosFase: number, porcentagemFase: number) => {
    showLoadingModal();
    const { durationFormatted } = getDuration();
    let pontos = pontosFase;
    let porcentagem = porcentagemFase;

    const response = await submitMission({
      pontos: pontos, 
      tipoFase: "feeling"
    });

    if (response.success) {
      let pontosAtualizados = response.pontosAtualizados ?? pontos;
      const score = { pontosAtualizados, porcentagem, tempo: durationFormatted };
      router.push({
        pathname: '/screens/phasesscore',
        params: { score: JSON.stringify(score) },
      });
    }
    hideLoadingModal();
  };

  const handleError = (dino: Option) => {
    const { durationFormatted } = getDuration();
    router.push({
      pathname: '/screens/phasesatvMatchAnswer',
      params: { score: JSON.stringify({
          score: {
            pontos: 0,
            tempo: durationFormatted,
          },
          answer: {
            image: dino.image,
            emotion: dino.emotion,
          }
        }) 
      },
    });
  };

  useEffect(() => {
    // Escolhe um dino aleatoriamente
    const randomDino =
      options[Math.floor(Math.random() * options.length)];
    setSelectedDino(randomDino);

    // Embaralha as opções
    const shuffled = shuffleArray([...options]);
    setShuffledOptions(shuffled);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
        message={
          "Essa é a fase feeling. A primeira parte é um reconhecimento, para você descobrir quais são as emoções e seus respectivos dinos. Na segunda etapa você deve selecionar a emoção correta do dino entre as opções."
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />
      <HeaderFase
        image={require("@/assets/images/phases/watch/intro.png")}
        title="Look & Match"
        description="Veja a imagem e ligue a emoção correta"
        color="#94ECA5"
        onPressInfo={() => setInfoVisible(true)}
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
            style={{ width: scale(300), height: scale(217) }}
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
              audio={user?.audioActive ? option.audio : null}
              type="grande"
              onPress={() => {
                if (option.emotion === selectedDino?.emotion) {
                  let porcentagem = 100;
                  let pontos = 100;
                  handleConfirm(pontos, porcentagem);
                } else {
                  //@ts-ignore
                  handleError(selectedDino);
                }
              }}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleHint}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.015,
        }}
      >
        <Image
          source={require("@/assets/icons/phases/hint.png")}
          style={styles.iconDica}
        />
      </TouchableOpacity>
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
