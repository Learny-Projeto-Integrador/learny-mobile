import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
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

import LoginScreen from './screens';
import RegisterScreen from './screens/register';
import TransitionScreen from './screens/transition';
import ProfileParentScreen from './screens/parent/profileParent';
import EditScreen from './screens/edit';
import HomeScreen from './screens/children/home';
import ProfileChildrenScreen from './screens/children/profileChildren';
import IconChildrenScreen from './screens/children/iconChildren';
import WorldScreen from './screens/children/world';
import MenuScreen from './screens/children/menu';
import DiaryScreen from './screens/children/diary';
import RankingScreen from './screens/children/ranking';
import AtvFeelingScreen from './screens/children/phases/atvFeeling';
import AtvMatchScreen from './screens/children/phases/atvMatch';
import AtvListeningScreen from './screens/children/phases/atvListening';
import AtvListeningArduinoScreen from './screens/children/phases/atvListeningArduino';
import AtvMemoryScreen from './screens/children/phases/atvMemory';
import AtvConnectScreen from './screens/children/phases/atvConnect';
import AtvMatchAnswerScreen from './screens/children/phases/atvMatchAnswer';
import ScoreScreen from './screens/children/phases/score';
import ScoreFailScreen from './screens/children/phases/scoreFail';
import { ArduinoProvider } from '@/contexts/ArduinoContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ArduinoProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="transition"
          component={TransitionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="profileParent"
          component={ProfileParentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="edit"
          component={EditScreen}
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
          name="atvListeningArduino"
          component={AtvListeningArduinoScreen}
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
    </ArduinoProvider>
  );
}
