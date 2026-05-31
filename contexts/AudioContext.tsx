import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

import { AudioSource, useAudioPlayer } from "expo-audio";
import { useUser } from "./UserContext";

interface AudioContextData {
  playAudio: (audio: AudioSource) => void;
  stopAudio: () => void;
}

const AudioContext = createContext({} as AudioContextData);

interface Props {
  children: ReactNode;
}

export function AudioProvider({ children }: Props) {
  const { user } = useUser();
  const player = useAudioPlayer();

  const playAudio = useCallback(
    (audio: any) => {
      if (!audio) return;

      if (!user?.audioActive) return;

      try {
        player.pause();

        player.replace(audio);

        player.seekTo(0);

        player.play();
      } catch (e) {
        console.log(e);
      }
    },
    [player, user?.audioActive],
  );

  const stopAudio = useCallback(() => {
    try {
      player.pause();

      player.seekTo(0);
    } catch (e) {
      console.log(e);
    }
  }, [player]);

  const value = useMemo(
    () => ({ playAudio, stopAudio }),
    [playAudio, stopAudio],
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}