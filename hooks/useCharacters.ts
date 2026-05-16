import { useMemo, useState } from "react";

import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";

import { useApi } from "./useApi";

import {
  Character,
  CharacterWithProgress,
} from "@/types/characters";

export function useCharacters() {
  const { request } = useApi();

  const { progress } = useProgress();

  const { showAlert } = useCustomAlert();

  const [characters, setCharacters] = useState<Character[]>([]);

  /*
   * ---------------------------------------
   * LOAD CHARACTERS
   * ---------------------------------------
   */

  const getCharacters = async () => {
    const result = await request({
      endpoint: "/game/characters",
      method: "GET",
    });

    if (result && !result.error) {
      setCharacters(result);
    } else {
      if (result.status === 404) return;

      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao buscar personagens!",
        message:
          result.message ||
          "Erro desconhecido ao carregar personagens",
      });
    }
  };

  /*
   * ---------------------------------------
   * HELPERS
   * ---------------------------------------
   */

  const mergedCharacters: CharacterWithProgress[] = useMemo(() => {
    if (!progress) return [];

    return characters.map((character) => {
      const progressData = progress.characters.find(
        (item) => item.characterCode === character.code,
      );

      return {
        ...character,

        unlocked: !!progressData,

        level: progressData?.level || 0,

        characterPoints: progressData?.characterPoints || 0,

        unlockedAt: progressData?.unlockedAt || null,
      };
    });
  }, [characters, progress]);

  /*
   * ---------------------------------------
   * SELECTED CHARACTER
   * ---------------------------------------
   */

  const selectedCharacter = useMemo(() => {
    return (
      mergedCharacters.find(
        (character) =>
          character.code === progress?.selectedCharacter,
      ) || null
    );
  }, [mergedCharacters, progress?.selectedCharacter]);

  /*
   * ---------------------------------------
   * FILTERS
   * ---------------------------------------
   */

  const unlockedCharacters = useMemo(() => {
    return mergedCharacters.filter(
      (character) => character.unlocked,
    );
  }, [mergedCharacters]);

  const lockedCharacters = useMemo(() => {
    return mergedCharacters.filter(
      (character) => !character.unlocked,
    );
  }, [mergedCharacters]);

  return {
    characters: mergedCharacters,

    selectedCharacter,

    unlockedCharacters,

    lockedCharacters,

    getCharacters,
  };
}