import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "../../../types";

import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import CustomAlert from "@/components/ui/CustomAlert";
import { useCheckMedalha } from "@/hooks/useChceckMedalha";
import { useCheckAudio } from "@/hooks/useCheckAudio";
import ContainerInfo from "@/components/ui/ContainerInfo";

const { width, height } = Dimensions.get("window");

// Definição da estrutura de cada opção de áudio
type AudioOption = {
  id: string;
  label: string;
  source: any;
  icon: any;
};

const audioOptions: AudioOption[] = [
  {
    id: "dog",
    label: "Dog",
    source: require("../../../assets/audios/dog.wav"),
    icon: require("../../../assets/icons/icon-cachorro.png"),
  },
  {
    id: "cow",
    label: "Cow",
    source: require("../../../assets/audios/cow.wav"),
    icon: require("../../../assets/icons/icon-vaca.png"),
  },
  {
    id: "bird",
    label: "Bird",
    source: require("../../../assets/audios/bird.wav"),
    icon: require("../../../assets/icons/icon-passaro.png"),
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AtvListeningArduinoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [correctOption, setCorrectOption] = useState<AudioOption | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<AudioOption[]>([]);

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

  const handleHint = () => {
    if (medalha != "Desvendando") {
      setAlertDica({
        icon: require("../../../assets/icons/icon-alerta.png"),
        title: "Erro!",
        message: 'Você precisa estar com a medalha "Desvendando"',
      });
      setAlertVisible(true);
      return;
    }

    if (!correctOption || shuffledOptions.length <= 2) return;

    const incorrectOptions = shuffledOptions.filter(
      (opt) => opt.id !== correctOption.id
    );
    const optionToRemove =
      incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

    setShuffledOptions((prev) =>
      prev.filter((opt) => opt.id !== optionToRemove.id)
    );
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * audioOptions.length);
    const selected = audioOptions[randomIndex];
    setCorrectOption(selected);

    const shuffled = [...audioOptions].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, []);

  const handleConfirm = async (isCorrect: boolean) => {
    const { durationFormatted } = getDuration();
    let pontos = 0;
    let porcentagem = 0;

    if (isCorrect) {
      pontos = 100;
      porcentagem = 100;
    }

    if (medalha == "Iniciando!") {
      pontos += 50;
    } else if (medalha == "A todo o vapor!") {
      pontos = pontos * 2;
    }

    const body: any = {
      pontos: pontos,
      fasesConcluidas: 1,
      tipoFase: "listening",
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

  if (!correctOption) return null;

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
        message={
          "Essa é a fase listening. Para concluir ela você deve reconhecer qual é o animal e escolher a opção correta."
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />
      <HeaderFase
        image={require("../../../assets/images/listen.png")}
        title="Listen & Answer"
        description="Ouça o nome e encontre ele escrito"
        color="#EF5B6A"
        onPressInfo={() => setInfoVisible(true)}
      />
      {currentAlert && (
        <CustomAlert
          icon={
            currentAlert.icon ??
            require("../../../assets/icons/icon-check-gradiente.png")
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
            require("../../../assets/icons/icon-check-gradiente.png")
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
      <View
        style={{ paddingHorizontal: width * 0.03, marginTop: height * 0.02 }}
      >
        {audio ? (
          <SoundCard
            id="1"
            image={require("../../../assets/images/som-vermelho-grande.png")}
            source={correctOption.source}
            type="grande"
          />
        ) : (
          <View
            key={correctOption.id}
            style={{
              backgroundColor: "#EF5B6A",
              flexDirection: "row",
              justifyContent: "center",
              padding: width * 0.039,
              borderRadius: 30,
            }}
          >
            <Image
              source={correctOption.icon}
              style={{
                width: width * 0.16,
                height: width * 0.16,
              }}
              resizeMode="contain"
            />
          </View>
        )}
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

      <TouchableOpacity
        onPress={handleHint}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.16,
        }}
      >
        <Image
          source={require("../../../assets/icons/icon-dica.png")}
          style={styles.iconDica}
        />
      </TouchableOpacity>
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
