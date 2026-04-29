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

export interface Phase {
  code: string;
  completed: boolean;
  name: string;
  order: number;
  type: "common" | "boss";
}

export interface World{
  code: string;
  name: string;
  description: string;
  order: number;
  phases: Array<Phase>
}

export interface MedalUnlocked {
  medalId: string;
  unlockedAt: string;
  selected: boolean;
};

export interface WorldProgress {
  worldCode: string;
  percentage: number;
  completedPhases: Array<string>;
  unlocked: boolean;
}

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
  worlds: Array<WorldProgress>;
  dailyMissions: Array<MissionProgress>;
  medals: Array<MedalUnlocked>;
}

export type AlertProps = {
  icon: any;
  visible?: boolean;
  title: string;
  message: string;
  dualAction?: boolean;
  closeLabel?: string;
  redirectLabel?: string;
  onClose?: () => void;
  onRedirect?: () => void;
};

export type AlertData = AlertProps & {
  score?: {
    pontos: number;
    porcentagem: number;
    tempo: string;
  };
};

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