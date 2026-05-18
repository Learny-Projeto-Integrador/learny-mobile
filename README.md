# learny-mobile

Aplicativo mobile do projeto **Learny** destinado às crianças. Plataforma educacional gamificada com mundos, módulos, fases, personagens desbloqueáveis e missões diárias. Comunica-se diretamente com a API via HTTPS + JWT.

## Repositórios do projeto Learny

O projeto Learny é dividido em três repositórios independentes:

| Repositório | Descrição | Link |
|-------------|-----------|------|
| **learny-mobile** | Aplicativo mobile (Expo / React Native) usado pelas crianças — *você está aqui* | — |
| **learny-mobile-api** | API REST (Flask + MongoDB) que atende mobile e dashboard | [github.com/Learny-Projeto-Integrador/learny-mobile-api](https://github.com/Learny-Projeto-Integrador/learny-mobile-api) |
| **dashboard-learny** | Dashboard web (Next.js) usado pelos pais e responsáveis | [github.com/jmkirimis/dashboard-learny](https://github.com/jmkirimis/dashboard-learny) |

## Stack

- **Expo SDK 54** + **React Native 0.81** + **React 19**
- **Expo Router 6** (file-based routing)
- **TypeScript** strict
- **NativeWind 4** + **Tailwind CSS 3** para estilização
- **Reanimated 4** + **Moti** para animações
- **Lottie** para animações vetoriais
- **react-native-game-engine** + **matter-js** para as fases interativas
- **expo-audio** / **expo-av** para áudio
- **AsyncStorage** para persistência local do JWT
- **Jest** (preset `jest-expo`) para testes
- Build via **EAS** (Expo Application Services)

## Pré-requisitos

- Node.js 20 ou superior
- npm (vem com o Node)
- Para rodar em dispositivo: o app **Expo Go** instalado no celular (Android ou iOS)
- Para builds nativos: conta no Expo + `eas-cli` (`npm install -g eas-cli`)
- Acesso à API `learny-mobile-api` em execução (local ou produção)

## Setup local

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd learny-mobile

# 2. Instale as dependências
npm install

# 3. Configure o arquivo .env.local (veja a próxima seção)

# 4. Inicie o Metro bundler
npm start
```

A partir do menu do Metro, escolha como abrir o app:

- `a` — abre no emulador Android
- `i` — abre no simulador iOS (macOS apenas)
- `w` — abre no navegador (web build)
- Ler o QR code com o **Expo Go** no celular

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

| Variável               | Descrição                                                                 | Obrigatória |
|------------------------|---------------------------------------------------------------------------|-------------|
| `EXPO_PUBLIC_API_URL`  | URL base da API Flask (ex.: `https://learny-mobile-api.onrender.com`)     | Sim         |

O prefixo `EXPO_PUBLIC_*` é exigido pelo Expo para que a variável fique disponível no bundle do cliente.

Exemplo de `.env.local`:

```env
EXPO_PUBLIC_API_URL=https://learny-mobile-api.onrender.com
```

## Scripts

```bash
npm start             # Inicia o Metro bundler (menu interativo)
npm run android       # Abre direto no emulador/dispositivo Android
npm run ios           # Abre no simulador iOS (macOS apenas)
npm run web           # Abre a versão web
npm test              # Roda os testes Jest uma vez
npm run test:watch    # Jest em watch mode
npm run lint          # ESLint via expo lint
npm run typecheck     # tsc --noEmit
npm run reset-project # Move o código atual para app-example e recria app/ em branco
```

## Estrutura do projeto

```
learny-mobile/
├── app/                       # Rotas (file-based routing do Expo Router)
│   ├── _layout.tsx            # Layout raiz (providers)
│   ├── index.tsx              # Login (rota /)
│   └── screens/               # Telas do app
│       ├── home.tsx
│       ├── menu.tsx
│       ├── world.tsx          # Trilha de mundos/módulos/fases
│       ├── profile.tsx
│       ├── ranking.tsx
│       ├── store.tsx
│       ├── diary.tsx
│       ├── characters.tsx
│       ├── notifications.tsx
│       ├── acessibility.tsx
│       ├── transition.tsx
│       └── phases/            # Fases jogáveis
│           ├── atvConnect.tsx
│           ├── atvFeeling.tsx
│           ├── atvListening.tsx
│           ├── atvSecret.tsx
│           ├── atvBoss.tsx
│           ├── score.tsx
│           ├── fail.tsx
│           ├── errorFeedback.tsx
│           └── extras/
├── components/                # Componentes reutilizáveis (incluindo ui/Phases)
├── contexts/                  # Providers globais (User, Alert, Audio, Phase, Trail, ...)
├── hooks/                     # useApi, usePhase, useCharacters
├── constants/                 # Colors, definições de mundos/fases
├── theme/                     # Helpers de tipografia e espaçamento responsivos
├── types/                     # Tipagens compartilhadas
├── utils/                     # Funções utilitárias (ex.: emotions)
├── assets/                    # Imagens, ícones, fontes, áudios
├── scripts/                   # reset-project.js
├── .github/workflows/ci.yml   # Pipeline CI/CD
├── app.json                   # Manifesto Expo
├── eas.json                   # Configuração de build do EAS
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Telas principais

| Rota                       | Descrição                                                            |
|----------------------------|----------------------------------------------------------------------|
| `/`                        | Tela de login (`app/index.tsx`)                                      |
| `/screens/home`            | Home da criança (após login)                                         |
| `/screens/menu`            | Menu principal                                                       |
| `/screens/world`           | Trilha de mundos, módulos e fases                                    |
| `/screens/profile`         | Perfil e personagem selecionado                                      |
| `/screens/ranking`         | Ranking global de pontuação                                          |
| `/screens/store`           | Loja de itens em troca de moedas                                     |
| `/screens/diary`           | Diário de atividades / missões                                       |
| `/screens/characters`      | Catálogo de personagens desbloqueáveis                               |
| `/screens/notifications`   | Notificações enviadas pelos responsáveis                             |
| `/screens/acessibility`    | Opções de acessibilidade (áudio, ranking)                            |
| `/screens/transition`      | Animação de transição ao fazer login                                 |
| `/screens/phases/*`        | Telas jogáveis (Connect, Feeling, Listening, Secret, Boss)           |

## Contextos (providers globais)

Os providers ficam todos em `contexts/` e são montados no `app/_layout.tsx`:

| Contexto             | Responsabilidade                                                        |
|----------------------|-------------------------------------------------------------------------|
| `UserContext`        | Dados do usuário autenticado + token JWT em AsyncStorage                |
| `AlertContext`       | Modal de alertas customizado (`showAlert(...)`)                         |
| `AudioContext`       | Playback de áudio (efeitos sonoros, voz das fases)                      |
| `LoadingContext`     | Modal de loading global                                                 |
| `FeedbackContext`    | Feedback positivo/negativo durante as fases                             |
| `PhaseContext`       | Estado compartilhado de uma fase em andamento (via `usePhase`)          |
| `ProgressContext`    | Progresso da criança (pontos, moedas, streak, personagens)              |
| `TrailContext`       | Estado da trilha atual (mundo/módulo/fase selecionados)                 |

## Testes

A suíte usa **Jest** com o preset `jest-expo`.

```bash
npm test              # Roda todos os testes uma vez (passWithNoTests)
npm run test:watch    # Modo watch
```

Os testes ficam em `__tests__/` ao lado dos componentes ou colocalizados como `*.test.ts(x)`.

## CI/CD

O pipeline (`.github/workflows/ci.yml`) executa em todo push e pull request para `main` e `develop`:

1. **Lint**: `npm run lint` (`expo lint`)
2. **Type check**: `npm run typecheck` (`tsc --noEmit`)
3. **Testes**: `npm test`
4. **Bundle**: `npx expo export --platform all` — valida que o Metro consegue empacotar o bundle para iOS, Android e web

O CI atua apenas como **gate de qualidade**. Builds nativos (APK/AAB/IPA) são disparados **manualmente** via EAS para evitar consumir cota de build a cada commit.

### Builds EAS

A configuração está em `eas.json` com três perfis:

| Perfil         | Distribuição | Uso                                          |
|----------------|--------------|----------------------------------------------|
| `development`  | internal     | Build com `developmentClient` para testes    |
| `preview`      | internal     | Build interno para validação                 |
| `production`   | store        | Build final com `autoIncrement` de versão    |

Comandos comuns:

```bash
# Login no EAS (uma vez)
eas login

# Build de desenvolvimento (Android)
eas build --profile development --platform android

# Build de preview (Android + iOS)
eas build --profile preview --platform all

# Build de produção
eas build --profile production --platform all

# Submit para as lojas
eas submit --profile production --platform android
eas submit --profile production --platform ios
```

O `projectId` do EAS está em `app.json` (`extra.eas.projectId`).

## Convenções

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `ci:`, `test:`, `refactor:`, ...).
- **Branches**: `main` (produção), `develop` (integração), feature branches a partir de `develop`.
- **Tipagem**: TypeScript strict habilitado; o pipeline falha em qualquer erro de tipo.
- **Estilo**: ESLint via `expo lint`; warnings são tolerados mas errors quebram o CI.
- **Hooks**: funções retornadas por hooks customizados **não devem** começar com `use*` para evitar falso positivo do `react-hooks/rules-of-hooks` (ex.: usamos `consumeHint` em vez de `useHint`).
