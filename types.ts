// types.ts
export type RootStackParamList = {
    index: undefined;
    register: { idParent?: string };
    transition: { name: string, type: string };
    profileParent: undefined;
    edit: undefined;
    home: undefined;
    profileChildren: undefined;
    iconChildren: undefined;
    world: undefined;
    menu: undefined;
    diary: undefined;
    ranking: undefined;
    atvFeeling: undefined;
    atvMatch: undefined;
    atvMatchAnswer: { answer: {}};
    atvListening: undefined;
    atvListeningArduino: undefined;
    atvMemory: undefined;
    atvConnect: undefined;
    score: { score: {} }
  };

export type AlertData = {
  title: string;
  message: string;
  score?: {
    pontos: number;
    tempo: string;
  };
}
  