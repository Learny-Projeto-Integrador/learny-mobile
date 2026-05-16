import {
  createContext,
  ReactNode,
  useContext,
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

  const playAudio = (audio: any) => {
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
  };

  const stopAudio = () => {
    try {
      player.pause();

      player.seekTo(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        playAudio,
        stopAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}