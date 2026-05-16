import { CharacterUnlocked } from "./characters";
import { ProgressWorld } from "./worlds";

interface MissionProgress {
    missionId: string;
    completed: boolean;
    assignedAt: string;
}

export interface Progress {
  _id?: string;
  points: number;
  stellarPoints: number;
  coins: number;
  streak: number;
  completedPhases: number;
  selectedCharacter: string;
  worlds: Array<ProgressWorld>;
  dailyMissions: Array<MissionProgress>;
  characters: Array<CharacterUnlocked>;
}