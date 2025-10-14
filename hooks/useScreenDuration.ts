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
 * Hook que inicia o timer ao focar e retorna funções para pegar,
 * iniciar manualmente e resetar o tempo.
 */
export function useScreenDuration() {
  const startRef = useRef<number>(0);

  // Continua iniciando automaticamente ao focar na tela
  useFocusEffect(
    useCallback(() => {
      startRef.current = Date.now();

      return () => {
        // opcional: lógica ao desfocar
      };
    }, [])
  );

  // 🔹 Função para iniciar manualmente (ex: ao clicar em "Iniciar")
  const start = useCallback(() => {
    startRef.current = Date.now();
  }, []);

  // 🔹 Função para resetar o tempo (ex: ao clicar em "Cancelar")
  const reset = useCallback(() => {
    startRef.current = 0;
  }, []);

  // 🔹 Calcula o tempo atual
  const getDuration = useCallback(() => {
    if (!startRef.current) {
      return { durationInSeconds: 0, durationFormatted: '00:00' };
    }

    const now = Date.now();
    const durationInSeconds = (now - startRef.current) / 1000;
    const durationFormatted = formatSecondsToMMSS(durationInSeconds);

    return { durationInSeconds, durationFormatted };
  }, []);

  return { getDuration, start, reset };
}
