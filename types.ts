export interface TokenPayload {
  user: {
    username: string;
    name: string;
    type: "parent" | "child";
  }
};

export interface User {
  _id?: string;
  profilePicture: string | null;
  username: string;
  name: string;
  points: number;
  audioActive: boolean;
  rankingActive: boolean;
};

export type Phase = {
  code: string;
  name: string;
  order: number;
  type: string;
  completed: boolean;
};

export type Module = {
  code: string;
  name: string;
  order: number;
  phases: Phase[];
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

export interface MedalUnlocked {
  medalId: string;
  unlockedAt: string;
  selected: boolean;
};


export interface MissionProgress {
    missionId: string;
    completed: boolean;
    assignedAt: string;
}

export interface Progress {
  _id?: string;
  points: number;
  completedPhases: number;
  ranking: number;
  selectedMedal: string;
  worlds: Array<ProgressWorld>;
  dailyMissions: Array<MissionProgress>;
  medals: Array<MedalUnlocked>;
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
  pontos: number;
  tempo: number;
};