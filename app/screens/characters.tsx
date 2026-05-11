import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RH, RS, RW } from "@/theme";
import CharacterCard from "@/components/ui/Characters/CharacterCard";
import SelectedCharacter from "@/components/ui/Characters/SelectedCharacter";
import ModalSelectCharacter from "@/components/ui/Characters/ModalSelectCharacter";
import { useState } from "react";
import FallbackCard from "@/components/ui/Characters/FallbackCard";
import ModalUpgradeCharacter from "@/components/ui/Characters/ModalUpgradeCharacter";

export default function CharactersScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container
      mode="customTop"
      colors={["#4C4C4C", "#4C4C4C"]}
    >
      {/* <ModalSelectCharacter
        name="Johny Hero"
        image="https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png"
        level={5}
        characterPoints={75}
        effect="Increases damage by 20%"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      /> */}

      <ModalUpgradeCharacter
        name="Johny Hero"
        image="https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png"
        level={5}
        characterPoints={100}
        costUpgrade={50}
        effect="Increases damage by 20%"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

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

        <FallbackCard />

        <SelectedCharacter
          name="Johny Hero"
          image="https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png"
          level={5}
          characterPoints={75}
          effect="Increases damage by 20%"
          tags={["Hero", "Warrior"]}
        />

        <View className="flex-row flex-wrap" style={{ gap: RS(20) }}>
          <CharacterCard
            image={{
              uri: "https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png",
            }}
            name="Character 1"
            level={5}
            color="#FFFC58"
          />
          <CharacterCard
            image={{
              uri: "https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png",
            }}
            name="Character 1"
            level={5}
            color="#FFFC58"
            onPress={() => setModalVisible(true)}
          />
          <CharacterCard
            image={{
              uri: "https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png",
            }}
            name="Character 1"
            level={5}
            color="#FFFC58"
          />
        </View>

        <View className="flex-row flex-wrap" style={{ gap: RS(20) }}>
          <CharacterCard
            image={{
              uri: "https://pi-learny.s3.us-east-1.amazonaws.com/characters/johny-hero.png",
            }}
            name="Character 1"
            mode="upgrade"
            characterPoints={75}
            level={5}
            color="#FFFC58"
          />
        </View>
      </View>
    </Container>
  );
}
