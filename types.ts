export interface User {
  _id?: string;
  profilePicture: string | null;
  username: string;
  name: string;
  audioActive: boolean;
  rankingActive: boolean;
};

export interface Progress {
  _id?: string;
  points: number;
  stellarPoints: number;
  coins: number;
  streak: number;
  completedPhases: number;
  ranking: number;
  selectedCharacter: string;
  worlds: Array<ProgressWorld>;
  dailyMissions: Array<MissionProgress>;
  characters: Array<CharacterUnlocked>;
}

export interface TokenPayload {
  user: {
    username: string;
    name: string;
    type: "parent" | "child";
  }
};

export type World = {
  code: string;
  name: string;
  modules: Module[];
};

export interface WorldInfoCatalog{
  code: string;
  name: string;
  description: string;
  color: string;
  order: number;
  picture: string;
}

export interface ProgressWorld {
  worldCode: string;
  percentage: number;
  completedPhases: Array<string>;
  unlocked: boolean;
}

export interface WorldWithProgress extends WorldInfoCatalog {
  progress: number;
  unlocked: boolean;
  completedPhases: Array<string>;
}

export type Module = {
  code: string;
  name: string;
  order: number;
  phases: Phase[];
};

export type Phase = {
  code: string;
  name: string;
  order: number;
  type: string;
  completed: boolean;
};

export interface Character {
  code: string;
  name: string;
  description: string;
  pointsRequired: number;
  image: string;
}

export interface CharacterUnlocked {
  characterCode: string;
  unlockedAt: string;
  level: number;
  characterPoints: number;
};

export interface MissionProgress {
    missionId: string;
    completed: boolean;
    assignedAt: string;
}

export type CardInfo = {
  id: string;
  type: string;
  x: number;
  y: number;
  column: "left" | "right";
};

export type Connection = {
  from: CardInfo;
  to: CardInfo;
  isCorrect: boolean;
  color: string;
};

export type MemoryCardType = {
  text: string;
  icon: string;
  iconText: string;
  audio: string;
};

export type SoundItem = {
  id: string;
  audio: any;
  image: any;
  icon: any;
  expectedLabel: string;
};

export type Score = {
  stellarPoints: number;
  tempo: number;
};