import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
//@ts-ignore
import "../global.css";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { UserProvider } from "@/contexts/UserContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { AlertProvider } from "@/contexts/AlertContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { TrailProvider } from "@/contexts/TrailContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { PhaseProvider } from "@/contexts/PhaseContext";
import { AudioProvider } from "@/contexts/AudioContext";

export default function RootLayout() {
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
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <LoadingProvider>
      <AlertProvider>
        <UserProvider>
          <ProgressProvider>
            <TrailProvider>
              <PhaseProvider>
                <AudioProvider>
                  <FeedbackProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                  </FeedbackProvider>
                </AudioProvider>
              </PhaseProvider>
            </TrailProvider>
          </ProgressProvider>
        </UserProvider>
      </AlertProvider>
    </LoadingProvider>
  );
}
