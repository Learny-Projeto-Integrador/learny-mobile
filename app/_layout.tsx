import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css";
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Montserrat_400Regular, 
  Montserrat_500Medium,
  Montserrat_600SemiBold, 
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootStackParamList } from '@/types';
import LoginScreen from './index';
import TransitionScreen from './screens/transition';
import HomeScreen from './screens/home';
import ProfileChildrenScreen from './screens/profileChildren';
import IconChildrenScreen from './screens/iconChildren';
import WorldScreen from './screens/world';
import MenuScreen from './screens/menu';
import DiaryScreen from './screens/diary';
import RankingScreen from './screens/ranking';
import AtvFeelingScreen from './screens/phases/atvFeeling';
import AtvMatchScreen from './screens/phases/atvMatch';
import AtvListeningScreen from './screens/phases/atvListening';
import AtvMemoryScreen from './screens/phases/atvMemory';
import AtvConnectScreen from './screens/phases/atvConnect';
import AtvMatchAnswerScreen from './screens/phases/atvMatchAnswer';
import ScoreScreen from './screens/phases/score';
import ScoreFailScreen from './screens/phases/scoreFail';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { AlertProvider } from '@/contexts/AlertContext';
import AtvBossScreen from './screens/phases/atvBoss';
import AtvSecretScreen from './screens/phases/atvSecret';
import { UserProvider } from '@/contexts/UserContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

const Stack = createStackNavigator<RootStackParamList>()

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn('Erro splash:', e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ProgressProvider>
        <AlertProvider>
          <LoadingProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="index"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="transition"
                component={TransitionScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="profileChildren"
                component={ProfileChildrenScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="iconChildren"
                component={IconChildrenScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="world"
                component={WorldScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="menu"
                component={MenuScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="diary"
                component={DiaryScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ranking"
                component={RankingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvFeeling"
                component={AtvFeelingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvMatch"
                component={AtvMatchScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvMatchAnswer"
                component={AtvMatchAnswerScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvListening"
                component={AtvListeningScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvMemory"
                component={AtvMemoryScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvConnect"
                component={AtvConnectScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvBoss"
                component={AtvBossScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="atvSecret"
                component={AtvSecretScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="score"
                component={ScoreScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="scoreFail"
                component={ScoreFailScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </LoadingProvider>
        </AlertProvider>
      </ProgressProvider>
    </UserProvider>
  );
}
