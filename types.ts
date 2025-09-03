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

export type ParentData = {
  idParent: string;
  foto: string;
  nome: string;
  filhos: [{}];
  filhoSelecionado: {fasesConcluidas: any};
};

export type AlertProps = {
  icon: any;
  visible: boolean;
  title: string;
  message: string;
  dualAction?: boolean;
  onClose: () => void;
  onRedirect?: () => void; // ação do segundo botão
  closeLabel?: string;
  redirectLabel?: string; // texto do segundo botão
};

export type AlertData = {
  icon?: any;
  title: string;
  message: string;
  dual?: boolean;
  label?: string;
  redirectLabel?: string;
  onRedirect?: () => void;
  score?: {
    pontos: number;
    porcentagem: number;
    tempo: string;
  };
}