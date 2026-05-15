import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "@/hooks/useApi";
import { useUser } from "@/contexts/UserContext";
import { useTrailContext } from "@/contexts/TrailContext";

function formatSecondsToMMSS(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

type PhaseStats = {
  points: number;
  coins: number;
  correctAnswers: number;
  wrongAnswers: number;
};

export function usePhase() {
  const { showAlert } = useCustomAlert();
  const { request } = useApi();
  const { setUser } = useUser();
  const { worldCode, moduleCode, phaseCode } = useTrailContext();

  /*
   * ---------------------------------------
   * STATES
   * ---------------------------------------
   */

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [stats, setStats] = useState<PhaseStats>({
    points: 0,
    coins: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const totalAnswers = stats.correctAnswers + stats.wrongAnswers;

  const percentage =
    totalAnswers === 0
      ? 0
      : Math.round((stats.correctAnswers / totalAnswers) * 100);

  const incrementStats = (values: Partial<PhaseStats>) => {
    setStats((prev) => ({
      points: prev.points + (values.points ?? 0),

      coins: prev.coins + (values.coins ?? 0),

      correctAnswers: prev.correctAnswers + (values.correctAnswers ?? 0),

      wrongAnswers: prev.wrongAnswers + (values.wrongAnswers ?? 0),
    }));
  };

  const [hintUsed, setHintUsed] = useState(false);

  /*
   * ---------------------------------------
   * TIMER
   * ---------------------------------------
   */

  const startRef = useRef<number>(0);

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, []),
  );

  const start = useCallback(() => {
    startRef.current = Date.now();
    setStarted(true);
  }, []);

  const resetDuration = useCallback(() => {
    startRef.current = 0;
  }, []);

  const getDuration = useCallback(() => {
    if (!startRef.current) {
      return {
        durationInSeconds: 0,
        durationFormatted: "00:00",
      };
    }

    const now = Date.now();

    const durationInSeconds = (now - startRef.current) / 1000;

    return {
      durationInSeconds,
      durationFormatted: formatSecondsToMMSS(durationInSeconds),
    };
  }, []);

  /*
   * ---------------------------------------
   * HINT
   * ---------------------------------------
   */

  const checkHint = async (): Promise<boolean> => {
    if (hintUsed) {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro!",
        message: "Você já utilizou a dica!",
      });

      return false;
    }

    return true;
  };

  const useHint = async () => {
    const canUse = await checkHint();

    if (!canUse) return false;

    setHintUsed(true);

    return true;
  };

  /*
   * ---------------------------------------
   * FINISH
   * ---------------------------------------
   */

  const finish = async () => {
    try {
      const result = await request({
        endpoint: "/child/progress/complete-phase",
        method: "PUT",
        body: {
          points: stats.points,
          coins: stats.coins,
          percentage,
          worldCode,
          moduleCode,
          phaseCode,
        },
      });

      if (result && !result.error) {
        if (result.usuarioAtualizado) {
          setUser((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              ...result.usuarioAtualizado,
            };
          });
        }

        if (result.missaoConcluida) {
          showAlert({
            icon: require("@/assets/icons/custom-alert/check-gradient.png"),
            title: "Missão diária concluída!",
            message: result.missaoConcluida.descricao,
          });
        }

        setFinished(true);

        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    } catch {
      return {
        success: false,
        error: "Não foi possível conectar ao servidor.",
      };
    }
  };

  /*
   * ---------------------------------------
   * RESTART
   * ---------------------------------------
   */

  const restart = () => {
    setStarted(false);
    setFinished(false);

    setStats({
      points: 0,
      coins: 0,
      correctAnswers: 0,
      wrongAnswers: 0
    });

    setHintUsed(false);

    resetDuration();
  };

  return {
    /*
     * STATES
     */
    started,
    finished,
    hintUsed,

    /*
     * ACTIONS
     */
    start,
    finish,
    restart,

    /*
     * STATS
     */
    stats,
    percentage,
    incrementStats,

    /*
     * HINT
     */
    checkHint,
    useHint,

    /*
     * TIMER
     */
    getDuration,
  };
}
