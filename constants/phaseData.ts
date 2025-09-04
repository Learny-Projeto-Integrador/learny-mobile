export const dinoOptions: any = {
  dino1: {
    image: require("@/assets/images/dinos/dino1.png"),
    imageApagado: require("@/assets/images/dinos/dino1-apagado.png"),
    source: require("@/assets/audios/sad.wav"),
  },
  dino2: {
    image: require("@/assets/images/dinos/dino2.png"),
    imageApagado: require("@/assets/images/dinos/dino2-apagado.png"),
    source: require("@/assets/audios/angry.wav"),
  },
  dino3: {
    image: require("@/assets/images/dinos/dino3.png"),
    imageApagado: require("@/assets/images/dinos/dino3-apagado.png"),
    source: require("@/assets/audios/happy.wav"),
  },
  dino4: {
    image: require("@/assets/images/dinos/dino4.png"),
    imageApagado: require("@/assets/images/dinos/dino4-apagado.png"),
    source: require("@/assets/audios/afraid.wav"),
  },
};

export const colorMap: Record<string, string> = {
  Sad: "#EF5B6A", // vermelho
  Happy: "#6CD2FF", // amarelo
  Angry: "#80D25B", // azul
};