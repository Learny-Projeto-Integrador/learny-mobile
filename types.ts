// types.ts
export type RootStackParamList = {
    index: undefined;
    register: { idParent?: string };
    transition: { name: string, type: string };
    profileParent: undefined;
    edit: { userFilho?: string }
    home: undefined;
    profileChildren: undefined;
    iconChildren: undefined;
    world: undefined;
    menu: undefined;
    diary: undefined;
    ranking: undefined;
    atvFeeling: undefined;
    atvMatch: undefined;
    atvMatchAnswer: { score: {}, answer: {}};
    atvListening: undefined;
    atvMemory: undefined;
    atvConnect: undefined;
    score: { score: {} };
    scoreFail: { score: {} };
  };

export type AlertData = {
  icon?: any;
  title: string;
  message: string;
  dual?: boolean;
  label?: string;
  score?: {
    pontos: number;
    porcentagem: number;
    tempo: string;
  };
}
  