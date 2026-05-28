import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RH, RS, RW } from "@/theme";
import CharacterCard from "@/components/ui/Characters/CharacterCard";
import SelectedCharacter from "@/components/ui/Characters/SelectedCharacter";
import ModalSelectCharacter from "@/components/ui/Characters/ModalSelectCharacter";
import { useEffect, useState } from "react";
import FallbackCard from "@/components/ui/Characters/FallbackCard";
import ModalUpgradeCharacter from "@/components/ui/Characters/ModalUpgradeCharacter";
import { useCharacters } from "@/hooks/useCharacters";
import LockedCharacter from "@/components/ui/Characters/LockedCharacter";
import { CharacterWithProgress } from "@/types/characters";
import { useApi } from "@/hooks/useApi";
import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";
import { getCharacterXpToNext } from "@/utils/characterFormulas";

export default function CharactersScreen() {
  const router = useRouter();
  const [upgradeCharacter, setUpgradeCharacter] =
    useState<CharacterWithProgress | null>(null);

  const [previewCharacter, setPreviewCharacter] =
    useState<CharacterWithProgress | null>(null);

  const { request } = useApi();
  const { progress, getProgress, setProgress } = useProgress();
  const { showAlert } = useCustomAlert();

  const {
    selectedCharacter,
    unlockedCharacters,
    lockedCharacters,
    getCharacters,
  } = useCharacters();

  const handleChangeCharacter = async (code: string) => {
    const result = await request({
      endpoint: "/child/progress",
      method: "PUT",
      body: {
        selectedCharacter: code,
      },
    });

    if (result && !result.error) {
      setProgress((prev) => {
        if (!prev) return prev;
        return { ...prev, selectedCharacter: code };
      });
      setPreviewCharacter(null);
      getCharacters();
    } else {
      if (result.status != 401) {
        showAlert({
          icon: require("@/assets/icons/custom-alert/alert.png"),
          title: "Erro ao atualizar o personagem selecionado!",
          message: result.message,
        });
      }
    }
  };

  const handleUpgradeCharacter = async (code: string, spsUsed: number) => {
    const result = await request({
      endpoint: "/child/progress",
      method: "PUT",
      body: {
        upgradeCharacter: code,
        stellarPoints: -spsUsed,
      },
    });

    if (result && !result.error) {
      showAlert({
        icon: require("@/assets/icons/custom-alert/check-gradient.png"),
        title: "Personagem evoluído!",
        message: "O upgrade do nível foi efetuado com sucesso",
      });
      setUpgradeCharacter(null);
      getProgress();
    } else {
      if (result.status != 401) {
        showAlert({
          icon: require("@/assets/icons/custom-alert/alert.png"),
          title: "Erro ao evoluir personagem!",
          message: result.message,
        });
      }
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <Container mode="customTop" colors={["#4C4C4C", "#4C4C4C"]}>
      {previewCharacter && (
        <ModalSelectCharacter
          name={previewCharacter.name}
          image={previewCharacter.image}
          level={previewCharacter.level}
          progressLevel={(previewCharacter.characterPoints / getCharacterXpToNext(previewCharacter.level)) * 100}
          effect={previewCharacter.effect}
          visible={!!previewCharacter}
          onSelect={() => handleChangeCharacter(previewCharacter?.code)}
          onClose={() => setPreviewCharacter(null)}
        />
      )}

      {upgradeCharacter && (
        <ModalUpgradeCharacter
          level={upgradeCharacter.level}
          progressLevel={(upgradeCharacter.characterPoints / getCharacterXpToNext(upgradeCharacter.level)) * 100}
          name={upgradeCharacter.name}
          image={upgradeCharacter.image}
          effect={upgradeCharacter.effect}
          costUpgrade={50}
          visible={!!upgradeCharacter}
          onUpgrade={() => handleUpgradeCharacter(upgradeCharacter.code, 50)}
          onClose={() => setUpgradeCharacter(null)}
        />
      )}

      <View style={{ paddingHorizontal: RS(40), gap: RS(30) }}>
        {/* Título e botão de fechar */}
        <View
          className="flex-row items-center justify-center"
          style={{ marginHorizontal: RW(20) }}
        >
          <Image
            source={require("@/assets/images/characters/title.png")}
            style={{ width: RW(170), aspectRatio: 186 / 41 }}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", right: 0 }}
          >
            <Image
              source={require("@/assets/icons/back.png")}
              style={{ width: RW(30), height: RW(30) }}
            />
          </TouchableOpacity>
        </View>

        {unlockedCharacters.length === 0 && <FallbackCard />}

        {selectedCharacter && (
          <SelectedCharacter
            level={selectedCharacter.level}
            progressLevel={(selectedCharacter.characterPoints / getCharacterXpToNext(selectedCharacter.level)) * 100}
            name={selectedCharacter.name}
            image={selectedCharacter.image}
            effect={selectedCharacter.effect}
            tags={selectedCharacter.tags}
            onPress={() => setUpgradeCharacter(selectedCharacter)}
          />
        )}

        <View className="flex-row flex-wrap" style={{ gap: RS(20) }}>
          {unlockedCharacters.map((character, index) => (
            <CharacterCard
              key={character.code}
              image={character.image}
              name={character.name}
              level={character.level}
              progressLevel={(character.characterPoints / getCharacterXpToNext(character.level)) * 100}
              color="#FFFC58"
              onPress={() => setPreviewCharacter(character)}
            />
          ))}
        </View>

        <View style={{ gap: RS(20) }}>
          {lockedCharacters.map((lockedCharacter, index) => (
            <LockedCharacter
              key={lockedCharacter.code}
              image={lockedCharacter.image}
              description={lockedCharacter.unlockDescription}
              tags={lockedCharacter.tags}
            />
          ))}
        </View>
      </View>
    </Container>
  );
}
