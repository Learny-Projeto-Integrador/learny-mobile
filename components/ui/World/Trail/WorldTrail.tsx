import { Image, Text, View } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import ModuleTrail from "@/components/ui/World/Trail/ModuleTrail";
import { Module } from "@/types/worlds";
import { CharacterWithProgress } from "@/types/characters";
import TrailCharacterCard from "../../Characters/TrailCaracterCard";
import { useRouter } from "expo-router";

interface Props {
  selectedCharacter: CharacterWithProgress | null;
  modules: Module[];
}

export default function WorldTrail({ selectedCharacter, modules }: Props) {
  const router = useRouter();
  return (
    <View className="w-full self-end">

      
      {selectedCharacter && (
        <View style={{ paddingHorizontal: RS(40), marginBottom: RS(40) }}>
          <TrailCharacterCard 
            image={selectedCharacter.image}
            name={selectedCharacter.name}
            level={selectedCharacter.level}
            onPress={() => router.push("/screens/characters")}
          />
        </View>
       )}

      {/* Início (bandeira) */}
      <View style={{ alignItems: "center", marginRight: RW(50) }}>
        <Image
          source={require("@/assets/images/trail/start.png")}
          style={{ width: RW(70), height: RW(70) }}
          resizeMode="contain"
        />
      </View>

      {/* Modulos */}
      {modules.map((module, index) => (
        <ModuleTrail
          key={module.code}
          moduleCode={module.code}
          worldCode={module.worldCode}
          moduleNumber={index + 1}
          phases={module.phases}
          illustration={require("@/assets/images/trail/ilustrations/egg.png")}
          bossIcon={require("@/assets/images/trail/bosses/boss.png")}
          colorTheme="#EF5B6A"
      />
      ))}

      {/* Seção "Em Desenvolvimento..." */}
      <View style={{ alignItems: "center", marginTop: RH(40) }}>
        <Image
          source={require("@/assets/images/trail/ilustrations/dino3.png")}
          style={{
            width: RW(180),
            height: RW(140),
          }}
          resizeMode="contain"
        />
        <Text
          className="font-montserratBold"
          style={{
            fontSize: RF(26),
            color: "#4c4c4c",
            marginTop: RH(8),
          }}
        >
          Em desenvolvimento...
        </Text>
      </View>

    </View>
  );
}
