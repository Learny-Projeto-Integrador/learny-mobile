export type RootStackParamList = {
  index: undefined;
  register: { idParent?: string };
  transition: { name: string };
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
  atvBoss: undefined;
  atvSecret: undefined;
  score: { score: any };
  scoreFail: { score: any };
};

// rotas que não exigem parâmetros
export type RoutesWithoutParams = {
  [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined
    ? K
    : never;
}[keyof RootStackParamList];

export type User = {
  id: number;
  foto: string;
  nome: string;
  pontos: number;
  fasesConcluidas: number;
  medalhas: Array<Medalha>;
  medalhaSelecionada: Medalha | null;
  rankingAtual: number;
  missoesDiarias: Array<MissaoDiaria>;
  audioAtivado: boolean;
  rankingAtivado: boolean;
  mundos: Array<Mundo>;
};

export type Medalha = {
  nome: string;
  descricao: string;
  mundo: number;
  dataConquista: string;
};

export type MissaoDiaria = {
  nome: string;
  descricao: string;
};

export type Fase = {
  fase: number;
  concluida: boolean;
}

export type Mundo = {
  mundo: number;
  faseAtual: number;
  fases: Array<Fase>;
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