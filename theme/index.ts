import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const baseWidth = 375;
const baseHeight = 812;

const scale = (size: number) => (width / baseWidth) * size;
const verticalScale = (size: number) => (height / baseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const colors = {
  blue: "#6CD2FF",
  green: "#94ECA5",
  red: "#EF5B6A",
  yellow: "#FFFC58",
};

// helpers padrão
export const RW = scale;
export const RH = verticalScale;
export const RF = moderateScale;
export const RS = moderateScale;