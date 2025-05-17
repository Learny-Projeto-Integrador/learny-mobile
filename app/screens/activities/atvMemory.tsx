import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "../../../types";
import HeaderFase from "@/components/ui/HeaderFase";
import MemoryCard from "@/components/ui/MemoryCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { useCheckMedalha } from "@/hooks/useChceckMedalha";
import CustomAlert from "@/components/ui/CustomAlert";
import { useCheckAudio } from "@/hooks/useCheckAudio";
import ContainerInfo from "@/components/ui/ContainerInfo";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type AnimalCard = {
  text: string;
  icon: string;
  iconText: string;
  audio: string;
};

const animalCards: Record<string, AnimalCard> = {
  monkey: {
    text: require("../../../assets/images/cards/memory/card-monkey-text.png"),
    icon: require("../../../assets/images/cards/memory/card-monkey-icon.png"),
    iconText: require("../../../assets/images/cards/memory/card-monkey-icon-text.png"),
    audio: require("../../../assets/audios/monkey.wav"),
  },
  bird: {
    text: require("../../../assets/images/cards/memory/card-bird-text.png"),
    icon: require("../../../assets/images/cards/memory/card-bird-icon.png"),
    iconText: require("../../../assets/images/cards/memory/card-bird-icon-text.png"),
    audio: require("../../../assets/audios/bird.wav"),
  },
  snake: {
    text: require("../../../assets/images/cards/memory/card-snake-text.png"),
    icon: require("../../../assets/images/cards/memory/card-snake-icon.png"),
    iconText: require("../../../assets/images/cards/memory/card-snake-icon-text.png"),
    audio: require("../../../assets/audios/snake.wav"),
  },
};

export default function AtvMemoryScreen() {
  const navigation = useNavigation<NavigationProp>();

  const generateCards = () => {
    if (audio === null) return [];
    
    const cards = [];
    let id = 1;
    for (const animal of Object.keys(animalCards)) {
      cards.push({
        id: `${id++}`,
        animal,
        type: "text",
        image: animalCards[animal].text,
        audio: animalCards[animal].audio,
      });
      cards.push({
        id: `${id++}`,
        animal,
        type: "icon",
        image: audio ? animalCards[animal].icon : animalCards[animal].iconText,
        audio: animalCards[animal].audio,
      });
    }

    // Shuffle cards
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(generateCards());
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const [alertDica, setAlertDica] = useState<AlertData | null>(null);
  const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [medalha, setMedalha] = useState<string | null>(null);
  const [audio, setAudio] = useState<boolean | null>(null);
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

  useEffect(() => {
    if (audio !== null) {
      setCards(generateCards());
    }
  }, [audio]);
  

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

    if (isChecking) return;

    // Filtra cartas disponíveis (não selecionadas nem combinadas)
    const availableCards = cards.filter(
      (card) => !selected.includes(card.id) && !matched.includes(card.id)
    );

    // Agrupa por animal
    const animalGroups: Record<string, typeof cards> = {};

    for (const card of availableCards) {
      if (!animalGroups[card.animal]) {
        animalGroups[card.animal] = [];
      }
      animalGroups[card.animal].push(card);
    }

    // Encontra um par válido (mesmo animal, tipos diferentes)
    for (const group of Object.values(animalGroups)) {
      if (group.length >= 2) {
        const types = new Set(group.map((c) => c.type));
        if (types.size >= 2) {
          const pair = group.slice(0, 2); // dois diferentes
          const pairIds = pair.map((c) => c.id);

          setSelected((prev) => [...prev, ...pairIds]);

          // Esconde o par após 2 segundos
          setTimeout(() => {
            setSelected((prev) => prev.filter((id) => !pairIds.includes(id)));
          }, 1000);

          break;
        }
      }
    }
  };
  const handleCardPress = (id: string, animal: string, type: string) => {
    if (isChecking || selected.includes(id) || matched.includes(id)) return;

    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      const isMatch =
        firstCard?.animal === secondCard?.animal &&
        firstCard?.type !== secondCard?.type;

      if (isMatch) {
        setTimeout(() => {
          setMatched((prev) => [...prev, firstId, secondId]);
          setSelected([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setSelected([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length) {
      handleConfirm();
    }
  }, [matched]);

  const handleConfirm = async () => {
    const { durationFormatted } = getDuration();
    let pontos = 100;
    let porcentagem = 100;

    if (medalha == "Iniciando!") {
      pontos += 50;
    } else if (medalha == "A todo o vapor!") {
      pontos = pontos * 2;
    }

    const body: any = {
      pontos: pontos,
      fasesConcluidas: 1,
      tipoFase: "memory",
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
          "Essa é a fase memory. Para concluir ela você deve virar as cartas e ir descobrindo onde estão os pares correspondentes. Para formar um par é necessário clicar em dois cards correspondentes na sequência."
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
        image={require("../../../assets/images/memory.png")}
        title="Memory Game"
        description="Ache os pares de texto e imagem"
        color="#FFB300"
        onPressInfo={() => setInfoVisible(true)}
      />

      <View style={styles.containerCards}>
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            id={card.id}
            image={
              selected.includes(card.id) || matched.includes(card.id)
                ? card.image
                : require("../../../assets/images/cards/memory/card-base.png")
            }
            source={audio ? card.audio : null}
            onPress={() => handleCardPress(card.id, card.animal, card.type)}
            disabled={isChecking}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleHint} style={styles.viewButton}>
        <Image
          source={require("../../../assets/icons/icon-dica.png")}
          style={styles.icon}
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
  },
  containerCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.03,
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  icon: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.008,
  },
});
