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
  atvMatchAnswer: { score: any; answer: any };
  atvListening: undefined;
  atvMemory: undefined;
  atvConnect: undefined;
  score: { score: any };
  scoreFail: { score: any };
};

// rotas que não exigem parâmetros
export type RoutesWithoutParams = {
  [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined
    ? K
    : never;
}[keyof RootStackParamList];

export type ParentData = {
  idParent: string;
  foto: string;
  nome: string;
  filhos: [{}];
  filhoSelecionado: {fasesConcluidas: any};
};

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