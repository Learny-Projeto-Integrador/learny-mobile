import { ImageSourcePropType } from "react-native";

export type EmotionOption = {
  id: string;
  image: ImageSourcePropType;
  bigImage: ImageSourcePropType;
  audio: string;
  emotion: string;
};

export type FeelingOption = EmotionOption & {
  color: string;
};

export type ConnectOption = EmotionOption & {
  color: string;
};

export type ConnectionCard = EmotionOption & {
  uniqueId: string;

  x: number;
  y: number;

  column: "left" | "right";

  color: string;
};

export type Connection = {
  from: ConnectionCard;
  to: ConnectionCard;
  isCorrect: boolean;
  color: string;
};

export type ListenItem = {
  id: string;
  audio: any;
  color: any;
  expectedLabel: string;
};

export type Balloon = {
  id: string;
  left: number;
  size: number;
  letter: string;
  color: string;
  audio: any;
}

export type Word = {
  id: number;
  label: string;
  audio: any;
  image: any;
  color: string;
};

export type Placement = (Word | null)[];
