import { View, ScrollView, Image } from "react-native";
import NavigationBar from "@/components/ui/NavigationBar";
import { LinearGradient } from "expo-linear-gradient";
import { useProgress } from "@/contexts/ProgressContext";
import { RH, RS } from "@/theme";
import Header from "./Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  topImage?: any;
  hasHeader?: boolean;
  spaceBottom?: boolean;
};

const RenderHeader = ({ progress }: any) => {
  return (
    <Header
      points={progress?.points || 0}
      medals={progress?.medals?.length || 0}
      ranking={progress?.ranking || 0}
    />
  );
}

const Wrapper = ({ topImage, children }: any) => {
  if (topImage) {
    return (
      <View className="flex-col">
        <Image
          source={topImage}
          style={{ width: "100%", height: RH(145) }}
          resizeMode="contain"
        />
        {children}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#973e4a", "#4b85a1"]}
      style={{
        flex: 1,
        gap: RS(20),
        paddingTop: RH(80),
        paddingBottom: RH(110),
      }}
    >
      {children}
    </LinearGradient>
  );
}

export default function Container({ children, topImage, hasHeader=true, spaceBottom=true }: Props) {
  const { progress } = useProgress();

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-white">
        <Wrapper topImage={topImage}>
          
          {/* Header */}
          {hasHeader && (
            <View
              className="items-center"
              style={
                topImage && {
                  marginTop: -RH(110),
                  marginBottom: RH(60),
                }
              }
            >
              <RenderHeader progress={progress} />
            </View>
          )}

          {children}
        </Wrapper>

        {/* Espaçador */}
        {spaceBottom && <View style={{ height: RH(120)}} />}

      </ScrollView>

      <NavigationBar />
    </View>
  );
}
