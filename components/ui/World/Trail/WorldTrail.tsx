import { View } from "react-native";
import ModuleTrail from "@/components/ui/World/Trail/ModuleTrail";
import { Module } from "@/types/worlds";

interface Props {
  modules: Module[];
}

export default function WorldTrail({ modules }: Props) {
  return (
    <View className="w-full self-end">
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
    </View>
  );
}
