import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "../../../../types";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import SoundCard from "@/components/ui/Children/Phases/SoundCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import CustomAlert from "@/components/ui/CustomAlert";
import { useCheckMedalha } from "@/hooks/useChceckMedalha";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { useCheckAudio } from "@/hooks/useCheckAudio";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";

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
    image: require("@/assets/images/dinos/dino1-grande.png"),
    emotion: "Sad",
    source: require("@/assets/audios/sad.wav"),
  },
  {
    id: "dino2",
    image: require("@/assets/images/dinos/dino2-grande.png"),
    emotion: "Angry",
    source: require("@/assets/audios/angry.wav"),
  },
  {
    id: "dino3",
    image: require("@/assets/images/dinos/dino3-grande.png"),
    emotion: "Happy",
    source: require("@/assets/audios/happy.wav"),
  },
];

export default function AtvMatchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDino, setSelectedDino] = useState<DinoOption | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<DinoOption[]>([]);

  const [alertDica, setAlertDica] = useState<AlertData | null>(null);
  const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [medalha, setMedalha] = useState<string | null>(null);
  const [audio, setAudio] = useState<any>(null);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  const { getDuration } = useScreenDuration();
  const { submitMission } = useSubmitMission();
  const { checkMedalha } = useCheckMedalha();
  const { checkAudio } = useCheckAudio();

  useFocusEffect(
    useCallback(() => {
      const fetchMedalha = async () => {
        const nomeMedalha = await checkMedalha();
        setMedalha(nomeMedalha ?? null);
      };
      const fetchAudio = async () => {
        const audio = await checkAudio();
        setAudio(audio ?? null);
      };
      fetchAudio();
      fetchMedalha();
    }, [])
  );

  const showNextAlert = () => {
    if (alertQueue.length > 0) {
      const [next, ...rest] = alertQueue;
      setCurrentAlert(next);
      setAlertQueue(rest);
      setAlertVisible(true);
    } else {
      setCurrentAlert(null);
      // Vai para a tela de score quando todos os alertas forem fechados
      navigation.navigate("score", {
        //@ts-ignore
        score: currentAlert?.score,
      });
    }
  };

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

  const handleHint = () => {
    if (medalha != "Desvendando") {
      setAlertDica({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message: 'Você precisa estar com a medalha "Desvendando"',
      });
      setAlertVisible(true);
      return;
    }
    if (!selectedDino || shuffledOptions.length <= 2) return;

    const incorrectOptions = shuffledOptions.filter(
      (opt) => opt.emotion !== selectedDino.emotion
    );

    const optionToRemove =
      incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

    setShuffledOptions((prev) =>
      prev.filter((opt) => opt.id !== optionToRemove.id)
    );
  };

  const handleConfirm = async (pontosFase: number, porcentagemFase: number) => {
    const { durationFormatted } = getDuration();
    let pontos = pontosFase;
    let porcentagem = porcentagemFase;

    if (medalha == "Iniciando!") {
      pontos != 0 ? pontos += 50 : null
    } else if (medalha == "A todo o vapor!") {
      pontos = pontos * 2;
    }

    const body: any = {
      pontos: pontos,
      fasesConcluidas: 1,
      tipoFase: "feeling",
    };

    const response = await submitMission(body);

    if (response.success) {
      const score = { pontos, porcentagem, tempo: durationFormatted };
      const newAlerts: AlertData[] = [];

      if (response.result.missaoConcluida) {
        newAlerts.push({
          title: "Diária concluída!",
          message: response.result.missaoConcluida.descricao,
          score,
        });
      }

      if (
        response.result.medalhasGanhas &&
        response.result.medalhasGanhas.length > 0
      ) {
        for (const medalha of response.result.medalhasGanhas) {
          newAlerts.push({
            //@ts-ignore
            icon: imgsMedalhas[medalha.nome],
            title: "Medalha conquistada!",
            message: medalha.descricao || "Você ganhou uma medalha!",
            score,
          });
        }
      }

      if (newAlerts.length > 0) {
        setCurrentAlert(newAlerts[0]);
        setAlertQueue(newAlerts.slice(1)); // Apenas o restante entra na fila
        setAlertVisible(true);
      } else {
        navigation.navigate("score", { score });
      }
    } else {
      setCurrentAlert({
        title: "Erro!",
        message: response.error ? response.error : "Erro desconhecido",
      });
      setAlertQueue([]);
      setAlertVisible(true);
    }
  };

  const handleError = (dino: DinoOption) => {
    const { durationFormatted } = getDuration();
    navigation.navigate("atvMatchAnswer", {
      score: {
        pontos: 0,
        tempo: durationFormatted,
      },
      answer: {
        image: dino.image,
        emotion: dino.emotion,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
                    message={
                      "Essa é a fase feeling. A primeira parte é um reconhecimento, para você descobrir quais são as emoções e seus respectivos dinos. Na segunda etapa você deve selecionar a emoção correta do dino entre as opções."
                    }
                    visible={infoVisible}
                    onClose={() => setInfoVisible(false)}
                  />
      {currentAlert && (
        <CustomAlert
          icon={
            currentAlert.icon ??
            require("@/assets/icons/icon-check-gradiente.png")
          }
          visible={alertVisible}
          onClose={() => {
            setAlertVisible(false);
            showNextAlert();
          }}
          dualAction={false}
          title={currentAlert.title}
          message={currentAlert.message}
        />
      )}
      {alertDica && (
        <CustomAlert
          icon={
            alertDica.icon ??
            require("@/assets/icons/icon-check-gradiente.png")
          }
          visible={alertVisible}
          onClose={() => {
            setAlertVisible(false);
          }}
          dualAction={false}
          title={alertDica.title}
          message={alertDica.message}
        />
      )}
      <HeaderFase
        image={require("@/assets/images/eye.png")}
        title="Look & Match"
        description="Veja a imagem e ligue a emoção correta"
        color="#6CD2FF"
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
              source={audio ? option.source : null}
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
          source={require("@/assets/icons/icon-dica.png")}
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
