export const dinoOptions: any = {
  dino1: {
    image: require("@/assets/images/phases/watch/dinos/dino1/revealed.png"),
    imageApagado: require("@/assets/images/phases/watch/dinos/dino1/hidden.png"),
    audio: require("@/assets/audios/emotions/sad.wav"),
  },
  dino2: {
    image: require("@/assets/images/phases/watch/dinos/dino2/revealed.png"),
    imageApagado: require("@/assets/images/phases/watch/dinos/dino2/hidden.png"),
    audio: require("@/assets/audios/emotions/angry.wav"),
  },
  dino3: {
    image: require("@/assets/images/phases/watch/dinos/dino3/revealed.png"),
    imageApagado: require("@/assets/images/phases/watch/dinos/dino3/hidden.png"),
    audio: require("@/assets/audios/emotions/happy.wav"),
  },
  dino4: {
    image: require("@/assets/images/phases/watch/dinos/dino4/revealed.png"),
    imageApagado: require("@/assets/images/phases/watch/dinos/dino4/hidden.png"),
    audio: require("@/assets/audios/emotions/afraid.wav"),
  },
};

export const colorMap: Record<string, string> = {
  Sad: "#EF5B6A", // vermelho
  Happy: "#6CD2FF", // amarelo
  Angry: "#80D25B", // azul
};