import { View, ScrollView, Image } from "react-native";
import NavigationBar from "@/components/ui/NavigationBar";
import { LinearGradient } from "expo-linear-gradient";
import { useProgress } from "@/contexts/ProgressContext";
import { RH, RS } from "@/theme";
import Header from "./Header";
import { ReactNode } from "react";
import { Shadow } from "react-native-shadow-2";

interface Props {
  children: ReactNode;
  mode?: "customTop" | "default";
  colors?: [string, string];
  hasHeader?: boolean;
  spaceBottom?: boolean;
}

const RenderHeader = ({ progress }: any) => {
  return (
    <Header
      streak={progress?.streak || 0}
      coins={progress?.coins || 0}
      stellarPoints={progress?.stellarPoints || 0}
    />
  );
};

const Wrapper = ({ mode, colors, children, hasHeader, progress }: any) => {
  if (mode === "customTop") {
    return (
      <LinearGradient
        colors={colors || ["#973e4a", "#4b85a1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
        }}
      >
        <View style={{ paddingTop: RH(40) }}>
          <View style={{ paddingBottom: RH(30) }}>
            {hasHeader && (
              <View className="items-center">
                <RenderHeader progress={progress} />
              </View>
            )}
          </View>

          <Shadow
            distance={8}
            startColor={"rgba(0,0,0,0.15)"}
            offset={[0, -4]}
            style={{ alignSelf: "stretch" }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingVertical: RS(50),
              }}
            >
              {children}
            </View>
          </Shadow>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={colors || ["#973e4a", "#4b85a1"]}
      style={{
        flex: 1,
        gap: RS(20),
        paddingTop: RH(60),
        paddingBottom: RH(110),
      }}
    >
      {hasHeader && (
        <View className="items-center">
          <RenderHeader progress={progress} />
        </View>
      )}
      {children}
    </LinearGradient>
  );
};

export default function Container({
  children,
  colors,
  mode,
  hasHeader = true,
  spaceBottom = true,
}: Props) {
  const { progress } = useProgress();

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <Wrapper
          colors={colors}
          mode={mode}
          hasHeader={hasHeader}
          progress={progress}
        >
          {children}
        </Wrapper>

        {/* Espaçador */}
        {spaceBottom && (
          <View className="bg-white" style={{ height: RH(120) }} />
        )}
      </ScrollView>

      <NavigationBar />
    </View>
  );
}
