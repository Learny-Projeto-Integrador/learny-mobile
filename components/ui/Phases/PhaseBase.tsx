import { ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { ReactNode, useState } from "react";

import ModalInfo from "@/components/ui/ModalInfo";
import HeaderPhase from "./HeaderPhase";
import { RS, RW } from "@/theme";

interface Props {
  title: string;
  description: string;
  question?: string;
  color: string;
  headerImage: any;

  tutorialTitle: string;
  tutorialMessage: string;

  tutorialContent: ReactNode;
  children: ReactNode;

  started: boolean;

  onStart: () => void;
  onBack: () => void;
}

const { width, height } = Dimensions.get("window");

export default function PhaseBase({
  title,
  description,
  question,
  color,
  headerImage,
  tutorialTitle,
  tutorialMessage,
  tutorialContent,
  children,
  started,
  onStart,
  onBack,
}: Props) {
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: RS(50),
        paddingBottom: RS(50),
      }}
    >
      <ModalInfo
        title={tutorialTitle}
        message={tutorialMessage}
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />

      <HeaderPhase
        image={headerImage}
        title={title}
        description={description}
        question={question ? question : undefined}
        color={color}
        onPressInfo={() => setInfoVisible(true)}
        onBack={onBack}
      />

      {!started ? (
        <>
          {tutorialContent}

          <TouchableOpacity
            onPress={onStart}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: height * 0.025,
            }}
          >
            <Image
              source={require("@/assets/icons/phases/confirm-red.png")}
              style={{
                width: width * 0.1,
                aspectRatio: 1,
              }}
            />
          </TouchableOpacity>
        </>
      ) : (
        children
      )}
    </ScrollView>
  );
}
