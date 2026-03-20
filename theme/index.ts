import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const baseWidth = 375;
const baseHeight = 812;

const scale = (size: number) => (width / baseWidth) * size;
const verticalScale = (size: number) => (height / baseHeight) * size;

export const fontSizes = {
  sm: scale(12),
  md: scale(14),
  lg: scale(16),
  xl: scale(20),
  title: scale(22),
};

export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

export const colors = {
  blue: "#6CD2FF",
  green: "#94ECA5",
  red: "#EF5B6A",
  yellow: "#FFFC58",
};

// helpers padrão
export const RF = scale;
export const RW = scale;
export const RH = verticalScale;
export const RS = scale;