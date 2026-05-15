import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export type PhaseStats = {
  points: number;
  coins: number;
  correctAnswers: number;
  wrongAnswers: number;
};

export type BossPhaseStats = PhaseStats & {
  hintsUsed: number;
  time: string;
}

export type Feedback = {
  label: string;
  content: ReactNode;
  stats: Partial<PhaseStats>;
};

export type EmotionOption = {
  id: string;
  image: ImageSourcePropType;
  bigImage: ImageSourcePropType;
  audio: string;
  emotion: string;
  color?: string;
};


export type ConnectionCard = EmotionOption & {
  uniqueId: string;

  x: number;
  y: number;

  column: "left" | "right";
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
