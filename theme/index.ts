import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const getSize = (size: number) => {
  if (width < 360) return size * 0.95;
  if (width < 400) return size;
  if (width < 500) return size * 1.15;
  return size * 1.6;
};

const getFontSize = (size: number) => {
  if (width < 360) return size * 0.8;
  if (width < 400) return size * 0.95;
  if (width < 500) return size * 0.9;
  return size * 1.25;
};

const getHeight = (size: number) => {
  if (height < 700) return size * 0.9;
  if (height < 800) return size;
  if (height < 1000) return size * 1.1;
  return size * 1.35;
};

const getSpacing = (size: number) => {
  if (width < 360) return size * 0.75;
  if (width < 400) return size * 0.8;
  if (width < 500) return size * 0.85;
  return size * 1.1;
};

export const colors = {
  blue: "#6CD2FF",
  green: "#94ECA5",
  red: "#EF5B6A",
  yellow: "#FFFC58",
};

// HELPERS FINAIS
export const RW = getSize;     // largura / componentes
export const RH = getHeight;   // altura controlada
export const RS = getSpacing;  // espaçamento suave
export const RF = getFontSize; // fonte