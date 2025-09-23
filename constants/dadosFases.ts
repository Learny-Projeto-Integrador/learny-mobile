import { ImageSourcePropType } from "react-native";

export const imgsMissoes: Record<string, ImageSourcePropType> = {
  "uma fase": require("@/assets/images/diarias/diaria-uma-fase.png"),
  "fase connect": require("@/assets/images/diarias/diaria-ligar.png"),
  "fase listening": require("@/assets/images/diarias/diaria-escuta.png"),
  "fase feeling": require("@/assets/images/diarias/diaria-emocoes.png"),
  "fase memoria": require("@/assets/images/diarias/diaria-memoria.png"),
};

export const animalColors: Record<string, string> = {
  monkey: "#FFB300", // amarelo
  bird: "#6CD2FF", // azul
  horse: "#EF5B6A", // marrom
  snake: "#80D25B", // verde
};
