import { ImageSourcePropType } from "react-native";

export interface Character {
  code: string;
  name: string;
  image: string;
  description: string;
  effect: string;
  tags: string[];
  unlockDescription: string;
}

export interface CharacterUnlocked {
  characterCode: string;
  unlockedAt: string;
  level: number;
  characterPoints: number;
};

export interface CharacterWithProgress extends Character {
  unlocked: boolean;

  level: number;

  characterPoints: number;

  unlockedAt?: string | null;
}