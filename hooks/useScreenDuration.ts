import { useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

function formatSecondsToMMSS(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');

  return `${paddedMins}:${paddedSecs}`;
}

/**
 * Hook que inicia o timer ao focar e retorna função para pegar o tempo atual.
 */
export function useScreenDuration() {
  const startRef = useRef<number>(0);

  useFocusEffect(
    useCallback(() => {
      startRef.current = Date.now();

      return () => {
        // opcional: se quiser calcular automaticamente no unfocus
      };
    }, [])
  );

  const getDuration = () => {
    const now = Date.now();
    const durationInSeconds = (now - startRef.current) / 1000;
    const durationFormatted = formatSecondsToMMSS(durationInSeconds);
    return { durationInSeconds, durationFormatted };
  };

  return { getDuration };
}
