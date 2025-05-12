import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import CustomAlert from "@/components/ui/CustomAlert";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { AlertData } from "@/types";
import { useCheckMedalha } from "@/hooks/useChceckMedalha";
import { useCheckAudio } from "@/hooks/useCheckAudio";
import ContainerInfo from "@/components/ui/ContainerInfo";

const { width, height } = Dimensions.get("window");

type SoundItem = {
  id: string;
  source: any;
  image: any;
  icon: any;
  expectedLabel: string;
};

const sounds: SoundItem[] = [
  {
    id: "1",
    source: require("../../../assets/audios/cow.wav"),
    image: require("../../../assets/images/som-vermelho.png"),
    icon: require("../../../assets/icons/icon-vaca.png"),
    expectedLabel: "Cow",
  },
  {
    id: "2",
    source: require("../../../assets/audios/bird.wav"),
    image: require("../../../assets/images/som-amarelo.png"),
    icon: require("../../../assets/icons/icon-passaro.png"),
    expectedLabel: "Bird",
  },
  {
    id: "3",
    source: require("../../../assets/audios/dog.wav"),
    image: require("../../../assets/images/som-azul.png"),
    icon: require("../../../assets/icons/icon-cachorro.png"),
    expectedLabel: "Dog",
  },
];

const colors = ["#EF5B6A", "#FFB300", "#6CD2FF"];

export default function AtvListeningScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [assignments, setAssignments] = useState<{ [soundId: string]: string }>(
    {}
  );

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
        score: currentAlert?.score,
      });
    }
  };
  const handleAssign = (soundId: string, label: string) => {
    setAssignments((prev) => ({ ...prev, [soundId]: label }));
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
    for (const sound of sounds) {
      const isAssigned = assignments[sound.id];
      if (!isAssigned) {
        setAssignments((prev) => ({
          ...prev,
          [sound.id]: sound.expectedLabel,
        }));
        break; // Aplica a dica a apenas um item
      }
    }
  };

  const handleConfirm = async () => {
    const { durationFormatted } = getDuration();

    let correct = 0;
    sounds.forEach((sound) => {
      if (assignments[sound.id] === sound.expectedLabel) correct++;
    });
    let pontos = (correct / sounds.length) * 100;
    let porcentagem = (correct / sounds.length) * 100;

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

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
        message={
          "Essa é a fase listening. Para concluir ela você deve reconhecer quais são as posições corretas dos animais e ordenar eles corretamente."
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
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
      <HeaderFase
        image={require("../../../assets/images/listen.png")}
        title="Listen & Answer"
        description="Ouça o nome e encontre ele escrito"
        color="#EF5B6A"
        onPressInfo={() => setInfoVisible(true)}
      />

      <View style={styles.containerSounds}>
        {sounds.map((sound) =>
          audio ? (
            <SoundCard
              key={sound.id}
              id={sound.id}
              image={sound.image}
              source={sound.source}
            />
          ) : (
            <View
              key={sound.id}
              style={{
                //@ts-ignore
                backgroundColor: colors[sound.id - 1],
                flexDirection: "row",
                padding: width * 0.039,
                borderRadius: 30,
              }}
            >
              <Image
                source={sound.icon}
                style={{
                  width: width * 0.16,
                  height: width * 0.16,
                }}
                resizeMode="contain"
              />
            </View>
          )
        )}
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
        <TouchableOpacity onPress={handleHint} style={{ flexDirection: "row" }}>
          <Image
            source={require("../../../assets/icons/icon-dica.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handleConfirm}
        >
          <Image
            source={require("../../../assets/icons/icon-confirmar-vermelho.png")}
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
